'use strict'
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

// 因为要加入预先分析好的第三方库，所以这里的插件要独立出来写。
let plugins = [
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
      compress: {}
    }
  }),
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    cache: true,
    algorithm: 'gzip',
    test: /\.(js|css|html|svg|png|jpg|jpeg)$/,
    threshold: 10240, // 只处理比这个值大的资源。按字节计算。
    minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理（minRatio = 压缩大小 / 原始大小）
    deleteOriginalAssets: false // 不删除原始资源. nginx会先判断是否有.gz后缀的相同文件(这就表示需要两个文件，一个是压缩前的，一个是压缩后的。)
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
  // generate dist home.html with correct asset hash for caching.
  // you can customize output by editing /home.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
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
    chunksSortMode: 'auto'
  }),
  // keep module.id stable when vendor modules does not change
  new webpack.HashedModuleIdsPlugin(),
  // enable scope hoisting
  new webpack.optimize.ModuleConcatenationPlugin()
]

// 动态添加第三方打包好的组件
// 引入 node.js 核心库，获取第三方库文件夹下的文件名数组
const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
// 遍历数组，根据指定的条件，生成插件的第三方库加载代码。
files.forEach(file => {
  if (/.*\.dll.js/.test(file)) {
    // 添加指定的文件，到 html 文件中去。
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file)
    }))
  }
  if (/.*\.manifest.json/.test(file)) {
    // 这个插件避免 webpack 重复打包第三方库，如果要打包第三方库，会先到这个映射文件中去找，已经打包好的。
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file)
    }))
  }
})

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[id].[contenthash].js'
  },
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {} // 使用默认配置，对异步代码做分割处理。tips：同步代码做分割意义不大。
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader',"less-loader"]
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "sass-loader"]
      },
      {
        test: /\.(styl|stylus)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "stylus-loader"]
      }
    ]
  },
  plugins
})

// Run the build command with an extra argument to
// View the bundle analyzer report after build finishes:
// `npm run build --report`
// Set to `true` or `false` to always turn it on or off
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
