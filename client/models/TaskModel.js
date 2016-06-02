import { observable, action } from 'mobx';
import ApiClient from '../api/ApiClient';

export default class TaskModel {
  id;
  @observable name;
  @observable status;
  @observable isUpdating = false;

  constructor(id, name, status) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  @action async updateStatus(value) {
    this.isUpdating = true;
    try {
      await ApiClient.updateTask(this.id, {
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

  static fromJS(source) {
    return new TaskModel(source.id, source.name, source.status);
  }
}
