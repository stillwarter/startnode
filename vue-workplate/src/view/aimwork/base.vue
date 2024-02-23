<script setup>
import { ref } from "vue";
import stdialog from "@/components/Dialog/st-dialog.vue";

import { todoicon2 } from "@/assets/svg/todo/todo2";
import stSvg from "@/components/SVG/st-svg.vue";

import { getTaskDay } from "@/api/task";

const dayTaskList = ref([]);
const todayTask = ref({});

const editdiaTask = ref(false);
const ediTask = () => {
  editdiaTask.value = true;
};

getTaskDay().then((res) => {
  dayTaskList.value = res.data.data;
  const key = new Date().getDay();
  todayTask.value = dayTaskList.value[key];
});
</script>

<template>
  <div class="aimwork">
    <div class="iconbox">
      <stSvg svgsize="40" v-html="todoicon2"></stSvg>
      <p>info</p>
    </div>
    <div class="taskbox">
      宏任务和微任务
      <div>
        当天任务:
        <p v-if="todayTask.length <= 1">今天没有制定任务哟</p>
        <p @click="ediTask">add</p>
      </div>
    </div>

    <stdialog title="编辑我的日志" :show="editdiaTask"> </stdialog>
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
