import { expect } from 'chai';
import { errorMessage } from '../../app/utils/utils';

const error = {
  response: {
    body: {
      message: ['acc'],
    },
  },
};
describe('Error Message', () => {
  it('should return a string', () => {
    expect(errorMessage(error))
      .to
      .equal('acc\n');
  });
});
