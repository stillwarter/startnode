<script setup>
import { ref } from "vue";
import stSvg from "@/components/SVG/st-svg.vue";
import { nighticon } from "@/assets/svg/head/nighticon";
import { homeicon } from "@/assets/svg/head/homeicon";
import { voiceicon } from "@/assets/svg/head/voiceicon";
import { middletwodiseaseswords } from "./data/middletwodiseaseswords";

import { VoiceCanvas } from "@/class/myVoice";
let darkflag = ref(false);

// 抱歉我也很中二
const refmiddletwodiseaseswords = ref(middletwodiseaseswords);
const refmiddletwodiseasesword = ref(refmiddletwodiseaseswords.value[0]);
let key = 0;
setInterval(() => {
  key++;
  if (key >= refmiddletwodiseaseswords.value.length) {
    key = 0;
  }
  refmiddletwodiseasesword.value = refmiddletwodiseaseswords.value[key];
}, 5000);

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

const canvasdom = new VoiceCanvas();
// 开启声音通道
const startVoicePost = () => {
  if (document.querySelector(".visualizer")) {
    canvasdom.delDom();
  } else {
    canvasdom.init();
  }
};
</script>

<template>
  <div class="workhead">
    <!-- <p class="mg-0 darkmoel" @click="setDark">黑夜模式</p> -->

    <stSvg class="stsvg" svgsize="24" topath="home" v-html="homeicon" />

    <stSvg class="stsvg" svgsize="17" v-html="nighticon" @click="setDark" />

    <div class="functionbox">
      <stSvg
        class="stsvg"
        svgsize="24"
        v-html="voiceicon"
        @click="startVoicePost"
      />
    </div>

    <div class="middletwodiseases">
      {{ refmiddletwodiseasesword }}
    </div>
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

.functionbox {
  position: absolute;
  top: 0;
  right: 10px;
  display: flex;
}

.middletwodiseases {
  position: relative;
  left: 47%;
  transform: translateX(-50%);
  text-align: right;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(16, 129, 144, 0.611);
  animation: wordstans 5s ease-in-out infinite;
}

@keyframes wordstans {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 100;
  }
  80% {
    opacity: 100;
  }
  100% {
    opacity: 0;
  }
}
</style>
