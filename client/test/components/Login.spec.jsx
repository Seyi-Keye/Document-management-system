import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { browserHistory } from 'react-router';
import { Input, Col } from 'react-materialize';
import { dispatchToProps, Login, stateToProps } from '../../app/components/login/login';

describe('Describe <Login /> Component:', () => {
  let wrapper;
  const initialState = {
    email: '',
    password: ''
  };
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it('should have state in props', () => {
    expect(wrapper.state()).to.deep.equal(initialState);
  });
  it('should have 2 input tags', () => {
    expect(wrapper.find(Input)).to.have.length(2);
  });
  it('should have 1 Col tags', () => {
    expect(wrapper.find(Col)).to.have.length(1);
  });
  it('should have 2 formControl classes', () => {
    expect(wrapper.find('.formControl')).to.have.length(2);
  });
  it('should fire handle change', () => {
    const handleChangeSpy = sinon.spy(Login.prototype, 'handleChange');
    wrapper = shallow(<Login />);

    wrapper.find(Input).first().simulate('change', { target: { name: 'email', value: 'wathever@gmail.com' } });
    expect(handleChangeSpy.calledOnce).to.equal(true);
    handleChangeSpy.reset();
  });
  it('should fire handle submit', () => {
    const handleSubmitSpy = sinon.spy(Login.prototype, 'handleSubmit');
    const browserHistorySpy = sinon.stub(browserHistory, 'push').callsFake(() => null);
    const handleLoginSpy = sinon.spy();
    wrapper = shallow(<Login handleLogin={handleLoginSpy} />);

    wrapper.find('form').first().simulate('submit', { target: { name: 'email' }, preventDefault: () => null });
    expect(browserHistorySpy.calledOnce).to.equal(true);
    expect(handleSubmitSpy.calledOnce).to.equal(true);
    expect(handleLoginSpy.calledOnce).to.equal(true);
    browserHistorySpy.restore();
    handleSubmitSpy.reset();
  });
  it('should have a state in its props', () => {
    const state = { user: 'bihiuguggi' };
    expect(stateToProps(state).user).to.equal(state.user);
  });
  it('should dispatch to props', () => {
    const dispatch = () => null;
    expect(typeof dispatchToProps(dispatch).handleLogin).to.equal('function');
    expect(dispatchToProps(dispatch).handleLogin()).to.equal(null);
  });
});
