import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Panel, Dropdown, MenuItem, SafeAnchor, Table } from 'react-bootstrap';
import Icon from 'react-fa';
import Task from './Task.jsx';
import CreateProjectModal from './CreateProjectModal.jsx';
import CreateTaskForm from './CreateTaskForm.jsx';
import Statuses from '../constants/Statuses';
import _ from 'lodash';

@inject('projectStore')
@observer
export default class Project extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showCreateProjectModal: false,
    };
    this.handleCreateProjectClick = ::this.handleCreateProjectClick;
    this.createProject = ::this.createProject;
    this.hideCreateProjectModal = ::this.hideCreateProjectModal;
    this.handleDeleteClick = ::this.handleDeleteClick;
    this.createTask = ::this.createTask;
  }

  handleCreateProjectClick() {
    this.setState({
      showCreateProjectModal: true,
    });
  }

  createProject({ name, isTemplate }) {
    this.hideCreateProjectModal();
    this.props.projectStore.createProject({
      name,
      templateId: this.props.project.id,
      isTemplate,
    });
  }

  hideCreateProjectModal() {
    this.setState({
      showCreateProjectModal: false,
    });
  }

  handleDeleteClick(event) {
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
      <Dropdown pullRight>
        <SafeAnchor bsRole="toggle">
          <Icon
            name="ellipsis-h"
            size="lg"/>
        </SafeAnchor>
        <Dropdown.Menu>
          {this.getMenuItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderHeader() {
    return (
      <div>
        {this.props.project.name}

        <div className="pull-right">
          {this.renderDropdown()}
        </div>

      </div>
    );
  }

  render() {
    return (
      <div>
        <Panel
          header={this.renderHeader()}
          bsStyle="info">

          <Table hover striped fill>
            <tbody>
              <tr>
                <td colSpan="2">
                  <CreateTaskForm onCreate={this.createTask} />
                </td>
              </tr>
              {this.props.project.tasks && this.props.project.tasks.map(task =>
                <Task
                  key={task.id}
                  task={task} />
              )}
            </tbody>
          </Table>
        </Panel>
        {this.props.project.isTemplate &&
          <CreateProjectModal
            show={this.state.showCreateProjectModal}
            onCreate={this.createProject}
            onHide={this.hideCreateProjectModal} />
        }
      </div>
    );
  }
}
