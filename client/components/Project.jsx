import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Panel, Dropdown, MenuItem, ListGroup, ListGroupItem } from 'react-bootstrap';
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
    this.handleProjectNameClick = ::this.handleProjectNameClick;
    this.handleCreateProjectClick = ::this.handleCreateProjectClick;
    this.createProject = ::this.createProject;
    this.closeCreateProjectModal = ::this.closeCreateProjectModal;
    this.handleDeleteClick = ::this.handleDeleteClick;
    this.createTask = ::this.createTask;
  }

  handleProjectNameClick(event) {
    event.preventDefault();
    if (!this.state.isExpanded) {
      this.props.project.tasks.load();
    }
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  handleCreateProjectClick() {
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

  handleDeleteClick() {
    this.props.project.delete();
  }

  handleStatusClick(status) {
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
          onClick={() => this.handleStatusClick(status)}
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
      <div className="table-layout">
        <div className="full-width">
          <a href="" onClick={this.handleProjectNameClick}>
            {this.props.project.name}
          </a>
        </div>
        <div>
          {this.renderDropdown()}
        </div>
      </div>
    );
  }

  renderTasks() {
    const taskList = this.props.project.tasks;
    if (taskList.isLoading) {
      return <div>Loading...</div>;
    }
    if (!taskList.items) {
      return null;
    }
    return (
      <ListGroup fill>
        <ListGroupItem>
          <CreateTaskForm onCreate={this.createTask} />
        </ListGroupItem>
        {taskList.items.map(task =>
          <ListGroupItem key={task.id}>
            <Task task={task} />
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }

  render() {
    return (
      <div>
        <Panel
          header={this.renderHeader()}
          bsStyle="info">
          {this.state.isExpanded && this.renderTasks()}
        </Panel>
        {this.props.project.isTemplate &&
          <CreateProjectModal
            isOpen={this.state.isCreateProjectModalOpen}
            onCreateProject={this.createProject}
            onClose={this.closeCreateProjectModal} />
        }
      </div>
    );
  }
}
