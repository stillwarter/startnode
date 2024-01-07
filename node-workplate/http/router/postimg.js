import fs from "node:fs";
import { checkFolderPath, generateDirectory } from "../../tool/file/base.js";
/**
 * 将请求上传的img写入指定文件夹下。
 */
export function postImg(req, res, query, post, filesr, prames) {
  const updatelist = query.update.split("-").splice(0, 2);
  // 年份文件夹和月份文件夹
  const ypath = process.cwd() + "/public/img/" + updatelist[0];
  const mpath = ypath + "/" + updatelist[1];

  // 文件夹存在性判断
  checkFolderPath(ypath)
    ? console.log("postimg-存在年份文件夹")
    : generateDirectory(ypath);
  checkFolderPath(mpath)
    ? console.log("postimg-存在月份文件夹")
    : generateDirectory(mpath);

  // 创建一个文件名
  const fileName = Date.now() + ".png";
  const imgpath = mpath + "/" + Date.now() + ".png";

  const imageData = Buffer.from(prames);
  fs.writeFile(imgpath, imageData, (error) => {
    if (error) {
      console.error(`图片上传失败: ${error}`);
      return;
    }
    console.log(`图片上传成功`);
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      Author: "zhangsan",
    });

    const response = {
      success: true,
      message: "图片上传成功",
      imgname: fileName,
      fileposition:
        "http://localhost:3090/public/img/" + updatelist[0] + "/" + updatelist[1],
    };
    res.end(JSON.stringify(response));
  });
}
