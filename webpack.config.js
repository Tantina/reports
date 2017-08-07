const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'react-redux',
  'redux',
  'redux-thunk',
  'react-router-dom',
  'react-bootstrap',
  'classnames',
  'prop-types'
];

// Common part
const common = {
  entry: {
    bundle: path.join(__dirname, '/src/js/index.js'),
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  resolve: {
    modules: [
      path.resolve('./src/js'),
      path.resolve('./node_modules')
    ]
  },
};

if (isProduction) {
  module.exports = merge(common, {
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true
        },
        output: {
          comments: false,
        }
      }),
      new ExtractTextPlugin({
        filename: 'style.[contentHash].css',
        allChunks: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!postcss-loader',
          })
        }
      ]
    }
  });
} else {
  module.exports = merge(common, {

    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ProgressBarPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(css)$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        }
      ]
    }
  });
}
