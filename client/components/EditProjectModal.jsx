import React from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

export default class EditProjectModal extends React.Component {
  static propTypes = {
    projectTemplates: React.PropTypes.array,
    show: React.PropTypes.bool,
    onSave: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      projectTemplateId: props.projectTemplates[0].id
    };
    this.handleNameChange = ::this.handleNameChange;
    this.handleProjectTemplateChange = ::this.handleProjectTemplateChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleProjectTemplateChange(event) {
    this.setState({
      projectTemplateId: parseInt(event.target.value, 10)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSave({
      name: this.state.name,
      projectTemplateId: this.state.projectTemplateId
    });
  }

  renderProjectTemplates() {
    return (
      <Input
        type="select"
        value={this.state.projectTemplateId}
        onChange={this.handleProjectTemplateChange}
        label="Template">
        {this.props.projectTemplates.map(item =>
          <option
            key={item.id}
            value={item.id}>
            {item.name}
          </option>
        )}
      </Input>
    );
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}>

        <form onSubmit={this.handleSubmit}>

          <Modal.Header closeButton>
            <Modal.Title>Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
              label="Name" />

            {this.renderProjectTemplates()}
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              bsStyle="primary">
              Save
            </Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>

        </form>
      </Modal>
    );
  }
}
