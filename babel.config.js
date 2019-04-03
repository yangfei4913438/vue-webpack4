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
  "@babel/plugin-transform-runtime"
];

module.exports = {
  presets,
  plugins
};
