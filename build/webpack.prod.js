const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require("./webpack.base");
const path = require('path');

module.exports = merge(baseWebpackConfig, {
  mode: 'production', // production 生产模式（默认模式，压缩js）
  devtool: 'cheap-module-source-map', // 只有行信息、第三方模块、打包方式、源码映射。 建立打包后的代码和源代码的对应关系，该关注第三方插件的错误，便于排错。这里只提示行，不提示列，加快打包速度。
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理输出内容，自动根据output的内容来清理。
    new MiniCssExtractPlugin({ // css打包配置
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css'
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader']
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "less-loader"]
    }, {
      test: /\.s[ac]ss$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "sass-loader"]
    }, {
      test: /\.(styl|stylus)$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "stylus-loader"]
    }]
  }
});
