import fs from "node:fs";
import path from "node:path";
import { checkFilePresence, checkFolderPath } from "../../tool/file/base.js";

/**
 * 增加计划书
 *
 * step1：判断plan文件夹下是否有该文件，没有就新增一个空的json文件，有就进行覆盖
 *        需要做一个文件存在判断，一个文件新增，一个文件覆盖
 */
export function addMyPlan(res, query, post, filesr, prames) {
  const { update, data } = prames;
  const updatelist = update.split("-").splice(0, 2);
  // 文件夹检测
  const folderpath = updatelist[0];
  // 年份文件夹和月份文件夹
  const ypath = process.cwd() + "/static/myplan/" + updatelist[0];
  const mpath = ypath + "/" + updatelist[1];
  // console.log(ypath,mpath);

  const end = checkFolderPath(ypath);
  console.log(end);
  // console.log(end);
  // checkFilePresence();
  // console.log("get prames:", prames);
  //   console.log(JSON.parse(prames));
  //   const a=checkFilePresence()
  // console.log(process.cwd());
}
