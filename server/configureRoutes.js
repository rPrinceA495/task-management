import Router from 'koa-router';
import { index } from './handlers/site';
import * as projects from './handlers/api/projects';

export default function configureRoutes(app) {
  const router = new Router();

  router.get('/', index);
  router.get('/api/projects', projects.getProjects);
  router.post('/api/projects', projects.createProject);
  router.delete('/api/projects/:id', projects.deleteProject);

  app.use(router.routes());
}
