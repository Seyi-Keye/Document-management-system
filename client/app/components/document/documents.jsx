import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router'
import ReactDOM from 'react-dom';
import jwt from 'jwt-decode';
import * as documentAction from '../../actions/documentAction.js';

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
    this.documentView = this.documentView.bind(this);
  };

  componentWillMount() {
    this.props.handleFetchDocuments();
    this.props.handleDeleteDocument();
  }

  componentDidUpdate() {
    $('.collapsible').collapsible();
  }

  documentView(document) {
    return (
      <li key={document.id}>
        <div className="collapsible-header">
          <i className="material-icons">filter_drama</i>
          <h5>{document.title}</h5>
          {console.log("doc ", document.OwnerId, "user ", this.props.user.UserId, 'decoded', this.state.decoded)}
          { document.OwnerId === this.props.user.UserId ?
          <div>
            <button><Link to={`updateDoc/${document.id}`}>
              <i className="material-icons">edit</i></Link>
            </button>
            <button onClick={handleDeleteDocument}><i className="material-icons">delete</i>
            </button>
          </div>
            : ''
          }
        </div>
        <div className="collapsible-body">{document.content}</div>
      </li>
    )
  }
  render() {
    let  {documents} = this.props;
    if (documents) {
      documents = documents[0];
       if (documents) {
          return (
          <ul className="collapsible popout" data-collapsible="accordion">
            { documents.map(this.documentView) }
          </ul>
        )
       }
    }
    return (
      <div>
        No Document Found
      </div>
    )
  }
}

const stateToProps = (state) => {
  const token = localStorage.getItem('token');
  const decoded = jwt(token);
  console.log('decoded', decoded);
  return { user: decoded, documents: state.document }
};

const dispatchToProps = (dispatch) => {
  return {
    handleFetchDocuments: () => dispatch(documentAction.handleFetchDocuments()),
    handleDeleteDocument: () => dispatch(documentAction.handleDeleteDocument({id: document.id}))
  };
}

export default connect(stateToProps, dispatchToProps)(Documents);
