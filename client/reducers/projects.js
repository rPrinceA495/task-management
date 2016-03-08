import * as ProjectActions from '../actions/ProjectActions';

const initialState = {
  isLoading: false,
  items: null,
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case ProjectActions.LOAD_PROJECTS_REQUEST:
      return { ...state, isLoading: true };
    case ProjectActions.LOAD_PROJECTS_SUCCESS:
      return { ...state, items: action.projects, isLoading: false };
    case ProjectActions.LOAD_PROJECTS_FAILURE:
      return { ...state, isLoading: false };
    case ProjectActions.CREATE_PROJECT_SUCCESS:
      return { ...state, items: [...state.items, action.project] };
    case ProjectActions.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.projectId ? { ...item, isDeleting: true } : item
        ),
      };
    case ProjectActions.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.projectId),
      };
    case ProjectActions.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.projectId ? { ...item, isDeleting: false } : item
        ),
      };
    default:
      return state;
  }
}
