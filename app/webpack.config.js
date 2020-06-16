var debug   = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path    = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./js/client.js",
  devtool: debug ? "inline-sourcemap" : false,
  resolve: {
    modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: [
            [require('@babel/plugin-proposal-decorators'), {"legacy": true}],
            [require('@babel/plugin-proposal-class-properties'), { "loose": true }],
            'react-html-attrs',
          ],
          presets: [require('@babel/preset-react'), require('@babel/preset-env')],
        }
      }]
    },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          }],
      },
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js",
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),

  ],
};
