import fs from "node:fs";

import { CheckFile } from "../../Class/command/file/checkfile.js";
import { getFileNamePath } from "../../Class/ESMbase.js";
/**
 * 将每天的预定任务记录下来
 * 分为宏任务和微任务
 */

export function getask() {
  // 检测是否有对应文件，没有就生成
  const { __puerfilename } = getFileNamePath(import.meta.url);
  CheckFile(__puerfilename);
  
}

export function setask() {}

// TODO
/**
 * 生成本月task json文件
 * 生成的是当月的任务，所以只需要生成并收集当日的任务和过去的任务，没有对应的日期数据就生成空。
 * 
 * 想想我对这个任务列表有什么需求:
 * 分成宏任务和微任务，宏任务是年度任务，微任务是每日任务（装入月度json文件里，像log那样）
 * 
 * 所以得考虑一下自己的文件夹生成函数（todo），最好分离一下，需要年的用年度，需要细化为月的用月度（就像plan一样）
 * 然后再是具体的json文件生成函数（todo），这次的需求是生成任务的，下次需求可能会改，做好扩展性。
 * 以及后续的文件修改与删除，不过这部分应该被文件生成容纳了？
 * 
 * 宏任务需要做好备注，一个年度任务肯定是分为几个大步骤去完成了
 * 微任务做好计时器和提醒，不要让外界干扰你的任务进度 （todo）
 * 
 * 
 * 后续就是页面相关，暂缓
 */
function generateCurrentMonthTask(){}