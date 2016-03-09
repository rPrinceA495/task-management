import ApiClient from '../api/ApiClient';

export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_FAILURE = 'LOAD_PROJECTS_FAILURE';

export function loadProjects() {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.projects.items || state.projects.isLoading) {
      return null;
    }

    dispatch({ type: LOAD_PROJECTS_REQUEST });
    try {
      const projects = await ApiClient.getProjects();
      dispatch({ type: LOAD_PROJECTS_SUCCESS, projects });
    } catch (error) {
      dispatch({ type: LOAD_PROJECTS_FAILURE, error })
    }
  };
}

export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

export function createProject(project) {
  return async dispatch => {
    dispatch({ type: CREATE_PROJECT_REQUEST, project });
    try {
      const createdProject = await ApiClient.createProject(project);
      dispatch({ type: CREATE_PROJECT_SUCCESS, project: createdProject });
    } catch (error) {
      dispatch({ type: CREATE_PROJECT_FAILURE, error });
    }
  };
}

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';

export function deleteProject(projectId) {
  return async dispatch => {
    dispatch({ type: DELETE_PROJECT_REQUEST, projectId });
    try {
      await ApiClient.deleteProject(projectId);
      dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
    } catch (error) {
      dispatch({ type: DELETE_PROJECT_FAILURE, projectId, error });
    }
  };
}
