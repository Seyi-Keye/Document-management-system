import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { browserHistory } from 'react-router';
import { Input } from 'react-materialize';

import { App } from '../../app/components/main';


describe('Describe <App /> Component:', () => {
  let wrapper;
  const initialState = { searchInput: '' };

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should have state in props', () => {
    expect(wrapper.state()).to.deep.equal(initialState);
  });
  it('should fire handleSearchChange', () => {
    const handleSearchChangeSpy = sinon.spy(App.prototype, 'handleSearchChange');

    wrapper = shallow(<App />);
    wrapper.find(Input).first().simulate('change', { target: { name: 'searchInput', value: 'to' } });
    expect(handleSearchChangeSpy.calledOnce).to.equal(true);
    handleSearchChangeSpy.reset();
  });

  it('should have 3 functions in props', () => {
    expect(wrapper.instance().handleLogout).to.exist;
  });

  it('should trigger handleSearchSubmit event on form submit', () => {
    const handleSubmitSpy = sinon.spy(App.prototype, 'handleSearchSubmit');
    const handleSearchUsersSpy = sinon.spy();
    const handleSearchDocumentsSpy = sinon.spy();
    const browserHistorySpy = sinon.stub(browserHistory, 'push').callsFake(() => null);
    const wrapper = shallow(<App handleSearchUsers={handleSearchUsersSpy} handleSearchDocuments={handleSearchDocumentsSpy}/>);
    wrapper.find('form').first().simulate('submit', { target: { name: 'searchInput' }, preventDefault: () => null});
    expect(browserHistorySpy.calledOnce).to.equal(true);
    expect(handleSubmitSpy.calledOnce).to.equal(true);
    expect(handleSearchUsersSpy.calledOnce).to.equal(true);
    expect(handleSearchDocumentsSpy.calledOnce).to.equal(true);
    browserHistorySpy.restore();
    handleSubmitSpy.reset();
  });
});