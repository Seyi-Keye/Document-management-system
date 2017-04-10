module.exports = {
  'Home page': (browser) => {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('head')
      .assert
      .title('KEYE-DOCS')
      .end();
  },
};
