import http from "http";
import url from "url";
import { findRouter } from "./http/router.js";
import { readFile } from "./tool/file/base.js";

const server = http.createServer((req, res) => {
  /* 不处理favicon请求 */
  if (url.parse(req.url).path == "/favicon.ico") return;

  /* 静态资源文件处理 */
  if (req.url.indexOf("/public/") !== -1) {
    //判断请求路径是否包含public目录（简单判断）
    console.log("获取静态文件");
    readFile("." + req.url).then((data) => {
      res.write(data, "binary");
      res.end();
    });
    return;
  }

  /**
   * 解析请求数据
   * 获取请求路径和query数据
   * 获取请求头类型（处理图片）
   */
  const method = req.method;
  const contentType = req.headers["content-type"];
  const { pathname, query } = url.parse(req.url, true);

  /**
   * 处理post请求接收到的数据
   */
  if (method === "POST" && !contentType.includes("multipart/form-data")) {
    console.log(2);
    let str = "";

    req.on("data", (chunk) => {
      str += chunk;
    });
    req.on("end", () => {
      if (str) {
        req.parame = JSON.parse(str);
        processDate(method, pathname, query, {}, {}, req, res, req.parame);
      } else {
        processDate(method, pathname, query, {}, {}, req, res);
      }
    });
  } else if (method === "POST" && contentType.includes("multipart/form-data")) {
    console.log(1);
  } else {
    processDate(method, pathname, query, {}, {}, req, res);
  }

  /**
   * 暂时只支持路由处理，不做其他的默认处理
   */
});

// 通过路由处理请求数据的公共方法
async function processDate(
  method,
  pathname,
  query,
  post,
  files,
  req,
  res,
  parame
) {
  const callback = findRouter(method, pathname);

  // log - req总信息
  // console.log(req.ip, req.connection.remoteAddress, req.server);

  // 若路由返回的不是一个函数，就直接将返回的数据发送
  if (typeof callback !== "function") {
    console.log("处理路由值");
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      Author: "zhangsan",
    });
    const data = JSON.parse(callback);
    const response = {
      success: true,
      message: "数据已收到",
      data,
    };

    // TODO 了解为什么必须是JSON.stringify(res) 不能直接传res吗？
    res.end(JSON.stringify(response));
  }
  // 若回调函数存在，则表示路由有配置相应的数据处理，即该请求不是获取静态文件。
  else if (callback) {
    console.log("处理路由函数");
    try {
      await callback(res, query, post, files, parame);
    } catch (error) {
      // 出现错误的处理
      res.writeHead(500);
      res.write("Internal Server Error", error);
      res.end();
    }
  }
  // 若回调函数不存在，则表示该请求为请求一个静态文件，如html、css、js等
  else {
    console.log("server end");
    return 0;
  }
}

function getPro() {
  return new Promise((res, rej) => {
    res("pro");
  });
}

// 监听配置的端口
server.listen(3090);
// 打印创建服务器成功信息
console.log(`Server started at 3090`);
