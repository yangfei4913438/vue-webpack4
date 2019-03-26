module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['> 1%', 'last 3 versions'] // 代表意思为每个主流浏览器的最后3个版本
    }),
    require('cssnano') // 压缩和优化css的插件
  ]
};
