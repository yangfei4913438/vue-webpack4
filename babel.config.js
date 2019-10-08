module.exports = function (api) {
  api.cache(true);

  const presets = [
    ["@babel/preset-env", {
      corejs: 2,
      useBuiltIns: "usage" // 指定 useBuiltIns: 'usage'的话，那么就不要在webpack.config.js 的 entry array 和source 中包含 @babel/polyfill 了。
      // 注意: @babel/polyfill 依然需要安装
    }]
  ];

  const plugins = [
    "transform-vue-jsx",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // 如果要做主题定制，需要修改为 style: true 别用引号！
  ];

  return {
    presets,
    plugins
  };
};
