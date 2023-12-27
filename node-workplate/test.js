import fs from "node:fs";
import path from "node:path";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const demojson = require("./static/mylog/demo.json");

const data = new Date().getFullYear();

const tpath = path.join(process.cwd(), `/static/mylog/${data}`);

/**
 * 文件夹生成
 */
function newLogFile() {
  try {
    fs.mkdirSync(tpath);
  } catch (err) {
    const { name, message } = err;
    if (message.indexOf("exists")) {
      console.log("文件夹已存在");
    }
    return 0;
  }
}

/**
 * json base数据文件生成(月份demo json)
 */
export function newLogFileBaseJson(yearNumber) {
  const filename = new Date().getMonth() + 1 + ".json";
  // console.log(filename);
  const filecontent = "test";
  const basejsonpath = path.join(
    process.cwd(),
    `/static/mylog/${yearNumber}/${filename}`
  );

  fs.writeFile(basejsonpath, filecontent, (err) => {
    if (err) throw err;
    console.log("文件生成成功");
  });
}

/**
 * 读取base数据文件
 */
const logpath = "./static/mylog/2023/12.json";
let logdata = "";
function readMyLogFile(logpath) {
  // fs.readFileSync(logpath, "utf-8", (err, data) => {
  //   if (err) throw err;
  //   else {
  //     // logdata = data;
  //     return data;
  //   }
  // });
  const stream = fs.createReadStream(logpath);
  console.log(stream);
}

const stream = fs.createReadStream(logpath, {
  encoding: "utf-8",
  autoClose: true,
});

stream.on("open", () => {
  console.log("文件流open");
});

stream.on("data", (chunk) => {
  console.log(typeof chunk);
});
