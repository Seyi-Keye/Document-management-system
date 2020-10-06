const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  let SERVER_PATH = '';

  if (argv.mode === 'production') {
    SERVER_PATH = './server-prod.js';
  } else {
    SERVER_PATH = './server-dev.js';
  }

  return {
    entry: {
      server: SERVER_PATH,
    },
    mode: argv.mode,
    devtool: 'inline-source-map',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js',
    },
    target: 'node',
    // node: {
    //   // Need this when working with express, otherwise the build fails
    //   __dirname: false, // if you don't put this is, __dirname
    //   __filename: false, // and __filename return blank or /
    // },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  };
};
