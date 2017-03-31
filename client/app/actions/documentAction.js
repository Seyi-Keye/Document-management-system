import request from 'superagent';
import * as types from './actionTypes';
import jwt from 'jwt-decode';

const newDocumentAction = (documents) => {
  return {type: 'NEWDOCUMENT_SUCCESSFUL', documents};
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
      // .then((response) => {
      //   if(response.status === 200) {
      //   dispatch(newDocumentAction(response.body));
      //   console.log(response.body);
      // } else {
      //   console.log(response);
      // }
      // }).catch(err => {
      // })

  };
}


export { handleNewDocument };

export default newDocumentAction;
