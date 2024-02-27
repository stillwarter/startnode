# aimwork 复盘

又是新的一年开始，我想把今年想做的事情收集起来。刚好之前博客做过一个类似 TODO 的东西，但是效果并不好，因为没有本地服务去支持他。  
所以现在重新完善一下。

### 1.需求

##### 1.1 后台需求

获取任务与生成：当前端发送获取任务的请求后，node 服务需要返回当前月份和年度任务的信息，若没有对应 json 文件，则生成后再返回。

记录任务信息：当用户修改了任务信息后，并发送记录的需求，node 服务需要将对应的数据信息保存到文件里。

后台核心的需求大致就是这样。

##### 1.2 页面需求

任务信息展示，分为年度任务和当日任务。  
任务编辑：需要做一个编辑框来编辑任务信息。  
其他编辑操作：维护信息相关的一些功能按钮。

### 2.实现

1.接口实现

1.1 geDaytask

获取任务信息，逻辑很简单，检测文件路径，设置文件流打开文件读取内容，最后将内容返回给用户。

看上去很简单，但具体实现的时候似乎没那么顺利。

在做文件检测的时候（CheckFile），发现 node 的 ESM 模式下无法直接获取\_\_filepath，因为检测文件，需要知道目标文件的路径，这个路径对应 static 下存储文件的文件夹。也就是说我有一个 maketest 的接口，接口的处理逻辑在 maketestjs 文件里，当这个接口涉及文件的时候，比如生成文件，生成的文件路径就是 static/maketest 这个文件夹。

所以第一步要解决 ESM 没有本地文件的问题，我在 command 里做了一个 ESMbase 的 js 文件来解决：

```ESMbase.js
import { fileURLToPath } from "url";
import path from "path";

/**
 *
 * @param {*} defaulturl 默认url 一般是import.meta.url
 * @returns
 *
 * 该函数用获取当前的文件名和文件夹，某种程度上可以解决ESM模式下没有__filename，__dirname的问题
 */
export const getFileNamePath = function (defaulturl) {
  return {
    __filename: fileURLToPath(defaulturl),
    __dirname: path.dirname(fileURLToPath(defaulturl)),
    __puerfilename: fileURLToPath(defaulturl).split("\\").pop().split('.')[0],
  };
};
```

这样就能直获取当前执行文件的文件名了。

当文件路径问题解决后，需要生成文件了。这部分没遇到什么问题，不过当时想写一个通用的检测函数，但是每个接口的业务逻辑可能不同，所以检测内的文件生成函数也略有不同，还是按接口业务逻辑来做不同的检测函数吧。

2.2 setDaytask

该接口的逻辑流程大致和 geDaytask 一样，只不过多了文件内容写入的逻辑。

2.3 页面实现

页面的实现需要 taskdom 弹出框 dom，以及 task 的功能函数，包括 task 的编辑，删除，完成，定时。

这里主要讲一下定时功能的实现吧，由于我惯性摸鱼，所以有时候头昏的时候，code 一会就打开网页逛街了，回过神来已经过了半小时，非常不好，所以我给任务加一个“专注模式”，当点击对应按钮的时候，该任务会每 3 分钟在通知栏报一次。

```js
let timerID = {};
const setClock = (key, e) => {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      showMessage("没有通知权限，无法使用专注功能", "err");
      return;
    }
    if (result === "default") {
      return;
    }
    if (taskClock.value.key == key) {
      const taskitemdom = document.querySelectorAll(".taskitem");
      taskitemdom[taskClock.value.key].style = "";
      showMessage(
        "已解除专注任务--" + todayTask.value[taskClock.value.key].taskTitle
      );
      clearTimeout(timerID);
      taskClock.value.key = -1;
      taskClock.value.state = false;
      e.target.children[0].style = "";
      return;
    }
    if (taskClock.value.state) {
      showMessage(
        "请先完成当前专注任务--" +
          todayTask.value[taskClock.value.key].taskTitle,
        "err"
      );
      return;
    }

    taskClock.value.key = key;
    taskClock.value.state = true;
    const taskitemdom = document.querySelectorAll(".taskitem");
    taskitemdom[taskClock.value.key].style = " background: rgb(252, 252, 124);";
    showMessage("设定专注任务成功--" + todayTask.value[key].taskTitle);
    e.target.children[0].style = "fill:red";
    // 默认三分钟一次
    timerID = setInterval(() => {
      new Notification("我诞生于灼烧bug的火焰中", {
        dir: "ltr",
        lang: "zh-CN",
        body: "想要做的太多，会的又太少，不要摸鱼了！时间不等人哩！",
        icon:
          "https://file.fishpi.cn/2022/07/MOSHED2022621164630-1b1ec532.gif?imageView2/1/w/210/h/210/interlace/0/q/100",
      });
      // 300000
    }, 180000);
  });
};
```

上述代码包含一个浏览器调用系统通知的实现，部分代码来自百度。

![1708930445480.png](http://localhost:3090/public/img/2024/02/1708930445480.png)

### 3.其他问题

当正式完成这个功能后，由于界面样式的一些缘故，在某些尺寸下，这个任务表会遮挡其他dom。所以必须做一下适配。

因为我个人很喜欢用鼠标滚轮来调整网页的大小缩放，来获取当前最舒服的显示感觉，而某些比例下可能dom之间会有影响。

由于css的媒体查询做起来感觉比较麻烦，所以这里我直接用js处理了。

```aimview.js
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
```

```aimwork.js
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
```

ok，这样就差不多了，这样在不同页面下，面对不同的dom视觉冲突可以做出不同的处理，非常好用。