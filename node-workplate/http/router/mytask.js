import fs from "node:fs";
import {
  checkFolderPath,
  generateDirectory,
} from "../../tool/file/base.js";
/**
 * 将每天的预定任务记录下来
 * 分为宏任务和微任务
 */

export function getask() {
  const year = new Date().getFullYear();
  let mouth = new Date().getMonth() + 1;
  mouth > 10 ? mouth : (mouth = "0" + mouth);
  const filepath = process.cwd() + "/static/mytask/" + year + "/" + mouth;

  if (!checkFolderPath(filepath)) {
    generateDirectory(filepath);
  }
}

export function setask() {}
