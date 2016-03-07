import db from '../db';

const ProjectService = {
  async getProjects() {
    return await db.Project.findAll({ include: [db.Task] });
  },

  async createProject(project) {
    const projectTemplate = await db.ProjectTemplate.findById(project.projectTemplateId);
    if (!projectTemplate) {
      throw new Error(`Cannot find project template with id = ${project.projectTemplateId}.`);
    }
    const tasks = await projectTemplate.getTasks();
    return await db.Project.create({
        name: project.name,
        tasks: tasks.map(task => ({
          name: task.name,
          position: task.position
        }))
    }, {
      include: [ db.Task ]
    });
  },

  async deleteProject(projectID) {

  },

  async getProjectTemplates() {
    return await db.ProjectTemplate.findAll();
  }
};

export default ProjectService;
