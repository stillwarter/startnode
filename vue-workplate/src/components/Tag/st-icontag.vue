<script setup>
import stIconcard from "../Card/st-iconcard.vue";
import stSvg from "../SVG/st-svg.vue";
import { questionicon } from "@/assets/svg/log/questionicon";
</script>

<template>
  <div class="sticontag">
    <stIconcard position="right" icontag="疑问" margin="4">
      <slot></slot>
      <stSvg svgsize="20" v-html="questionicon"></stSvg>
    </stIconcard>
  </div>
</template>

<style lang="less" scoped>
.sticontag {
  width: 100%;
  text-align: left;
  border: 1px rgba(241, 242, 222, 0.826) solid;
  border-radius: 4px;
  background: rgba(222, 242, 240, 0.826);
  box-sizing: border-box;
  padding: 0 4px;
  position: relative;
}
</style>
