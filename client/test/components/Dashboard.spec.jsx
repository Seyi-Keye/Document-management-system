import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Dashboard from '../../app/components/dashboard/Dashboard';
import { DocumentsComponent as Documents } from '../../app/components/document/Documents';

describe('Describe <Dashboard /> Component:', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard />);
  });
  it('should have 1 h1 tags', () => {
    expect(wrapper.find('h1'))
      .to
      .have
      .length(1);
  });
  it('should have 1 <Document/> App', () => {
    expect(wrapper.find(Documents))
      .to
      .have
      .length(1);
  });
  it('should have 1 div tags', () => {
    expect(wrapper.find('div'))
      .to
      .have
      .length(1);
  });
  it('should have text', () => {
    expect(wrapper.find('h1').text())
      .to
      .equal('All Documents...');
  });
});
