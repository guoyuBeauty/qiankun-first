/**
 * qiankun的api的原理解析
 */
 import {handleRouter} from "./handle-router";

// 获取主应用main文件中定义的微应用配置存储起来
let _apps = [];
export const getApps = () => _apps;
export const registerMicroApps = (apps) => {
  _apps = apps;
};

// let prevRoute = "";
// let nextRoute = window.location.hash;

// export const getPrevRoute = () => prevRoute;
// export const getNextRoute = () => nextRoute;

// 编写主应用main文件中的start方法，以此来实现渲染微应用
export const start = async () => {
  //  微前端的运行原理：
  //  1.监视路由变化
  // function funcRef(event){
  //   console.log(event,"路由变化")
  //   const {newUrl,oldUrl} = event;
  //   console.log(newUrl,oldUrl,"路由变化")
  // }
  // window.addEventListener("hashchange", funcRef, false);
  window.onhashchange = () => {
    // prevRoute = nextRoute;
    handleRouter();
    // nextRoute = window.location.hash;
  }
  handleRouter(); 
};
