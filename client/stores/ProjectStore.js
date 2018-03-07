import { observable, action } from 'mobx';
import ProjectModel from '../models/ProjectModel';
import ListModel from '../models/ListModel';
import Filters from '../constants/Filters';

export default class ProjectStore {
  apiClient;
  notificationStore;
  @observable projects;
  @observable isCreatingProject = false;

  constructor(apiClient, notificationStore) {
    this.apiClient = apiClient;
    this.notificationStore = notificationStore;
    this.projects = {};
    Filters.All.forEach(filter => {
      this.projects[filter] = new ListModel(() => this.fetchProjects(filter));
    });
  }

  @action async loadProjects(filter) {
    await this.projects[filter].load();
  }

  getProjects(filter) {
    return this.projects[filter];
  }

  @action async createProject({ name, templateId, isTemplate }) {
    this.isCreatingProject = true;
    try {
      const project = this.deserializeProject(await this.apiClient.createProject({
        name,
        templateId,
        isTemplate,
      }));
      this.getProjectList(project).add(project);
    } catch (error) {
      console.log('Error while creating project.', error);
      this.notificationStore.error();
    } finally {
      this.isCreatingProject = false;
    }
  }

  @action onProjectDeleted(project) {
    this.getProjectList(project).remove(project);
  }

  @action onProjectStatusChanged(project, oldStatus, newStatus) {
    this.projects[oldStatus].remove(project);
    this.projects[newStatus].add(project);
  }

  async fetchProjects(filter) {
    const result = filter === Filters.Templates ?
      await this.apiClient.getProjectTemplates() :
      await this.apiClient.getProjectsByStatus(filter);
    return this.deserializeProjects(result);
  }

  deserializeProject(project) {
    return ProjectModel.fromJS(
      this,
      this.apiClient,
      this.notificationStore,
      project
    );
  }

  deserializeProjects(projects) {
    return projects.map(project => this.deserializeProject(project));
  }

  getProjectList(project) {
    return this.projects[project.isTemplate ? Filters.Templates : project.status];
  }
}
