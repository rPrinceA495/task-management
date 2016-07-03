import Router from 'koa-router';
import { index } from './handlers/site';
import * as projects from './handlers/api/projects';
import errors from './handlers/api/errors';

function createApiRouter() {
  const router = new Router();
  router.use(errors);

  const projectRouter = new Router()
    .post('/', projects.createProject)
    .get('/:projectId', projects.getProject)
    .get('/', projects.getProjects)
    .patch('/:projectId', projects.updateProject)
    .delete('/:projectId', projects.deleteProject);

  const taskRouter = new Router()
    .post('/', projects.createTask)
    .get('/:taskId', projects.getTask)
    .get('/', projects.getTasks)
    .patch('/:taskId', projects.updateTask)
    .delete('/:taskId', projects.deleteTask);

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
