import ApiClient from '../../common/api/ApiClient';
import NotFoundError from '../../common/errors/NotFoundError';

const client = new ApiClient('http://localhost:5555/');

// TODO: move this function to a separate file
async function expectToThrow(fn, ErrorType, message) {
  try {
    await fn();
    fail('Expected function to throw an Error.');
  } catch (error) {
    if (!(error instanceof ErrorType)) {
      fail(`Expected function to throw ${ErrorType}, but it threw ${error}.`);
    } else if (message) {
      expect(error.message).toBe(message);
    }
  }
}

describe('Project API', () => {
  describe('POST /api/projects', () => {
    it('creates an empty project when no template is specified', async () => {
      const result = await client.createProject({ name: 'Test Project' });
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe('Test Project');

      const project = await client.getProject(result.id, { includeTasks: true });
      expect(project.id).toBe(result.id);
      expect(project.name).toBe('Test Project');
      expect(project.tasks).toEqual([]);
    });

    it('creates a new project from the specified template', async () => {
      const result = await client.createProject({
        name: 'Test Project',
        templateId: 1,
      });
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe('Test Project');

      const project = await client.getProject(result.id, { includeTasks: true });
      expect(project.id).toBe(result.id);
      expect(project.name).toBe('Test Project');
      // expect(project.tasks).toEqual([ ... ]);
    });

    it('throws a NotFound error when the specified template does not exist', () =>
      expectToThrow(
        () => client.createProject({
          name: 'Test Project',
          templateId: 333333333,
        }),
        NotFoundError
      )
    );
  });

  describe('GET /api/projects/<id>', () => {
    it('throws a NotFound error when the specified project does not exist', () =>
      expectToThrow(
        () => client.getProject(333333333),
        NotFoundError,
        'Cannot find project with id = 333333333.'
      )
    );
  });

  describe('GET /api/projects', () => {
    it('returns all projects', async () => {
      const newProjects = [];
      for (let i = 1; i <= 3; i++) {
        newProjects.push(await client.createProject({ name: `Test Project ${i}` }));
      }
      const allProjects = await client.getProjects();
      expect(newProjects.every(project => allProjects.some(p =>
        p.id === project.id &&
        p.name === project.name
      ))).toBe(true);
    });
  });

  describe('PATCH /api/projects/<id>', () => {
    it('updates the specified project', async () => {
      const project = await client.createProject({ name: 'Test Project' });
      await client.updateProject(project.id, { name: 'Test Project 2' });
      const updatedProject = await client.getProject(project.id);
      expect(updatedProject.name).toBe('Test Project 2');
    });

    it('throws a NotFound error when the specified project does not exist', () =>
      expectToThrow(() => client.updateProject(333333333, { name: 'Test' }), NotFoundError)
    );
  });

  describe('DELETE /api/projects/<id>', () => {
    it('deletes the specified project', async () => {
      const project = await client.createProject({ name: 'Test Project' });
      await client.deleteProject(project.id);
      await expectToThrow(() => client.getProject(project.id), NotFoundError);
    });

    it('throws a NotFound error when the specified project does not exist', () =>
      expectToThrow(() => client.deleteProject(333333333), NotFoundError)
    );
  });

  describe('POST /api/projects/<projectId>/tasks', () => {
    it('creates a new task', async () => {
      const project = await client.createProject({ name: 'Test Project' });
      const result = await client.createTask(project.id, { name: 'Test Task' });
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe('Test Task');

      const task = await client.getTask(project.id, result.id);
      expect(task.id).toBe(result.id);
      expect(task.name).toBe('Test Task');
    });

    it('throws a NotFound error when the specified project does not exist', () =>
      expectToThrow(() => client.createTask(333333333, { name: 'Test' }), NotFoundError)
    );
  });

  describe('PATCH /api/projects/<projectId>/tasks/<taskId>', () => {
    it('updates the specified task', async () => {
      const project = await client.createProject({ name: 'Test Project' });
      const task = await client.createTask(project.id, { name: 'Test Task' });
      await client.updateTask(project.id, task.id, {
        name: 'Test Task 2',
        status: 'completed',
      });
      const updatedTask = await client.getTask(project.id, task.id);
      expect(updatedTask.name).toBe('Test Task 2');
      expect(updatedTask.status).toBe('completed');
    });

    it('throws a NotFound error when the specified task does not exist', () =>
      expectToThrow(() => client.updateTask(333333333, 333333333, { name: 'Test' }), NotFoundError)
    );
  });

  describe('DELETE /api/projects/<projectId>/tasks/<taskId>', () => {
    it('deletes the specified task', async () => {
      const project = await client.createProject({ name: 'Test Project' });
      const task = await client.createTask(project.id, { name: 'Test Task' });
      await client.deleteTask(project.id, task.id);
      await expectToThrow(() => client.getTask(project.id, task.id), NotFoundError);
    });

    it('throws a NotFound error when the specified task does not exist', () =>
      expectToThrow(() => client.deleteTask(333333333, 333333333), NotFoundError)
    );
  });
});
