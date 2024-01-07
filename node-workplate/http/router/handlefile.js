import fs from "node:fs";

let end = "";

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
