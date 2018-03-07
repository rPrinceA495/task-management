import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Button } from 'react-bootstrap';

export default class CreateTaskForm extends Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleNameChange = ::this.handleNameChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  canCreate() {
    return /\S/.test(this.state.name);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.canCreate()) {
      this.props.onCreate(this.state.name);
      this.setState({
        name: '',
      });
    }
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="create-task-form">
        <FormControl
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
          placeholder="Add new task" />

        <Button
          disabled={!this.canCreate()}
          type="submit"
          bsStyle="success">
          Add
        </Button>
      </form>
    );
  }
}
