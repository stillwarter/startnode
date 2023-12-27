<script setup>
/**
 * 我需要一些个容器，组件容器，日志容器，实验室容器，学习容器，动画容器？
 *
 */
import { compicon } from "@/assets/svg/home/compicon";
import { logicon } from "@/assets/svg/home/logicon";
import { libicon } from "@/assets/svg/home/libicon";
import stSvg from "@/components/SVG/st-svg.vue";
import { ref } from "vue";

import stIconcard from "@/components/Card/st-iconcard.vue";

// iconsize统一
const iconsize = ref(50);
</script>

<template>
  <div class="st-work-home">
    <h1>stillwarter 工作站</h1>
    <div class="typewordbox mg-t50">
      <stIconcard position="bottom" icontag="组件库">
        <stSvg :svgsize="iconsize" v-html="compicon"></stSvg>
      </stIconcard>

      <stIconcard position="bottom" icontag="日志" pathname="log">
        <stSvg :svgsize="iconsize" v-html="logicon"></stSvg>
      </stIconcard>

      <stIconcard position="bottom" icontag="实验室">
        <stSvg :svgsize="iconsize" v-html="libicon"></stSvg>
      </stIconcard>
    </div>
  </div>
</template>

<style lang="less" scoped>
.st-work-home{
  width: 100vw;
}
.typewordbox {
  max-width: 450px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
