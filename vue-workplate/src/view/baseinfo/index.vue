<script setup>
import { getProcess } from "@/api/index";
import { ref } from "vue";
let data = ref({});
getProcess().then((res) => {
  data = res.data.data;
  console.log(data);
});
</script>

<template>
  <div id="baseinfo">
    <h1>node-process</h1>
    <p>the page show the variable of overall situation that node-process</p>
    <p>在node中，有一个process的全局变量</p>
    <h3>node version（node版本）：{{ data.version }}</h3>

    <h3>node versions（node运行环境版本）：</h3>
    <div style="padding-left: 8px;">
      <p>node ares：{{ data.versions.ares }}</p>
      <div class="pafter">
        area,是nodejs依赖的一个模块，全称c-aresc-ares:library for asynchronous
        name resolves，
        是一个c语言的异步DNS解析库，可以方便的和使用者的事件循环系统统一起来，实现DNS的非阻塞异步解析。
        在node中使用也很简单。
      </div>

      <p>node brotli :{{ data.versions.brotli }}</p>
      <div class="pafter">
        brotil，google发布的一种压缩算法，压缩性能优于gzip；这个依赖zlib模块，node
        10.16后才有。 （不知道怎么用捏）
      </div>

      <p>node cldr：{{ data.versions.cldr }}</p>
      <div class="pafter">
        稍微百度了下，好像是做事件处理的依赖？
      </div>

      <p>node icu：{{ data.versions.icu }}</p>
      <div class="pafter">
        <p class="mg-b05">
          v4版本后支持这个属性，官方文档里，icu属于Intl国际化内容里。nodejs有很多特性是支持国际化变参的，icu
          属于node预装的依赖？用于链接系统上已安装的icu？
        </p>

        <p>
          其实ICU确切来说应该算是V8的一个依赖,这是一个跨平台的Unicode解决方案，主要用于解决Unicode的编解码的国际化问题，相信写过代码的人或多或少的都应该经历过编码问题吧。Node.js中使用的是ICU的一个子集small-icu，而且他是可选的。
          你可以在编译Node.js的时候指定要使用的ICU库，具体可以看下Node.js的Wiki。
        </p>
      </div>

      <p>node llhttp：{{ data.versions.llhttp }}</p>

      <p>node modules：{{ data.versions.modules }}</p>
      <div class="pafter">
        我们都知道Node.js在模块加载上使用的是Commonjs规范，不了解的可以去看下阮一峰的Blog中关于这CommonJs的讲解。这个规范规定我们可以使用require去加载一个js模块或.node模块，使用module.exports去暴露一个模块。那么具体的加载与暴露的实现是怎么样子的就在Modules中了。
        有的同学，可能会问，我从很早就开始用Node.js了，没感觉到modules有什么变化啊，怎么版本已经48了啊。其实模块加载对Node.js来说是非常重要的一块，它的缓存策略，路径与文件索引策略都极大地影响着模块的加载效率和Node.js的启动速度。尤其是在node-v6版本发布时,官方团队隆重介绍了全新的模块加载系统，据说速度是Node.js
        4.x的四倍以上。可见官方对其的重视。
        关于更细一步的Modules机制介绍，大家可以看下Node.js
        Modules模块系统这篇博客。
      </div>

      <p>node napi：{{ data.versions.napi }}</p>

      <p>node nghttp2：{{ data.versions.nghttp2 }}</p>

      <p>node nghttp3：{{ data.versions.nghttp3 }}</p>

      <p>node ngtcp2：{{ data.versions.ngtcp2 }}</p>

      <p>node node：{{ data.versions.node }}</p>

      <p>node openssl：{{ data.versions.openssl }}</p>

      <p>node tz：{{ data.versions.tz }}</p>

      <p>node unicode：{{ data.versions.unicode }}</p>

      <p>node uv：{{ data.versions.uv }}</p>

      <p>node v8：{{ data.versions.v8 }}</p>

      <p>node zlib：{{ data.versions.zlib }}</p>
      <div class="pafter">
        这个是干啥的呢？他的Wiki上描述其实一个用于压缩的库。在Node中对应的主要功能就是GZip格式的压缩和解压，比如http响应体的压缩和解压，具体的我们可以看下Node.js中对ZLib的一个封装的文档：Zlib
        | Node.js v6.6.0
        Documentation，可以看出Node.js借助zlib可以创建同步的、异步的、流式的压缩或解压缩任务。
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#baseinfo {
  max-width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
}

h3 {
  margin-bottom: 0;
}

p {
  margin-top: 12px;
  margin-bottom: 4px;
}

.pafter {
  font-size: 12px;
  position: relative;
  color: #999;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  border-left: 2px solid pink;
  p {
    margin: 0;
  }
}

.mg-b05 {
  margin-bottom: 5px !important;
}
</style>
