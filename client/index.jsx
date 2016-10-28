import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root.jsx';
import ApiClient from '../common/api/ApiClient';
import ProjectStore from './stores/ProjectStore';
import NotificationStore from './stores/NotificationStore';

import './assets/styles/main.scss';

const apiClient = new ApiClient('/');
const notificationStore = new NotificationStore();
const projectStore = new ProjectStore(apiClient, notificationStore);

render(
  <Root
    projectStore={projectStore}
    notificationStore={notificationStore}/>,
  document.getElementById('root')
);
