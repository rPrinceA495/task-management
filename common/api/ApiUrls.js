const api = '/api';

export const projects = `${api}/projects`;
export const project = projectId => `${projects}/${projectId}`;
export const projectsByStatus = status => `${projects}/${status}`;
export const projectTemplates = `${projects}/templates`;

export const tasks = projectId => `${project(projectId)}/tasks`;
export const task = (projectId, taskId) =>`${tasks(projectId)}/${taskId}`;
