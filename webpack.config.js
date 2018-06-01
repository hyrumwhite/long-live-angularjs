let env = process.env.BABEL_ENV;

const publishFiles = require('./publish-files.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');


let productionMode = env === 'production';
let plugins = [new CopyWebpackPlugin(publishFiles)];

let config = {
  resolve: {
    alias: {
      'app-store': path.join(__dirname, '/src/store'),
      'app-components': path.join(__dirname, '/src/js/components'),
      'app-config': path.join(__dirname, '/src/js/config'),
      'app-services': path.join(__dirname, '/src/js/services'),
      'app-controllers': path.join(__dirname, '/src/js/controllers'),
      'app-directives': path.join(__dirname, '/src/js/directives'),
      'node_modules': path.join(__dirname, '/node_modules'),
    }
  },
  mode: productionMode ? "production" : "development",
  entry: {
    main: ['./src/js/app.js'],
  },
  output: {
      path: __dirname + '/public',
      filename: '[name].module.js',
      chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.html$/, use: "html-loader"},
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.styl$/, use: ['style-loader','css-loader', 'stylus-loader']},
      {
        test: /\.svg$/, loader: 'vue-svg-loader', options:{
        svgo:{
          plugins:[
            {
              removeDoctype:true,
              removeComments:true
            }]
          }
        }
      },
      { test: /\.js$/, include: [/src/], use: ['babel-loader']}
    ]
  },
  plugins
};
module.exports = config;
