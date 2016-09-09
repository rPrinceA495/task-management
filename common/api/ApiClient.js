import Axios from 'axios';
import * as Urls from './ApiUrls';
import { throwIfNotSuccessful } from './ApiHelper';

export default class ApiClient {
  constructor(baseUrl) {
    this.axios = Axios.create({
      baseURL: baseUrl,
      validateStatus: () => true,
    });

    this.axios.interceptors.response.use(response => {
      throwIfNotSuccessful(response);
      return response.data;
    });
  }

  createProject(project) {
    return this.axios.post(Urls.projects, project);
  }

  getProject(projectId, { includeTasks } = {}) {
    return this.axios.get(Urls.project(projectId), { params: { includeTasks } });
  }

  updateProject(projectId, updates) {
    return this.axios.patch(Urls.project(projectId), updates);
  }

  deleteProject(projectId) {
    return this.axios.delete(Urls.project(projectId));
  }

  getProjects({ includeTasks } = {}) {
    return this.axios.get(Urls.projects, { params: { includeTasks } });
  }

  getProjectsByStatus(status, { includeTasks } = {}) {
    return this.axios.get(Urls.projectsByStatus(status), { params: { includeTasks } });
  }

  getProjectTemplates({ includeTasks } = {}) {
    return this.axios.get(Urls.projectTemplates, { params: { includeTasks } });
  }

  createTask(projectId, task) {
    return this.axios.post(Urls.tasks(projectId), task);
  }

  getTask(projectId, taskId) {
    return this.axios.get(Urls.task(projectId, taskId));
  }

  updateTask(projectId, taskId, updates) {
    return this.axios.patch(Urls.task(projectId, taskId), updates);
  }

  deleteTask(projectId, taskId) {
    return this.axios.delete(Urls.task(projectId, taskId));
  }

  getTasks(projectId) {
    return this.axios.get(Urls.tasks(projectId));
  }
}
