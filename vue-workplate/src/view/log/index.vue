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
          :data="loglist.slice(0,3).reverse()[index]"
          @openEdit="openEdit"
        ></dayitem>
      </div>
    </div>

    <div class="meunbox">meun(add)</div>

    <stdialog
      title="编辑我的日志"
      :show="editdialog"
      :data="dialoglogitem"
      @sureDialog="postDialog"
      @closeDialog="closeDialog"
    >
      <stInputTextarea
        class="mg-b10"
        label="标题"
        v-model:contentvalue="dialoglogitem.title"
      />
      <stInputTextarea
        class="mg-b10"
        label="概述"
        v-model:contentvalue="dialoglogitem.yourlog"
        rows="4"
      />
      <div class="quesitonalist">
        <div v-for="(item, index) in dialoglogitem.qustinolist" :key="index">
          <stInputTextarea
            class="mg-b10"
            width="100"
            :label="'疑问' + (index + 1)"
            v-model:contentvalue="dialoglogitem.qustinolist[index]"
          >
            <div class="listhand">
              <p @click="delTagList(index, 1)">删除</p>
            </div>
          </stInputTextarea>
        </div>
      </div>

      <div class="quesitonalist">
        <div v-for="(item, index) in dialoglogitem.collectionlist" :key="index">
          <stInputTextarea
            class="mg-b10"
            width="100"
            :label="'收集' + (index + 1)"
            v-model:contentvalue="dialoglogitem.collectionlist[index]"
          >
            <div class="listhand">
              <p @click="delTagList(index, 2)">删除</p>
            </div>
          </stInputTextarea>
        </div>
      </div>

      <div class="quesitonalist">
        <div v-for="(item, index) in dialoglogitem.idealist" :key="index">
          <stInputTextarea
            class="mg-b10"
            width="100"
            :label="'想法' + (index + 1)"
            v-model:contentvalue="dialoglogitem.idealist[index]"
          >
            <div class="listhand">
              <p @click="delTagList(index, 3)">删除</p>
            </div>
          </stInputTextarea>
        </div>
      </div>

      <div class="addtagbox">
        <stIconButton
          cnt="疑问 +"
          backcolor="#ffdde1"
          @click="addListDialog(1)"
        />
        <stIconButton
          cnt="收获 +"
          backcolor="#6dd5ed"
          @click="addListDialog(2)"
        />
        <stIconButton
          cnt="想法 +"
          backcolor="#78ffd6"
          @click="addListDialog(3)"
        />
      </div>
    </stdialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import dayitem from "./smallview/dayitem.vue";
import stdialog from "@/components/Dialog/st-dialog.vue";
import stIconButton from "@/components/Button/st-icon-button.vue";
import stInputTextarea from "@/components/Input/st-input-textarea.vue";
import { showMessage } from "@/tool/message";
import { getPassMouth } from "@/tool/date/passmouth";
import { readMyLog, addMyLog } from "@/api/log.js";

/**
 * 弹出框数据
 */
// const titleval = ref("");
// const ezcontent = ref("");
// const quesitonalistdialog = ref([]);
/**
 * 控制弹出框
 */
const editdialog = ref(false);
const dialoglogitem = ref({});
const dialogitemindex = ref(0);
const openEdit = (val1, val2) => {
  dialoglogitem.value = val2;
  dialogitemindex.value = val1;
  editdialog.value = true;
  // titleval.value = val2;
};
/*
 * 弹出栏增加question编辑栏
 */
const addListDialog = (type) => {
  switch (type) {
    case 1:
      const qustinolist = dialoglogitem.value.qustinolist;
      if (
        qustinolist[qustinolist.length - 1] &&
        qustinolist[qustinolist.length - 1] != "请输入疑问tag"
      ) {
        dialoglogitem.value.qustinolist.push("请输入疑问tag");
      } else if (!qustinolist.length) {
        dialoglogitem.value.qustinolist.push("请输入疑问tag");
      } else {
        showMessage("请先输入tag内容", "err");
      }
      break;
    case 2:
      let collectionlist = dialoglogitem.value.collectionlist;
      if (
        collectionlist[collectionlist.length - 1] &&
        collectionlist[collectionlist.length - 1] != "请输入收获tag"
      ) {
        dialoglogitem.value.collectionlist.push("请输入收获tag");
      } else if (!collectionlist.length) {
        dialoglogitem.value.collectionlist.push("请输入收获tag");
      } else {
        showMessage("请先输入tag内容", "err");
      }
      break;
    case 3:
      let idealist = dialoglogitem.value.idealist;
      if (
        idealist[idealist.length - 1] &&
        idealist[idealist.length - 1] != "请输入想法tag"
      ) {
        dialoglogitem.value.idealist.push("请输入想法tag");
      } else if (!idealist.length) {
        dialoglogitem.value.idealist.push("请输入想法tag");
      } else {
        showMessage("请先输入tag内容", "err");
      }
      break;

    default:
      break;
  }
};
/**
 * 删除tag编辑栏
 */
const delTagList = (index, type) => {
  switch (type) {
    case 1:
      dialoglogitem.value.qustinolist.splice(index, index + 1);
      break;
    case 2:
      dialoglogitem.value.collectionlist.splice(index, index + 1);
      break;
    case 3:
      dialoglogitem.value.idealist.splice(index, index + 1);
      break;
    default:
      break;
  }
};

/**
 * 增加mylog数据(test)
 */
const postDialog = () => {
  const pass = judgePostParmas();
  if (pass) {
    addMyLog({
      index: dialogitemindex.value,
      logcontent: {
        title: dialoglogitem.value.title,
        yourlog: dialoglogitem.value.yourlog,
        qustinolist: dialoglogitem.value.qustinolist,
        collectionlist: dialoglogitem.value.collectionlist,
        idealist: dialoglogitem.value.idealist,
      },
    }).then((res) => {
      if (res.data.success) {
        showMessage("日记记录成功！");
      }
      closeDialog();
    });
  } else {
    showMessage("请先输入tag内容", "err");
  }
};

/**
 * 增加mylog数据前手动判断一下
 */
const judgePostParmas = () => {
  const qustinolist = dialoglogitem.value.qustinolist;
  const collectionlist = dialoglogitem.value.collectionlist;
  const idealist = dialoglogitem.value.idealist;
  if (
    qustinolist.slice(-1)[0] == "请输入疑问tag" ||
    collectionlist.slice(-1)[0] == "请输入收获tag" ||
    idealist.slice(-1)[0] == "请输入想法tag"
  ) {
    return 0;
  } else {
    return 1;
  }
};

/**
 * 关闭弹框
 */
const closeDialog = () => {
  editdialog.value = false;

  // 清理未写内容的情况
  const qustinolist = dialoglogitem.value.qustinolist;
  const collectionlist = dialoglogitem.value.collectionlist;
  const idealist = dialoglogitem.value.idealist;
  if (qustinolist[qustinolist.length - 1] == "请输入疑问tag") {
    qustinolist.pop();
  }
  if (collectionlist[collectionlist.length - 1] == "请输入收获tag") {
    collectionlist.pop();
  }
  if (idealist[idealist.length - 1] == "请输入想法tag") {
    idealist.pop();
  }
};

/**
 * 获取mylog数据
 */
let loglist = ref(0);
let resday = ref(0);
function getMyLog() {
  readMyLog().then((res) => {
    resday.value = getReseveArray(mouthdate.value.day, 0, 1);
    // loglist.value = res.data.data.loglist.splice(0, resday.value.length).reverse();
    loglist.value = res.data.data.loglist
  });
}

/**
 * 根据返回的数据生成列表
 */
const mouthdate = ref(getPassMouth());
console.log(mouthdate.value);
/**
 * 天数反序并混入json数据
 */
function getReseveArray(aimnum, startnum, resveflag) {
  const arr = [];
  for (let i = startnum; i < aimnum; i++) {
    arr.push({
      day: i,
      mouth: mouthdate.value.mouth,
      data: loglist.value[i],
    });
  }
  resveflag ? arr.reverse() : arr;
  return arr;
}

/* 运行读取数据 */
onMounted(() => {
  getMyLog();
});
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

.addtagbox {
  display: flex;
  justify-content: center;
}
.quesitonalist {
  width: 100%;
  .listhand {
    margin-left: 20px;
    flex-shrink: 0;
    cursor: pointer;
  }
}
</style>
