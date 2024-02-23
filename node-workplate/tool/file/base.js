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

export function checkFilePresenceOne(filePath) {
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
  console.log(`${directoryPath}-不存在年份文件夹，生成中...`);
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
export function writeToJsonFile(filename, data, callback) {
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
 * 获取目标文件路径下的所有文件名
 */
export function readPathAllFileName(filePath) {
  const files = fs.readdirSync(filePath);

  // 过滤出文件名（排除 . 和 ..）
  const filenames = files.filter(
    (filename) => filename !== "." && filename !== ".."
  );

  return filenames;
}

/**
 * 图片可写流，用于写入大图片
 */
export function writeLargeImageFile(filename, imageData, callback) {
  // const read = fs.createReadStream(process.cwd() + "/public/img/1.jpg");
  // 创建一个可写的数据流
  const writeStream = fs.createWriteStream(filename, {
    // encoding: "base64",
    autoClose: true,
  });

  // 监听数据流的错误事件
  writeStream.on("error", (error) => {
    console.error(`写入图片文件失败: ${error}`);
    if (callback) {
      callback(error);
    }
  });

  // 获取data
  writeStream.on("data", (data) => {
    console.log(`接收数据`);
  });

  // 监听数据流的 'finish' 事件，表示写入完成
  writeStream.on("finish", () => {
    console.log(`图片文件 ${filename} 已成功写入`);
    if (callback) {
      callback();
    }
  });
} // 根据文件名获取文件内容的函数

/**
 * 文件读取 demo
 */
export function getFileContent(fileName) {
  // 以读文件的方式打开文件
  const fileStream = fs.createReadStream(fileName);
  let content = "";
  // 创建一个回调函数，用于处理读取的数据
  const callback = (data) => {
    content = data.toString();
    // 在这里你可以对文件内容进行进一步的处理
    // console.log(content);
  };

  // 在文件流上注册数据回调函数
  fileStream.on("data", callback);

  // 处理文件读取错误
  fileStream.on("error", (error) => {
    console.error(`文件读取错误: ${error}`);
  });

  // 文件读取完成时触发
  fileStream.on("end", () => {
    console.log("文件读取完成");
    return content;
  });
}

/**
 * json空文件初始化
 */
export function initjsonDefault(filepath, obj = {}, mouth = 1) {
  const aimarr = [];
  const date = new Date();
  const year = date.getFullYear();
  const days = new Date(year, mouth, 0).getDate();
  for (let index = 0; index < days; index++) {
    aimarr.push([obj]);
  }
  fs.writeFile(filepath, JSON.stringify(aimarr), (error) => {
    if (error) {
      console.error(`目标文件生成失败: ${error}`);
      return;
    }

    console.log(`目标文件 ${filepath} 已初始化生成`);
  });
}

/**
 * 下面的异步函数统一由豆包ai生成
 */
// 异步检查文件夹路径是否存在的函数
export const checkFolderPathAsync = (filepath) =>
  new Promise((resolve, reject) => {
    fs.access(filepath, fs.constants.F_OK, (error) => {
      if (!error) {
        resolve(true);
      } else {
        reject(new Error(`文件夹路径 '${filepath}' 不存在`));
      }
    });
  });

// 异步生成目录的函数
export const generateDirectoryAsync = (filepath) =>
  new Promise((resolve, reject) => {
    fs.mkdir(filepath, { recursive: true }, (error) => {
      if (!error) {
        resolve(true);
      } else {
        reject(new Error(`无法创建目录 '${filepath}'`));
      }
    });
  });

// 异步检查文件是否存在的函数
export const checkFilePresenceOneAsync = (filejsonpath) =>
  new Promise((resolve, reject) => {
    fs.access(filejsonpath, fs.constants.F_OK, (error) => {
      if (!error) {
        resolve(true);
      } else {
        reject(new Error(`文件 '${filejsonpath}' 不存在`));
      }
    });
  });

// 异步生成空 JSON 文件的函数
export const generateEmptyJsonFileAsync = (filejsonpath) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filejsonpath, "{}", (error) => {
      if (!error) {
        resolve(true);
      } else {
        reject(new Error(`无法生成空 JSON 文件 '${filejsonpath}'`));
      }
    });
  });

// 异步初始化 JSON 文件默认值的函数
export const initjsonDefaultAsync = (filejsonpath, daytaskobj, mouth) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filejsonpath, JSON.stringify(daytaskobj), (error) => {
      if (!error) {
        resolve(true);
      } else {
        reject(new Error(`无法初始化 JSON 文件 '${filejsonpath}'`));
      }
    });
  });
