export const importHtml = async (url) => {
  const html = await fetch(url).then((res) => res.text());
  const template = document.createElement("div");
  template.innerHTML = html;
  // 获取所有script标签的代码  [代码，代码]
  const scripts = template.querySelectorAll("script");

  const getExternalScripts = () => {
    return Promise.all(
      Array.from(scripts).map((item) => {
        const src = item.getAttribute("src");
        if (!src) {
          return Promise.resolve(item.innerHTML);
        } else {
          return fetch(src.startsWith("http") ? src : `${url}${src}`).then(
            (res) => res.text()
          );
        }
      })
    );
  };
  // 获取并执行所有script代码
  const execScripts = async () => {
    const scripts = await getExternalScripts();

    // 手动的构造一个CommonJS 模块环境
    // const module = { exports: {} };
    // const exports = module.exports;
    scripts.forEach((item) =>
      // eval执行的代码可以访问外部变量
      eval(item)
    );
    return window["micapp-vue2-app"];
    // console.log(module.exports, "huuuuuuu");
    // console.log(window["micapp-vue2-app"],"ooo0000")
  };
  return {
    template,
    getExternalScripts,
    execScripts,
  };
};
