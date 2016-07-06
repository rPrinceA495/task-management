import { observable, action } from 'mobx';

export default class TaskModel {
  store;
  project;
  id;
  @observable name;
  @observable status;
  @observable isUpdating = false;

  constructor(store, project, id, name, status) {
    this.store = store;
    this.project = project;
    this.id = id;
    this.name = name;
    this.status = status;
  }

  @action async updateStatus(value) {
    this.isUpdating = true;
    try {
      await this.store.apiClient.updateTask(this.project.id, this.id, {
        status: value,
      });
      this.status = value;
    } catch (error) {
      // TODO: handle error
      console.log(error);
    } finally {
      this.isUpdating = false;
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
