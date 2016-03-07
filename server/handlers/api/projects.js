import ProjectService from '../../services/ProjectService';

export function* getProjects() {
  this.body = yield ProjectService.getProjects();
}

export function* createProject() {
  const project = this.request.body;
  this.body = yield ProjectService.createProject(project);
}

export function* deleteProject() {
  const projectID = this.params.id;
  yield ProjectService.deleteProject(projectID);
  this.status = 204;
}
