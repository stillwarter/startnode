<script setup>
import { todoicon2 } from "@/assets/svg/todo/todo2";
import stSvg from "@/components/SVG/st-svg.vue";
import { getTaskDay } from "@/api/task";

getTaskDay()
</script>

<template>
  <div class="aimwork">
    <div class="iconbox">
      <stSvg svgsize="40" v-html="todoicon2"></stSvg>
      <p>info</p>
    </div>
    <div class="taskbox">
      宏任务和微任务
    </div>
  </div>
</template>

<style lang="less" scoped>
.aimwork {
  position: fixed;
  left: 12px;

  .iconbox {
    position: relative;
    display: flex;
    animation: float 3s ease-in-out infinite;
  }
  .taskbox {
    position: relative;
    top: 12px;
    max-width: 300px;
    border: 1px solid #000;
    padding: 4px 8px;
  }
}

@keyframes float {
  0% {
    top: 2px;
  }
  50% {
    top: 22px;
  }
  100% {
    top: 2px;
  }
}
</style>
