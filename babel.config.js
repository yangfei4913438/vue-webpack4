const presets = [
  ["@babel/env", {
    targets: {
      "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
    },
    useBuiltIns: "usage"
  }]
];

const plugins = [
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-transform-runtime",
  ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }]
];

module.exports = {
  presets,
  plugins
};
