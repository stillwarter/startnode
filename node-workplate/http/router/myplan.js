import fs from "node:fs";

import { checkFilePresence } from "../../tool/file/base.js";

/**
 * 增加计划书
 *
 * step1：判断plan文件夹下是否有该文件，没有就新增一个空的json文件，有就进行覆盖
 *        需要做一个文件存在判断，一个文件新增，一个文件覆盖
 */
export function addMyPlan(res, query, post, filesr, prames) {
    // console.log("get prames:", prames);
  //   console.log(JSON.parse(prames));
  //   const a=checkFilePresence()
  console.log(process.cwd());
}
