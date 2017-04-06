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
export const UpdateUserSuccessful = (users) => {
  return {type: ActionTypes.UPDATE_USER_SUCCESSFUL, response: users};
}
export const UpdateUserError = (error) => {
  return {type: ActionTypes.UPDATE_USER_FAIL, error: error};
}

export const deleteUserRequest = () => {
  return {type: ActionTypes.DELETE_USER_REQUEST};
}
export const deleteUserSuccessful = (id) => {
  return {type: ActionTypes.DELETE_USER_SUCCESSFUL, response: id};
}
export const deleteUserError = (error) => {
  return {type: ActionTypes.DELETE_USER_FAIL, error: error};
}

export const createRoleRequest = () => {
  return {type: ActionTypes.CREATE_ROLE_REQUEST};
}
export const createRoleSuccessful = (title) => {
  return {type: ActionTypes.CREATE_ROLE_SUCCESSFUL, response: title};
}
export const createRoleError = (error) => {
  return {type: ActionTypes.CREATE_ROLE_FAIL, error: error};
}

export const fetchRoleRequest = () => {
  return {type: ActionTypes.FETCH_ROLE_REQUEST};
}
export const fetchRoleSuccessful = (role) => {
  return {type: ActionTypes.FETCH_ROLE_SUCCESSFUL, response: role};
}
export const fetchRoleError = (error) => {
  return {type: ActionTypes.FETCH_ROLE_FAIL, error: error};
}

export const handleUpdateUser = ({id, firstname, lastname}) => {
  return (dispatch) => {
      dispatch(UpdateUserRequest());
      const token = localStorage.getItem('token');
      return request.put(`/users/${id}`)
      .set({ 'x-access-token': token })
      .send({firstname, lastname})
      .end((error, response) => {
        console.log('response', response);
         if(error) {
           console.log('Object.keys of error', Object.keys)
          toastr.error(error);
          return dispatch(UpdateUserError(error))
        }
      toastr.success('User update successful');
       return dispatch(UpdateUserSuccessful(response.body));
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

export const handleDeleteUser = (id) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(deleteUserRequest());
    return request.delete(`/users/${id}`)
      .set({ 'x-access-token': token })
      .end((error, response) => {
         if(error) {
          return dispatch(deleteUserError(error))
        }
       toastr.success('User was deleted');
       return dispatch(deleteUserSuccessful(id));
      });
  };
  };

export const handleCreateRole = (title) => {
  console.log('title', title);
  return (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(createRoleRequest());
    return request.post('/roles')
      .set({ 'x-access-token': token })
      .send(title)
      .end((error, response) => {
        console.log('req body', request.body)
        console.log('response.body', response)
         if(error) {
          toastr.error('Duplicate Role is not allowed');
          return dispatch(createRoleError(error))
        }
       toastr.success('Role created');
       return dispatch(createRoleSuccessful(title));
      });
  };
};

export const handleFetchRoles = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(fetchRoleRequest());
    return request.get('/roles')
      .set({ 'x-access-token': token })
      .end((error, response) => {
        console.log('req body', request.body)
        console.log('response.body', response.body)
         if(error) {
          return dispatch(fetchRoleError(error))
        }
       return dispatch(fetchRoleSuccessful(response.body));
      });
  };
  };