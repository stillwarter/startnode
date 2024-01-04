import fs from "node:fs";

/**
 * 检测某路径下是否存在某文件
 * （使用豆包ai生成，有改动）
 */
export function checkFilePresence(folderPath, fileName) {
  // 拼接文件完整路径
  const filePath = `${folderPath}/${fileName}`;
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

/**
 * 文件目录生成
 * （使用豆包ai生成，有改动）
 */
export function generateDirectory(directoryPath) {
  console.log("myplan-不在年份文件夹，生成中...");
  // 使用 fs.mkdir 方法创建目录
  fs.mkdir(directoryPath, { recursive: true }, (error) => {
    if (error) {
      console.error(`创建目录失败: ${error}`);
      return;
    }

    console.log(`目录 ${directoryPath} 已成功生成`);
  });
}

/**
 * 空文件生成（xxx.json）
 * （使用豆包ai生成，有改动）
 */
export function generateEmptyJsonFile(filePath) {
  // 使用 fs.writeFile 方法来生成空文件
  fs.writeFile(filePath, "", (error) => {
    if (error) {
      console.error(`生成空文件失败: ${error}`);
      return;
    }

    console.log(`空文件 ${filePath} 已成功生成`);
  });
}

/**
 * json文件写入
 * （使用豆包ai生成，有改动）
 */
function writeToJsonFile(filename, data, callback) {
  // 使用 fs.writeFile 方法来写入文件
  fs.writeFile(filename, data, (error) => {
    if (error) {
      console.error(`写入文件失败: ${error}`);
      return;
    }

    console.log(`文件 ${filename} 已成功写入`);

    if (callback) {
      callback();
    }
  });
}
