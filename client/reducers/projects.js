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
      return { ...state, items: action.result, isLoading: false };
    case ProjectActions.LOAD_PROJECTS_FAILURE:
      return { ...state, isLoading: false };
    case ProjectActions.CREATE_PROJECT_REQUEST:
      return state;
      // return { ...state, items: [ ...state.items, action.project ] };
    case ProjectActions.CREATE_PROJECT_SUCCESS:
      return { ...state, items: [...state.items, action.result] };
    case ProjectActions.CREATE_PROJECT_FAILURE:
      return state;
    default:
      return state;
  }
}
