/**
 * 这个类负责写入新的文件，以及建立路径
 *
 * 1. 日期好像是由前端传入的？不过想想，好像不需要传入时间参数，调用的时候直接取当前的年月数据就可以了。所以在实例化这个类的时候，需要提前写入年月数据。
 * 2. 在有了年月数据后，需要生成目标文件路径。
 * 3. 在文件路径后，需要判断写入的文件是否存在，不存在就生成文件夹。
 * 4. 判断是否存在目标文件。
 * 5. 进行文件写入。
 *
 * 我们先展示替换掉前2步 作为简化代码的方法
 */
import { checkFolderPath, generateDirectory } from "../tool/file/base.js";
export class FilePathModule {
  constructor(aimpath) {
    this.aimpath = aimpath;
    this.data = new Date();
  }

  setPath() {
    const ypath = process.cwd() + this.aimpath + this.data.getFullYear();
    const mpath = ypath + "/" + this.data.getMonth() + 1;

    // 文件夹存在性判断
    checkFolderPath(ypath)
      ? console.log("myplan-存在年份文件夹")
      : generateDirectory(ypath);
    checkFolderPath(mpath)
      ? console.log("myplan-存在月份文件夹")
      : generateDirectory(mpath);

    return { ypath, mpath };
  }
}
