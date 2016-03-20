import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navbar, Grid, Row, Col, Button, Nav, NavItem } from 'react-bootstrap';
import Icon from 'react-fa';
import Project from './Project.jsx';
import EditProjectModal from './EditProjectModal.jsx';
import Loader from 'react-loader';
import * as ProjectActions from '../actions/ProjectActions';

class App extends React.Component {
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
    this.props.projectActions.loadProjects();
  }

  handleCreateProjectButtonClick() {
    this.setState({
      showProjectModal: true
    });
  }

  handleProjectSave(project) {
    this.hideProjectModal();
    this.props.projectActions.createProject(project);
  }

  hideProjectModal() {
    this.setState({
      showProjectModal: false
    });
  }

  isLoading() {
    return this.props.projects.isLoading;
  }

  renderLoader() {
    return (
      <Loader
        lines={13}
        length={28}
        width={14}
        radius={42}
        color="#999999" />
    );
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
            templates={this.props.projects.items.filter(project => project.isTemplate)}
            show={this.state.showProjectModal}
            onSave={this.handleProjectSave}
            onHide={this.hideProjectModal} />

          {this.props.projects.items
            .filter(project => !project.isTemplate)
            .map(project =>
              <Project
                key={project.id}
                project={project}
                projectActions={this.props.projectActions} />
            )
          }

      </div>
    );
  }

  render() {
    const isLoading = this.isLoading();
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
        {isLoading && this.renderLoader()}
        {!isLoading && this.props.projects.items && this.renderProjects()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    projectActions: bindActionCreators(ProjectActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
