import { observable, action } from 'mobx';
import _ from 'lodash';

export default class TaskModel {
  store;
  project;
  id;
  @observable name;
  @observable status;
  @observable isUpdating = false;
  @observable isDeleting = false;

  constructor(store, project, id, name, status) {
    this.store = store;
    this.project = project;
    this.id = id;
    this.name = name;
    this.status = status;
  }

  @action async update(updates) {
    this.isUpdating = true;
    try {
      await this.store.apiClient.updateTask(this.project.id, this.id, updates);
      _.assign(this, updates);
    } catch (error) {
      // TODO: handle error
      console.log(error);
    } finally {
      this.isUpdating = false;
    }
  }

  @action async delete() {
    this.isDeleting = true;
    try {
      await this.store.apiClient.deleteTask(this.project.id, this.id);
      this.project.onTaskDeleted(this);
    } catch (error) {
      // TODO: handle error
      console.log(error);
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

  static fromJS(store, project, source) {
    return new TaskModel(store, project, source.id, source.name, source.status);
  }
}
