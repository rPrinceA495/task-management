import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root.jsx';
import ApiClient from '../common/api/ApiClient';
import ProjectStore from './stores/ProjectStore';

import './styles.css';

const apiClient = new ApiClient('/');
const projectStore = new ProjectStore(apiClient);

render(<Root projectStore={projectStore} />, document.getElementById('root'));
