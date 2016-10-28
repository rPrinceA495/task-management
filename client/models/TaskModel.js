import { observable, action } from 'mobx';
import _ from 'lodash';

export default class TaskModel {
  store;
  apiClient;
  notificationStore;
  project;
  id;
  @observable name;
  @observable status;
  @observable isUpdating = false;
  @observable isDeleting = false;

  constructor(
    store,
    apiClient,
    notificationStore,
    project,
    id,
    name,
    status
  ) {
    this.store = store;
    this.apiClient = apiClient;
    this.notificationStore = notificationStore;
    this.project = project;
    this.id = id;
    this.name = name;
    this.status = status;
  }

  @action async update(updates) {
    this.isUpdating = true;
    try {
      await this.apiClient.updateTask(this.project.id, this.id, updates);
      _.assign(this, updates);
    } catch (error) {
      console.log('Error while updating task.', error);
      this.notificationStore.error();
    } finally {
      this.isUpdating = false;
    }
  }

  @action async delete() {
    this.isDeleting = true;
    try {
      await this.apiClient.deleteTask(this.project.id, this.id);
      this.project.onTaskDeleted(this);
    } catch (error) {
      console.log('Error while deleting task.', error);
      this.notificationStore.error();
    } finally {
      this.isDeleting = false;
    }
  }

  toJS() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
    };
  }

  static fromJS(
    store,
    apiClient,
    notificationStore,
    project,
    source
  ) {
    return new TaskModel(
      store,
      apiClient,
      notificationStore,
      project,
      source.id,
      source.name,
      source.status
    );
  }
}
