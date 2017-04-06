import request from 'superagent';
import * as ActionTypes from './actionTypes'
import jwt from 'jwt-decode';
import { errorMessage } from '../utils/utils';
import toastr from 'toastr';

export const documentRequest = () => {
  return {type: ActionTypes.CREATE_DOCUMENT_REQUEST};
}
export const documentCreateSuccessful = (documents) => {
  return {type: ActionTypes.CREATE_DOCUMENT_SUCCESSFUL, response: documents};
}
export const documentCreateError = (error) => {
  return {type: ActionTypes.CREATE_DOCUMENT_SUCCESSFUL, error: error};
}

export const fetchDocumentRequest = () => {
  return {type: ActionTypes.FETCH_DOCUMENT_REQUEST};
}
export const fetchDocumentSuccessful = (documents) => {
  return {type: ActionTypes.FETCH_DOCUMENT_SUCCESSFUL, response: documents};
}
export const fetchDocumentError = (error) => {
  return {type: ActionTypes.FETCH_DOCUMENT_FAIL, error: error};
}

export const updateDocumentRequest = () => {
  return {type: ActionTypes.UPDATE_DOCUMENT_REQUEST};
}
export const updateDocumentSuccessful = (documents) => {
  return {type: ActionTypes.UPDATE_DOCUMENT_SUCCESSFUL, response: documents};
}
export const updateDocumentError = (error) => {
  return {type: ActionTypes.UPDATE_DOCUMENT_FAIL, error: error};
}

export const deleteDocumentRequest = () => {
  return {type: ActionTypes.DELETE_DOCUMENT_REQUEST};
}
export const deleteDocumentSuccessful = (id) => {
  return {type: ActionTypes.DELETE_DOCUMENT_SUCCESSFUL, response: id};
}
export const deleteDocumentError = (error) => {
  return {type: ActionTypes.DELETE_DOCUMENT_FAIL, error: error};
}

export const handleCreateDocument = (title, content, access) => {
  return (dispatch) => {
    dispatch(documentRequest());
      const token = localStorage.getItem('token');
      const decoded = jwt(token);
      const OwnerId = decoded.UserId;
      return request.post('/documents')
      .set({ 'x-access-token': token })
      .send({title, content, access, OwnerId})
      .end((error, response) => {
        if(error) {
          const errorMsg = errorMessage(error);
          toastr.error(errorMsg);
          return dispatch(documentCreateError(errorMsg))
        }
        toastr.success('Document Created');
        return dispatch(documentCreateSuccessful(response.body));
      });
  };
}

export const handleFetchDocuments = () => {
  return (dispatch) => {
    dispatch(fetchDocumentRequest());
      const token = localStorage.getItem('token');
    return request.get('/documents')
      .set({ 'x-access-token': token })
      .end((error, response) => {
         if(error) {
          return dispatch(fetchDocumentError(error));
        }

       return dispatch(fetchDocumentSuccessful(response.body.documents));
      });
  };
}

export const handleUpdateDocument = ({id, title, content, access}) => {
  return (dispatch) => {
    dispatch(updateDocumentRequest());
    const token = localStorage.getItem('token');
    return request.put(`/documents/${id}`)
      .set({ 'x-access-token': token })
      .send({title, content, access})
      .end((error, response) => {
         if(error) {
          return dispatch(updateDocumentError(error))
        }
       toastr.success('Update on document was successful');
       return dispatch(updateDocumentSuccessful(response.body.documents));
      });
  };
}

export const handleDeleteDocument = (id) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(deleteDocumentRequest());
    return request.delete(`/documents/${id}`)
      .set({ 'x-access-token': token })
      .end((error, response) => {
         if(error) {
          return dispatch(deleteDocumentError(error))
        }
       toastr.success('Document was deleted');
       return dispatch(deleteDocumentSuccessful(id));
      });
  };
}

