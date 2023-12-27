import fs from "node:fs";

let end = "";

// 读取文件信息？
fs.readFile("./static/tt.txt", "utf-8", (err, data) => {
  if (err) throw err;
  else {
    end = data;
  }
});


export function test(res, query, post, files) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    Author: "zhangsan",
  });
  const data = end;
  const response = {
    success: true,
    message: "数据已收到",
    data,
  };
  res.end(JSON.stringify(response));
}
