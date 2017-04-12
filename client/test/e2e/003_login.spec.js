module.exports = {
  'Login with empty details Spec': function (browser) {
    browser
      .url('http://localhost:5000/login')
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .click('.signupButton')
      .pause(1000)
      .assert.containsText('.toast-error', 'User not found')
      .end();
  },
  'Login with unregistered details': function(browser) {
    // const password = faker.internet.password();
    browser
    .url('http://localhost:5000/login')
    .waitForElementVisible('body', 1000)
    .pause(1000)
    .click('.signupButton')
    .pause(1000)
    .setValue('input[name=email]', 'seyi@gmail.com')
    .setValue('input[name=password', 'password')
    .click('.signupButton')
    .pause(1000)
    .assert.containsText('.toast-error', 'User not found')
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
