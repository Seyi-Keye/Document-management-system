import { Redirect } from 'react-router-dom';

const authAction = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Wake up');
    // <Redirect
    // return callback();
  } else {
    console.log('Next');
  }
}

export default authAction;