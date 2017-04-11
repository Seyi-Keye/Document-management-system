import { expect } from 'chai';
import * as ActionTypes from '../../app/actions/actionTypes';
import {
  documentRequest,
  documentCreateSuccessful,
  documentCreateError,
  fetchDocumentRequest,
  fetchDocumentSuccessful,
  fetchDocumentError,
  updateDocumentRequest,
  updateDocumentSuccessful,
  updateDocumentError,
  deleteDocumentRequest,
  deleteDocumentSuccessful,
  deleteDocumentError,
  searchDocumentRequest,
  searchDocumentSuccessful,
  searchDocumentError,
} from '../../app/actions/documentAction';

describe('User Action Unit Test:', () => {
  it('test documentRequest', () => {
    expect(documentRequest())
      .to
      .deep
      .equal({ type: ActionTypes.CREATE_DOCUMENT_REQUEST });
  });

  it('test documentCreateSuccessful', () => {
    expect(documentCreateSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.CREATE_DOCUMENT_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test documentCreateError', () => {
    expect(documentCreateError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.CREATE_DOCUMENT_SUCCESSFUL,
        error: {
          error: 1,
        },
      });
  });
});

describe('User Action Unit Test:', () => {
  it('test fetchDocumentRequest', () => {
    expect(fetchDocumentRequest())
      .to
      .deep
      .equal({ type: ActionTypes.FETCH_DOCUMENT_REQUEST });
  });

  it('test fetchDocumentSuccessful', () => {
    expect(fetchDocumentSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.FETCH_DOCUMENT_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test fetchDocumentError', () => {
    expect(fetchDocumentError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.FETCH_DOCUMENT_FAIL,
        error: {
          error: 1,
        },
      });
  });
});

describe('User Action Unit Test:', () => {
  it('test updateDocumentRequest', () => {
    expect(updateDocumentRequest())
      .to
      .deep
      .equal({ type: ActionTypes.UPDATE_DOCUMENT_REQUEST });
  });

  it('test updateDocumentSuccessful', () => {
    expect(updateDocumentSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.UPDATE_DOCUMENT_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test updateDocumentError', () => {
    expect(updateDocumentError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.UPDATE_DOCUMENT_FAIL,
        error: {
          error: 1,
        },
      });
  });
});

describe('User Action Unit Test:', () => {
  it('test deleteDocumentRequest', () => {
    expect(deleteDocumentRequest())
      .to
      .deep
      .equal({ type: ActionTypes.DELETE_DOCUMENT_REQUEST });
  });

  it('test deleteDocumentSuccessful', () => {
    expect(deleteDocumentSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.DELETE_DOCUMENT_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test deleteDocumentError', () => {
    expect(deleteDocumentError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.DELETE_DOCUMENT_FAIL,
        error: {
          error: 1,
        },
      });
  });
});

describe('User Action Unit Test:', () => {
  it('test searchDocumentRequest', () => {
    expect(searchDocumentRequest())
      .to
      .deep
      .equal({ type: ActionTypes.SEARCH_DOCUMENT_REQUEST });
  });

  it('test searchDocumentSuccessful', () => {
    expect(searchDocumentSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.SEARCH_DOCUMENT_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test searchDocumentError', () => {
    expect(searchDocumentError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.SEARCH_DOCUMENT_FAIL,
        error: {
          error: 1,
        },
      });
  });
});
