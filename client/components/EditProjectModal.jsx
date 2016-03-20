import React from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

export default class EditProjectModal extends React.Component {
  static propTypes = {
    templates: React.PropTypes.array,
    show: React.PropTypes.bool,
    onSave: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      templateId: props.templates[0].id
    };
    this.handleNameChange = ::this.handleNameChange;
    this.handleTemplateChange = ::this.handleTemplateChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleTemplateChange(event) {
    this.setState({
      templateId: parseInt(event.target.value, 10)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSave({
      name: this.state.name,
      templateId: this.state.templateId
    });
  }

  renderTemplates() {
    return (
      <Input
        type="select"
        value={this.state.templateId}
        onChange={this.handleTemplateChange}
        label="Template">
        {this.props.templates.map(item =>
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

            {this.renderTemplates()}
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
