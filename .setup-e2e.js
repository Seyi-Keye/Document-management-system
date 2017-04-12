import SeedHelper from './server/test/helpers/seedHelper';
import models from './server/models';
import  specHelpers from './server/test/helpers/specHelpers';

const regularUser= specHelpers.regularUser;
let user;

SeedHelper.init()
.then((res) => {
  console.log(res.body, 'successful');
  models.User.create(regularUser)
  .then((res) => {
    user = res.body;
  })
});