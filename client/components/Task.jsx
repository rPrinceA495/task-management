import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Icon from 'react-fa';
import { Dropdown, MenuItem, SafeAnchor } from 'react-bootstrap';
import _ from 'lodash';
import MenuToggle from './MenuToggle.jsx';
import Statuses from '../constants/Statuses';

@observer
export default class Task extends React.Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleStatusIconClick = ::this.handleStatusIconClick;
    this.handleDeleteClick = ::this.handleDeleteClick;
  }

  handleStatusIconClick() {
    this.props.task.update({
      status: this.props.task.status === Statuses.Active ?
        Statuses.Completed :
        Statuses.Active,
    });
  }

  handleDeleteClick() {
    this.props.task.delete();
  }

  handleStatusClick(status) {
    this.props.task.update({ status });
  }

  getIconName() {
    switch (this.props.task.status) {
      case Statuses.Active:
        return 'circle-o';
      case Statuses.Completed:
        return 'check-circle-o';
      case Statuses.Canceled:
        return 'stop-circle-o';
      case Statuses.Paused:
        return 'pause-circle-o';
      default:
        return null;
    }
  }

  renderStatusIcon() {
    return (
      <SafeAnchor onClick={this.handleStatusIconClick}>
        <Icon
          name={this.getIconName()}
          className="text-muted" />
      </SafeAnchor>
    );
  }

  renderName() {
    if (this.props.task.status === Statuses.Completed ||
      this.props.task.status === Statuses.Canceled) {
      return (
        <s className="text-muted">
          {this.props.task.name}
        </s>
      );
    }
    return this.props.task.name;
  }

  renderDetails() {
    return (
      <p>
        <Icon name="user-circle" /> Not assigned
        {/* <li><Icon name="calendar-o" /> Due date</li> */}
      </p>
    );
  }

  getMenuItems() {
    const items = [];
    if (!this.props.task.project.isTemplate) {
      items.push(...this.getStatusMenuItems());
      items.push(
        <MenuItem
          divider
          key="divider" />
      );
    }
    items.push(
      <MenuItem
        onClick={this.handleDeleteClick}
        key="delete">
        Delete
      </MenuItem>
    );
    return items;
  }

  getStatusMenuItems() {
    return Statuses.All
      .filter(status => status !== this.props.task.status)
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
        id={`task-menu-${this.props.task.id}`}
        pullRight>
        <MenuToggle bsRole="toggle" />
        <Dropdown.Menu>
          {this.getMenuItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    return (
      <li className="task">
        {this.props.task.project.isTemplate ||
          <div className="task-icon">
            {this.renderStatusIcon()}
          </div>
        }
        <div className="task-main">
          <h5>{this.renderName()}</h5>
          {this.renderDetails()}
        </div>
        <div>
          {this.renderDropdown()}
        </div>
      </li>
    );
  }
}
