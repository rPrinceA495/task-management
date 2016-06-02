import ProjectService from '../../services/ProjectService';

export function* getProjects() {
  this.body = yield ProjectService.getProjects();
}

export function* createProject() {
  const project = this.request.body;
  this.body = yield ProjectService.createProject(project);
}

export function* deleteProject() {
  yield ProjectService.deleteProject(this.params.projectId);
  this.status = 204;
}

export function* updateTask() {
  yield ProjectService.updateTask(
    this.params.taskId,
    this.request.body,
  );
  this.status = 204;
}
