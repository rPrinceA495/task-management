import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Panel, Dropdown, MenuItem } from 'react-bootstrap';
import Icon from 'react-fa';
import classNames from 'classnames';
import _ from 'lodash';
import Task from './Task.jsx';
import CreateProjectModal from './CreateProjectModal.jsx';
import CreateTaskForm from './CreateTaskForm.jsx';
import MenuToggle from './MenuToggle.jsx';
import Statuses from '../constants/Statuses';

@inject('projectStore')
@observer
export default class Project extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    projectStore: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isCreateProjectModalOpen: false,
      isExpanded: false,
    };
    this.handleProjectHeaderClick = ::this.handleProjectHeaderClick;
    this.handleCreateProjectClick = ::this.handleCreateProjectClick;
    this.createProject = ::this.createProject;
    this.closeCreateProjectModal = ::this.closeCreateProjectModal;
    this.handleDeleteClick = ::this.handleDeleteClick;
    this.createTask = ::this.createTask;
  }

  handleProjectHeaderClick(event) {
    event.preventDefault();
    if (!this.state.isExpanded) {
      this.props.project.tasks.load();
    }
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  handleCreateProjectClick(event) {
    event.stopPropagation();
    this.setState({
      isCreateProjectModalOpen: true,
    });
  }

  createProject({ name, isTemplate }) {
    this.closeCreateProjectModal();
    this.props.projectStore.createProject({
      name,
      templateId: this.props.project.id,
      isTemplate,
    });
  }

  closeCreateProjectModal() {
    this.setState({
      isCreateProjectModalOpen: false,
    });
  }

  handleDeleteClick(event) {
    event.stopPropagation();
    this.props.project.delete();
  }

  handleStatusClick(event, status) {
    event.stopPropagation();
    this.props.project.update({ status });
  }

  createTask(name) {
    this.props.project.createTask(name);
  }

  getMenuItems() {
    const items = [];
    if (this.props.project.isTemplate) {
      items.push(
        <MenuItem
          onClick={this.handleCreateProjectClick}
          key="create">
          Create Project
        </MenuItem>
      );
    } else {
      items.push(...this.getStatusMenuItems());
    }
    items.push(
      <MenuItem
        divider
        key="divider" />,
      <MenuItem
        onClick={this.handleDeleteClick}
        key="delete">
        Delete
      </MenuItem>,
    );
    return items;
  }

  getStatusMenuItems() {
    return Statuses.All
      .filter(status => status !== this.props.project.status)
      .map(status =>
        <MenuItem
          onClick={event => this.handleStatusClick(event, status)}
          key={status}>
          Mark as {_.capitalize(status)}
        </MenuItem>
      );
  }

  renderDropdown() {
    return (
      <Dropdown
        id={`project-menu-${this.props.project.id}`}
        pullRight>
        <MenuToggle bsRole="toggle" />
        <Dropdown.Menu>
          {this.getMenuItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderHeader() {
    return (
      <div
        onClick={this.handleProjectHeaderClick}
        className="project-header">
        <div className="project-icon">
          <Icon name={this.state.isExpanded ? 'chevron-down' : 'chevron-right'} />
        </div>
        <div className="project-header-main">
          <h4>{this.props.project.name}</h4>
          <p>0 active tasks</p>
        </div>
        <div>
          {this.renderDropdown()}
        </div>
      </div>
    );
  }

  renderBody() {
    const taskList = this.props.project.tasks;
    if (taskList.isLoading) {
      return null; // TODO: Show loader
    }
    if (!taskList.items) {
      return null;
    }
    return (
      <div className="project-body">
        <CreateTaskForm onCreate={this.createTask} />
        <ul className="task-list">
          {taskList.items.map(task =>
            <Task
              task={task}
              key={task.id} />
          )}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <li className={classNames('project', { expanded: this.state.isExpanded })}>
        {this.renderHeader()}
        {this.state.isExpanded && this.renderBody()}

        {this.props.project.isTemplate &&
          <CreateProjectModal
            isOpen={this.state.isCreateProjectModalOpen}
            onCreateProject={this.createProject}
            onClose={this.closeCreateProjectModal} />
        }
      </li>
    );
  }
}
