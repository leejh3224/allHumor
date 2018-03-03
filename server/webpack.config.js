const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true,
  },

  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './index.js'],

  externals: [nodeExternals()],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './bundle.js',
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
        },
      },
    ],
  },

  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
  },

  plugins: [new webpack.DefinePlugin(['NODE_ENV'])],
}
