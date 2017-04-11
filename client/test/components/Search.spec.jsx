import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { SearchComponent as Search } from '../../app/components/search/Search';

describe('Describe <Search /> Component:', () => {

  it('should fire ComponentWillMount', () => {
    const someDocuments = [
      {
        title: 'ttt',
        content: 'hello',
        id: 4,
      },
    ];
    const someUsers = [
      {
        username: 'ttt',
        lastname: 'hello',
        id: 4,
      },
    ];
    const componentWillMountSpy = sinon.spy(Search.prototype, 'componentWillMount');
    const searchQuerySpy = 'uigiugoi';
    const handleSearchUsersSpy = sinon.spy();
    const wrapper = mount(<Search
      handleSearchUsers={handleSearchUsersSpy}
      searchQuery={searchQuerySpy}
      documents={someDocuments}
      users={someUsers}
    />);

    expect(componentWillMountSpy.calledOnce)
      .to
      .equal(true);
    expect(handleSearchUsersSpy.calledOnce)
      .to
      .equal(true);
    componentWillMountSpy.reset();
  });
});
