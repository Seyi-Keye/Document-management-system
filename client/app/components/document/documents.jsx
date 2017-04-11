import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import jwt from 'jwt-decode';
import * as documentAction from '../../actions/documentAction';

export class DocumentsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
    };
    this.documentView = this.documentView.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.props.handleFetchDocuments();
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }

  handleDelete(e) {
    const id = e.target.id;
    this.props.handleDeleteDocument(id);
  }

  documentView(document) {
    return (
      <li key={document.id}>
        <div className="collapsible-header">
          <i className="material-icons">filter_drama</i>
          <h5>{document.title}</h5>
          { document.OwnerId === this.props.user.UserId ?
            <div>
              <button><Link to={`documents/${document.id}`}>
                <i className="material-icons">edit</i></Link>
              </button>
              <button id={document.id} onClick={this.handleDelete}>
                <i id={document.id} className="material-icons">delete</i>
              </button>
            </div>
            : ''
          }
        </div>
        <div className="collapsible-body">{document.content}</div>
      </li>
    );
  }
  render() {
    const { documents } = this.props.documents;
    if (documents) {
      return (
        <ul className="collapsible popout" data-collapsible="accordion">
          { documents.map(this.documentView) }
        </ul>
      );
    }
    return (
      <div>
        No Document Found
      </div>
    );
  }
}

DocumentsComponent.propTypes = {
  handleFetchDocuments: PropTypes.func,
  handleDeleteDocument: PropTypes.func,
  user: PropTypes.object,
  documents: PropTypes.object,
};

const stateToProps = (state, ownProps) => {
  const token = localStorage.getItem('token');
  const decoded = jwt(token);
  return { user: decoded, documents: state.document };
};

const dispatchToProps = (dispatch) => {
  return {
    handleFetchDocuments: () => dispatch(documentAction.handleFetchDocuments()),
    handleDeleteDocument: id => dispatch(documentAction.handleDeleteDocument(id)),
  };
};

export default connect(stateToProps, dispatchToProps)(DocumentsComponent);
