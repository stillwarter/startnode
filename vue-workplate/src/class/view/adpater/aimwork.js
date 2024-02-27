const renderStrategy = {
  log: function (dom) {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 1300) {
      dom.style = "left:-200px";
    } else {
      dom.style = "";
    }
    return 1;
  },
  home: (dom) => {
    dom.style = "";
    return 0;
  },
};

export const calcluateRenderStrategy = function (level, dom) {
  return renderStrategy[level](dom);
};
