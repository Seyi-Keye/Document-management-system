import React, { PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import * as documentAction from '../../actions/documentAction';

const jwt = require('jwt-decode');

export class UpdateDocumentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.sampleSetSTate();
    $(document).ready(() => {
      $('select').material_select();
    });
  }
  sampleSetSTate() {
    this.setState({
      id: this.props.document.id,
      title: this.props.document.title,
      content: this.props.document.content,
      access: this.props.document.access,
    });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleUpdateDocument({ ...this.state });
    browserHistory.push('/dashboard');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card blue-grey darken-1">
              <div className="card-action grey" />
              <div className="card-content black-text">
                <div className="card-title s7">
                  <input
                    name="title" className="docTitle"
                    placeholder="Title Goes here" value={this.state.title}
                    onChange={this.handleChange}
                  />

                  <label htmlFor="Control your access">
                    Control your access</label>
                  <div className="input-field col s12">
                    <select
                      value={this.state.select}
                      className="browser-default" onChange={this.handleChange}
                      name="access" id="mySelectBox"
                    >
                      <option value="" disabled>Select an access level</option>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="role">Role</option>
                    </select>
                  </div>

                </div>
                <div className="docContent">
                  <textarea
                    name="content" value={this.state.content}
                    placeholder="Write Something" onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="card-action">
                <button onClick={this.handleSubmit}>
                  <i className="material-icons">save</i>Save</button>
                <button href="#"><i className="material-icons">
                  cancel</i><Link to="/dashboard"> Cancel</Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateDocumentComponent.propTypes = {
  document: PropTypes.func.isRequired,
  handleUpdateDocument: PropTypes.func.isRequired,
};

export const stateToProps = (state, ownProps) => {
  const token = localStorage.getItem('token');
  const decoded = jwt(token);
  const documentId = ownProps.params.id;
  const doc = _.findWhere(state.document[0], { id: parseInt(documentId, 10) });
  return {
    document: doc,
    user: decoded,
  };
};

export const dispatchToProps = dispatch => ({
  handleUpdateDocument: (id, title, content, access) =>
    dispatch(documentAction.handleUpdateDocument({ id, title, content, access })),
});

export default connect(stateToProps, dispatchToProps)(UpdateDocumentComponent);
