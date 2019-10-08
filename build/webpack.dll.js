// 创建文件 webpack.dll.js
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue', 'vuex', 'vue-router', 'vue-i18n'],
    moment: ['moment'],
    echarts: ['echarts'],
    fortawesome_core: ['@fortawesome/fontawesome-svg-core', '@fortawesome/vue-fontawesome'],
    fortawesome_solid: ['@fortawesome/free-solid-svg-icons'],
    fortawesome_regular: ['@fortawesome/free-regular-svg-icons'],
    fortawesome_brands: ['@fortawesome/free-brands-svg-icons'],
    vendors: ['js-export-excel', 'axios']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'), // 打包好的文件，存放到dll目录下
    library: '[name]' // 打包好的文件，变成一个库，通过一个全局变量暴露出去。
  },
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理输出内容，自动根据output的内容来清理。
    // 引入打包好的DLL文件
    new webpack.DllPlugin({
      name: '[name]', // 上面暴露出去的库名称
      path: path.resolve(__dirname, '../dll/[name].manifest.json') // 映射关系存放到这个文件下
    }),
    // 对JS文件进行压缩
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
  ]
};
