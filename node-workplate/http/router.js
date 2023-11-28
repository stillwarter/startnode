import url from "url";
// export const router = {
//   handleRequest(req, response) {
//     // 避免ico请求导致响应2次
//     if (url.parse(req.url).path == "/favicon.ico") return;
//     response.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//   },
// };

const routers = [
  {
    path: "/",
    name: "home",
  },
  {
    path: "/baseinfo",
    name: "baseinfo",
    end: JSON.stringify(process),
  },
];

export function parseUrl(req) {
  let end = 0;
  for (const item of routers) {
    if (url.parse(req.url).path == item.path) {
      item.end ? item.end : (item.end = 1);
      end = item.end;
      return end;
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
