import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import { registerMicroApps, start } from "qiankun";
import { registerMicroApps, start } from "./micro-qiankun";

Vue.config.productionTip = false;
Vue.use(ElementUI);

registerMicroApps([
  {
    name: "micapp-vue1", // app name registered
    entry: "//localhost:8081",
    container: "#container",
    activeRule: "#/micapp-vue1",
  },
  {
    name: "micapp-vue2",
    entry: "//localhost:8082",
    container: "#container",
    activeRule: "#/micapp-vue2",
  },
]);

start({
  sandbox:{
    // strictStyleIsolation:true,//通过 shadow 解决样式冲突
    experimentalStyleIsolation:true,// 通过选择器来解决样式冲突
  }
});
// import { loadMicroApp } from "qiankun";

// loadMicroApp({
//   name: "app",
//   entry: "//localhost:8082",
//   container: "#container",
// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
