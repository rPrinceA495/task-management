import { observable, action } from 'mobx';
import _ from 'lodash';
import TaskModel from './TaskModel';
import ListModel from './ListModel';

export default class ProjectModel {
  store;
  apiClient;
  notificationStore;
  id;
  @observable name;
  @observable description;
  @observable isTemplate;
  @observable status;
  @observable tasks;
  @observable isUpdating = false;
  @observable isDeleting = false;
  @observable isCreatingTask = false;

  constructor(
    store,
    apiClient,
    notificationStore,
    id,
    name,
    description,
    isTemplate,
    status
  ) {
    this.store = store;
    this.apiClient = apiClient;
    this.notificationStore = notificationStore;
    this.id = id;
    this.name = name;
    this.description = description;
    this.isTemplate = isTemplate;
    this.status = status;
    this.tasks = new ListModel(::this.fetchTasks);
  }

  @action async update(updates) {
    this.isUpdating = true;
    try {
      const originalStatus = this.status;
      await this.apiClient.updateProject(this.id, updates);
      _.assign(this, updates);
      if (updates.status && updates.status !== originalStatus) {
        this.store.onProjectStatusChanged(this, originalStatus, updates.status);
      }
    } catch (error) {
      console.log('Error while updating project.', error);
      this.notificationStore.error();
    } finally {
      this.isUpdating = false;
    }
  }

  @action async delete() {
    this.isDeleting = true;
    try {
      await this.apiClient.deleteProject(this.id);
      this.store.onProjectDeleted(this);
    } catch (error) {
      console.log('Error while deleting project.', error);
      this.notificationStore.error();
    } finally {
      this.isDeleting = false;
    }
  }

  @action async createTask(name) {
    this.isCreatingTask = true;
    try {
      const task = this.deserializeTask(await this.apiClient.createTask(this.id, { name }));
      this.tasks.add(task);
    } catch (error) {
      console.log('Error while creating task.', error);
      this.notificationStore.error();
    } finally {
      this.isCreatingTask = false;
    }
  }

  @action onTaskDeleted(task) {
    this.tasks.remove(task);
  }

  async fetchTasks() {
    const result = await this.apiClient.getTasks(this.id);
    return result.map(task => this.deserializeTask(task));
  }

  deserializeTask(task) {
    return TaskModel.fromJS(
      this.store,
      this.apiClient,
      this.notificationStore,
      this,
      task
    );
  }

  toJS() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      isTemplate: this.isTemplate,
      status: this.status,
    };
  }

  static fromJS(store, apiClient, notificationStore, source) {
    return new ProjectModel(
      store,
      apiClient,
      notificationStore,
      source.id,
      source.name,
      source.description,
      source.isTemplate,
      source.status
    );
  }
}
