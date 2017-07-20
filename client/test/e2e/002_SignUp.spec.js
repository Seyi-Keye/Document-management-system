process.env.NODE_ENV = 'test';
// const config = require('../../../nightwatch.conf');


module.exports = {
  'Sign up with empty details Spec': function (browser) {
    browser
      .url('http://localhost:5000/signup')
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .click('.signupButton')
      .pause(1000)
      .assert.containsText('.toast-error', 'Validation isEmail failed')
      .end();
  },
  'Sign up with valid details': function (browser) {
    browser
      .url('http://localhost:5000/signup')
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .setValue('input[name=firstname]', 'seyi')
      .setValue('input[name=lastname]', 'seyi')
      .setValue('input[name=username]', 'seyi')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .setValue('input[name=email]', 'seyi@gmail.com')
      .click('.signupButton')
      // .pause(1000)
      .assert.containsText('#toast-container', 'username must be unique')
      .end();
  },
};
