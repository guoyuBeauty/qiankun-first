(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof exports === "object") exports["micapp-vue2-app"] = factory();
  else root["micapp-vue2-app"] = factory();
})(window, function () {
  return {
    a: 1,
    b: 2,
  };
});
