import { fileURLToPath } from "url";
import path from "path";

// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);
// export const __puerfilename = __filename.split("/").pop();

/**
 * 
 * @param {*} defaulturl 默认url 一般是import.meta.url
 * @returns 
 * 
 * 该函数用获取当前的文件名和文件夹，某种程度上可以解决ESM模式下没有__filename，__dirname的问题
 */
export const getFileNamePath = function (defaulturl) {
  return {
    __filename: fileURLToPath(defaulturl),
    __dirname: path.dirname(fileURLToPath(defaulturl)),
    __puerfilename: fileURLToPath(defaulturl).split("\\").pop().split('.')[0],
  };
};
