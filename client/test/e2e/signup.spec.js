process.env.NODE_ENV = 'test';
const config = require('../../../nightwatch.conf');

module.exports = {
  'SignUp with empty details Spec': function (browser) {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .click('#signupButton')
      .pause(1000)
      .click('button[type=submit]')
      .pause(1000)
      .assert.containsText('.statusDisplay', 'Username cannot be empty')
      .assert.containsText('.statusDisplay', 'Username cannot be less than six characters')
      .assert.containsText('.statusDisplay', 'First Name cannot be empty')
      .assert.containsText('.statusDisplay', 'Last Name cannot be empty')
      .assert.containsText('.statusDisplay', 'Password cannot be empty')
      .assert.containsText('.statusDisplay', 'Email cannot be empty')
      .assert.containsText('.statusDisplay', 'Password Confirmation cannot be empty')
      .end();
  },
  // 'SignUp with valid details': function (browser) {
  //   const password = faker.internet.password();
  //   browser
  //     .resizeWindow(1440, 700)
  //     .url('http://localhost:5000')
  //     .waitForElementVisible('body', 1000)
  //     .pause(2000)
  //     .click('#signupButton')
  //     .pause(2000)
  //     .setValue('input[name=username]', faker.internet.userName())
  //     .setValue('input[name=firstname]', faker.name.firstName())
  //     .setValue('input[name=lastname]', faker.name.lastName())
  //     .setValue('input[name=email]', faker.internet.email())
  //     .setValue('input[name=password_digest]', password)
  //     .setValue('input[name=password_confirmation]', password)
  //     .click('button.signin-click')
  //     .pause(10000)
  //     .assert.containsText('.statusDisplay', '')
  //     .end();
  // },
};
