<script setup>
import stIconcard from "../Card/st-iconcard.vue";
import stSvg from "../SVG/st-svg.vue";
import { questionicon } from "@/assets/svg/log/questionicon";

// 支持渐变色呢的传入，目前最多支持3个颜色，方向默认to top 未扩展方向
const props = defineProps({
  backcolor: {
    type: [String, Array],
    default: "rgba(222, 242, 240, 0.826)",
  },
  icontag: {
    type: String,
    default: "tag",
  },
  fontcolor: {
    type: String,
    default: "#000",
  },
  iconpath: {
    type: String,
  },
});
</script>

<template>
  <div v-if="Array.isArray(backcolor)">
    <div
      v-if="backcolor.length == 3"
      class="sticontag"
      :style="`background:linear-gradient(to top,${backcolor[0]},${backcolor[1]},${backcolor[2]});color:${fontcolor}`"
    >
      <stIconcard position="right" :icontag="icontag" margin="4">
        <slot></slot>
        <stSvg svgsize="20" v-html="iconpath"></stSvg>
      </stIconcard>
    </div>
    <div
      v-if="backcolor.length == 2"
      class="sticontag"
      :style="`background:linear-gradient(to top,${backcolor[0]},${backcolor[1]});color:${fontcolor}`"
    >
      <stIconcard position="right" :icontag="icontag" margin="4">
        <slot></slot>
        <stSvg svgsize="20" v-html="iconpath"></stSvg>
      </stIconcard>
    </div>
  </div>
  <div v-else>
    <div
      class="sticontag"
      :style="
        'background:' + props.backcolor + ';' + 'color:' + props.fontcolor
      "
    >
      <stIconcard position="right" :icontag="icontag" margin="4">
        <slot></slot>
        <stSvg svgsize="20" v-html="iconpath"></stSvg>
      </stIconcard>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sticontag {
  width: 100%;
  text-align: left;
  border: 1px rgba(241, 242, 222, 0.826) solid;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0 4px;
  position: relative;
}
</style>
