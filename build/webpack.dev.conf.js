'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
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
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',

  devServer: { // dev服务器的相关配置
    contentBase: 'src/dist', // dev服务器的启动目录。
    publicPath: '/',
    open: false, // 自动打开一个浏览器，加载项目页面。
    host: '127.0.0.1', // 主机地址
    port: 6090, // 自定义端口号
    historyApiFallback: true, // 支持路由展示，生产环境需要另外配置。
    hot: true, // 模块热替换(hot module replacement 或 HMR)。它允许在运行时更新所有类型的模块，而无需完全刷新。
    proxy: {
      '/project': {
        target: 'http://127.0.0.1:8888',
        pathRewrite: {'^/project' : '/'} // 开头的 /project 路径，会被替换为http://127.0.0.1:8888/路径
      },
      '/api': {
        target: 'http://localhost:5000' // 代理 mock 服务的请求, 相当于是 /api 开头的全部匹配到 http://localhost:5000/api
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 6090
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: utils.createNotifierCallback()
      }))

      resolve(devWebpackConfig)
    }
  })
})
