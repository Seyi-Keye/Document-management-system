import request from 'superagent';
// import toastr from 'toastr';
import * as ActionTypes from './actionTypes';

export const fetchUserRequest = () => ({
  type: ActionTypes.FETCH_USERS_REQUEST,
});
export const fetchUserSuccessful = (users) => ({
  type: ActionTypes.FETCH_USERS_SUCCESSFUL,
  response: users,
});
export const fetchUserError = (error) => ({
  type: ActionTypes.FETCH_USERS_FAIL,
  error,
});

export const UpdateUserRequest = () => ({
  type: ActionTypes.UPDATE_USER_REQUEST,
});
export const UpdateUserSuccessful = (users) => ({
  type: ActionTypes.UPDATE_USER_SUCCESSFUL,
  response: users,
});
export const UpdateUserError = (error) => ({
  type: ActionTypes.UPDATE_USER_FAIL,
  error,
});

export const deleteUserRequest = () => ({
  type: ActionTypes.DELETE_USER_REQUEST,
});
export const deleteUserSuccessful = (id) => ({
  type: ActionTypes.DELETE_USER_SUCCESSFUL,
  response: id,
});
export const deleteUserError = (error) => ({
  type: ActionTypes.DELETE_USER_FAIL,
  error,
});

export const createRoleRequest = () => ({
  type: ActionTypes.CREATE_ROLE_REQUEST,
});
export const createRoleSuccessful = (title) => ({
  type: ActionTypes.CREATE_ROLE_SUCCESSFUL,
  response: title,
});
export const createRoleError = (error) => ({
  type: ActionTypes.CREATE_ROLE_FAIL,
  error,
});

export const fetchRoleRequest = () => ({
  type: ActionTypes.FETCH_ROLE_REQUEST,
});
export const fetchRoleSuccessful = (role) => ({
  type: ActionTypes.FETCH_ROLE_SUCCESSFUL,
  response: role,
});
export const fetchRoleError = (error) => ({
  type: ActionTypes.FETCH_ROLE_FAIL,
  error,
});

export const searchUserRequest = () => ({
  type: ActionTypes.SEARCH_USER_REQUEST,
});
export const searchUserSuccessful = (users) => ({
  type: ActionTypes.SEARCH_USER_SUCCESSFUL,
  response: users,
});
export const searchUserError = (error) => ({
  type: ActionTypes.SEARCH_USER_FAIL,
  error,
});

export const handleUpdateUser = ({ id, firstname, lastname }) => (dispatch) => {
  dispatch(UpdateUserRequest());
  const token = localStorage.getItem('token');
  return request
    .put(`/api/v1/users/${id}`)
    .set({ 'x-access-token': token })
    .send({ firstname, lastname })
    .end((error, response) => {
      if (error) {
        // // toastrerror(error);
        return dispatch(UpdateUserError(error));
      }
      // // toastrsuccess('User update successful');
      return dispatch(UpdateUserSuccessful(response.body));
    });
};

export const handleFetchUsers = () => (dispatch) => {
  dispatch(fetchUserRequest());
  const token = localStorage.getItem('token');
  return request
    .get('/api/v1/users')
    .set({ 'x-access-token': token })
    .end((error, response) => {
      if (error) {
        return dispatch(fetchUserError(error));
      }
      return dispatch(fetchUserSuccessful(response.body));
    });
};

export const handleDeleteUser = (id) => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(deleteUserRequest());
  return request
    .delete(`/api/v1/users/${id}`)
    .set({ 'x-access-token': token })
    .end((error) => {
      if (error) {
        return dispatch(deleteUserError(error));
      }
      // toastr.success('User was deleted');
      return dispatch(deleteUserSuccessful(id));
    });
};

export const handleCreateRole = (title) => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(createRoleRequest());
  return request
    .post('/api/v1/roles')
    .set({ 'x-access-token': token })
    .send(title)
    .end((error) => {
      if (error) {
        // toastrerror('Duplicate Role is not allowed');
        return dispatch(createRoleError(error));
      }
      // toastrsuccess('Role created');
      return dispatch(createRoleSuccessful(title));
    });
};

export const handleFetchRoles = () => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(fetchRoleRequest());
  return request
    .get('/api/v1/roles')
    .set({ 'x-access-token': token })
    .end((error, response) => {
      if (error) {
        return dispatch(fetchRoleError(error));
      }
      return dispatch(fetchRoleSuccessful(response.body));
    });
};

export const handleSearchUsers = (username) => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(searchUserRequest());
  return request
    .get(`/api/v1/search/users/?query=${username}`)
    .set({ 'x-access-token': token })
    .send(username)
    .end((error, response) => {
      if (error) {
        return dispatch(searchUserError(error));
      }
      return dispatch(searchUserSuccessful(response.body));
    });
};
