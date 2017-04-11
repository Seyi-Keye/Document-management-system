import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { DocumentsComponent as Documents, stateToProps, dispatchToProps } from '../../app/components/document/Documents';

describe('Describe <Documents /> Component:', () => {
  let wrapper;
  const initialState = {
    documents: [],
  };

  it('should have 2 states in its props', () => {
    const decodedSpy = sinon
      .stub
      .callsFake(() => null);
    const decoded = {
      decodedSpy,
    };
    const state = {
      user: {
        decoded,
      },
      documents: document,
    };
    expect(stateToProps(state).user)
      .to
      .equal(user.decoded);
    expect(stateToProps(state).documents)
      .to
      .equal(state.documents);
  });

  it('should dispatch to props', () => {
    const dispatch = () => null;
    expect(typeof dispatchToProps(dispatch).handleFetchDocuments)
      .to
      .equal('function');
    expect(dispatchToProps(dispatch).handleFetchDocuments())
      .to
      .equal(null);
    expect(typeof dispatchToProps(dispatch).handleDeleteDocument)
      .to
      .equal('function');
    expect(dispatchToProps(dispatch).handleDeleteDocument())
      .to
      .equal(null);
  });

  it('should fire ComponentWillMount', () => {
    const someDocuments = [
      {
        title: 'ttt',
        content: 'hello',
        id: 4,
      },
    ];
    const componentWillMountSpy = sinon.spy(Documents.prototype, 'componentWillMount');
    const handleFetchDocumentsSpy = sinon.spy();
    wrapper = mount(<Documents
      handleFetchDocuments={handleFetchDocumentsSpy}
      documents={someDocuments}
    />);

    expect(componentWillMountSpy.calledOnce)
      .to
      .equal(true);
    expect(handleFetchDocumentsSpy.calledOnce)
      .to
      .equal(true);
    componentWillMountSpy.reset();
  });

  it('should fire handleDelete', () => {
    const handleDeleteSpy = sinon
      .stub(Documents.prototype, 'handleDelete')
      .callsFake(() => null);
    const documents = {
      documents: [
        {
          id: 2,
          title: 'Hello',
          content: 'Beautiful World',
          OwnerId: 7,
        },
      ],
    };
    const user = {
      UserId: 7,
    };
    const handleFetchDocumentsSpy = sinon.spy();
    wrapper = mount(<Documents
      handleDeleteDocument={handleDeleteSpy}
      handleFetchDocuments={handleFetchDocumentsSpy}
      documents={documents}
      user={user}
    />);
    wrapper
      .find('button')
      .last()
      .simulate('click', {
        target: {
          id: 2,
        },
        preventDefault: () => null,
      });
    expect(handleDeleteSpy.calledOnce)
      .to
      .equal(true);
    handleDeleteSpy.reset();
  });
});
