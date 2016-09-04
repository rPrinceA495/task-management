import Router from 'koa-router';
import { index } from './handlers/site';
import * as projects from './handlers/api/projects';
import errors from './handlers/api/errors';

function createApiRouter() {
  const router = new Router();
  router.use(errors);

  const projectRouter = new Router()
    .post('/', projects.createProject)
    .get('/:projectId(\\d+)', projects.getProject)
    .patch('/:projectId', projects.updateProject)
    .delete('/:projectId', projects.deleteProject)
    .get('/', projects.getProjects)
    .get('/:status(active|completed|canceled|paused)', projects.getProjectsByStatus)
    .get('/templates', projects.getProjectTemplates);

  const taskRouter = new Router()
    .post('/', projects.createTask)
    .get('/:taskId', projects.getTask)
    .patch('/:taskId', projects.updateTask)
    .delete('/:taskId', projects.deleteTask)
    .get('/', projects.getTasks);

  projectRouter.use('/:projectId/tasks', taskRouter.routes());

  router.use('/projects', projectRouter.routes());

  return router;
}

export default function configureRoutes(app) {
  const router = new Router();

  router.get('/', index);

  const apiRouter = createApiRouter();
  router.use('/api', apiRouter.routes());

  app.use(router.routes());
}
