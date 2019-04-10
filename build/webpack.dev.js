const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require("./webpack.base");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'development', // development 开发模式 => 构建的js, 不会压缩
  devtool: 'cheap-module-eval-source-map', // 只有行信息、第三方模块、打包方式、源码映射。 建立打包后的代码和源代码的对应关系，该关注第三方插件的错误，便于排错。这里只提示行，不提示列，加快打包速度。
  devServer: { // dev服务器的相关配置
    contentBase: 'src/dist', // dev服务器的启动目录。
    publicPath: "/",
    open: false, // 自动打开一个浏览器，加载项目页面。
    host: '127.0.0.1', // 主机地址
    port: 9600, // 自定义端口号
    historyApiFallback: true, // 支持路由展示，生产环境需要另外配置。
    hot: true, // 模块热替换(hot module replacement 或 HMR)。它允许在运行时更新所有类型的模块，而无需完全刷新。
    proxy: {
      '/project': {
        target: 'http://127.0.0.1:8888',
        pathRewrite: {'^/project' : '/'} // 开头的 /project 路径，会被替换为http://127.0.0.1:8888/路径
      }
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ["vue-style-loader", "css-loader", 'postcss-loader']
    }, {
      test: /\.less$/,
      use: ["vue-style-loader", "css-loader", 'postcss-loader', "less-loader"]
    }, {
      test: /\.s[ac]ss$/,
      use: ["vue-style-loader", "css-loader", 'postcss-loader', "sass-loader"]
    }, {
      test: /\.(stylus|styl)$/,
      use: ["vue-style-loader", "css-loader", 'postcss-loader', "stylus-loader"]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'Vue Webpack4 Demo',
      favicon: path.resolve(__dirname, '../static/favicon.ico'), //favicon路径
      filename: 'index.html',
      template: 'index.html'
    })
  ]
});
