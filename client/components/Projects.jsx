import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import Icon from 'react-fa';
import Project from './Project.jsx';
import ProjectsSubnav from './ProjectsSubnav.jsx';
import CreateProjectModal from './CreateProjectModal.jsx';
import Loader from './Loader.jsx';
import _ from 'lodash';

@inject('projectStore')
@observer
export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateProjectModalOpen: false,
    };
    this.handleCreateProjectClick = ::this.handleCreateProjectClick;
    this.createProject = ::this.createProject;
    this.closeCreateProjectModal = ::this.closeCreateProjectModal;
  }

  componentWillMount() {
    this.loadProjects(this.props.route.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.route.filter !== this.props.route.filter) {
      this.loadProjects(nextProps.route.filter);
    }
  }

  loadProjects(filter) {
    this.props.projectStore.loadProjects(filter);
  }

  handleCreateProjectClick() {
    this.setState({
      isCreateProjectModalOpen: true
    });
  }

  createProject(project) {
    this.closeCreateProjectModal();
    this.props.projectStore.createProject(project);
  }

  closeCreateProjectModal() {
    this.setState({
      isCreateProjectModalOpen: false,
    });
  }

  renderProjects() {
    const projectList = this.props.projectStore.getProjects(this.props.route.filter);

    if (projectList.isLoading) {
      return <Loader />;
    }

    if (!projectList.items) {
      return null;
    }

    return (
      <div>
        {projectList.items.map(project =>
          <Project
            key={project.id}
            project={project} />
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="subnav-container">
          <div className="clearfix">
            <div className="pull-left">
              <ProjectsSubnav />
            </div>

            <div className="pull-right">
              <Button
                onClick={this.handleCreateProjectClick}
                bsStyle="success">
                <Icon name="plus" /> Create Project
              </Button>
            </div>
          </div>
        </div>

        {this.renderProjects()}

        <CreateProjectModal
          isOpen={this.state.isCreateProjectModalOpen}
          onCreateProject={this.createProject}
          onClose={this.closeCreateProjectModal} />

      </div>
    );
  }
}
