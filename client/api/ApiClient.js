import Axios from 'axios';

const axios = Axios.create({ baseURL: '/api' });

const ApiClient = {
  async getProjects() {
    const response = await axios.get('/projects');
    return response.data;
  },

  async createProject(project) {
    const response = await axios.post('/projects', project);
    return response.data;
  },

  async deleteProject(projectID) {
    await axios.delete(`/projects/${projectID}`);
  },
};

export default ApiClient;
