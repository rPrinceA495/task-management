import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import ProjectStore from './stores/ProjectStore';

import './styles.css';

const projectStore = new ProjectStore();
render(<App projectStore={projectStore} />, document.getElementById('root'));
