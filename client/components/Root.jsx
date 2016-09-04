import React from 'react';
import { observer, Provider } from 'mobx-react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import Filters from '../constants/Filters';
import App from './App.jsx';
import Projects from './Projects.jsx';

const Root = observer(props =>
  <Provider projectStore={props.projectStore}>
    <Router history={hashHistory}>
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
