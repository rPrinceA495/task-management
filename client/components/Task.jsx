import React from 'react';
import { observer } from 'mobx-react';
import Icon from 'react-fa';
import classNames from 'classnames';
import { Dropdown, MenuItem, SafeAnchor } from 'react-bootstrap';
import Statuses from '../constants/Statuses';
import _ from 'lodash';

@observer
export default class Task extends React.Component {
  static propTypes = {
    task: React.PropTypes.object.isRequired,
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
    }
  }

  renderStatusIcon() {
    return (
      <SafeAnchor onClick={this.handleStatusIconClick}>
        <Icon
          name={this.getIconName()}
          className="text-muted"
          size="lg"
          fixedWidth />
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

  render() {
    return (
      <div className="table-layout">
        {this.props.task.project.isTemplate ||
          <div>
            {this.renderStatusIcon()}
          </div>
        }
        <div className="full-width">
          {this.renderName()}
        </div>
        <div>
          {this.renderDropdown()}
        </div>
      </div>
    );
  }
}
