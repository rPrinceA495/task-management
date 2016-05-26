import * as ProjectActions from '../actions/ProjectActions';

function task(state, action) {
  switch (action.type) {
    case ProjectActions.UPDATE_TASK_STATUS.REQUEST:
      return { ...state, isUpdating: true };
    case ProjectActions.UPDATE_TASK_STATUS.SUCCESS:
      return { ...state, isUpdating: false, status: action.status };
    case ProjectActions.UPDATE_TASK_STATUS.FAILURE:
      return { ...state, isUpdating: false };
    default:
      return state;
  }
}

function project(state, action) {
  switch (action.type) {
    case ProjectActions.DELETE_PROJECT.REQUEST:
      return { ...state, isDeleting: true };
    case ProjectActions.DELETE_PROJECT.FAILURE:
      return { ...state, isDeleting: false };
    case ProjectActions.UPDATE_TASK_STATUS.REQUEST:
    case ProjectActions.UPDATE_TASK_STATUS.SUCCESS:
    case ProjectActions.UPDATE_TASK_STATUS.FAILURE:
      return {
        ...state,
        tasks: state.tasks.map(
          item => (item.id === action.taskId ? task(item, action) : item)
        ),
      };
    default:
      return state;
  }
}
const initialState = {
  isLoading: false,
  items: null,
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case ProjectActions.LOAD_PROJECTS.REQUEST:
      return { ...state, isLoading: true };
    case ProjectActions.LOAD_PROJECTS.SUCCESS:
      return { ...state, items: action.result, isLoading: false };
    case ProjectActions.LOAD_PROJECTS.FAILURE:
      return { ...state, isLoading: false };
    case ProjectActions.CREATE_PROJECT.SUCCESS:
      return { ...state, items: [...state.items, action.result] };
    case ProjectActions.DELETE_PROJECT.SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.projectId),
      };
    case ProjectActions.DELETE_PROJECT.REQUEST:
    case ProjectActions.DELETE_PROJECT.FAILURE:
    case ProjectActions.UPDATE_TASK_STATUS.REQUEST:
    case ProjectActions.UPDATE_TASK_STATUS.SUCCESS:
    case ProjectActions.UPDATE_TASK_STATUS.FAILURE:
      return {
        ...state,
        items: state.items.map(item =>
          (item.id === action.projectId ? project(item, action) : item)
        ),
      };
    default:
      return state;
  }
}
