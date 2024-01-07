import fs from "node:fs";
import {
  checkFilePresence,
  checkFolderPath,
  generateDirectory,
  generateEmptyJsonFile,
  readPathAllFileName,
} from "../../tool/file/base.js";
import turndownService from "turndown";
const turndownServiceOption = {
  headingStyle: "atx",
  hr: "___",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  fence: "```",
  emDelimiter: "_",
  strongDelimiter: "**",
  linkStyle: "inlined",
  linkReferenceStyle: "full",
  preformattedCode: "false",
};
/**
 * 增加计划书接口
 *
 * step1：判断plan文件夹下是否有该文件，没有就新增一个空的json文件，有就进行覆盖
 *        需要做一个文件夹存在判断，一个文件夹新增
 * step1.1: 衍生需求，在写入数据的时候可能需要上传照片，我想直接做一个静态文件，
 *          放到后台，可以直接访问
 *          https://blog.csdn.net/AiHuanhuan110/article/details/107315206#
 * step1.2: 完成静态资源托管后，需要完成照片的上传功能；转入imgpost接口
 * step2：有了文件夹，就可以往里面加入文件了，初次先判断是否有该文件，有就直接写入
 *        没有就先生成再写入
 */
export function addMyPlan(res, query, post, filesr, prames) {
  const { update, data } = prames;
  const updatelist = update.split("-").splice(0, 2);

  // 年份文件夹和月份文件夹
  const ypath = process.cwd() + "/static/myplan/" + updatelist[0];
  const mpath = ypath + "/" + updatelist[1];

  // 文件夹存在性判断
  checkFolderPath(ypath)
    ? console.log("myplan-存在年份文件夹")
    : generateDirectory(ypath);
  checkFolderPath(mpath)
    ? console.log("myplan-存在月份文件夹")
    : generateDirectory(mpath);

  // 判断是否存在plan md文件
  const planitemtitle = getPramesContent(JSON.parse(data)) + ".md";
  const theplanpath = mpath + "/" + planitemtitle;

  checkFilePresence(mpath, planitemtitle)
    ? console.log("myplan-存在对应md")
    : generateEmptyJsonFile(theplanpath);

  const turndown = new turndownService(turndownServiceOption);
  const markdown = turndown.turndown(JSON.parse(data));
  fs.writeFile(theplanpath, markdown, (error) => {
    if (error) {
      console.error(`文章上传: ${error}`);
      return;
    }
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      Author: "zhangsan",
    });

    const response = {
      success: true,
      message: "文章上传成功",
    };
    res.end(JSON.stringify(response));
  });
}

/**
 *  addMyPlan parmaes 字符串解析
 * （使用豆包ai生成，有改动）
 */
function getPramesContent(str) {
  const reg = /id="([^"]*)"/;
  const [, content] = str.match(reg);
  return content;
}

/**
 * 获取当月的md文件
 * step1:获取当月信息，拼接路径
 * step2:调用tool函数，获取数据
 */
export function readMyPlan(res, query, post, filesr, prames) {
  const year = new Date().getFullYear();
  let mouth = new Date().getMonth() + 1;

  mouth > 10 ? mouth : (mouth = "0" + mouth);
  const filepath = process.cwd() + "/static/myplan/" + year + "/" + mouth;
  const filenamelist = readPathAllFileName(filepath);
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    Author: "zhangsan",
  });
  const response = {
    success: true,
    message: "数据获取成功",
    data: filenamelist,
  };
  res.end(JSON.stringify(response));
}

/**
 * 通过文件名获取当月md文件数据
 */
export function getMyPlanCtx(res, query, post, filesr, prames) {
  const year = new Date().getFullYear();
  let mouth = new Date().getMonth() + 1;

  mouth > 10 ? mouth : (mouth = "0" + mouth);
  const filepath =
    process.cwd() +
    "/static/myplan/" +
    year +
    "/" +
    mouth +
    "/" +
    prames.title +
    ".md";

  const fileStream = fs.createReadStream(filepath);
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
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      Author: "zhangsan",
    });
    const response = {
      success: true,
      message: "数据获取成功",
      data: content,
    };
    res.end(JSON.stringify(response));
  });
}
