import request from 'superagent';
import * as types from './actionTypes';
import jwt from 'jwt-decode';

const newDocumentAction = (documents) => {
  return {type: 'NEWDOCUMENT_SUCCESSFUL', documents};
}

const documentsAction = (documents) => {
  return {type: 'DOCUMENTS_SUCCESSFUL', documents};
}


const handleNewDocument = (title, content, access) => {
  return (dispatch) => {
    dispatch(newDocumentAction());
      const token = localStorage.getItem('token');
      const decoded = jwt(token);
      const OwnerId = decoded.UserId;
      console.log(decoded);
    return request.post('/documents')
      .set({ 'x-access-token': token })
      .send({title, content, access, OwnerId})
      .end((error, response) => {
        console.log(response);
        if (response.status === 201) {
          dispatch(newDocumentAction(response.body));
          console.log(response.body);
        } else {
          console.log(response);
        }
      });
  };
}

const handleDocuments = () => {
  return (dispatch) => {
    // dispatch(documentsAction());
      const token = localStorage.getItem('token');
    return request.get('/documents')
      .set({ 'x-access-token': token })
      .end((error, response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch(documentsAction(response.body));
          console.log(response.body);
        } else {
          console.log(response);
        }
      });
  };
}


export { handleNewDocument };

export { handleDocuments };

export default newDocumentAction;
