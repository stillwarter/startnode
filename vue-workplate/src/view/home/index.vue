<script setup>
/**
 * 我需要一些个容器，组件容器，日志容器，实验室容器，学习容器，动画容器？
 *
 */
import { compicon } from "@/assets/svg/home/compicon";
import { logicon } from "@/assets/svg/home/logicon";
import { libicon } from "@/assets/svg/home/libicon";
import { stuicon } from "@/assets/svg/home/stuicon";
import { anicon } from "@/assets/svg/home/anicon";
import { gameicon } from "@/assets/svg/home/gameicon";
import { eighticon } from "@/assets/svg/eight/eighticon";
import { translateicon } from "@/assets/svg/translate/translateicon";
import stSvg from "@/components/SVG/st-svg.vue";
import { ref } from "vue";

import stIconcard from "@/components/Card/st-iconcard.vue";

// iconsize统一
const iconsize = ref(50);
</script>

<template>
  <div class="st-work-home">
    <h1 class="textcenter">stillwarter 工作站</h1>
    <div class="typewordbox mg-t50">
      <stIconcard position="bottom" icontag="组件库" pathname="log">
        <stSvg :svgsize="iconsize" v-html="compicon"></stSvg>
      </stIconcard>

      <stIconcard position="bottom" icontag="日 报" pathname="log">
        <stSvg :svgsize="iconsize" v-html="logicon"></stSvg>
      </stIconcard>

      <stIconcard position="bottom" icontag="实验室" pathname="lib">
        <stSvg :svgsize="iconsize" v-html="libicon"></stSvg>
      </stIconcard>
    </div>

    <div class="typewordbox mg-t30">
      <stIconcard position="bottom" icontag="游 戏" pathname="log">
        <stSvg :svgsize="iconsize" v-html="gameicon"></stSvg>
      </stIconcard>

      <stIconcard position="bottom" icontag="动画库" pathname="log">
        <stSvg :svgsize="iconsize" v-html="anicon"></stSvg>
      </stIconcard>

      <stIconcard position="bottom" icontag="学 习" pathname="stu">
        <stSvg :svgsize="iconsize" v-html="stuicon"></stSvg>
      </stIconcard>
    </div>

    <div class="typewordbox mg-t30">
      <stIconcard position="bottom" icontag="翻 译" pathname="log">
        <stSvg :svgsize="iconsize" v-html="translateicon"></stSvg>
      </stIconcard>

      <stIconcard position="bottom" icontag="八 股" pathname="eight">
        <stSvg :svgsize="iconsize" v-html="eighticon"></stSvg>
      </stIconcard>

      <stIconcard position="bottom" icontag="计划书" pathname="plan">
        <stSvg :svgsize="iconsize" v-html="stuicon"></stSvg>
      </stIconcard>
    </div>
  </div>
</template>

<style lang="less" scoped>
.st-work-home {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.typewordbox {
  min-width: 450px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
