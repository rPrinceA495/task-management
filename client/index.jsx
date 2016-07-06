import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import ApiClient from '../common/api/ApiClient';
import ProjectStore from './stores/ProjectStore';

import './styles.css';

const apiClient = new ApiClient('/');
const projectStore = new ProjectStore(apiClient);

render(<App projectStore={projectStore} />, document.getElementById('root'));
