# Plan Module mark

startnode 引入了 md 编辑器，使用的是 md-editor-v3，并为 node 增加了静态资源代理和接收图片接口。

### node-静态资源代理

单纯使用node，并不像express一样，设置静态资源文件非常方便，你得对请求链接进行判断：

```js
const server = http.createServer((req, res) => {
  /* 不处理favicon请求 */
  if (url.parse(req.url).path == "/favicon.ico") return;

  /* 静态资源文件处理 */
  if (req.url.indexOf("/public/") !== -1) {
    //判断请求路径是否包含public目录（简单判断）
    console.log("获取静态文件");
    readFile("." + req.url).then((data) => {
      res.write(data, "binary");
      res.end();
    });
    return;
  }
  ...
}
```

然后你就可以访问public文件夹下的文件了。

### node-图片上传

看md-editor-v3给的上传函数demo里要将请求头请求类型设置为“multipart/form-data”，这样设置就会将参数以文件形式传入；  
不过后续处理的时候，接收到的数据会是webkitformboundary，带有额外的编码，然后我图片文件一直写入失败（写入了但是图片无法显示）...  
烦内，后来进行多方百度，将请求类型设置为application/octet-stream，并且对接收参数进行buffer处理：

```js
else if (
    method === "POST" &&
    contentType.includes("application/octet-stream")
  ) {
    const data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const buffer = Buffer.concat(data);
      processDateWithReq(method, pathname, query, {}, {}, req, res, buffer);
    });
  } else {
    ...
  }
```

同样，接口操作函数也需要对接受到的buffer进行处理：

```js
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
```

ok，这样就完成了图片资源的上传。

### md-editor-v3 save数据转md

然后在前端项目里做好文件的存储就行。不过有个问题就是md-editor-v3的文件保存，上传的数据是html的，不过我们编辑的是md文件，所以需要二次编辑的时候，我们拿到的数据还是html，而md-editor-v3好像不提供html转md，所以我们要使用第三方库帮我们对html进行转换。

这里我们用turndown这个库进行转换，在node下引入这个库。记得做好配置，不然他不会解析h标签。

```js
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

...

const turndown = new turndownService(turndownServiceOption);
const markdown = turndown.turndown(JSON.parse(data));
...
```