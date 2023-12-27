// 引入创建服务器所需的模块
import http from "http";
import url from "url";
import { HTTP_PORT } from "./config/index.js";

const server = http.createServer((req, res) => {
  /**
   * 解析请求数据
   * 获取请求路径以及query数据
   */
  const method = req.method;
  const { pathname, query } = url.parse(req.url, true);

  /**
   * 设置默认响应头
   */
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  /**
   * 根据method处理不同请求
   */
  if (method === "POST") {
    console.log("已接收post请求");
  } else {
    console.log("已接收get请求");
  }
});

/* 监听配置的端口 */
server.listen(HTTP_PORT);

/* 打印服务运行成功 */
console.log("server start at" + HTTP_PORT);

/* 通过路由处理请求数据的公共方法 */
async function processData(method, pathname, query, post, files) {
  const callback = 0;
}
