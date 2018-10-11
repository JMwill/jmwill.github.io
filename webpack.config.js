const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const rules = [{
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'babel-loader',
}, {
  test: /\.html$/,
  use: [
    {
      loader: "html-loader",
      options: { minimize: true }
    }
  ]
}, {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"]
}, {
  test: /\.(png|jpg|svg|gif)$/,
  use: 'file-loader',
}]

module.exports = (mode = 'production') => ({
  mode,
  devtool: mode === 'development' ? 'eval-source-map': undefined,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][hash:4].js',
    chunkFilename: '[name].[chunkhash:4].js',
  },
  module: {
    rules,
  },
  devServer: {},
  plugins: [
    new CopyWebpackPlugin([{
      from: 'assets/**/*',
      to: path.join(__dirname, 'dist/'),
      flatten: true,
    }]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: mode === 'development' ? 'index.html' : '../index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "[name][hash:4].css",
      chunkFilename: "[name].[id].css"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
