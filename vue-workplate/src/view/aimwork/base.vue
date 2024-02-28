<script setup>
import { ref, watch } from "vue";
import stdialog from "@/components/Dialog/st-dialog.vue";
import stInputTextarea from "@/components/Input/st-input-textarea.vue";

import { todoicon2 } from "@/assets/svg/todo/todo2";
import { editicon } from "@/assets/svg/log/editicon";
import { delicon } from "@/assets/svg/aimwork/delicon";
import { addtaskicon } from "@/assets/svg/aimwork/addtaskinco";
import { finishicon } from "@/assets/svg/aimwork/finishicon";
import { clockicon } from "@/assets/svg/aimwork/clockicon";
import stSvg from "@/components/SVG/st-svg.vue";

import { getTaskDay, setTaskDay } from "@/api/task";
import dayjs from "dayjs";
import { showMessage } from "@/tool/message";

/* 日常任务初始化 */
const dayTaskList = ref([]);
const todayTask = ref({});
getTaskDay().then((res) => {
  dayTaskList.value = res.data.data;
  const key = getDayInMonth();
  todayTask.value = dayTaskList.value[key];
});
function getDayInMonth() {
  const date = new Date();
  const day = date.getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfMonth = firstDay.getDay();
  // 本月第一天是星期几
  const dayOfWeek = (firstDayOfMonth + 6) % 7;
  return day - dayOfWeek + 1;
}

/* 年度任务初始化 */

/* 日常任务的增加与操作 */
const editdiaTask = ref(false);
const itemNowTask = ref({});
const itemTaskey = ref(0);
const ediTask = (key) => {
  itemTaskey.value = key;
  itemNowTask.value = todayTask.value[key];
  editdiaTask.value = true;
};
const addTask = () => {
  const dayTaskItem = {
    taskTitle: "",
    taskInfo: "",
    startDate: "",
    taskFinishDeg: 0,
  };
  todayTask.value.push(dayTaskItem);
};
const delTask = (key) => {
  todayTask.value.splice(key, 1);
  setTaskDay(dayTaskList.value);
};
const finishTask = (key) => {};

const taskClock = ref({
  key: -1,
  state: false,
});

let timerID = {};
const setClock = (key, e) => {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      showMessage("没有通知权限，无法使用专注功能", "err");
      return;
    }
    if (result === "default") {
      return;
    }
    if (taskClock.value.key == key) {
      const taskitemdom = document.querySelectorAll(".taskitem");
      taskitemdom[taskClock.value.key].style = "";
      showMessage(
        "已解除专注任务--" + todayTask.value[taskClock.value.key].taskTitle
      );
      clearTimeout(timerID);
      taskClock.value.key = -1;
      taskClock.value.state = false;
      e.target.children[0].style = "";
      return;
    }
    if (taskClock.value.state) {
      showMessage(
        "请先完成当前专注任务--" +
          todayTask.value[taskClock.value.key].taskTitle,
        "err"
      );
      return;
    }

    taskClock.value.key = key;
    taskClock.value.state = true;
    const taskitemdom = document.querySelectorAll(".taskitem");
    taskitemdom[taskClock.value.key].style = " background: rgb(252, 252, 124);";
    showMessage("设定专注任务成功--" + todayTask.value[key].taskTitle);
    e.target.children[0].style = "fill:red";
    // 默认三分钟一次
    timerID = setInterval(() => {
      new Notification("我诞生于灼烧bug的火焰中", {
        dir: "ltr",
        lang: "zh-CN",
        body: "想要做的太多，会的又太少，不要摸鱼了！时间不等人哩！",
        icon: "https://file.fishpi.cn/2022/07/MOSHED2022621164630-1b1ec532.gif?imageView2/1/w/210/h/210/interlace/0/q/100",
      });
      // 300000
    }, 180000);
  });
};

/* 编辑栏提交 */
const postDialog = () => {
  if (!itemNowTask.value.startDate) {
    itemNowTask.value.startDate = dayjs().format("YYYY.MM.DD HH.mm.ss");
  }
  setTaskDay(dayTaskList.value);
  editdiaTask.value = false;
};

const closeDialog = () => {
  editdiaTask.value = false;
};

/* 任务表隐藏与打开 */
let changeTasKey = 0;
const taskDomState = ref(true);
watch(taskDomState, (newval, oldval) => {
  if (newval === false) {
    document.querySelector(".taskbox").style = "left:-220px";
    document.querySelector(".yeartaskbox").style = "left:-220px";
    document.querySelector(".taskState").style = "transform: rotate(-180deg);";
  }
  if (newval === true) {
    document.querySelector(".taskbox").style = "left:0px";
    document.querySelector(".yeartaskbox").style = "left:0px";
    document.querySelector(".taskState").style = "transform: rotate(0deg);";
  }
});
const changeTaskDom = () => {
  taskDomState.value = false;
  changeTasKey % 2 == 0
    ? (taskDomState.value = false)
    : (taskDomState.value = true);
  changeTasKey++;
};
</script>

<template>
  <div class="aimwork">
    <div class="head">
      <p class="cursorpoint taskState" @click="changeTaskDom">⬅️</p>

      <p v-if="taskDomState">任务表</p>
      <p v-else>TODO 滚动展示</p>
    </div>
    <!-- <div class="iconbox">
      <stSvg svgsize="40" v-html="todoicon2"></stSvg>
      <p>info</p>
    </div> -->
    <div class="taskbox">
      <div>
        <div class="addtaskbox">
          <p style="text-align: center; margin: 0; font-size: 12px">今日任务</p>
          <stSvg
            @click="addTask"
            class="cursorpoint"
            style="justify-content: flex-start; margin: 0 4px"
            svgsize="15"
            v-html="addtaskicon"
          />
        </div>
        <div>
          <div class="taskitem" v-for="(item, index) in todayTask" :key="index">
            <p class="title">{{ item.taskTitle || "还没有制定任务哟" }}</p>
            <p v-if="item.taskInfo" class="taskInfo">{{ item.taskInfo }}</p>
            <p class="startime">
              开始时间：<span style="font-size: 10px">{{
                item.startDate
              }}</span>
            </p>
            <p class="taskFinishDeg">完成度：{{ item.taskFinishDeg }}</p>
            <div class="handlebox">
              <stSvg
                @click="ediTask(index)"
                class="cursorpoint mg-r2"
                style="justify-content: flex-start"
                svgsize="15"
                v-html="editicon"
              />
              <stSvg
                v-if="taskClock.key != index"
                @click="delTask(index)"
                class="cursorpoint mg-r2"
                style="justify-content: flex-start"
                svgsize="15"
                v-html="delicon"
              />
              <stSvg
                v-show="item.startDate"
                @click="finishTask(index)"
                class="cursorpoint mg-r2"
                style="justify-content: flex-start"
                svgsize="15"
                v-html="finishicon"
              />
              <stSvg
                v-show="item.startDate"
                @click="setClock(index, $event)"
                class="cursorpoint mg-r2"
                style="justify-content: flex-start"
                svgsize="15"
                v-html="clockicon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="yeartaskbox">
      <div class="addtaskbox">
        年度任务
        <stSvg
          @click="addTask"
          class="cursorpoint"
          style="justify-content: flex-start; margin: 0 4px"
          svgsize="15"
          v-html="addtaskicon"
        />
      </div>
    </div>

    <stdialog
      title="编辑我的任务"
      :show="editdiaTask"
      @sureDialog="postDialog"
      @closeDialog="closeDialog"
    >
      <!-- {{ todayTask[itemTaskKey] }} -->
      <stInputTextarea
        class="mg-b10"
        label="任务标题"
        v-model:contentvalue="itemNowTask.taskTitle"
      />
      <stInputTextarea
        class="mg-b10"
        label="任务概述"
        rows="4"
        v-model:contentvalue="itemNowTask.taskInfo"
      />
    </stdialog>
  </div>
</template>

<style lang="less" scoped>
.aimwork {
  width: 200px;
  position: fixed;
  left: 12px;
  transition: all 0.3s ease-in-out;
  top: 58px;
  z-index: 100;
  user-select: none;

  .head {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
    .taskState {
      transition: all 0.3s ease-in-out;
      margin-right: 12px;
    }
  }

  .iconbox {
    position: relative;
    display: flex;
    animation: float 3s ease-in-out infinite;
  }
  .taskbox {
    max-width: 300px;
    max-height: 300px;
    position: relative;
    top: 12px;
    left: 0;
    padding: 10px 4px;
    transition: all 0.3s ease-in-out;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    overflow: auto;
    box-shadow: -4px 2px 48px -10px rgba(224, 45, 224, 0.2);
    .taskitem {
      box-sizing: border-box;
      background: #eee;
      border-radius: 6px;
      padding: 4px 8px;
      margin-top: 12px;
      .title {
        font-size: 18px;
        color: #f1a660;
        margin: 4px 0;
        line-height: 22px;
      }
      .taskInfo {
        font-size: 16px;
        color: #b917e6;
        margin: 4px 0;
      }
      .startime {
        font-size: 12px;
        margin: 4px 0;
        color: rgb(241, 151, 151);
      }
      .taskFinishDeg {
        font-size: 12px;
        margin: 4px 0;
        color: rgb(124, 192, 238);
      }
      .handlebox {
        display: flex;
        justify-content: flex-end;
      }
      .handlebox > .svgbox:last-of-type {
        margin-right: 0px !important;
      }
    }
    .addtaskbox {
      display: flex;
      justify-content: space-between;
    }
  }

  .yeartaskbox {
    max-height: 400px;
    position: relative;
    top: 22px;
    left: 0;
    max-width: 300px;
    padding: 10px 12px;
    transition: all 0.3s ease-in-out;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    overflow: auto;
    box-shadow: -4px 2px 48px -10px rgba(224, 45, 224, 0.2);
    .addtaskbox {
      display: flex;
      justify-content: space-between;
    }
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
