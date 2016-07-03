const api = '/api';

export const projects = () => `${api}/projects`;
export const project = projectId => `${projects()}/${projectId}`;

export const tasks = projectId => `${project(projectId)}/tasks`;
export const task = (projectId, taskId) =>`${tasks(projectId)}/${taskId}`;
