import fs from "node:fs";
import path from "node:path";
/**
 * 使用 CommonJS的require加载json文件
 * 注意：如果环境中只能使用ESM模块导入，可以导入module的createRequire方法创建require
 * https://blog.csdn.net/txl910514`
 */
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const demojson = require("../../static/mylog/demo.json");

/**
 * 检测static下的mylog文件
 */
// const path = "./static/mylog";

/**
 * 文件夹生成(年份目录)
 */
export function newLogFile() {
  const data = new Date().getFullYear();
  const yearpath = path.join(process.cwd(), `/static/mylog/${data}`);
  try {
    fs.mkdirSync(yearpath);
  } catch (err) {
    const { name, message } = err;
    if (message.indexOf("exists")) {
      console.log("mylog-" + "文件夹已存在");
    }
  }
  return data;
}

/**
 * json base数据文件生成(月份demo json)
 */
export function newLogFileBaseJson(yearNumber) {
  const filename = new Date().getMonth() + 1 + ".json";
  const basejsonpath = path.join(
    process.cwd(),
    `/static/mylog/${yearNumber}/${filename}`
  );

  const demobj = {};
  demobj.loglist = [];
  for (let i = 0; i < getDays(); i++) {
    demobj.loglist.push({
      title: "今天还啥都没有记录哟",
      yourlog: "这是一条懒猫，啥也没写",
    });
  }

  try {
    if (fs.existsSync(basejsonpath)) {
      //file exists
      console.log("mylog-" + "数据文件已经存在");
    } else {
      fs.writeFile(basejsonpath, JSON.stringify(demobj), (err) => {
        if (err) throw err;
        console.log("mylog-" + "文件生成成功");
      });
    }
    return basejsonpath;
  } catch (err) {
    console.error(err);
  }
}

/**
 * 获取当月天数
 * https://blog.csdn.net/wanping321/article/details/78319638
 */
function getDays() {
  var date = new Date();
  //将当前月份加1，下移到下一个月
  date.setMonth(date.getMonth() + 1);
  //将当前的日期置为0，
  date.setDate(0);
  //再获取天数即取上个月的最后一天的天数
  var days = date.getDate();
  return days;
}

/**
 * 文件内容替换
 * 传入文件内容以及需要替换的行数
 */
export function logReplace(obj, prames) {
  const list = obj.loglist;

  for (const item of Object.keys(prames.logcontent)) {
    list[prames.index][item] = prames.logcontent[item];
  }
  return list;
}

/**
 * 文件写入
 */
