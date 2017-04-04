import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import jwt from 'jwt-decode';
import _ from 'underscore';
import { browserHistory, Link } from 'react-router';
import * as documentAction from '../../actions/documentAction.js';
import { Input} from 'react-materialize';

class UpdateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content:'',
      access: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount () {
    this.setState({
      id: this.props.document.id,
      title: this.props.document.title,
      content: this.props.document.content,
      access: this.props.document.access
    });

    $(document).ready(function() {
    $('select').material_select();
  });
  }

  handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
   }

   handleSubmit(event) {
    event.preventDefault();
     this.props.handleUpdateDocument({...this.state});
    browserHistory.push('/dashboard');
  }

   render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col s12">
          <div className="card blue-grey darken-1">
            <div className="card-action grey">
            </div>
            <div className="card-content black-text">
              <div className="card-title s7">
                <input name="title" className="docTitle"
                placeholder="Title Goes here" value={this.state.title}
              onChange={this.handleChange}/>

              <label>Control your access</label>
              <div className="input-field col s12">
                <select value={this.state.select} className="browser-default" onChange={this.handleChange} name="access" id="mySelectBox">
                  <option value="" disabled>Select an access level</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="role">Role</option>
                </select>
              </div>

              </div>
              <div className="docContent">
                <textarea  name="content" value={this.state.content} placeholder="Write Something" onChange={this.handleChange}></textarea>
              </div>
            </div>
            <div className="card-action">
              <button onClick={this.handleSubmit}><i className="material-icons">save</i>Save</button>
              <button href="#"><i className="material-icons">cancel</i><Link to="/dashboard"> Cancel</Link></button>

            </div>
          </div>
        </div>
      </div>
      </div>
      )
   }
}

const stateToProps = (state, ownProps) => {
  const token = localStorage.getItem('token');
  const decoded = jwt(token);
  const documentId = ownProps.params.id;
  const doc = _.findWhere(state.document[0], {id: parseInt(documentId, 10)});
  console.log(doc);
  return {
    document: doc,
    user: decoded
  }
};

const dispatchToProps = (dispatch) => {
  return {
    handleUpdateDocument: (id, title, content, access) =>
    dispatch(documentAction.handleUpdateDocument(id, title, content, access))
  };
}

export default connect(stateToProps, dispatchToProps) (UpdateDocument);
