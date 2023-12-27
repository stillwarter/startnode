// 1.  导入 http 模块
// const http = require('http');
import http from "http";
import url from "url";
import { parseUrl } from "./router.js";

// 2.  创建 web 服务器实例
const server = http.createServer();

// 3. 启动服务器
server.listen(3099, () => {
  console.log("my server start work11");
});

// 4. 为服务器实例绑定 request 事件，监听客户端的请求
// 当客户端发送请求到服务器的时候，会触发这个事件
// server.on("request", () => {
//   // 这里要处理客户端的请求
//   console.log("hello html");
// });

server.on("request", (req, res) => {
  if (url.parse(req.url).path == "/favicon.ico") return;

  const end = parseUrl(req);

  if (!end) {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf-8",
      Author: "zhangsan",
    });
    res.end("error,路由不匹配");
    return;
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      Author: "zhangsan",
    });
    let data = end;
    const json = JSON.parse(data);
    const response = {
      success: true,
      message: "数据已收到",
      data: json,
    };
    res.end(JSON.stringify(response));
  }

  // req request  请求，通过req对象可以获取到所有和请求相关的信息
  // res response 响应，通过res对象可以做出响应以及设置一些和响应相关的内容

  // // 设置响应头
  // res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // res.setHeader('Author', 'zhangsan'); // 自己设置响应头，不要用中文
  // // 设置响应状态码
  // res.statusCode = 200;

  // res.setHeader("Content-Type", "text/html; charset=utf-8");
  // 综合性的设置响应状态码和响应头的方法
  // res.writeHead(200, {
  //   "Content-Type": "text/html; charset=utf-8",
  //   Author: "zhangsan",
  // });
  // // write方法，也可以设置响应体，但是没有做出响应的意思，只是单纯的设置响应体
  // // res.json({ success: true, message: "登入成功" });
  // // res.end(响应体); // 做出响应
  // // res.end("hello，你的请求我收到了");
  // let data = "111";
  // const json = JSON.parse(data);
  // const response = {
  //   success: true,
  //   message: "数据已收到",
  //   data: json,
  // };
  // res.end(JSON.stringify(response));
  // 做出响应之后，不能再有其他代码。
});

/*
作者：L同学啦啦啦
链接：https://juejin.cn/post/7089030300251979813
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/

/**
 * log
 *
 * 为什么node响应两次
 *
 * 由于在浏览器里，浏览器会额外请求
 */
