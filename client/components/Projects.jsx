import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import Icon from 'react-fa';
import Project from './Project.jsx';
import ProjectsSubnav from './ProjectsSubnav.jsx';
import CreateProjectModal from './CreateProjectModal.jsx';
import Loader from './Loader.jsx';

@inject('projectStore')
@observer
export default class Projects extends Component {
  static propTypes = {
    projectStore: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

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
      isCreateProjectModalOpen: true,
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
      <ul className="project-list">
        {projectList.items.map(project =>
          <Project
            key={project.id}
            project={project} />
        )}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div className="projects-page-head">
          <ProjectsSubnav />
          <Button
            onClick={this.handleCreateProjectClick}
            bsStyle="success">
            <Icon name="plus" /> Create Project
          </Button>
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
