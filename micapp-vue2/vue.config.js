const packageName = require("./package.json").name;

module.exports = {
  publicPath:"http://localhost:8082/",
  configureWebpack: {
    mode:"development",
    output: {
      // 必须打包出一个库文件
      library: `${packageName}-[name]`,
      // 库的格式必须是"umd"
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
  devServer: {
    port: 8082,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
