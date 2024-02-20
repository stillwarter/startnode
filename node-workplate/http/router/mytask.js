import fs from "node:fs";

import { CheckFile } from "../../Class/command/checkfile.js";
import { getFileNamePath } from "../../Class/ESMbase.js";
/**
 * 将每天的预定任务记录下来
 * 分为宏任务和微任务
 */

export function getask() {
  const { __puerfilename } = getFileNamePath(import.meta.url);
  CheckFile(__puerfilename);
  
}

export function setask() {}

/**
 * 生成本月task json文件
 */
function generateCurrentMonthTask(){}