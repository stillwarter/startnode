<script setup>
// 创建单例类
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

// 获取单例实例
let instance = new Singleton();
let instance2 = new Singleton();
console.log(instance,instance2);
</script>

<template>
  <div>
    this is single
  </div>
</template>
