import { observable, action } from 'mobx';

export default class ListModel {
  @observable isLoading = false;
  @observable items = null;

  constructor(loader) {
    this.loader = loader;
  }

  @action async load() {
    if (this.items || this.isLoading) {
      return;
    }

    this.isLoading = true;
    try {
      this.items = await this.loader();
    } finally {
      this.isLoading = false;
    }
  }

  @action add(item) {
    if (this.items) {
      this.items.push(item);
    }
  }

  @action remove(item) {
    if (this.items) {
      this.items.remove(item);
    }
  }
}
