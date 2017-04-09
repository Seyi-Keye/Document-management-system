import { errorMessage } from '../../app/utils/utils';
import { expect} from 'chai';

const error = { response: { body: { message: ['acc']} }};
describe('Error Message', () => {
  it('should return a string', () => {
    expect(errorMessage(error)).to.equal('acc\n');
  })
})
