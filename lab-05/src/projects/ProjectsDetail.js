import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ProjectForm from './ProjectForm';
import * as ProjectActions from '../actions/ProjectActionCreator';

class ProjectsDetail extends React.Component {
  handleSave = (values) => {
    const { onCreate, onUpdate, history } = this.props;

    const result = values._id ? onUpdate(values) : onCreate(values);
    result.then(() => {
      history.push('/projects');
    });
  };

  render() {
    return (
      <div>
        <h1>Projects Detail</h1>
        <ProjectForm
          project={this.props.project}
          actions={this.props.actions}
          handleSave={this.handleSave}
        />
      </div>
    );
  }
}

ProjectsDetail.propTypes = {
  project: PropTypes.object.isRequired,
  history: PropTypes.object,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
};

ProjectsDetail.defaultProps = {
  project: {}
};

const mapStateToProps = (state, props) => {
  const { match } = props;
  const { _id } = match.params;
  return {
    project: state.projects.data.find(project => project._id === _id)
  };
};

const mapDispatchToProps = {
  onCreate: ProjectActions.createProject,
  onUpdate: ProjectActions.updateProject
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsDetail));
