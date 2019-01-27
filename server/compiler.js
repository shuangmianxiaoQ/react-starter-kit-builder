// import global vars for a whole app
require('../globals');

const debug = require('debug')('app:build:webpack-compiler');
const webpack = require('webpack');
const webpackConig = require('../webpack.config');

// -------------------------------------
// RELOAD WEBPACK CONFIGURATION
// -------------------------------------
function webpackCompiler() {
  // 如果编译成功，将返回一个基于`Promise`的响应
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConig);

    compiler.run((err, stats) => {
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err);

        return reject(err);
      }

      const jsonStats = stats.toJson();

      debug('Webpack compilation is completed.');

      resolve(jsonStats);
    });
  });
}

const compile = () => {
  debug('Starting compiler.');

  return Promise.resolve()
    .then(() => webpackCompiler())
    .then(() => {
      debug('Compiler completed successfully.');
    })
    .catch(err => {
      debug('Compiler encountered ad error.', err);

      process.exit(1);
    });
};

compile();
