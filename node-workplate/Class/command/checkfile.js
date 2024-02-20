import {
  checkFolderPath,
  generateDirectory,
} from "../../tool/file/base.js";

/**
 * 检测是否存在目标文件
 */
export const CheckFile = function (defaulname) {
  const year = new Date().getFullYear();
  let mouth = new Date().getMonth() + 1;
  mouth > 10 ? mouth : (mouth = "0" + mouth);
  const filepath = process.cwd() + `/static/${defaulname}/` + year + "/" + mouth;

  if (!checkFolderPath(filepath)) {
    generateDirectory(filepath);
  }
};
