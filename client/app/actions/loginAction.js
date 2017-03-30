import request from 'superagent';

const loginAction = (user) => {
  return {type: 'LOGIN_SUCCESSFUL', user};
}

const handleLogin = (email, password) => {
  return (dispatch) => {
    return (
      request.post('/users/login', )
      .send(email, password)
      .end((err, res) => {
        if(res === 200) {
          dispatch(loginAction(res.data));
        } else {
          console.log('response from else -->', res);
        }
        if(err) {
          console.log('error-->', err);
        }
      })
    )
  };
}

export { handleLogin };

export default loginAction;