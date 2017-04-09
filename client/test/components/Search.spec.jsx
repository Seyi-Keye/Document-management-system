import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { browserHistory } from 'react-router';
import { Input, Col } from 'react-materialize';

import { Search, stateToProps, dispatchToProps } from '../../app/components/search/search';

describe('Describe <Search /> Component:', () => {
  let wrapper;
  // beforeEach(() => {
  //   wrapper = shallow(<Search />);
  // });

  it('should fire ComponentWillMount', () => {
    const someDocuments = [{title: 'ttt', content: 'hello', id: 4}];
    const someUsers = [{username: 'ttt', lastname: 'hello', id: 4}];
    const componentWillMountSpy = sinon.spy(Search.prototype, 'componentWillMount');
    const searchQuerySpy = 'uigiugoi';
    const handleSearchUsersSpy = sinon.spy();
    wrapper = mount(<Search handleSearchUsers={handleSearchUsersSpy} searchQuery={searchQuerySpy} documents={someDocuments} users={someUsers}/>);

    expect(componentWillMountSpy.calledOnce).to.equal(true);
    expect(handleSearchUsersSpy.calledOnce).to.equal(true);
    componentWillMountSpy.reset();
  });
});
