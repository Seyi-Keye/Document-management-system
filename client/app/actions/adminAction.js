import request from 'superagent';
import * as ActionTypes from './actionTypes'
import toastr from 'toastr';
import { errorMessage } from '../utils/utils'

export const fetchUserRequest = () => {
  return {type: ActionTypes.FETCH_USERS_REQUEST};
}
export const fetchUserSuccessful = (users) => {
  return {type: ActionTypes.FETCH_USERS_SUCCESSFUL, response: users};
}
export const fetchUserError = (error) => {
  return {type: ActionTypes.FETCH_USERS_FAIL, error: error};
}

export const UpdateUserRequest = () => {
  return {type: ActionTypes.UPDATE_USER_REQUEST};
}
export const UpdateUserSuccessful = (user) => {
  return {type: ActionTypes.UPDATE_USER_SUCCESSFUL, response: user};
}
export const UpdateUserError = (error) => {
  return {type: ActionTypes.UPDATE_USER_FAIL, error: error};
}

export const handleUpdateUser = ({id, firstname, lastname}) => {
  return (dispatch) => {
      dispatch(UpdateUserRequest());
      const token = localStorage.getItem('token');
      return request.put(`/users/${id}`)
      .set({ 'x-access-token': token })
      .send({firstname, lastname})
      .end((error, response) => {
         if(error) {
           console.log('Object.keys of error', Object.keys)
          toastr.error(error);
          return dispatch(UpdateUserError(error))
        }
      toastr.success('User update successful');
       return dispatch(UpdateUserSuccessful(response.body.user));
      });
  };
}

export const handleFetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
      const token = localStorage.getItem('token');
    return request.get('/users')
      .set({ 'x-access-token': token })
      .end((error, response) => {
         if(error) {
          return dispatch(fetchUserError(error));
        }
       return dispatch(fetchUserSuccessful(response.body));
      });
  };
}

