import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import {
  UpdateDocumentComponent as UpdateDocument,
  stateToProps,
  dispatchToProps } from '../../app/components/document/UpdateDocument';

const proxyquire = require('proxyquire');

describe('Describe <UpdateDocument /> Component:', () => {
  let wrapper;
  const initialState = {
    title: '',
    content: '',
    access: '',
  };
  beforeEach(() => {
    wrapper = shallow(<UpdateDocument />);
  });

  it('should have 3 states in its props', () => {
    const state = {
      user: 'decoded',
      document: {
        doc: [
          {
            title: 'Welcome',
            content: 'To Nigeria',
            access: 'private',
            id: 2,
          },
        ],
      },
    };
    proxyquire('jwt-decode', () => 'whaver');
    expect(stateToProps(state).document)
      .to
      .equal(state.document.doc);
  });

  it('should have state in props', () => {
    expect(wrapper.state())
      .to
      .deep
      .equal(initialState);
  });
  it('should dispatch to props', () => {
    const dispatch = () => null;
    expect(typeof dispatchToProps(dispatch).handleUpdateDocument)
      .to
      .equal('function');
    expect(dispatchToProps(dispatch).handleUpdateDocument())
      .to
      .equal(null);
  });
});
