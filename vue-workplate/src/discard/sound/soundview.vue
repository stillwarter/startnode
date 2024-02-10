<script setup>
import { onMounted } from "vue";
import { CreateVoiceCanvas } from "@/class/audio";

const viocerender = new CreateVoiceCanvas(11);

/* 获取navigator的mediaDevices */
// mediaDevices是Navigator的只读属性，返回一个MediaDevices对象，该对象可提供对相机和麦克风等媒体输入设备的连接访问，也包括屏幕共享。
onMounted(() => {});

// record
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "zh-CN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.addEventListener("result", (e) => {
  // console.log(e);
  // const transcript = Array.from(e.results[0].transcripts).join("");

  console.log(e.results);
});

const recordstart = () => {
  console.log("开始语音识别");
  recognition.start();
  viocerender.setaudio();
  viocerender.csetAudioCtx();
};
const recordfinish = () => {
  console.log("结束语音识别");
  recognition.stop();
  viocerender.destory();

  const dom = document.querySelector(".visualizer");
  dom.remove();

  sessionStorage.setItem("voicerender", false);

  // const stream = navigator.mediaDevices.getUserMedia({ video: true });

  // stream.getTracks().forEach((track) => {
  //   track.stop();
  // });
  // console.log(stream);
};
</script>

<template>
  <div class="combox">
    this is soundview <br />

    <!-- <button @click="init">init</button>
    <button @click="init" style="margin: 10px;">start</button> -->
    <button @click="recordstart" style="margin: 10px;">record</button>
    <button @click="recordfinish">recordfinish</button>
    <div class="cavbox">
      <canvas
        class="visualizer"
        style="border-radius: 4px;"
        width="80"
        height="100"
      ></canvas>
    </div>
  </div>
</template>

<style lang="less" scoped>
.combox {
  width: 100%;
}
.visualizer {
}
</style>
