import ProjectService from '../../services/ProjectService';

export async function createProject(ctx) {
  ctx.body = await ProjectService.createProject(ctx.request.body);
}

export async function getProject(ctx) {
  ctx.body = await ProjectService.getProject(ctx.params.projectId, {
    includeTasks: ctx.query.includeTasks,
  });
}

export async function getProjects(ctx) {
  ctx.body = await ProjectService.getProjects({
    includeTasks: ctx.query.includeTasks,
  });
}

export async function updateProject(ctx) {
  await ProjectService.updateProject(ctx.params.projectId, ctx.request.body);
  ctx.status = 204;
}

export async function deleteProject(ctx) {
  await ProjectService.deleteProject(ctx.params.projectId);
  ctx.status = 204;
}

export async function createTask(ctx) {
  ctx.body = await ProjectService.createTask(ctx.params.projectId, ctx.request.body);
}

export async function getTask(ctx) {
  ctx.body = await ProjectService.getTask(ctx.params.projectId, ctx.params.taskId);
}

export async function getTasks(ctx) {
  ctx.body = await ProjectService.getTasks(ctx.params.projectId);
}

export async function updateTask(ctx) {
  await ProjectService.updateTask(
    ctx.params.projectId,
    ctx.params.taskId,
    ctx.request.body
  );
  ctx.status = 204;
}

export async function deleteTask(ctx) {
  await ProjectService.deleteTask(ctx.params.projectId, ctx.params.taskId);
  ctx.status = 204;
}
