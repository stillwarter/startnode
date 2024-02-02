<script setup>
import { ref, reactive } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const state = reactive({
  text: "<h1>tst</h1> <h2>目录1</h2>第一部分内容 <h2>目录2</h2> 第2部分内容<h2>目录3</h2> 第3部分内容",
  id: "my-editor",
});
const tt = `
# Plan Module mark

startnode 引入了 md 编辑器，使用的是 md-editor-v3，并为 node 增加了静态资源代理和接收图片接口。

### node-静态资源代理

单纯使用node，并不像express一样，设置静态资源文件非常方便，你得对请求链接进行判断：



然后你就可以访问public文件夹下的文件了。

### node-图片上传

看md-editor-v3给的上传函数demo里要将请求头请求类型设置为“multipart/form-data”，这样设置就会将参数以文件形式传入；  
不过后续处理的时候，接收到的数据会是webkitformboundary，带有额外的编码，然后我图片文件一直写入失败（写入了但是图片无法显示）...  
烦内，后来进行多方百度，将请求类型设置为application/octet-stream，并且对接收参数进行buffer处理：



同样，接口操作函数也需要对接受到的buffer进行处理：



ok，这样就完成了图片资源的上传。

### md-editor-v3 save数据转md

然后在前端项目里做好文件的存储就行。不过有个问题就是md-editor-v3的文件保存，上传的数据是html的，不过我们编辑的是md文件，所以需要二次编辑的时候，我们拿到的数据还是html，而md-editor-v3好像不提供html转md，所以我们要使用第三方库帮我们对html进行转换。

这里我们用turndown这个库进行转换，在node下引入这个库。记得做好配置，不然他不会解析h标签。


`;
const text = ref(tt);

const scrollElement = document.documentElement;
</script>

<template>
  <MdPreview :editorId="state.id" :modelValue="text" />
  <MdCatalog :editorId="state.id" :scrollElement="scrollElement" />
</template>
