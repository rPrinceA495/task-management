import axios from 'axios';

describe('Project API', () => {
  describe('POST /api/projects', () => {
    it('creates a new project from the specified template', async () => {
      const postResponse = await axios.post('http://localhost:5555/api/projects', {
        name: 'Test Project',
        templateId: 1,
      });
      expect(postResponse.status).toBe(200);
      const projectId = postResponse.data.id;

      const getResponse = await axios.get(`http://localhost:5555/api/projects/${projectId}`);
      expect(getResponse.status).toBe(200);
      expect(getResponse.data.name).toBe('Test Project');
    });
  });

  describe('DELETE /api/projects/<id>', () => {
    it('deletes the specified project', async () => {
    });
  });

  describe('GET /api/projects/<id>', () => {
    it('reponds with a 404 error if the specified project does not exist', async () => {
      const response = await axios.get(`http://localhost:5555/api/projects/333333333`, {
        validateStatus: () => true,
      });
      expect(response.status).toBe(404);
    });
  });
});
