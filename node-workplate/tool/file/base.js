import fs from "node:fs";

/**
 * 检测某路径下是否存在某文件
 * （使用豆包ai生成）
 */
export function checkFilePresence(folderPath, fileName) {
  // 拼接文件完整路径
  const filePath = process.cwd() + `/${folderPath}/${fileName}`;

  console.log(filePath);
  // 使用 fs.existsSync 方法检测文件是否存在
  return fs.existsSync(filePath);
}

/**
 * 检测某路径下是否存在某文件夹
 * （使用豆包ai生成）
 */
export function checkFolderPath(path) {
  try {
    // 使用 fs.stat 方法检测文件夹是否存在
    fs.statSync(path);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
    // 其他错误，需要进行错误处理
    throw err;
  }
}
