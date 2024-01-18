<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import { jsoopinfo } from "../data/designmodule";
</script>

<template>
  <div class="jsoopbox">
    <h3>1.面向对象的JavaScript</h3>
    <stQuote :ctx="jsoopinfo"/>
  </div>
</template>

<style lang="less" scoped>
.jsoopbox {
  width: 80%;
}
</style>
