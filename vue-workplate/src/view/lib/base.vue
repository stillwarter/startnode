<script setup>
import stinput from "@/components/Input/st-input.vue";
import { ref } from "vue";
import { Md5 } from "ts-md5";
import axios from "axios";
import { showMessage } from "@/tool/message";
import { fishwords } from "./data/words.js";
const md5 = new Md5();
const password = ref(".....");
const getKey = () => {
  md5.appendAsciiStr(password.value);
  const passwordmd5 = md5.end();
  const data = {
    mfaCode: "",
    nameOrEmail: "stillwarter",
    userPassword: passwordmd5,
  };
  axios.post("/api/getKey", data).then((res) => {
    if (res.status === 200) {
      localStorage.setItem("fishkey", res.data.Key);
    }
  });
};

const sdata = {
  apiKey: localStorage.getItem("fishkey"),
  client: "Windows/V1.0.0",
  content: "",
};
const sendMessage = (word) => {
  sdata.content =
    "\n" +
    "###" +
    " " +
    word +
    "\n" +
    "---" +
    "\n" +
    "> <sub>❤️现在是代理喵520号机器人❤️~ 请勿打扰</sub>" +
    "\n" +
    "<sub>send by StartNode  Cover:cat520</sub>";
  axios.post("/chat-room/send", sdata).then((res) => {
    if (res.status === 200) {
      showMessage("发送成功");
    }
  });
};
</script>

<template>
  <div class="libbox">
    <div class="leftmeun">
      this is lefmeun:
      <div style="margin-left: 40px;">fish</div>
    </div>
    <div class="content">
      <stinput label="password" v-model:contentvalue="password" />
      <div class="btn" @click="getKey">sure</div>
      <div class="btn" @click="sendMessage">sendMessage</div>
      <p>
        fish的闲言碎语
      </p>
      <div class="word">
        <div
          class="card"
          v-for="(item, index) in fishwords"
          :key="index"
          @click="sendMessage(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.libbox {
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 5fr;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.word {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .card {
    padding: 10px;
    cursor: pointer;
  }
}
</style>
