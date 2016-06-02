import React from 'react';
import { observer } from 'mobx-react';
import Icon from 'react-fa';
import { SplitButton, MenuItem, ButtonGroup, Button } from 'react-bootstrap';

@observer
export default class Task extends React.Component {
  static propTypes = {
    task: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
    this.handleMouseEnter = ::this.handleMouseEnter;
    this.handleMouseLeave = ::this.handleMouseLeave;
    this.handleStatusButtonClick = ::this.handleStatusButtonClick;
    this.handleStatusMenuItemSelect = ::this.handleStatusMenuItemSelect;
  }

  handleMouseEnter() {
    this.setState({
      isSelected: true
    });
  }

  handleMouseLeave() {
    this.setState({
      isSelected: false
    });
  }

  handleStatusButtonClick() {
    this.props.task.updateStatus('completed');
  }

  handleStatusMenuItemSelect(eventKey, event) {
    this.props.task.updateStatus(eventKey);
  }

  getTextClassName() {
    if (this.props.task.isUpdating) {
      return 'text-muted';
    }
    switch (this.props.task.status) {
      case 'active':
        return 'text-info';
      case 'completed':
        return 'text-success';
      case 'cancelled':
        return 'text-muted';
    }
  }

  getIconName() {
    if (this.props.task.isUpdating) {
      return 'spinner';
    }
    switch (this.props.task.status) {
      case 'active':
        return 'minus';
      case 'completed':
        return 'check';
      case 'cancelled':
        return 'ban';
    }
  }

  renderIcon() {
    return (
      <Icon
        name={this.getIconName()}
        spin={this.props.task.isUpdating}
        fixedWidth />
    );
  }

  render() {
    return (
      <tr
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <td className={this.getTextClassName()}>
          {this.renderIcon()}
          {' '}
          {this.props.task.name}
        </td>
        {/* <td><Icon name="user" fixedWidth /> </td>*/}
        <td className="text-right">
            Mark as
            {' '}
            {/*
            <ButtonGroup>
              <Button>Completed</Button>
              <Button>Cancelled</Button>
            </ButtonGroup>
            */}

            <SplitButton
              title="Completed"
              onClick={this.handleStatusButtonClick}
              onSelect={this.handleStatusMenuItemSelect}>
              <MenuItem eventKey="completed">Completed</MenuItem>
              <MenuItem eventKey="cancelled">Cancelled</MenuItem>
            </SplitButton>

        </td>
      </tr>
    );
  }
}
