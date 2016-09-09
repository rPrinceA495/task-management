import React from 'react';
import { observer } from 'mobx-react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const App = observer(({ location, children }) =>
  <div>
    <Navbar activeHref={location.pathname} />
    <div className="container">
      {children}
    </div>
    <Footer />
  </div>
);

export default App;
