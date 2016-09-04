import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Navbar from './Navbar.jsx';

const App = observer(({ location, children }) =>
  <div>
    <Navbar activeHref={location.pathname} />
    <div className="container">
      {children}
    </div>
  </div>
);

export default App;
