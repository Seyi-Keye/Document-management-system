module.exports = {
  'Renders Dashboard page': function (browser) {
    browser
      .url('http://localhost:5000/dashboard')
      .waitForElementVisible('body', 1000)
      .assert.urlContains('Create Document');
      // .end();
  },
};
