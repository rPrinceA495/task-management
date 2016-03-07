import ApiClient from '../api/ApiClient';

export const LOAD_PROJECT_TEMPLATES_REQUEST = "LOAD_PROJECT_TEMPLATES_REQUEST";
export const LOAD_PROJECT_TEMPLATES_SUCCESS = "LOAD_PROJECT_TEMPLATES_SUCCESS";
export const LOAD_PROJECT_TEMPLATES_FAILURE = "LOAD_PROJECT_TEMPLATES_FAILURE";

export function loadProjectTemplates() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.projectTemplates.items || state.projectTemplates.isLoading) {
      return null;
    }

    dispatch({ type: LOAD_PROJECT_TEMPLATES_REQUEST });
    return ApiClient
      .getProjectTemplates()
      .then(result => dispatch({ type: LOAD_PROJECT_TEMPLATES_SUCCESS, result }))
      .catch(error => dispatch({ type: LOAD_PROJECT_TEMPLATES_FAILURE, error }));
  };
}

export const LOAD_PROJECTS_REQUEST = "LOAD_PROJECTS_REQUEST";
export const LOAD_PROJECTS_SUCCESS = "LOAD_PROJECTS_SUCCESS";
export const LOAD_PROJECTS_FAILURE = "LOAD_PROJECTS_FAILURE";

export function loadProjects() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.projects.items || state.projects.isLoading) {
      return null;
    }

    dispatch({ type: LOAD_PROJECTS_REQUEST });
    return ApiClient
      .getProjects()
      .then(result => dispatch({ type: LOAD_PROJECTS_SUCCESS, result }))
      .catch(error => dispatch({ type: LOAD_PROJECTS_FAILURE, error }));
  };
}

export const CREATE_PROJECT_REQUEST = "CREATE_PROJECT_REQUEST";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";

export function createProject(project) {
  return (dispatch, getState) => {
    // dispatch({ type: CREATE_PROJECT_REQUEST, project });

    return ApiClient
      .createProject(project)
      .then(result => dispatch({ type: CREATE_PROJECT_SUCCESS, result }))
      .catch(error => dispatch({ type: CREATE_PROJECT_FAILURE, error }));
  };
}
