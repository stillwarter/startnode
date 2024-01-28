<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import { strategymodehead } from "../data/strategymode";
</script>

<template>
  <div class="combox">
    <h2>代理模式</h2>
    <div>
      <p>前言：</p>
      <stQuote class="mg-b10" :ctx="strategymodehead" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.combox {
  width: 100%;
}
</style>
