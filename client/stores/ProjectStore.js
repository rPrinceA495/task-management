import { observable, action } from 'mobx';
import ProjectModel from '../models/ProjectModel';

export default class ProjectStore {
  apiClient;
  @observable projects = null;
  @observable isLoading = false;

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  @action async loadProjects() {
    if (this.projects) {
      return;
    }
    this.isLoading = true;
    try {
      const result = await this.apiClient.getProjects({ includeTasks: true });
      this.projects = result.map(project => ProjectModel.fromJS(this, project));
    } catch (error) {
      // TODO: handle error
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  @action async createProject(name, templateId) {
    try {
      const result = await this.apiClient.createProject({ name, templateId });
      this.projects.push(ProjectModel.fromJS(this, result));
    } catch (error) {
      // TODO: handle error
      console.log(error);
    }
  }

  @action removeProject(project) {
    this.projects.remove(project);
  }
}
