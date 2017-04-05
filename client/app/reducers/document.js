import * as ActionTypes from '../actions/actionTypes'

const documentsIntialState = {
  documents: [],
  isLoading: false,
  currentDocument: {},
  hasError: false,
}

export default function document(state = documentsIntialState, action) {
  switch(action.type) {
  case ActionTypes.CREATE_DOCUMENT_REQUEST:
    return {...state, isLoading: true, hasError: false }
  case ActionTypes.CREATE_DOCUMENT_SUCCESSFUL: {
    const documents = state.documents.slice();
    const newDocuments = [...documents, action.response];
    return {...state, documents: newDocuments, isLoading: false, hasError: false}
  }
  case ActionTypes.CREATE_DOCUMENT_FAIL:
     return {...state, isLoading: true, hasError: true }

  case ActionTypes.FETCH_DOCUMENT_REQUEST:
    const array = action.response ;
    return Object.assign({}, state, {isLoading: true});
  case ActionTypes.FETCH_DOCUMENT_SUCCESSFUL:
    return Object.assign({}, state, {documents: action.response, isLoading: false});
  case ActionTypes.FETCH_DOCUMENT_FAIL:
     return {...state, isLoading: false, hasError: true }

  case ActionTypes.UPDATE_DOCUMENT_REQUEST:
    return {...state, isLoading: true, hasError: false }
  case ActionTypes.UPDATE_DOCUMENT_SUCCESSFUL: {
    const newDocuments = state.documents.filter((document) => document.id !== action.response.id );
    return {...state, documents: newDocuments, isLoading: false, hasError: false}
  }
  case ActionTypes.UPDATE_DOCUMENT_FAIL:
     return {...state, isLoading: true, hasError: true }

  case ActionTypes.DELETE_DOCUMENT_REQUEST:
    return Object.assign({}, state, {isLoading: true});
  case ActionTypes.DELETE_DOCUMENT_SUCCESSFUL: {
    const newDocuments = state.documents.filter(document => {
      return document.id !== parseInt(action.response, 10);
    });
    return Object.assign({}, state, {documents: newDocuments});
  }
  case ActionTypes.DELETE_DOCUMENT_FAIL:
     return {...state, isLoading: true, hasError: true }

  default:
    return state;
  }
}