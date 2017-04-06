import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import toastr from 'toastr';
import { Input, Button, Row, Col, Icon } from 'react-materialize';

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
}

const mapStoreToProps = (store, ownProps) => {
  const searchQuery = ownProps.location.query.q;
  return {
    searchQuery,
    docs: store.doc,
    users: store.users
  };
};

const mapDispatchToProps = (dispatch) => {

export default connect(stateToProps, dispatchToProps) (Search);