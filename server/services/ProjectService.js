import _ from 'lodash';
import db from '../db';
import NotFoundError from '../../common/errors/NotFoundError';

const ProjectService = {
  async createProject(project) {
    return db.execute(async (transaction) => {
      let tasks = [];

      if (project.templateId) {
        const template = await this.getProject(project.templateId, {
          isTemplate: true,
          includeTasks: true,
          transaction,
        });
        tasks = template.tasks.map(task => ({
          name: task.name,
          position: task.position,
        }));
      }

      return db.Project.create({
        name: project.name,
        isTemplate: project.isTemplate,
        status: project.isTemplate ? null : 'active',
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
      const projectType = (options && options.isTemplate) ? 'project template' : 'project';
      throw new NotFoundError(`Cannot find ${projectType} with id = ${projectId}.`);
    }
    return project;
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

  async getProjects(options) {
    return db.Project.findAll(this.getProjectSearchOptions(options));
  },

  async createTask(projectId, task) {
    return db.execute(async (transaction) => {
      const project = await this.getProject(projectId, {
        includeTasks: true,
        transaction,
      });
      // TODO: task.position
      const lastTask = _.maxBy(project.tasks, t => t.position);
      return db.Task.create({
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

  async getTasks(projectId) {
    const project = await this.getProject(projectId, { includeTasks: true });
    return project.tasks;
  },

  getProjectSearchOptions({ status, isTemplate, includeTasks, transaction } = {}) {
    const options = {
      where: {},
      include: [],
      transaction,
    };
    if (status) {
      options.where.status = status;
    }
    if (!_.isNil(isTemplate)) {
      options.where.isTemplate = isTemplate;
    }
    if (includeTasks) {
      options.include.push(db.Task);
    }
    return options;
  },
};

export default ProjectService;
