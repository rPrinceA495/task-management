import React from 'react';
import { inject, observer } from 'mobx-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from './Notification';

const App = inject('notificationStore')(
  observer(({ location, notificationStore, children }) => (
    <div>
      <Navbar activeHref={location.pathname} />
      <div className="container">
        {notificationStore.notification &&
          <Notification notification={notificationStore.notification} />
        }
        {children}
      </div>
      <Footer />
    </div>
  ))
);

export default App;
