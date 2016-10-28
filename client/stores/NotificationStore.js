import { observable, action } from 'mobx';
import NotificationModel from '../models/NotificationModel'

const timeout = 3000;
const defaultErrorMessage = 'An error occurred, please try again.';

export default class NotificationStore {
  @observable notification = null;

  @action success(message) {
    this.notification = new NotificationModel(this, message);
    setTimeout(() => this.notification.close(), timeout);
  }

  @action error(message = defaultErrorMessage) {
    this.notification = new NotificationModel(this, message, true);
  }

  @action onNotificationClosed(notification) {
    if (notification === this.notification) {
      this.notification = null;
    }
  }
}
