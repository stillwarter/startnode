<template>
  <div class="logquestionbox mg-t20" :style="'border-color:' + bordercolor">
    {{ content }}
    <stSvg class="ani" svgsize="50" v-html="iconpath"></stSvg>
  </div>
</template>

<script setup>
import stSvg from "../SVG/st-svg.vue";
const props = defineProps({
  bordercolor: String,
  content: String,
  iconpath: String,
});
</script>

<style lang="less" scoped>
.logquestionbox {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-left: 10px solid;
  border-radius: 10px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ani {
  animation: iconrotat ease-in-out 3s infinite;
}

@keyframes iconrotat {
  0% {
    transform: rotate(0) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.5);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
</style>
