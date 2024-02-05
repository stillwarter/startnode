/**
 * 声音输入图像化
 * 用于音频可视化
 */
import { setMediaDevices, setAudioCtx } from "./voice/voicetool";
function CreateVoiceCanvas() {
  setMediaDevices();
  this.audioCtx = null;
  this.analyser = null;
}

CreateVoiceCanvas.prototype.setaudio = function () {
  this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  this.analyser = this.audioCtx.createAnalyser();
};

CreateVoiceCanvas.prototype.setAudioCtx = setAudioCtx;

CreateVoiceCanvas.prototype.run = function () {
  this.setaudio();
  this.setAudioCtx();
};

CreateVoiceCanvas.prototype.destory = function () {
  this.audioCtx = null;
  this.analyser = null;
};

const rendercanvas = new CreateVoiceCanvas();

/**
 * 创建voice canvas元素
 * 用于显示dom
 */
export const VoiceCanvas = function () {
  this.ctxdom = null;
  this.infodom = null;
  this.canvasdom = null;
  this.worddom = null;
};

VoiceCanvas.prototype.createDom = function () {
  this.canvasdom = document.createElement("canvas");
  this.canvasdom.className = "visualizer";
  this.canvasdom.width = 80;
  this.canvasdom.height = 100;
  document.documentElement.appendChild(this.canvasdom);
};

VoiceCanvas.prototype.createCtxDom = function () {
  this.ctxdom = document.createElement("div");
  this.ctxdom.className = "canvasctx";
  document.documentElement.appendChild(this.ctxdom);
};

VoiceCanvas.prototype.openCtxDom = function () {
  this.ctxdom.style = "right:10px";
};

VoiceCanvas.prototype.closeCtxDom = function () {
  this.ctxdom.style = "right:-200px";
};

VoiceCanvas.prototype.createCanvasDom = function () {
  this.canvasdom = document.createElement("canvas");
  this.canvasdom.className = "visualizer";
  this.canvasdom.width = 80;
  this.canvasdom.height = 100;
  this.ctxdom.appendChild(this.canvasdom);
};

VoiceCanvas.prototype.createInofDom = function () {
  this.infodom = document.createElement("div");
  this.infodom.className = "info";
  this.infodom.innerHTML = "图像化初始完成，音频通道已经接入!";
  this.ctxdom.appendChild(this.infodom);
};

VoiceCanvas.prototype.createWordDom = function () {
  this.worddom = document.createElement("div");
  this.worddom.className = "word";
  this.ctxdom.appendChild(this.worddom);
};

VoiceCanvas.prototype.delDom = function () {
  this.closeCtxDom();
  // 全局变量控制requestframe渲染 避免重复渲染导致浏览器卡顿
  sessionStorage.setItem("voicerender", false);
  setTimeout(() => {
    this.ctxdom.remove();
    this.ctxdom = null;
    this.infodom = null;
    this.canvasdom = null;
    recongin.recordfinish();
  }, 500);
  rendercanvas.destory();
};

// VoiceCanvas.prototype.openDom = function () {
//   this.canvasdom.style = "right:0";
// };

// VoiceCanvas.prototype.closeDom = function () {
//   this.canvasdom.style = "right:-200px";
// };

VoiceCanvas.prototype.init = function () {
  this.createCtxDom();
  this.createCanvasDom();
  this.createInofDom();
  this.createWordDom();

  setTimeout(() => {
    this.openCtxDom();
    recongin.recordstart();
  }, 100);
  rendercanvas.run();
};

/**
 * 语言转换
 * 用于将录入的语音转换为文字
 */
import { pathTo } from "@/tool/routerto/base";
import { handleVoiceWords } from "./voice/voicepath";
const recongin = new createSpeechRecognition();
function createSpeechRecognition() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  this.recognition = new SpeechRecognition();
  this.wordsindex = 0;
  this.recognition.continuous = true;
  this.recognition.lang = "zh-CN";
  this.recognition.interimResults = false;
  this.recognition.maxAlternatives = 1;
  this.recognition.addEventListener("result", (e) => {
    this.wirteWordsCtx(e.results[this.wordsindex][0].transcript);
    this.wordsindex++;
  });
}

createSpeechRecognition.prototype.recordstart = function () {
  console.log("开始语音识别");
  this.recognition.start();
};
createSpeechRecognition.prototype.wirteWordsCtx = function (words) {
  const dom = document.querySelector(".word");
  dom.innerHTML += words + "<br />";
  if (handleVoiceWords(words)) {
    dom.innerHTML +=
      "<span style='font-size:10px;color:gray'>触发关键词,已跳转到对应页面。</span>" +
      "<br />";
  }
};
createSpeechRecognition.prototype.recordfinish = function () {
  console.log("结束语音识别");
  this.recognition.stop();
};
