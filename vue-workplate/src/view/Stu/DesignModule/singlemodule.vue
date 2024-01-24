<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import { singlemodulehead, singlemodulecode } from "../data/singlemodule";
// 单例设计模式的实现：面向对象
var Singleton = function(name) {
  this.name = name;
  this.instance = null;
}
Singleton.prototype.getName = function(){
  return this.name;
}
Singleton.getInstance = function(name) {
  if(!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
}

var instance1 = Singleton.getInstance('why');
var instance2 = Singleton.getInstance('www');
console.log(instance1===instance2); // 输出true

var obj1 = new Singleton('why');
var obj2 = new Singleton('www');
console.log(obj1.getName());        // 输出why
console.log(obj2.getName());        // 输出www
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
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.commbox {
  width: 100%;
}
</style>
