<!-- 
  日志 用于显示我的一些日常记录 比如待做 已完成 收获等等
  待做也要展示到首页

  日志 要根据当前日期生成 每月生成一次？

  就暂定只显示当月的吧

  数据来源，先用js或者json吧？
 -->

<!-- 
  需求记录：
  我需要能够自动的加入我的log，暂定在static里
  edit 编辑log
  需要先检测是否存在对应月份的json demo，存在，则增加对应记录
  存在，就更新对应信息

  所以对node服务而言，需要根据当前日期去生成一个demo json文件

  首先要生成当前年份

  后续我们需要编辑我们的log文件，首先我们模拟这个请求

  然后我们准备几个tag和card 装载不同类别的日志记录
  tag:疑问 思绪 收获 计划

  -->

<template>
  <div class="st-work-log">
    <h1>Log</h1>

    <div v-for="(item, index) in resday" :key="index">
      <div class="mg-t100">
        <dayitem
          :index="index"
          :day="item"
          :data="loglist[index]"
          @openEdit="openEdit"
        ></dayitem>
      </div>
    </div>

    <div class="meunbox">meun(add)</div>

    <stdialog
      title="编辑我的日志"
      :show="editdialog"
      :data="logitem"
      @sureDialog="postDialog"
      @closeDialog="closeDialog"
    >
      <stInputTextarea class="mg-b10" label="标题" :value="titleval" />
      <stInputTextarea
        class="mg-b10"
        label="概述"
        :value="ezcontent"
        rows="4"
      />

      <div>
        some tag add
        <stIconButton />
      </div>
    </stdialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dayitem from "./smallview/dayitem.vue";
import stdialog from "@/components/Dialog/st-dialog.vue";
import stIconButton from "@/components/Button/st-icon-button.vue";
import stInputTextarea from "../../components/Input/st-input-textarea.vue";

import { getPassMouth } from "@/tool/date/passmouth";

import logbase from "@/testdata/logbase.json";

import { readMyLog, addMyLog } from "@/api/log.js";

/**
 * 弹出框数据
 */
const titleval = ref("");
const ezcontent = ref("");
/**
 * 控制弹出框
 */
const editdialog = ref(false);
const logitem = ref({});
const dialogitemindex = ref(0);
const openEdit = (val1, val2) => {
  dialogitemindex.value = val1;
  editdialog.value = true;
  titleval.value = val2;
};
const postDialog = () => {
  addMyLog({
    index: dialogitemindex.value,
    logcontent: {
      title: titleval.value.title,
    },
  }).then((res) => {});
};
const closeDialog = () => {
  editdialog.value = false;
};

/**
 * 获取mylog数据
 */
let loglist = ref(0);
readMyLog().then((res) => {
  loglist.value = res.data.data.loglist;
});

/**
 * 增加mylog数据(test)
 */
function setMyLog(data) {}
// addMyLog({
//   index: 0,
//   logcontent: {
//     title: "cescsa",
//   },
// }).then((res) => {});

const mouthdate = ref(getPassMouth());
/**
 * 天数反序并混入json数据
 */
function getReseveArray(aimnum, startnum, resveflag) {
  const arr = [];
  for (let i = startnum; i < aimnum; i++) {
    if (logbase.loglist[i]) {
      arr.push({ day: i, data: logbase.loglist[i] });
    } else {
      arr.push({ day: i });
    }
  }
  resveflag ? arr.reverse() : arr;
  return arr;
}

const resday = ref(getReseveArray(mouthdate.value.day, 0, 1));
</script>

<style lang="less" scoped>
.st-work-log {
  width: 100vw;
}

.meunbox {
  position: fixed;
  left: 20px;
  bottom: 20px;
  cursor: pointer;
}
</style>
