import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import * as userAction from '../../actions/userAction';

export class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleLogin(this.state.email, this.state.password);
    browserHistory.push('/dashboard');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <InputGroup
            name="email"
            className="formControl"
            type="email"
            label="Email"
            s={7}
            value={this.state.email}
            onChange={this.handleChange}
          />
          <InputGroup
            name="password"
            className="formControl"
            type="password"
            label="password"
            value={this.state.password}
            onChange={this.handleChange}
            s={7}
          />
          <Col s={7}>
            <Button className="button" waves="light">
              Login
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

LoginComponent.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export const stateToProps = (state) => ({
  user: state.user,
});

export const dispatchToProps = (dispatch) => ({
  handleLogin: (email, password) =>
    dispatch(userAction.handleLogin(email, password)),
});
export default connect(stateToProps, dispatchToProps)(LoginComponent);
