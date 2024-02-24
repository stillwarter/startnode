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
 * 任务记录，需要哪些东西呢？
 *   每日任务：
 *      起始日期：startDate
 *      任务标题：taskTitle
 *      完成时间：endDate
 *      任务简介：taskInfo
 *      任务完成度：taskFinishDeg
 *
 * 宏任务需要做好备注，一个年度任务肯定是分为几个大步骤去完成了
 * 微任务做好计时器和提醒，不要让外界干扰你的任务进度 （todo）
 *
 *
 * 后续就是页面相关，暂缓
 */

import fs from "node:fs";

import { getFileNamePath } from "../../Class/ESMbase.js";
/**
 * 将每天的预定任务记录下来
 * 分为宏任务和微任务
 */

export function geDaytask(res, query, post, files) {
  let logdata = "";
  // 检测是否有对应文件，没有就生成
  const { __puerfilename } = getFileNamePath(import.meta.url);
  const filejsonpath = CheckFile(__puerfilename);

  const stream = fs.createReadStream(filejsonpath, {
    encoding: "utf-8",
    autoClose: true,
  });

  stream.on("open", () => {
    console.log(__puerfilename + "文件流open");
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
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    };

    res.end(JSON.stringify(response));
  });

  stream.on("end", () => {
    console.log(__puerfilename + "文件流销毁");
    stream.destroy();
  });
}

export function setask() {}

function generateCurrentMonthTask() {}

import {
  checkFolderPath,
  checkFilePresenceOne,
  generateDirectory,
  checkFilePresence,
  generateEmptyJsonFile,
  writeToJsonFile,
  initjsonDefault,
  checkFolderPathAsync,
  generateDirectoryAsync,
  checkFilePresenceOneAsync,
  initjsonDefaultAsync,
} from "../../tool/file/base.js";
const CheckFile = function (defaultname) {
  const year = new Date().getFullYear();
  const mouth = new Date().getMonth() + 1;
  const filepath = process.cwd() + `/static/${defaultname}/` + year;
  const filejsonpath =
    process.cwd() + `/static/${defaultname}/` + year + "/" + mouth + ".json";
  const filejsonpathyear =
    process.cwd() +
    `/static/${defaultname}/` +
    year +
    "/" +
    `${year}年度11` +
    ".json";
  if (!checkFolderPath(filepath)) {
    generateDirectory(filepath);
  }

  if (!checkFilePresenceOne(filejsonpath)) {
    generateEmptyJsonFile(filejsonpath);
    const daytaskobj = {
      startDate: "",
      taskTitle: "",
      endDate: "",
      taskInfo: "",
      taskFinishDeg: "",
      taskTag: "",
    };
    initjsonDefault(filejsonpath, daytaskobj, mouth);
  }

  if (!checkFilePresenceOne(filejsonpathyear)) {
    generateEmptyJsonFile(filejsonpathyear);
  }

  return filejsonpath;
};
