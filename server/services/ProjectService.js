import db from '../db';
import NotFoundError from '../../common/errors/NotFoundError';
import _ from 'lodash';

const ProjectService = {
  async createProject(project) {
    return await db.execute(async (transaction) => {
      let tasks = [];

      if (project.templateId) {
        const template = await this.getProject(project.templateId, {
          includeTasks: true,
          transaction,
        });
        tasks = template.tasks.map(task => ({
          name: task.name,
          position: task.position,
        }));
      }

      return await db.Project.create({
        name: project.name,
        tasks,
      }, {
        transaction,
        include: [db.Task],
      });
    });
  },

  async getProject(projectId, options) {
    const project = await db.Project.findById(projectId, this.getProjectSearchOptions(options));
    if (!project) {
      throw new NotFoundError(`Cannot find project with id = ${projectId}.`);
    }
    return project;
  },

  async getProjects(options) {
    return await db.Project.findAll(this.getProjectSearchOptions(options));
  },

  async updateProject(projectId, updates) {
    await db.execute(async (transaction) => {
      const project = await this.getProject(projectId, { transaction });
      await project.update(updates, { transaction });
    });
  },

  async deleteProject(projectId) {
    await db.execute(async (transaction) => {
      const project = await this.getProject(projectId, { transaction });
      await project.destroy({ transaction });
    });
  },

  async createTask(projectId, task) {
    return await db.execute(async (transaction) => {
      const project = await this.getProject(projectId, {
        includeTasks: true,
        transaction,
      });
      // TODO: task.position
      const lastTask = _.maxBy(project.tasks, task => task.position);
      return await db.Task.create({
        projectId,
        name: task.name,
        position: lastTask ? lastTask.position + 1 : 1,
      }, {
        transaction,
      });
    });
  },

  async getTask(projectId, taskId, { transaction } = {}) {
    const task = await db.Task.findOne({
      where: {
        projectId,
        id: taskId,
      },
      transaction,
    });
    if (!task) {
      throw new NotFoundError(
        `Cannot find task with id = ${taskId} in project with id = ${projectId}.`
      );
    }
    return task;
  },

  async getTasks(projectId) {
    const project = await this.getProject(projectId, { includeTasks: true });
    return project.tasks;
  },

  async updateTask(projectId, taskId, updates) {
    await db.execute(async (transaction) => {
      const task = await this.getTask(projectId, taskId, { transaction });
      // TODO: task.position
      await task.update(updates, { transaction });
    });
  },

  async deleteTask(projectId, taskId) {
    await db.execute(async (transaction) => {
      const task = await this.getTask(projectId, taskId, { transaction });
      await task.destroy({ transaction });
    });
  },

  getProjectSearchOptions({ includeTasks, transaction } = {}) {
    const options = {
      include: [],
      transaction,
    };
    if (includeTasks) {
      options.include.push(db.Task);
    }
    return options;
  },
};

export default ProjectService;
