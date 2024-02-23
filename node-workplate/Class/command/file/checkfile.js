import {
  checkFolderPath,
  checkFilePresenceOne,
  generateDirectory,
  checkFilePresence,
  generateEmptyJsonFile,
  writeToJsonFile,
  initjsonDefault,
} from "../../../tool/file/base.js";

/**
 * 检测是否存在目标文件并生成对应文件目录和json文件,它只负责文件的检测以及检测结果处理
 *
 * 默认传入defaultname参数作为文件夹的起始点（`/static/${defaultname}/`）就是文件夹的名字
 * 而我喜欢用年月作为文件路径，所以拼接的时候也是用这个
 */
export const CheckFile = function (defaultname) {
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
    `${year}年度` +
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
    generateEmptyJsonFile(filejsonpathyear);
  }
};

