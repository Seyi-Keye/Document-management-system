import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { browserHistory } from 'react-router';
import {
  AddDocument,
  stateToProps,
  dispatchToProps } from '../../app/components/document/AddDocument';

describe('Describe <AddDocument /> Component:', () => {
  let wrapper;
  const initialState = {
    title: '',
    content: '',
    access: 'public',
  };
  beforeEach(() => {
    wrapper = shallow(<AddDocument />);
  });

  it('should have state in props', () => {
    expect(wrapper.state())
      .to
      .deep
      .equal(initialState);
  });

  it('should have 1 input tags', () => {
    expect(wrapper.find('input'))
      .to
      .have
      .length(1);
  });

  it('should have 1 textarea tags', () => {
    expect(wrapper.find('textarea'))
      .to
      .have
      .length(1);
  });

  it('should have 1 select tags', () => {
    expect(wrapper.find('select'))
      .to
      .have
      .length(1);
  });

  it('should have 2 button tags', () => {
    expect(wrapper.find('button'))
      .to
      .have
      .length(2);
  });

  it('should have 2 Col tags', () => {
    expect(wrapper.find('.col'))
      .to
      .have
      .length(2);
  });

  it('should fire handle change', () => {
    const handleChangeSpy = sinon.spy(AddDocument.prototype, 'handleChange');

    wrapper = shallow(<AddDocument />);

    wrapper
      .find('input')
      .first()
      .simulate('change', {
        target: {
          name: 'title',
          value: 'wathever',
        },
      });
    expect(handleChangeSpy.calledOnce)
      .to
      .equal(true);
    handleChangeSpy.reset();
  });

  it('should fire handleSubmit', () => {
    const handleSubmitSpy = sinon.spy(AddDocument.prototype, 'handleSubmit');
    const browserHistorySpy = sinon
      .stub(browserHistory, 'push')
      .callsFake(() => null);
    const handleCreateDocumentSpy = sinon.spy();
    wrapper = shallow(<AddDocument
      handleCreateDocument={handleCreateDocumentSpy}
    />);

    wrapper
      .find('button')
      .first()
      .simulate('click', {
        target: {
          name: 'title',
        },
        preventDefault: () => null,
      });
    expect(browserHistorySpy.calledOnce)
      .to
      .equal(true);
    expect(handleSubmitSpy.calledOnce)
      .to
      .equal(true);
    expect(handleCreateDocumentSpy.calledOnce)
      .to
      .equal(true);
    browserHistorySpy.restore();
    handleSubmitSpy.reset();
  });
  it('should have a state in its props', () => {
    const state = {
      document: {
        document: [
          {
            title: 'good',
            content: 'morning',
            access: 'public',
          },
        ],
      },
    };
    expect(stateToProps(state).documents)
      .to
      .deep
      .equal(state.document);
  });
  it('should dispatch to props', () => {
    const dispatch = () => null;
    expect(typeof dispatchToProps(dispatch).handleCreateDocument)
      .to
      .equal('function');
    expect(dispatchToProps(dispatch).handleCreateDocument())
      .to
      .equal(null);
  });
});
