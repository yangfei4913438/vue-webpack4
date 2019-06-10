module.exports = function (api) {
  api.cache(true);

  const presets = [
    ["@babel/preset-env", {
      corejs: 2,
      useBuiltIns: "usage"
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
