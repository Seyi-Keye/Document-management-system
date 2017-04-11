export const errorMessage = error => // eslint-disable-line
error.response.body.message.reduce((acc, val) => {
  acc = acc + val + '\n'; // eslint-disable-line
  return acc;
}, '');
