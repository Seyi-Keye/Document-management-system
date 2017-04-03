import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { handleDocuments } from '../../actions/documentAction.js';

class Documents extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.handleDocuments();
    $(document).ready(function(){
    $('.collapsible').collapsible();
  });
  }
  render() {
    console.log(this.props, "This is my props=====>");
    const loop = this.props;
      return (
        <ul className="collapsible popout" data-collapsible="accordion">
          {loop.documents.map(intake =>  <li>
              <div className="collapsible-header"><i className="material-icons">filter_drama</i><h5>Title:</h5> {intake[Object]}
              {/*<i className="material-icons">edit_note</i><i className="material-icons">delete</i>*/}
              </div>
              <div className="collapsible-body"><span>Content: {intake[Object]}</span></div>
            </li>  )}
            {/*<li>
              <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>*/}
        </ul>
      )
   }
}

const stateToProps = (state) => {
  console.log('state', state);
  return {
    documents: state.documents.documents,
  }
};

const dispatchToProps = (dispatch) => {
  return {
    handleDocuments: () => dispatch(handleDocuments())
  };
}

export default connect(stateToProps, dispatchToProps) (Documents);
