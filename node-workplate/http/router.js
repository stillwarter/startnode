import url from "url";
import { test } from "./router/handlefile.js";
import { readMyLog, addMyLog } from "./router/mylog.js";
import { addMyPlan, readMyPlan, getMyPlanCtx } from "./router/myplan.js";
import { postImg } from "./router/postimg.js";
import { setask, getask } from "./router/mytask.js";
// import

// 创建路由表
let router = {
  // 存储get请求的路由
  get: {},
  // 存储post请求的路由
  post: {
    "/baseinfo": JSON.stringify(process),
    "/handfile": test,
    "/mylog/readMyLog": readMyLog,
    "/mylog/addMyLog": addMyLog,
    "/myplan/readMyPlan": readMyPlan,
    "/myplan/getMyPlanCtx": getMyPlanCtx,
    "/myplan/addMyPlan": addMyPlan,
    "/postimg": postImg,

    "/mytask/getask": getask,
    "/mytask/setask": setask,
  },
};

// 添加路由的方法，method为请求方法，url为请求地址，callback为处理该请求的回调函数
export function addRouter(method, url, callback) {
  // 为便于处理，将method和url统一转换成小写
  method = method.toLowerCase();
  // url = url.toLowerCase();

  // 将处理请求的回调函数，按方法名和地址储存到路由表中
  router[method][url] = callback;
}

// 查找处理请求的回调函数的方法，method为请求方法，url为请求地址，返回处理路由的回调函数
export function findRouter(method, url) {
  // 为便于处理，将method和url统一转换成小写
  method = method.toLowerCase();
  // url = url.toLowerCase();

  // 找到路由对应的回调函数，不存在则默认返回null
  const callback = router[method][url] || null;
  // console.log(method,url,router[method]['/mylog/readMyLog']);
  // console.log(url);

  // 将回调函数返回
  return callback;
}

export function parseUrl(req) {
  let end = 0;
  for (const item of routers) {
    if (url.parse(req.url).path == item.path) {
      // 处理子路径
      if (item.childpath) {
        console.log("handle child");
      } else {
        item.end ? (item.end, console.log(typeof end)) : (item.end = 1);
        end = item.end;
        return end;
      }
    }
  }
  return end;
}

/*
作者：今天你吸猫了么
链接：https://juejin.cn/post/7130227698835652615
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
