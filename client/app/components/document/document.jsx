import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { handleNewDocument } from '../../actions/documentAction.js';
import { Input} from 'react-materialize';

class AddDocument extends React.Component {
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

  handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
   }

   handleSubmit(event) {
    event.preventDefault();
    this.props.handleNewDocument(this.state.title, this.state.content,
    this.state.access);
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
              <div className="card-title">
                <input name="title" className="docTitle s7"
                placeholder="Title Goes here" value={this.state.title}
              onChange={this.handleChange}/></div>
              <div className="docContent">
                <textarea  name="content" placeholder="Write Something" onChange={this.handleChange}></textarea>
              </div>
            </div>
            <div className="card-action">
              <button onClick={this.handleSubmit}><i className="material-icons">save</i>Save</button>
              <button href="#"><i className="material-icons">delete</i>Delete</button>
            </div>
          </div>
        </div>
      </div>
        <a href="#!" className="waves-effect waves-circle waves-lightbtn-floating secondary-content"><i className="material-icons">note_add</i></a>
      </div>
      )
   }
}

const stateToProps = (state) => {
  return {
    documents: state.documents,
  }
};

const dispatchToProps = (dispatch) => {
  return {
    handleNewDocument: (title, content, access) => dispatch(handleNewDocument(title, content, access))
  };
}

export default connect(stateToProps, dispatchToProps) (AddDocument);
