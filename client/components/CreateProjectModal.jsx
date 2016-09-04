import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

@observer
export default class CreateProjectModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onCreate: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isTemplate: false,
    };
    this.handleShow = ::this.handleShow;
    this.handleNameChange = ::this.handleNameChange;
    this.handleIsTemplateChange = ::this.handleIsTemplateChange;
    this.handleFormSubmit = ::this.handleFormSubmit;
    this.handleCreateClick = ::this.create;
  }

  handleShow() {
    // TODO: Set focus to Name field
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleIsTemplateChange(event) {
    this.setState({
      isTemplate: event.target.checked,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.canCreate()) {
      this.create();
    }
  }

  canCreate() {
    return /\S/.test(this.state.name);
  }

  create() {
    const { name, isTemplate } = this.state;
    this.props.onCreate({ name, isTemplate });
  }

  render() {
    return (
        <Modal
          show={this.props.show}
          onShow={this.handleShow}
          onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Create Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleFormSubmit}>
              <FormGroup controlId="projectName">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={this.handleNameChange} />
              </FormGroup>
              <Checkbox
                checked={this.state.isTemplate}
                onChange={this.handleIsTemplateChange}>
                This is a project template
              </Checkbox>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.handleCreateClick}
              disabled={!this.canCreate()}
              bsStyle="primary">
              Create
            </Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
