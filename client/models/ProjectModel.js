import { observable, action } from 'mobx';
import TaskModel from './TaskModel';
import ApiClient from '../../common/api/ApiClient';

export default class ProjectModel {
  store;
  id;
  @observable name;
  @observable description;
  @observable isTemplate;
  @observable tasks;
  @observable isDeleting = false;

  constructor(store, id, name, description, isTemplate, tasks) {
    this.store = store;
    this.id = id;
    this.name = name;
    this.description = description;
    this.isTemplate = isTemplate;
    this.tasks = tasks;
  }

  @action async delete() {
    this.isDeleting = true;
    try {
      await this.store.apiClient.deleteProject(this.id);
      this.store.removeProject(this);
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
      description: this.description,
      isTemplate: this.isTemplate,
      tasks: this.tasks.map(task => task.toJS()),
    };
  }

  static fromJS(store, source) {
    const project = new ProjectModel(
      store,
      source.id,
      source.name,
      source.description,
      source.isTemplate,
      [],
    );
    project.tasks = source.tasks.map(task => TaskModel.fromJS(store, project, task));
    return project;
  }
}
