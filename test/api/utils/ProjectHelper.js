import _ from 'lodash';
import sequentialMap from './sequentialMap';

export default class ProjectHelper {
  constructor(client) {
    this.client = client;
  }

  async createProjects(count) {
    const projects = _.times(count, i => ({ name: `Test Project ${i + 1}` }));
    return await sequentialMap(projects, project => this.client.createProject(project));
  }

  async createProject() {
    const [project] = await this.createProjects(1);
    return project;
  }

  async createProjectTemplates(count) {
    const templates = _.times(count, i => ({
      name: `Test Project Template ${i + 1}`,
      isTemplate: true,
    }));
    return await sequentialMap(templates, template => this.client.createProject(template));
  }

  async createProjectTemplate() {
    const [template] = await this.createProjectTemplates(1);
    return template;
  }
}
