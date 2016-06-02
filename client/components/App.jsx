import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Navbar, Grid, Row, Col, Button, Nav, NavItem } from 'react-bootstrap';
import Icon from 'react-fa';
import Project from './Project.jsx';
import EditProjectModal from './EditProjectModal.jsx';
import Loader from './Loader.jsx';

@observer
export default class App extends Component {
  static propTypes = {
    projectStore: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showProjectModal: false
    };
    this.handleCreateProjectButtonClick = ::this.handleCreateProjectButtonClick;
    this.handleProjectSave = ::this.handleProjectSave;
    this.hideProjectModal = ::this.hideProjectModal;
  }

  componentDidMount() {
    this.props.projectStore.loadProjects();
  }

  handleCreateProjectButtonClick() {
    this.setState({
      showProjectModal: true
    });
  }

  handleProjectSave(name, templateId) {
    this.hideProjectModal();
    this.props.projectStore.createProject(name, templateId);
  }

  hideProjectModal() {
    this.setState({
      showProjectModal: false
    });
  }

  renderProjects() {
    return (
      <div className="container">
          <Button
            onClick={this.handleCreateProjectButtonClick}
            className="mb1"
            bsStyle="success">
            <Icon name="plus" /> Create Project
          </Button>
          <EditProjectModal
            templates={this.props.projectStore.projects.filter(project => project.isTemplate)}
            show={this.state.showProjectModal}
            onSave={this.handleProjectSave}
            onHide={this.hideProjectModal} />

          {this.props.projectStore.projects
            .filter(project => !project.isTemplate)
            .map(project =>
              <Project
                key={project.id}
                project={project} />
            )
          }

      </div>
    );
  }

  render() {
    const isLoading = this.props.projectStore.isLoading;
    return (
      <div>
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>Task Management</Navbar.Brand>
          </Navbar.Header>
          {/*
          <Nav pullRight>
            <NavItem><Icon name="cog" size="lg" /></NavItem>
          </Nav>
          */}
        </Navbar>
        {isLoading && <Loader />}
        {!isLoading && this.props.projectStore.projects && this.renderProjects()}
      </div>
    );
  }
}
