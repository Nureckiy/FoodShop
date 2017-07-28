var path = require('path');
var webpack = require('webpack');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

module.exports = function makeWebpackConfig() {
  let config = {
    entry: env=='deploy'? [
      './src/index'
    ] : [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      './src/index'
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new NpmInstallPlugin(),
      new ExtractTextPlugin('style.css'),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        favicon: './src/sources/img/pizza.png'
      }),
      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }])
    ],
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loaders: env == 'deploy' ? ['babel-loader'] : ['babel-loader', 'eslint'],
          include: [
            path.resolve(__dirname, 'src')
          ]
        }
      ],
      loaders: [
        {
          loaders: env == 'deploy' ? ['babel-loader'] : ['react-hot', 'babel-loader'],
          include: [
            path.resolve(__dirname, 'src')
          ],
          test: /\.(js|jsx)$/,
          plugins: env == 'deploy' ? [] : ['transform-runtime']
        },
        {
          test: /\.css/,
          loader: ExtractTextPlugin.extract('style', env != 'deploy' ? 'css' : 'css?minimize')
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', env != 'deploy' ? 'css!sass' : 'css?minimize!sass')
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          loader: 'file-loader'
        }
      ],
      sassLoader: {
        includePaths: [
          path.resolve(__dirname, 'src/sources/styles')
        ],
      },
      postcss: [
        autoprefixer({
          browsers: ['last 2 version']
        })
      ]
    },
    postcss: function() {
      return [autoprefixer, precss];
    }
  };

  if (env == 'deploy') {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
    );
  } else {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
    config.devtool = 'cheap-module-eval-source-map';
  }


  return config;
}();


