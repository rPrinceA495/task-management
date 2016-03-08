import React from 'react';
import { Panel, Label, ListGroup, ListGroupItem, Button, Dropdown, MenuItem, SafeAnchor } from 'react-bootstrap';
import Icon from 'react-fa';
import Task from './Task.jsx';

export default class Project extends React.Component {
  static propTypes = {
    project: React.PropTypes.object.isRequired,
    projectActions: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleDeleteClick = ::this.handleDeleteClick;
  }

  handleDeleteClick(event) {
    event.preventDefault();
    this.props.projectActions.deleteProject(this.props.project.id);
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
          <MenuItem>
            <Icon name="pencil" fixedWidth /> Edit
          </MenuItem>
          <MenuItem onClick={this.handleDeleteClick}>
            <Icon name="trash" fixedWidth /> Delete
          </MenuItem>
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
      <Panel
        header={this.renderHeader()}
        bsStyle="info">

        <ListGroup fill>
          {this.props.project.tasks && this.props.project.tasks.map(task =>
            <ListGroupItem key={task.id}>
              <Task task={task} />
            </ListGroupItem>
          )}
        </ListGroup>
      </Panel>
    );
  }
}
