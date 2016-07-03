import { observable, action } from 'mobx';
import ApiClient from '../../common/api/ApiClient';
import ProjectModel from '../models/ProjectModel';

export default class ProjectStore {
  @observable projects = null;
  @observable isLoading = false;

  @action async loadProjects() {
    if (this.projects) {
      return;
    }
    this.isLoading = true;
    try {
      const result = await ApiClient.getProjects();
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
      const result = await ApiClient.createProject({ name, templateId });
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
