import ProjectService from '../../services/ProjectService';

export function* getProjectTemplates() {
  this.body = yield ProjectService.getProjectTemplates();
}
