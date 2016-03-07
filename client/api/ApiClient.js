import Axios from 'axios';

const axios = Axios.create({ baseURL: '/api' });

const ApiClient = {
  getProjectTemplates() {
    return axios.get('/project_templates').then(response => response.data);
  },

  getProjects() {
    return axios.get('/projects').then(response => response.data);
  },

  createProject(project) {
    return axios.post('/projects', project).then(response => response.data);
  },

  deleteProject(projectID) {
    return axios.delete(`/projects/${projectID}`);
  }
};

export default ApiClient;
