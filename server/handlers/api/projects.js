import ProjectService from '../../services/ProjectService';

export function* createProject() {
  this.body = yield ProjectService.createProject(this.request.body);
}

export function* getProject() {
  this.body = yield ProjectService.getProject(this.params.projectId, {
    includeTasks: this.query.includeTasks,
  });
}

export function* getProjects() {
  this.body = yield ProjectService.getProjects({
    includeTasks: this.query.includeTasks,
  });
}

export function* updateProject() {
  yield ProjectService.updateProject(this.params.projectId, this.request.body);
  this.status = 204;
}

export function* deleteProject() {
  yield ProjectService.deleteProject(this.params.projectId);
  this.status = 204;
}

export function* createTask() {
  this.body = yield ProjectService.createTask(this.params.projectId, this.request.body);
}

export function* getTask() {
  this.body = yield ProjectService.getTask(this.params.projectId, this.params.taskId);
}

export function* getTasks() {
  this.body = yield ProjectService.getTasks(this.params.projectId);
}

export function* updateTask() {
  yield ProjectService.updateTask(
    this.params.projectId,
    this.params.taskId,
    this.request.body
  );
  this.status = 204;
}

export function* deleteTask() {
  yield ProjectService.deleteTask(this.params.projectId, this.params.taskId);
  this.status = 204;
}
