// 创建文件 webpack.dll.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue', 'vuex', 'vue-router', 'vue-i18n'],
    antd: ['ant-design-vue'],
    moment: ['moment'],
    chart: ['echarts'],
    fortawesome_core: ['@fortawesome/fontawesome-svg-core', '@fortawesome/vue-fontawesome'],
    fortawesome: ['@fortawesome/free-solid-svg-icons', '@fortawesome/free-regular-svg-icons', '@fortawesome/free-brands-svg-icons'],
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
    // 引入打包好的DLL文件
    new webpack.DllPlugin({
      name: '[name]', // 上面暴露出去的库名称
      path: path.resolve(__dirname, '../dll/[name].manifest.json') // 映射关系存放到这个文件下
    })
  ]
};
