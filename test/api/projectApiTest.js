import ApiClient from '../../common/api/ApiClient';
import NotFoundError from '../../common/errors/NotFoundError';
import expectToThrowAsync from './utils/expectToThrowAsync';
import ProjectHelper from './utils/ProjectHelper';
import matchers from './matchers';

const getIds = items => items.map(item => item.id);
const client = new ApiClient('http://localhost:5555/');
const projectHelper = new ProjectHelper(client);

describe('Project API', () => {
  beforeEach(() => jasmine.addMatchers(matchers));

  describe('POST /api/projects', () => {
    it('creates an empty project when no template is specified', async () => {
      const result = await client.createProject({ name: 'Test Project' });
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();

      const project = await client.getProject(result.id, { includeTasks: true });
      expect(project.id).toBe(result.id);
      expect(project.name).toBe('Test Project');
      expect(project.status).toBe('active');
      expect(project.tasks).toEqual([]);
    });

    it('creates a new project from the specified template', async () => {
      const template = await client.createProject({
        name: 'Test Template',
        isTemplate: true,
      });
      await client.createTask(template.id, { name: 'Test Task 1' });
      await client.createTask(template.id, { name: 'Test Task 2' });

      const result = await client.createProject({
        name: 'Test Project',
        templateId: template.id,
      });
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();

      const project = await client.getProject(result.id, { includeTasks: true });
      expect(project.id).toBe(result.id);
      expect(project.name).toBe('Test Project');
      expect(project.status).toBe('active');
      expect(project.tasks.length).toBe(2);
      expect(project.tasks.map(task => task.name)).toContainAllOf([
        'Test Task 1',
        'Test Task 2',
      ]);
    });

    it('throws a NotFound error when the specified template does not exist', () =>
      expectToThrowAsync(
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
      expectToThrowAsync(
        () => client.getProject(333333333),
        NotFoundError,
        'Cannot find project with id = 333333333.'
      )
    );
  });

  describe('PATCH /api/projects/<id>', () => {
    it('updates the specified project', async () => {
      const project = await client.createProject({ name: 'Test Project' });
      await client.updateProject(project.id, { name: 'Test Project 2' });
      const updatedProject = await client.getProject(project.id);
      expect(updatedProject.name).toBe('Test Project 2');
    });

    it('throws a NotFound error when the specified project does not exist', () =>
      expectToThrowAsync(() => client.updateProject(333333333, { name: 'Test' }), NotFoundError)
    );
  });

  describe('DELETE /api/projects/<id>', () => {
    it('deletes the specified project', async () => {
      const project = await client.createProject({ name: 'Test Project' });
      await client.deleteProject(project.id);
      await expectToThrowAsync(() => client.getProject(project.id), NotFoundError);
    });

    it('throws a NotFound error when the specified project does not exist', () =>
      expectToThrowAsync(() => client.deleteProject(333333333), NotFoundError)
    );
  });

  describe('GET /api/projects', () => {
    it('returns all projects', async () => {
      const newProjectIds = getIds(await projectHelper.createProjects(3));
      const allProjectIds = getIds(await client.getProjects());
      expect(allProjectIds).toContainAllOf(newProjectIds);
    });
  });

  describe('GET /api/projects/active', () => {
    it('returns all active projects', async () => {
      const newProjectIds = getIds(await projectHelper.createProjects(3));
      const activeProjectIds = getIds(await client.getProjectsByStatus('active'));
      expect(activeProjectIds).toContainAllOf(newProjectIds);
    });

    it('does not return projects with status other than active', async () => {
      const newProjectIds = getIds(await projectHelper.createProjects(3));
      const statuses = ['completed', 'canceled', 'paused'];
      for (let i = 0; i < 3; i++) {
        await client.updateProject(newProjectIds[i], { status: statuses[i] });
      }
      const activeProjectIds = getIds(await client.getProjectsByStatus('active'));
      expect(activeProjectIds).not.toContainAnyOf(newProjectIds);
    });

    it('does not return project templates', async () => {
      const template = await projectHelper.createProjectTemplate();
      const activeProjectIds = getIds(await client.getProjectsByStatus('active'));
      expect(activeProjectIds).not.toContain(template.id);
    });
  });

  describe('GET /api/projects/completed', () => {
    it('returns all completed projects', async () => {
      const newProjectIds = getIds(await projectHelper.createProjects(3));
      for (const id of newProjectIds) {
        await client.updateProject(id, { status: 'completed' });
      }
      const completedProjectIds = getIds(await client.getProjectsByStatus('completed'));
      expect(completedProjectIds).toContainAllOf(newProjectIds);
    });

    it('does not return projects with status other than completed', async () => {
      const newProjectIds = getIds(await projectHelper.createProjects(3));
      // newProjectIds[0] -> 'active'
      await client.updateProject(newProjectIds[1], { status: 'canceled' });
      await client.updateProject(newProjectIds[2], { status: 'paused' });
      const completedProjectIds = getIds(await client.getProjectsByStatus('completed'));
      expect(completedProjectIds).not.toContainAnyOf(newProjectIds);
    });

    it('does not return project templates', async () => {
      const template = await projectHelper.createProjectTemplate();
      const completedProjectIds = getIds(await client.getProjectsByStatus('completed'));
      expect(completedProjectIds).not.toContain(template.id);
    });
  });

  describe('GET /api/projects/templates', () => {
    it('returns all project templates', async () => {
      const newTemplateIds = getIds(await projectHelper.createProjectTemplates(3));
      const allTemplateIds = getIds(await client.getProjectTemplates());
      expect(allTemplateIds).toContainAllOf(newTemplateIds);
    });
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
      expectToThrowAsync(() => client.createTask(333333333, { name: 'Test' }), NotFoundError)
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
      expectToThrowAsync(
        () => client.updateTask(333333333, 333333333, { name: 'Test' }), NotFoundError
      )
    );
  });

  describe('DELETE /api/projects/<projectId>/tasks/<taskId>', () => {
    it('deletes the specified task', async () => {
      const project = await client.createProject({ name: 'Test Project' });
      const task = await client.createTask(project.id, { name: 'Test Task' });
      await client.deleteTask(project.id, task.id);
      await expectToThrowAsync(() => client.getTask(project.id, task.id), NotFoundError);
    });

    it('throws a NotFound error when the specified task does not exist', () =>
      expectToThrowAsync(() => client.deleteTask(333333333, 333333333), NotFoundError)
    );
  });
});
