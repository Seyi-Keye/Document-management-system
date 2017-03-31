import request from 'superagent';
import * as types from './actionTypes';

const newDocumentAction = (documents) => {
  return {type: 'NEWDOCUMENT_SUCCESSFUL', documents};
}


const handleNewDocument = (title, content, access) => {
  debugger;
  return (dispatch) => {
    dispatch(newDocumentAction());
    return (
      request.post('/documents')
      .set({ 'token': localStorage.getItem('token') })
      .send({title, content, access})
      .then((response) => {
        if(response.status === 200) {
        dispatch(newDocumentAction(response.body));
        console.log(response.body);
      } else {
        console.log(response);
      }
      }).catch(err => {
      })
    )
  };
}


export { handleNewDocument };

export default newDocumentAction;
