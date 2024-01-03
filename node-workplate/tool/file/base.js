import fs from "node:fs";
/**
 * 检测某路径下是否存在某文件
 * （使用豆包ai生成）
 */
export function checkFilePresence(folderPath, fileName) {
  // 拼接文件完整路径
  const filePath = `${folderPath}/${fileName}`;

  // 使用 fs.existsSync 方法检测文件是否存在
  return fs.existsSync(filePath);
}
