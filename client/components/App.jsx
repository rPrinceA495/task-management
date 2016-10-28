import React from 'react';
import { inject, observer } from 'mobx-react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Notification from './Notification.jsx';

const App = inject('notificationStore')(
  observer(({ location, notificationStore, children }) =>
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
  )
);

export default App;
