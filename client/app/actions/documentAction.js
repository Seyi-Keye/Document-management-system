import request from 'superagent';
import jwt from 'jwt-decode';
import toastr from 'toastr';
import * as ActionTypes from './actionTypes';
import { errorMessage } from '../utils/utils';

export const documentRequest = () => ({
  type: ActionTypes.CREATE_DOCUMENT_REQUEST });
export const documentCreateSuccessful = documents => ({
  type: ActionTypes.CREATE_DOCUMENT_SUCCESSFUL, response: documents });
export const documentCreateError = error => ({
  type: ActionTypes.CREATE_DOCUMENT_SUCCESSFUL, error });

export const fetchDocumentRequest = () => ({
  type: ActionTypes.FETCH_DOCUMENT_REQUEST });
export const fetchDocumentSuccessful = documents => ({
  type: ActionTypes.FETCH_DOCUMENT_SUCCESSFUL, response: documents });
export const fetchDocumentError = error => ({
  type: ActionTypes.FETCH_DOCUMENT_FAIL, error });

export const updateDocumentRequest = () => ({
  type: ActionTypes.UPDATE_DOCUMENT_REQUEST });
export const updateDocumentSuccessful = documents => ({
  type: ActionTypes.UPDATE_DOCUMENT_SUCCESSFUL, response: documents });
export const updateDocumentError = error => ({
  type: ActionTypes.UPDATE_DOCUMENT_FAIL, error });

export const deleteDocumentRequest = () => ({
  type: ActionTypes.DELETE_DOCUMENT_REQUEST });
export const deleteDocumentSuccessful = id => ({
  type: ActionTypes.DELETE_DOCUMENT_SUCCESSFUL, response: id });
export const deleteDocumentError = error => ({
  type: ActionTypes.DELETE_DOCUMENT_FAIL, error });

export const searchDocumentRequest = () => ({
  type: ActionTypes.SEARCH_DOCUMENT_REQUEST });
export const searchDocumentSuccessful = documents => ({
  type: ActionTypes.SEARCH_DOCUMENT_SUCCESSFUL, response: documents });
export const searchDocumentError = error => ({
  type: ActionTypes.SEARCH_DOCUMENT_FAIL, error });

export const handleCreateDocument = (title, content, access) => (dispatch) => {
  dispatch(documentRequest());
  const token = localStorage.getItem('token');
  const decoded = jwt(token);
  const OwnerId = decoded.UserId;
  return request
      .post('/api/v1/documents')
      .set({ 'x-access-token': token })
      .send({ title, content, access, OwnerId })
      .end((error, response) => {
        if (error) {
          const errorMsg = errorMessage(error);
          toastr.error(errorMsg);
          return dispatch(documentCreateError(errorMsg));
        }
        toastr.success('Document Created');
        return dispatch(documentCreateSuccessful(response.body));
      });
};

export const handleFetchDocuments = () => (dispatch) => {
  dispatch(fetchDocumentRequest());
  const token = localStorage.getItem('token');
  return request
      .get('/api/v1/documents')
      .set({ 'x-access-token': token })
      .end((error, response) => {
        if (error) {
          return dispatch(fetchDocumentError(error));
        }

        return dispatch(fetchDocumentSuccessful(response.body.documents));
      });
};

export const handleUpdateDocument = ({ id, title, content, access }) => (dispatch) => {
  dispatch(updateDocumentRequest());
  const token = localStorage.getItem('token');
  return request
      .put(`/api/v1/documents/${id}`)
      .set({ 'x-access-token': token })
      .send({ title, content, access })
      .end((error, response) => {
        if (error) {
          return dispatch(updateDocumentError(error));
        }
        toastr.success('Update on document was successful');
        return dispatch(updateDocumentSuccessful(response.body.documents));
      });
};

export const handleDeleteDocument = id => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(deleteDocumentRequest());
  return request
      .delete(`/api/v1/documents/${id}`)
      .set({ 'x-access-token': token })
      .end((error, response) => {
        if (error) {
          return dispatch(deleteDocumentError(error));
        }
        toastr.success('Document was deleted');
        return dispatch(deleteDocumentSuccessful(id));
      });
};

export const handleSearchDocuments = userQuery => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(searchDocumentRequest());
  return request
      .get(`/api/v1/search/documents/?query=${userQuery}`)
      .set({ 'x-access-token': token })
      .send(userQuery)
      .end((error, response) => {
        if (error) {
          return dispatch(searchDocumentError(error));
        }
        return dispatch(searchDocumentSuccessful(response.body));
      });
};
