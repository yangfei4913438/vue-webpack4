const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base")

module.exports = merge(baseWebpackConfig, {
  mode: 'development', // development 开发模式 => 构建的js, 不会压缩
  devtool: 'cheap-module-eval-source-map', // 只有行信息、第三方模块、打包方式、源码映射。 建立打包后的代码和源代码的对应关系，该关注第三方插件的错误，便于排错。这里只提示行，不提示列，加快打包速度。
  output: {
    publicPath: "/"
  },
  devServer: { // dev服务器的相关配置
    contentBase: 'src/dist', // dev服务器的启动目录。
    open: true, // 自动打开一个浏览器，加载项目页面。
    host: '127.0.0.1', // 主机地址
    port: 9900, // 自定义端口号
    historyApiFallback: true, // 支持路由展示，生产环境需要另外配置。
    hot: true, // 模块热替换(hot module replacement 或 HMR)。它允许在运行时更新所有类型的模块，而无需完全刷新。
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
  }
})