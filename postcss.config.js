module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        '> 1%',
        'last 2 versions',  // 代表意思为每个主流浏览器的最后2个版本
        'not ie <= 8' // Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性.
      ]
    }),
    require('cssnano') // 压缩和优化css的插件
  ]
};
