import db from '../db';

const ProjectService = {
  async getProjects() {
    return await db.Project.findAll({ include: [db.Task] });
  },

  async createProject(project) {
    const template = await db.Project.findById(project.templateId);
    if (!template) {
      throw new Error(`Cannot find project template with id = ${project.templateId}.`);
    }
    const tasks = await template.getTasks();
    return await db.Project.create({
      name: project.name,
      tasks: tasks.map(task => ({
        name: task.name,
        position: task.position,
      })),
    }, {
      include: [db.Task],
    });
  },

  async deleteProject(projectId) {
    const project = await db.Project.findById(projectId);
    if (project) {
      await project.destroy();
    }
  },

  async updateTask(projectId, taskId, updates) {
    const task = await db.Task.findById(taskId);
    await task.update(updates);
  },
};

export default ProjectService;
