import React from 'react';
import { observer, Provider } from 'mobx-react';
import { Router, Route, IndexRedirect, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import Filters from '../constants/Filters';
import App from './App.jsx';
import Projects from './Projects.jsx';

const history = useRouterHistory(createHashHistory)();
const Root = observer(props =>
  <Provider
    projectStore={props.projectStore}
    notificationStore={props.notificationStore}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="projects" />
        <Route path="projects">
          <IndexRedirect to={Filters.Active} />
          {Filters.All.map(filter =>
            <Route
              path={filter}
              component={Projects}
              filter={filter}
              key={filter} />
          )}
        </Route>
      </Route>
    </Router>
  </Provider>
);

export default Root;
