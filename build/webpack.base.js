const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    "core-js/modules/es6.promise", // babel 异步分割插件需要配置的内容
    "core-js/modules/es6.array.iterator", // babel 异步分割插件需要配置的内容
    './src/main.js' // 入口文件
  ],
  plugins: [
    new VueLoaderPlugin(), // Vue加载
    new HtmlWebpackPlugin({ // 根据模板自动生成html文件
      filename: "index.html",
      template: "./public/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: './public/favicon.ico',  // 将项目图标拷贝到打包目录
        to: 'favicon.ico'
      },
    ])
  ],
  optimization: {
    splitChunks: {} // 使用默认配置，对异步代码做分割处理。tips：同步代码做分割意义不大。
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]' // 将图片都放入 images 文件夹下，[hash:7]防缓存
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]' // 将字体放入 fonts 文件夹下
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]' // 媒体文件放入 media 文件夹下
        }
      }
    ]
  }
};
