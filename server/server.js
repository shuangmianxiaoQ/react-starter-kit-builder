require('../globals');

const path = require('path');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config');
const bundler = webpack(webpackConfig);

// -------------------------------------
// WEBPACK MIDDLEWARE CONFIGURATION
// -------------------------------------
const devMiddlewareOptions = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
};

// -------------------------------------
// Server Configuration
// -------------------------------------
browserSync({
  open: 'local',
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: true
  },
  server: {
    baseDir: path.resolve(__dirname, '../src'),
    middleware: [
      historyApiFallback(), // 在导览应用页面期间更新浏览器历史记录
      webpackDevMiddleware(bundler, devMiddlewareOptions),
      webpackHotMiddleware(bundler)
    ]
  },
  // 监听项目中的所有文件类型
  files: [
    'src/../*.tsx',
    'src/../*.ts',
    'src/../*.jsx',
    'src/../*.js',
    'src/../*.json',
    'src/../*.scss',
    'src/../*.html'
  ]
});
