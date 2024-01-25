<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import {
  singlemodulehead,
  singlemodulecode,
  singlemoduletrancode,
} from "../data/singlemodule";

var CreateDiv = (function () {
  var instance = null;
  var CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    instance = this;
    return instance;
  };
  CreateDiv.prototype.init = function () {
    var div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();

var instance1 = new CreateDiv("why");
var instance2 = new CreateDiv("www");
console.log(instance1, instance2, instance1 === instance2);
</script>

<template>
  <div class="commbox">
    <div>
      <h2>2.单例模式</h2>
      <div>
        <p>前言：</p>
        <stQuote class="mg-b10" :ctx="singlemodulehead" />
      </div>

      <div>
        <h3>2.1 单例设计模式的实现</h3>
        <pre>
          {{ singlemodulecode }}
        </pre>
        奇怪的是new创建的单例模式，是不一样的，而使用getinstace创建的，则是一样的。<br />
        所以了解一下instance属性吧，奇怪的是没有文档介绍（instance？），所以查看instanc1实例的时候，在构造器函数里，可以发现有这个属性，属性值就是Singleton。
        <br />
        虽然我能用getinsatce实现了单例模式，但是我们没有消除new声明例子带来的问题。
        <br />
        这种问题书上称之为不够透明，并且管理单理的操作，与对象创建的操作，不符合单一职责原则。
      </div>

      <div>
        <h3>2.2 透明的单例设计模式</h3>
        <div>
          为了解决new构造的方式无法实现单例问题，所以有透明单例模式的说法：
          <pre>
            {{ singlemoduletrancode }}
          </pre>
          这个例子返回一个creatediv的构造函数，当我们使用这个creatediv时候，
          由于闭包的缘故，所以在第一次初始化的时候，instance的值就被固定了。这时候，我们new生成的实例就是唯一的。
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.commbox {
  width: 100%;
}
</style>
