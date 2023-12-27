<script setup>
import { getProcess } from "@/api/index";
import { ref } from "vue";
let data = ref({});
getProcess().then((res) => {
  data.value = res.data.data;
});
</script>

<template>
  <div id="baseinfo">
    <h1>node-process</h1>
    <p>the page show the variable of overall situation that node-process</p>
    <p>在node中，有一个process的全局变量</p>
    <h3>node version（node版本）：{{ data.version }}</h3>

    <h3>node arch（cpu架构）：{{ data.arch }}</h3>
    <div class="pafter">
      为其编译 Node.js 二进制文件的操作系统 CPU 架构。
      可能的值为：'arm'、'arm64'、'ia32'、'mips'、'mipsel'、'ppc'、'ppc64'、's390'、's390x'、以及
      'x64'。
    </div>

    <h3>node argv：启动Node.js进程时的命令行参数</h3>
    <div style="padding-left: 8px">
      <p>argv[0]:{{ data.argv[0] }}</p>
      <div class="pafter">返回启动Node.js进程的可执行文件所在的绝对路径</div>

      <p>argv[1]:{{ data.argv[1] }}</p>
      <div class="pafter">为当前执行的JavaScript文件路径</div>
    </div>

    <h3>node platform:{{ data.platform }}</h3>
    <div class="pafter">
      process.platform 属性返回用于标识编译 Node.js
      二进制文件的操作系统平台的字符串。 目前可能的值是： 'aix' 'darwin'
      'freebsd' 'linux' 'openbsd' 'sunos' 'win32' 目前对于安卓支持是实验版
    </div>

    <h3>node env:判断当前服务运行的环境</h3>
    <div style="padding-left: 8px">
      <p></p>
    </div>

    <h3>node versions：node运行环境版本</h3>
    <div style="padding-left: 8px">
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
      <div class="pafter">用于Unicode CLDR JSON数据的Npm 模块?</div>

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
      <div class="pafter">
        llhttp 是 Node.js 的 HTTP 1.1
        解析器，用于替代早期的http_parser，性能上有了非常大的提升，
      </div>

      <p>node modules：{{ data.versions.modules }}</p>
      <div class="pafter">
        我们都知道Node.js在模块加载上使用的是Commonjs规范，不了解的可以去看下阮一峰的Blog中关于这CommonJs的讲解。这个规范规定我们可以使用require去加载一个js模块或.node模块，使用module.exports去暴露一个模块。那么具体的加载与暴露的实现是怎么样子的就在Modules中了。
        有的同学，可能会问，我从很早就开始用Node.js了，没感觉到modules有什么变化啊，怎么版本已经48了啊。其实模块加载对Node.js来说是非常重要的一块，它的缓存策略，路径与文件索引策略都极大地影响着模块的加载效率和Node.js的启动速度。尤其是在node-v6版本发布时,官方团队隆重介绍了全新的模块加载系统，据说速度是Node.js
        4.x的四倍以上。可见官方对其的重视。
        关于更细一步的Modules机制介绍，大家可以看下Node.js
        Modules模块系统这篇博客。
      </div>

      <p>node napi：{{ data.versions.napi }}</p>
      <div class="pafter">
        在node v8版本之后，nodejs提出了新的一套机制，也就是我们这次的主角-NAPI。
        不同版本的 Node.js 使用同样的接口，这些接口是稳定地 ABI
        化的，即应用二进制接口（Application Binary Interface）。这使得在不同
        Node.js 下，只要 ABI 的版本号一致，编译好的 C++
        扩展就可以直接使用，而不需要重新编译。
      </div>

      <p>node nghttp2：{{ data.versions.nghttp2 }}</p>
      <div class="pafter">
        HTTP/2 是 HTTP 协议的一个升级,它的主要目的是为了解决 HTTP/1.x
        中不好实现功能，包括通过支持完整的请求与响应复用来减少延迟，通过有效压缩
        HTTP 标头字段将协议开销降至最低，增加对服务器推送的支持。
      </div>

      <p>node nghttp3：{{ data.versions.nghttp3 }}</p>
      <div class="pafter unk">Node支持的http3模块？</div>

      <p>node ngtcp2：{{ data.versions.ngtcp2 }}</p>
      <div class="pafter unk">node16后引入的内置模块，支持tcp协议？</div>

      <p>node node：{{ data.versions.node }}</p>
      <div class="pafter">当前node的版本号。</div>

      <p>node openssl：{{ data.versions.openssl }}</p>
      <div class="pafter">
        还记得14年名震一时的Heartbleed心脏滴血漏洞么?当时就是由于openssl的一个设计缺陷引起的，影响到的版本有：
        OpenSSL 1.0.2-beta OpenSSL 1.0.1 - OpenSSL 1.0.1f
        可见node-v4.2.2也是存在这个漏洞的，那么openssl到底在Node.js中扮演一个什么角色呢？
        在Node.js中openssl主要被用于tls和crypto两个模块，帮助Node.js完成一些加密通信和加密算法计算相关的工作，包括https，也是依赖openssl的。由于在加密传输这一块openssl基本算是业界标准的存在，被广泛使用，所以Heartbleed漏洞影响的范围才会如此广。
        关于openssl更多的内容，大家自行Google或移步官方文档。
      </div>

      <p>node tz：{{ data.versions.tz }}</p>
      <div class="pafter">
        支持基本的时区 ID（例如 'Etc/UTC'、'Europe/Paris'、或
        'America/New_York'）。
        它可能支持其他一些缩写或别名，但强烈建议不要使用这些缩写或别名，并且不能保证。
      </div>

      <p>node unicode：{{ data.versions.unicode }}</p>
      <div class="pafter unk">node支持的字符编码？</div>

      <p>node uv：{{ data.versions.uv }}</p>
      <div class="pafter">
        C 语言编写，采用非阻塞型的 I/O 操作，为 Node.js
        提供了访问系统资源的能力。
      </div>

      <p>node v8：{{ data.versions.v8 }}</p>
      <div class="pafter">node使用的v8编译器。</div>

      <p>node zlib：{{ data.versions.zlib }}</p>
      <div class="pafter">
        这个是干啥的呢？他的Wiki上描述其实一个用于压缩的库。在Node中对应的主要功能就是GZip格式的压缩和解压，比如http响应体的压缩和解压，具体的我们可以看下Node.js中对ZLib的一个封装的文档：Zlib
        | Node.js v6.6.0
        Documentation，可以看出Node.js借助zlib可以创建同步的、异步的、流式的压缩或解压缩任务。
      </div>

      <p>
        info source(以下排名不分先后): <br />
        node常用模块:https://juejin.cn/post/6983226624493748231 <br />
        arch:https://nodejs.cn/api/process/process_arch.html <br />
        https://zhuanlan.zhihu.com/p/22628085 <br />
        https://zhuanlan.zhihu.com/p/416575096 <br />
        napi:https://juejin.cn/post/6844904008822308878 <br />
        nghttp2:https://juejin.cn/post/7036564625436966926 <br />
        tz:https://nodejs.cn/api/cli/tz.html <br />
        uv:https://yesmore.cc/cn/FrontEndAdvanced-Nodejs/ <br />
        platform:https://nodejs.cn/api/process/process_platform.html <br />
        crashpad:https://blog.csdn.net/weixin_44503157/article/details/124400464
        <br />
      </p>
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

.unk {
  border-left: 2px solid rgb(241, 179, 85);
}

.mg-b05 {
  margin-bottom: 5px !important;
}
</style>
