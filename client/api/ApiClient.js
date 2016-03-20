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

  async deleteProject(projectId) {
    await axios.delete(`/projects/${projectId}`);
  },

  async updateTask(projectId, taskId, updates) {
    await axios.patch(`/projects/${projectId}/tasks/${taskId}`, updates);
  },
};

export default ApiClient;
