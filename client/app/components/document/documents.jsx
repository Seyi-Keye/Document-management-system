import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import * as documentAction from '../../actions/documentAction.js';

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
    // this.documentView = this.documentView.bind(this);
  };

  componentWillMount() {
    this.props.handleFetchDocuments();
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
        N documents
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {documents: state.document}
};

const dispatchToProps = (dispatch) => {
  return {
    handleFetchDocuments: () => dispatch(documentAction.handleFetchDocuments())
  };
}

export default connect(stateToProps, dispatchToProps)(Documents);
