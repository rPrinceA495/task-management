import { observable, action } from 'mobx';

export default class Notification {
  store;
  message;
  isError;

  constructor(store, message, isError) {
    this.store = store;
    this.message = message;
    this.isError = isError;
  }

  @action
  close() {
    this.store.onNotificationClosed(this);
  }
}
