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

/**
 * 文件读取promise
 */
export function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "binary", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

/**
 * 图片可写流，用于写入大图片
 */
function writeLargeImageFile(filename, imageData, callback) {
  // 创建一个可写的数据流
  const writeStream = fs.createWriteStream(filename);

  // 监听数据流的错误事件
  writeStream.on("error", (error) => {
    console.error(`写入图片文件失败: ${error}`);
    if (callback) {
      callback(error);
    }
  });

  // 监听数据流的 'finish' 事件，表示写入完成
  writeStream.on("finish", () => {
    console.log(`图片文件 ${filename} 已成功写入`);
    if (callback) {
      callback();
    }
  });

  // 将图像数据写入数据流
  writeStream.write(imageData);
}

// writeLargeImageFile 示例调用
// const imageData = "二进制的图像数据";
// writeLargeImageFile("image.png", imageData, (error) => {
//   if (error) {
//     console.error("写入图片文件的操作已完成，但发生了错误:", error);
//   } else {
//     console.log("写入图片文件的操作已完成，没有错误");
//   }
// });
