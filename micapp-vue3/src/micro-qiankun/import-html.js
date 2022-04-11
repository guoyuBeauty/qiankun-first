export const fetchResourse = url => fetch(url).then((res) => res.text())

export const importHtml = async (url) => {
  // 将获取到的微应用的html模板存储到一个模板存储仓库里，然后填充到主应用对应的节点上去使用
  const html = await fetchResourse(url);
  const template = document.createElement("div");
  template.innerHTML = html;

  // 获取所有script标签的代码  [代码，代码]
  const scripts = template.querySelectorAll("script");
  // 处理加载脚本资源问题
  const getExternalScripts = () => {
    return Promise.all(
      Array.from(scripts).map((item) => {
        const src = item.getAttribute("src");
        if (!src) {
          return Promise.resolve(item.innerHTML);
        } else {
          return fetchResourse(src.startsWith("http") ? src : `${url}${src}`)
        }
      })
    );
  };

  // 获取并执行所有script代码
  const execScripts = async () => {
    const scripts = await getExternalScripts();
    // 手动的构造一个CommonJS 模块环境
    // const Module = { exports: {}};
    // const exports = Module.exports;
    scripts.forEach((item) =>
      // eval执行的代码可以访问外部变量
      eval(item)
    );
    return window["micapp-vue2-app"];
    // console.log(module.exports, "什么东西？");
    // console.log(window["micapp-vue2-app"],"获取微应用钩子")
  };

  return {
    template,
    getExternalScripts,
    execScripts,
  };
};
