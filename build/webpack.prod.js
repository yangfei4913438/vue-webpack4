const merge = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require("./webpack.base");
const path = require('path');
const webpack = require('webpack');


module.exports = merge(baseWebpackConfig, {
  mode: 'production', // production 生产模式（默认模式，压缩js）
  devtool: 'cheap-module-source-map', // 只有行信息、第三方模块、打包方式、源码映射。 建立打包后的代码和源代码的对应关系，该关注第三方插件的错误，便于排错。这里只提示行，不提示列，加快打包速度。
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[id].[contenthash].js'
  },
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理输出内容，自动根据output的内容来清理。
    new MiniCssExtractPlugin({ // css打包配置
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css'
    }),
    new UglifyJsPlugin({
      exclude: /\.min\.js$/,
      cache: true,
      parallel: true, // 开启并行压缩，充分利用cpu
      sourceMap: true,
      extractComments: false, // 移除注释
      uglifyOptions: {
        unused: true,
        warnings: false,
        drop_debugger: true,
        compress: {
          warnings: false
        }
      }
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      cache: true,
      algorithm: 'gzip',
      test: /\.(js|css|html|svg|png|jpg|jpeg)$/,
      threshold: 10240, // 只处理比这个值大的资源。按字节计算。
      minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理（minRatio = 压缩大小 / 原始大小）
      deleteOriginalAssets: false // 删除原始资源. nginx会先判断是否有.gz后缀的相同文件(这就表示需要两个文件，一个是压缩前的，一个是压缩后的。)
      // 有的话，就直接返回，nginx自己不再进行压缩处理。 如果删除源文件，那么 NGINX 处理会有问题的！！！
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
      cssProcessor: require('cssnano'),
      cssProcessorOptions:  {
        discardComments: { removeAll: true }, // 移除注释
        // 避免 cssnano 重新计算 z-index
        safe: true,
        // cssnano 集成了autoprefixer的功能
        // 会使用到autoprefixer进行无关前缀的清理
        // 关闭autoprefixer功能
        // 使用postcss的autoprefixer功能
        autoprefixer: false
      },
      canPrint: true // 是否将插件信息打印到控制台
    }),
    new HtmlWebpackPlugin({ // 根据模板自动生成html文件
      title: 'Vue Webpack4 Demo',
      favicon: path.resolve(__dirname, '../static/favicon.ico'), //favicon路径
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
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
