import request from 'superagent';

// const loginAction = (user) => {
//   return {type: 'LOGIN_SUCCESSFUL', user};
// }

// const handleLogin = (email, password) => {
//   return (dispatch) => {
//     return (
//       request.post('/users/login')
//       .send({email, password})
//       .then((response) => {
//         if(response.status === 200) {
//         dispatch(loginAction(response.body));
//         console.log(response.body);
//         window.location = '/dashboard';
//       } else {
//         console.log(response);
//       }
//       }).catch(err => {
//       })
//     )
//   };
// }

// export { handleLogin };

// export default loginAction;
