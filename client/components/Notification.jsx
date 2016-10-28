import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ notification }) =>
  <Alert
    onDismiss={() => notification.close()}
    bsStyle={notification.isError ? 'danger' : 'success'}>
    {notification.message}
  </Alert>;

export default Notification;
