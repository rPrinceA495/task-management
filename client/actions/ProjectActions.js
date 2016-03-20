import ApiClient from '../api/ApiClient';
import { createAsyncTypes, createAsyncAction} from './ActionUtils';

export const LOAD_PROJECTS = createAsyncTypes('LOAD_PROJECTS');

export const loadProjects = () => createAsyncAction(
  () => ApiClient.getProjects(),
  LOAD_PROJECTS,
  {},
  state => !state.projects.items && !state.projects.isLoading,
);

export const CREATE_PROJECT = createAsyncTypes('CREATE_PROJECT');

export const createProject = project => createAsyncAction(
  () => ApiClient.createProject(project),
  CREATE_PROJECT,
  { project },
);

export const DELETE_PROJECT = createAsyncTypes('DELETE_PROJECT');

export const deleteProject = projectId => createAsyncAction(
  () => ApiClient.deleteProject(projectId),
  DELETE_PROJECT,
  { projectId },
);

export const UPDATE_TASK_STATUS = createAsyncTypes('UPDATE_TASK_STATUS');

export const updateTaskStatus = (projectId, taskId, status) => createAsyncAction(
  () => ApiClient.updateTask(projectId, taskId, { status }),
  UPDATE_TASK_STATUS,
  { projectId, taskId, status },
);
