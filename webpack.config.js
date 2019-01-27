// import global vars for a whole app
require('./globals');

const path = require('path');
const webpack = require('webpack');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const debug = require('debug')('app:webpack:config');

// -------------------------------------
// 规则
// -------------------------------------
const rules = [
  // PRELOAD CHECKING
  {
    enforce: 'pre', // 指定`loader`种类
    test: /\.(js|jsx)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'eslint-loader',
    options: {
      quiet: true // 仅处理和报告错误，忽略警告
    }
  },
  {
    enforce: 'pre',
    test: /\.(ts|tsx)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'tslint-loader',
    options: {
      quiet: true,
      tsConfigFile: './tsconfig.json'
    }
  },
  // JAVASCRIPT/JSON
  {
    test: /\.html$/,
    use: {
      loader: 'html-loader'
    }
  },
  {
    test: /\.(js|jsx|ts|tsx)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader'
  },
  {
    // 将`JSON`转换为`JS`
    type: 'javascript/auto',
    test: /\.json$/,
    loader: 'json-loader'
  },
  // STYLES
  {
    test: /.scss$/,
    use: [
      // 生产阶段使用`MiniCssExtractPlugin`插件
      __PROD__ ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: true, // 启用 `CSS Modles`规范
          localIdentName: '[local]--[hash:base64:5]'
        }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  // FILE/IMAGES
  {
    test: /\.woff(\?.*)?$/,
    loader:
      'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader:
      'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/,
    loader:
      'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentye'
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader:
      'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
  },
  {
    test: /\.svg(\?.*)?$/,
    loader:
      'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=imgge/svg+xml'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }
];

// -------------------------------------
// 捆绑包优化
// -------------------------------------
const optimization = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unused: true,
            dead_code: true,
            warnings: false
          }
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  performance: {
    hints: false
  }
};

// -------------------------------------
// 阶段插件注入 [DEVELOPMENT, PRODUCTION, TESTING]
// -------------------------------------
const stagePlugins = {
  test: [
    // 以可视化的方式提供有关`App`包大小的信息
    new BundleAnalyzerPlugin()
  ],
  development: [
    new HtmlWebapckPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: false,
      chunksSortMode: 'auto'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 有助于减少来自`CLI`的无用警告消息
    new webpack.NoEmitOnErrorsPlugin()
  ],
  production: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
    new HtmlWebapckPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      },
      chunksSortMode: 'auto'
    })
  ]
};

// -------------------------------------
// 阶段配置注入 [DEVELOPMENT, PRODUCTION]
// -------------------------------------
const stageConfig = {
  development: {
    devtool: '',
    stats: {
      chunks: false,
      children: false,
      chunkModules: false,
      colors: false
    }
  },
  production: {
    devtool: 'source-map',
    stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  }
};

const createConfig = () => {
  debug('Creating configuration.');
  debug(`Enabling devtools for '${__NODE_ENV__} Mode'`);

  const webpackConfig = {
    mode: __DEV__ ? 'development' : 'production',
    name: 'client',
    target: 'web',
    devtool: stageConfig[__NODE_ENV__].devtool,
    stats: stageConfig[__NODE_ENV__].stats,
    modules: {
      rules: [...rules]
    },
    ...optimization,
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }
  };

  // -------------------------------------
  // Entry Points
  // -------------------------------------
  webpackConfig.entry = {
    app: [
      'babel-ployfill',
      path
        .resolve(__dirname, 'src/index.js')
        // 直接在`App`中使用`webpack HMR`
        .concat('webpack-hot-middleware/client?path=/__webpack_hmr')
    ]
  };

  // -------------------------------------
  // Bundle externals
  // -------------------------------------
  webpackConfig.externals = {
    // 排除`react`包将在`index.html`中从`CDN`获取`react`包，使得捆绑包更轻量级
    react: 'React',
    'react-dom': 'ReactDOM'
  };

  // -------------------------------------
  // Bundle Output
  // -------------------------------------
  webpack.output = {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  };

  // -------------------------------------
  // Plugins
  // -------------------------------------
  debug(`Enable plugins for '${__NODE_ENV__}' Mode!`);
  webpackConfig.plugins = [
    new webpack.DefinePlugin({ __DEV__, __PROD__, __TEST__ }),
    ...stagePlugins[__NODE_ENV__]
  ];

  // -------------------------------------
  // Finishing the Webpack configuration!
  // -------------------------------------
  debug(`Webpack Bundles is Ready for '${__NODE_ENV__} Mode!'`);
  return webpackConfig;
};

module.exports = createConfig();
