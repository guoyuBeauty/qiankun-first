let _apps = [];

import { importHtml } from "./import-html";
export const getApps = () => _apps;

export const registerMicroApps = (apps) => {
  _apps = apps;
};

let prevRoute = "";
let nextRoute = "";

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

export const start = async () => {
  //  微前端的运行原理：
  //  1.监视路由变化
  console.log(window.location.hash, "hash路由");
  //  2.匹配子应用
  const apps = getApps();
  prevRoute = window.location.hash;

  const app = apps.find((item) =>
    window.location.hash.startsWith(item.activeRule)
  );

  nextRoute = window.location.hash;
  console.log(prevRoute, "pp,", nextRoute);

  //  3.加载子应用
  //  请求获取子应用的资源 HTML CSS JS
  if (!app) {
    return;
  }
  // const html = await fetch(app.entry).then(res=>res.text())
  // console.log(html,"html")

  // 1.客户端渲染需要通过执行javascript来生成内容
  // 2.浏览器出于安全考虑，innerHTML中的script不会加在执行
  // container.innerHTML = html
  // 手动加载子应用的script,执行script中的代码
  // eval或者new Function  import-html-entry 插件github

  const { template, execScripts } = await importHtml(app.entry);
  const container = document.querySelector(app.container);
  container.appendChild(template);
  //   getExternalScripts().then((scripts)=>{
  //     console.log(scripts,"lll")
  //   })

  // 配置全局环境变量
  window.__POWERED_BY_QIANKUN__ = true;
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + "/";

  const addExports = await execScripts();
  console.log(addExports, "addExports");
  //  4.渲染子应用
  app.bootstrap = addExports.bootstrap;
  app.mount = addExports.mount;
  app.unmount = addExports.unmount;

  await bootstrap(app);
  await mount(app);
  await unmount(app);
};

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}

async function mount(app) {
  // console.log(app,"mout")
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }));
  console.log(app, "mout");
}

async function unmount(app) {
  app.unmount && (await app.unmount());
}
