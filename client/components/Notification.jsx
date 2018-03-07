import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Notification = ({ notification }) => (
  <Alert
    onDismiss={() => notification.close()}
    bsStyle={notification.isError ? 'danger' : 'success'}>
    {notification.message}
  </Alert>
);

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
