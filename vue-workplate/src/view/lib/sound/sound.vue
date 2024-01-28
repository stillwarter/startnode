<script setup>
// const promise = navigator.mediaDevices.getUserMedia(constraints);

if (navigator.mediaDevices.getUserMedia) {
  const constraints = { audio: true };
  let chunks = [];

  navigator.mediaDevices.getUserMedia(constraints).then(
    (stream) => {
      console.log("授权成功！");
      const mediaRecorder = new MediaRecorder(stream);
      const recordBtn = document.querySelector(".record-btn");
      recordBtn.onclick = () => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          recordBtn.textContent = "record";
          console.log("录音结束");
        } else {
          mediaRecorder.start();
          console.log("录音中...");
          recordBtn.textContent = "stop";
        }
        console.log("录音器状态：", mediaRecorder.state);
      };

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = (e) => {
        var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
        var audioURL = window.URL.createObjectURL(blob);

        const player = document.querySelector(".audio-player");
        player.src = audioURL;
      };
    },
    () => {
      console.error("授权失败！");
    }
  );
} else {
  console.error("浏览器不支持 getUserMedia");
}
</script>

<template>
  <div>
    <p>sound</p>
    <button class="record-btn">record</button>
    <audio controls class="audio-player"></audio>
  </div>
</template>

<style lang="less" scoped>
.audio-player {
  border: 1px solid #000;
  width: 400px;
  background: transparent;
  border-radius: 8px;
}
</style>
