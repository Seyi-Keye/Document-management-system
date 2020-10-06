import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, InputGroup, Row, FormControl } from 'react-bootstrap';

const Input = () => {
  return (
    <>
      <form onSubmit={this.handleSubmit}>
        <Row>
          {/* <InputGroup> */}
          <FormControl
            placeholder="Email"
            aria-label="email"
            type="email"
            // aria-describedby="basic-addon1"
          />
          <FormControl
            placeholder="Password"
            aria-label="password"
            // value={this.state.password}
            // onChange={this.handleChange}
            // aria-describedby="basic-addon1"
          />
          {/* </InputGroup> */}
          {/* name="email"
              className="formControl"
              type="email"
              label="Email"
              s={7}
              value={this.state.email}
              onChange={this.handleChange}
            /> */}
          {/* <InputGroup
              name="password"
              className="formControl"
              type="password"
              label="password"
              value={this.state.password}
              onChange={this.handleChange}
              s={7}
            /> */}
          <Col>
            <Button className="button" waves="light">
              Login
            </Button>
          </Col>
        </Row>
      </form>
      <Modal />
    </>
  );
};

export default Input;
