<script setup>
import stinput from "@/components/Input/st-input.vue";
import { ref } from "vue";
import { Md5 } from "ts-md5";
import axios from "axios";
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
</style>
