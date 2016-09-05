import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Button, ButtonGroup } from 'react-bootstrap';
import Icon from 'react-fa';
import Project from './Project.jsx';
import CreateProjectModal from './CreateProjectModal.jsx';
import Loader from './Loader.jsx';
import Filters from '../constants/Filters';
import _ from 'lodash';

@inject('projectStore')
@withRouter
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

  renderSubNav() {
    return (
      <ButtonGroup>
        {Filters.All.map(filter => this.renderSubNavItem(filter))}
      </ButtonGroup>
    );
  }

  renderSubNavItem(filter) {
    const router = this.props.router;
    const path = `/projects/${filter}`;
    return (
      <Button
        href={router.createHref(path)}
        bsStyle={router.isActive(path) ? 'primary' : 'default'}
        key={filter}>
        {_.capitalize(filter)}
      </Button>
    );
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
              {this.renderSubNav()}
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
