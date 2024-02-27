import { calcluateRenderStrategy } from "@/class/view/adpater/aimwork.js";

var _wr = function (type) {
  var orig = history[type];
  return function () {
    var rv = orig.apply(this, arguments);
    var e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _wr("pushState");
history.replaceState = _wr("replaceState");

//  作者：luojian001
//  链接：https://juejin.cn/post/6844903749421367303
//  来源：稀土掘金
//  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

let taskboxdom = {};
window.onload = function () {
  // 所有资源加载完成后的代码逻辑
  taskboxdom = document.querySelector(".aimwork");
  window.addEventListener("resize", handleViewportChange);

  window.addEventListener("replaceState", function (event) {
    setTimeout(() => {
      handleViewportChange();
    }, 100);
  });
};

function handleViewportChange() {
  // 在这里处理视口变化的逻辑
  const viewportWidth = window.innerWidth;
  const titlePart = getTitlePartOfUrl();
  try {
    calcluateRenderStrategy(titlePart, taskboxdom);
  } catch (error) {
    taskboxdom.style = "left:-200px";
  }
}

function getTitlePartOfUrl() {
  return window.location.href.split("/")[4];
}
