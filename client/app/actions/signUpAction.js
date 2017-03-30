// import request from 'superagent';

// const signUpAction = (user) => {
//   return {type: 'SIGNUP_SUCCESSFUL', user};
// }

// const handleSignUp = (firstname, lastname,
//     username, password, passwordConfirmation ,email) => {
//   return (dispatch) => {
//     dispatch(signUpAction());
//     return (
//       request.post('/users')
//       .send({firstname, lastname,
//     username, password, passwordConfirmation ,email})
//       .then((response) => {
//         if(response.status === 200) {
//         dispatch(signUpAction(response.body));
//         console.log(response.body);
//       } else {
//         console.log(response);
//       }
//       }).catch(err => {
//       })
//     )
//   };
// }

// export { handleSignUp };

// export default signUpAction;
