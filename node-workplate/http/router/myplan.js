import fs from "node:fs";
import path from "node:path";
import {
  checkFilePresence,
  checkFolderPath,
  generateDirectory,
  generateEmptyJsonFile,
} from "../../tool/file/base.js";

/**
 * 增加计划书
 *
 * step1：判断plan文件夹下是否有该文件，没有就新增一个空的json文件，有就进行覆盖
 *        需要做一个文件夹存在判断，一个文件夹新增
 * step2：有了文件夹，就可以往里面加入文件了，初次先判断是否有
 *
 */
export function addMyPlan(res, query, post, filesr, prames) {
  const { update, data } = prames;
  const updatelist = update.split("-").splice(0, 2);

  // 年份文件夹和月份文件夹
  const ypath = process.cwd() + "/static/myplan/" + updatelist[0];
  const mpath = ypath + "/" + updatelist[1];

  // 文件夹存在性判断
  checkFolderPath(ypath)
    ? console.log("myplan-存在年份文件夹")
    : generateDirectory(ypath);
  checkFolderPath(mpath)
    ? console.log("myplan-存在月份文件夹")
    : generateDirectory(mpath);

  // 判断是否存在plan json文件
  const planitemtitle = getPramesContent(JSON.parse(data)) + ".json";
  const theplanpath = mpath + "/" + planitemtitle;

  checkFilePresence(mpath, planitemtitle)
    ? console.log("myplan-存在对应计划文件")
    : generateEmptyJsonFile(theplanpath);

  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    Author: "zhangsan",
  });
  const response = {
    success: true,
    message: "计划已修改",
  };
  res.end(JSON.stringify(response));

  // generateEmptyJsonFile(planitemtitle)

  // console.log(end);
  // checkFilePresence();
  // console.log("get prames:", prames);
  //   console.log(JSON.parse(prames));
  //   const a=checkFilePresence()
  // console.log(process.cwd());
}

/**
 *  addMyPlan parmaes 字符串解析
 * （使用豆包ai生成，有改动）
 */
function getPramesContent(str) {
  const reg = /id="([^"]*)"/;
  const [, content] = str.match(reg);
  return content;
}
