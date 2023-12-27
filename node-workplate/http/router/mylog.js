import fs from "node:fs";
import {
  newLogFile,
  newLogFileBaseJson,
  logReplace,
} from "../../tool/mylogfile/base.js";

/**
 * readMyLog 读取当月log数据
 *
 * 读取时候，需要生成，本月的log json数据
 *  - 首先检测当年年份 是否有今年的年份目录文件
 *    存在就继续下一步，不存在就创建
 *  - 然后在该目录下创建对应的demo文件
 *    不同于创建目录，重复创建会覆盖原文件内容，所以创建前需要先判断该文件是否存在
 *    由于每月的天数可能不一样，所以我们的json数据文件最好是动态生成的
 *  - 有了原数据，我们就需要在这个数据上进行更改
 *    也就是说需要处理获得的数据
 *    由于生成的数据量较少，所以我们可以直接去写入；
 *    而处理编辑我自己的log数据，最好还是用stream写入，减少数据传递服务内存的损耗
 */
export function readMyLog(res, query, post, files) {
  let logpath = "";
  let logdata = "";
  const yearNumber = newLogFile();
  if (yearNumber) {
    logpath = newLogFileBaseJson(yearNumber);
  }

  const stream = fs.createReadStream(logpath, {
    encoding: "utf-8",
    autoClose: true,
  });

  stream.on("open", () => {
    console.log("mylog-" + "文件流open");
  });

  stream.on("data", (chunk) => {
    logdata = chunk;
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      Author: "zhangsan",
    });

    const response = {
      success: true,
      message: "数据已收到",
      data: JSON.parse(logdata),
    };

    res.end(JSON.stringify(response));
  });

  stream.on("end", () => {
    console.log("mylog-" + "文件流销毁");
    stream.destroy();
  });
}

/**
 * addMyLog 写入log数据
 *
 * 该函数用于编辑我们的log数据
 * - 首先需要需要找到数据对应地方，第一步还是创建可读流
 * - 读取速度，优化什么的放到以后考虑吧
 */
export function addMyLog(res, query, post, filesr, prames) {
  let logpath = "";
  let logdata = "";
  const yearNumber = newLogFile();
  if (yearNumber) {
    logpath = newLogFileBaseJson(yearNumber);
  }

  const stream = fs.createReadStream(logpath, {
    encoding: "utf-8",
    autoClose: true,
  });

  stream.on("open", () => {
    console.log("mylog-" + "读取文件");
  });

  stream.on("data", (chunk) => {
    logdata = JSON.parse(chunk);
  });
  stream.on("end", () => {
    logReplace(logdata, prames);
    fs.writeFileSync(logpath, JSON.stringify(logdata));
    stream.destroy();
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      Author: "zhangsan",
    });
    const response = {
      success: true,
      message: "日志已修改",
    };
    res.end(JSON.stringify(response));
  });
  return 1;
}
