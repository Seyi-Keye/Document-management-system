import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { browserHistory } from 'react-router';
import { Input, Button, Row, Col } from 'react-materialize';


import { SignUpForm, stateToProps, dispatchToProps } from '../../app/components/signUp/signUp';

// describe('SignUp Component Test:', () => {
//   it('it', () => {
//   });
// });
describe('Describe <SignUp /> Component:', () => {
  let wrapper;
  const initialState = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    email: ''
  };
  beforeEach(() => {
    wrapper = shallow(<SignUpForm />);
  });

  it('should have state in props', () => {
    expect(wrapper.state()).to.deep.equal(initialState);
  });

  it('should have 6 input tags', () => {
    expect(wrapper.find(Input)).to.have.length(6);
  });

  it('should have 1 Col tags', () => {
    expect(wrapper.find(Col)).to.have.length(1);
  });

  it('should have 6 formControl classes', () => {
    expect(wrapper.find('.formControl')).to.have.length(6);
  });

  it('should fire handle change', () => {
    const handleChangeSpy = sinon.spy(SignUpForm.prototype, 'handleChange');

    wrapper = shallow(<SignUpForm />);

    wrapper.find(Input).first().simulate('change', { target: { name: 'firstname', value: 'wathever' } });
    expect(handleChangeSpy.calledOnce).to.equal(true);
    handleChangeSpy.reset();
  });

  it('should fire handle submit', () => {
    const handleSubmitSpy = sinon.spy(SignUpForm.prototype, 'handleSubmit');
    const browserHistorySpy = sinon.stub(browserHistory, 'push').callsFake(() => null);
    const handleSignupSpy = sinon.spy();
    wrapper = shallow(<SignUpForm handleSignUp={handleSignupSpy} />);

    wrapper.find('form').first().simulate('submit', { target: { name: 'firstname' }, preventDefault: () => null });
    expect(browserHistorySpy.calledOnce).to.equal(true);
    expect(handleSubmitSpy.calledOnce).to.equal(true);
    expect(handleSignupSpy.calledOnce).to.equal(true);
    browserHistorySpy.restore();
    handleSubmitSpy.reset();
  });

  it('should have 3 states in its props', () => {
    const state = { user: { currentUser: 'seyi', error: 'error', hasError: 'true' } };
    expect(stateToProps(state).user).to.equal(state.user.currentUser);
    expect(stateToProps(state).error).to.equal(state.user.error);
    expect(stateToProps(state).hasError).to.equal(state.user.hasError);
  });

  it('should dispatch to props', () => {
    const dispatch = () => null;
    expect(typeof dispatchToProps(dispatch).handleSignUp).to.equal('function');
    expect(dispatchToProps(dispatch).handleSignUp()).to.equal(null);
  });
});

