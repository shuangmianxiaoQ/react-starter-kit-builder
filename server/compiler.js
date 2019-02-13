require('../globals');

const debug = require('debug')('app:build:webpack-compiler');
const webpack = require('webpack');
const webpackConig = require('../webpack.config');

// -------------------------------------
// READING WEBPACK CONFIGURATION
// -------------------------------------
function webpackCompiler() {
  // 如果编译成功，将返回一个基于`Promise`的响应
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConig);

    // `run`方法用于触发所有编译时工作，完成之后，执行给定的回调函数
    // 最终记录下来的统计信息和错误在这个回调函数函数中获取
    compiler.run((err, stats) => {
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err);

        reject(err);
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
