import * as ProjectActions from '../actions/ProjectActions';

const initialState = {
  isLoading: false,
  items: null,
};

export default function projectTemplates(state = initialState, action) {
  switch (action.type) {
    case ProjectActions.LOAD_PROJECT_TEMPLATES_REQUEST:
      return { ...state, isLoading: true };
    case ProjectActions.LOAD_PROJECT_TEMPLATES_SUCCESS:
      return { ...state, items: action.templates, isLoading: false };
    case ProjectActions.LOAD_PROJECT_TEMPLATES_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
