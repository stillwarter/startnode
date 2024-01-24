<script setup>
import { ref } from "vue";
import stSvg from "@/components/SVG/st-svg.vue";
import { nighticon } from "@/assets/svg/head/nighticon";
import { homeicon } from "@/assets/svg/head/homeicon";
let darkflag = ref(false);

// 手动黑夜模式
const setDark = () => {
  darkflag.value = !darkflag.value;
  const bodydom = document.documentElement;
  if (darkflag.value) {
    bodydom.style = "filter: invert(1) hue-rotate(180deg);";
    const styledom = document.createElement("style");
    styledom.innerHTML =
      "svg{filter: invert(1) hue-rotate(180deg);}img{filter: invert(1) hue-rotate(180deg);}";
    document.head.appendChild(styledom);
  } else {
    const styledom = document.createElement("style");
    styledom.innerHTML =
      "svg{filter: invert(0) hue-rotate(0);}img{filter: invert(0) hue-rotate(0);}";
    document.head.appendChild(styledom);
    bodydom.style = "filter: invert(0) hue-rotate(0);";
  }
};
</script>

<template>
  <div class="workhead">
    <!-- <p class="mg-0 darkmoel" @click="setDark">黑夜模式</p> -->

    <stSvg class="stsvg" svgsize="24" topath="home" v-html="homeicon" />

    <stSvg class="stsvg" svgsize="17" v-html="nighticon" @click="setDark" />
  </div>
</template>

<style lang="less" scoped>
.workhead {
  width: 100%;
  background: pink;
  height: 24px;
  text-align: left;
  padding: 2px 10px;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 100;
}

.darkmoel {
  cursor: pointer;
}

.stsvg {
  cursor: pointer;
  width: 30px;
  margin-top: 1px;
}
</style>
