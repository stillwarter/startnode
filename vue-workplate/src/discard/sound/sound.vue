<script setup>
// const promise = navigator.mediaDevices.getUserMedia(constraints);

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
if (SpeechGrammarList) {
  var speechRecognitionList = new SpeechGrammarList();
  // var grammar =
  //   "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";
  // speechRecognitionList.addFromString(grammar, 1);
  // recognition.grammars = speechRecognitionList;
}

recognition.continuous = true;
recognition.lang = "zh-CN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.addEventListener("result", (e) => {
  // console.log(e);
  // const transcript = Array.from(e.results[0].transcripts).join("");

  console.log(e.results);
});

// recognition.onresult = function (event) {
//   // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
//   // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
//   // It has a getter so it can be accessed like an array
//   // The first [0] returns the SpeechRecognitionResult at the last position.
//   // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
//   // These also have getters so they can be accessed like arrays.
//   // The second [0] returns the SpeechRecognitionAlternative at position 0.
//   // We then return the transcript property of the SpeechRecognitionAlternative object

//   console.log("1");
// };

// recognition.onspeechend = function () {};

// recognition.onnomatch = function (event) {};

// recognition.onerror = function (event) {};

setTimeout(() => {
  recognition.start();
  console.log("Ready to receive a color command.");
}, 1000);

// if (navigator.mediaDevices.getUserMedia) {
//   const constraints = { audio: true };
//   let chunks = [];

//   navigator.mediaDevices.getUserMedia(constraints).then(
//     (stream) => {
//       console.log("授权成功！");
//       const mediaRecorder = new MediaRecorder(stream);
//       const recordBtn = document.querySelector(".record-btn");
//       recordBtn.onclick = () => {
//         if (mediaRecorder.state === "recording") {
//           mediaRecorder.stop();
//           recordBtn.textContent = "record";
//           console.log("录音结束");
//         } else {
//           mediaRecorder.start();
//           console.log("录音中...");
//           recordBtn.textContent = "stop";
//         }
//         console.log("录音器状态：", mediaRecorder.state);
//       };

//       mediaRecorder.ondataavailable = (e) => {
//         chunks.push(e.data);
//       };

//       mediaRecorder.onstop = (e) => {
//         var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//         chunks = [];
//         var audioURL = window.URL.createObjectURL(blob);

//         const player = document.querySelector(".audio-player");
//         player.src = audioURL;
//       };
//     },
//     () => {
//       console.error("授权失败！");
//     }
//   );
// } else {
//   console.error("浏览器不支持 getUserMedia");
// }
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
