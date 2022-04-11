/**
 * 处理路由变化
 */
import { getApps } from "./index";
import { importHtml } from "./import-html";

export const handleRouter = async () => {
  //  2.匹配子应用
  console.log("router");
  // 从中获取到匹配路由规则那项的配置
  const apps = getApps();
  // 获取上一个路由应用
//   const pervApp = apps.find((item) => {
//     return getPrevRoute.startsWith(item.activeRule);
//   });
  // 获取下一个路由应用
  const app = apps.find(
    (item) => window.location.hash.startsWith(item.activeRule)
    // getNextRoute.startsWith(item.activeRule)
  );

//   if (pervApp) {
//     // 如果有上一个应用先销毁
//     await unmount(pervApp);
//   }

  if (!app) {
    return;
  }
  //  3.加载子应用
  //  请求获取子应用的资源 HTML CSS JS
  // const html = await fetch(app.entry).then(res=>res.text())
  // console.log(html,"html")
  // 3.1 客户端渲染需要通过执行javascript来生成内容
  // 3.2 浏览器出于安全考虑，innerHTML中的script不会加在执行
  // container.innerHTML = html
  // 手动加载子应用的script,执行script中的代码
  // eval或者new Function  import-html-entry 插件github

  // 引入外部定义的import-html文件，以此来解析加载script中的代码
  const { template, execScripts } = await importHtml(app.entry);
  const container = document.querySelector(app.container);
  container.appendChild(template); //将获取到的所有html内容追加到主应用定义的container元素中
  // 获取到所有的script脚本
  //  getExternalScripts().then((scripts)=>{
  //    console.log(scripts,"lll")
  //  })

  // 配置全局环境变量
  window.__POWERED_BY_QIANKUN__ = true; //这样就不会单独渲染微应用了，微应用会读取这里的配置变量
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + "/"; //衔接微应用的静态资源文件

  const getExports = await execScripts(); //获取微应用中定义的几个钩子函数
  console.log(getExports, "获取微应用中所有的钩子函数");

  //  4.渲染子应用
  app.bootstrap = getExports.bootstrap;
  app.mount = getExports.mount;
  app.unmount = getExports.unmount;

  await bootstrap(app);
  await mount(app);
  await unmount(app);
};

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}

async function mount(app) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }));
}

async function unmount(app) {
  app.unmount &&
    (await app.unmount({
      container: document.querySelector(app.container),
    }));
}
