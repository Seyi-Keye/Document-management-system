export const errorMessage = error => error.response.body.message.reduce((acc, val) => {
      acc = acc + val + '\n';
      return acc;
  }, '');