const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    "core-js/modules/es6.promise", // babel 异步分割插件需要配置的内容
    "core-js/modules/es6.array.iterator", // babel 异步分割插件需要配置的内容
    './src/main.js' // 入口文件
  ],
  plugins: [
    new VueLoaderPlugin(), // Vue加载
    new CopyWebpackPlugin([
      {
        from: './static',  // 将静态文件拷贝到打包目录
        to: 'static'
      },
    ])
  ],
  optimization: {
    splitChunks: {} // 使用默认配置，对异步代码做分割处理。tips：同步代码做分割意义不大。
  },
  // 配置导入vue文件，不需要写.vue结尾
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 找不到最后面的时候，先匹配.js，然后匹配.vue, 最后匹配.json
    mainFiles: ['index', 'main'], // import文件夹，如果路径中不指定文件名。那么默认先匹配文件夹下，index文件，再匹配main文件。
    alias: {
      // 使用ES6规范引入vue的，即使用import语法导入vue模块，所以需要将vue的构建版本设置为vue.esm.js。
      // 使用commonjs规范引入vue，即使用require语法导入vue模块，那么就需要vue的构建版本设置为vue.commonjs.js。
      'vue$': 'vue/dist/vue.esm.js'
    }
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
