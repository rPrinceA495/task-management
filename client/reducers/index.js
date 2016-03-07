import { combineReducers } from 'redux';
import projectTemplates from './projectTemplates';
import projects from './projects';

const rootReducer = combineReducers({
  projectTemplates,
  projects
});

export default rootReducer;
