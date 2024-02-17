# Voice IO and Voice graphics render

前言：很早之前我就想过用程序将声音转换为文字，这样就可以离开键盘不打字了。

### 1.Vioce to words

首要解决的问题就是语音转文字了，简单瞄了一眼讯飞的语音识别，要钱，算了，直接看web audio，好像有可以用的api。

简单百度一下后，可以使用web speech api来做语音转换，这是ai给的例子：

```js
// 创建 SpeechRecognition 对象
const speechRecognition = new SpeechRecognition();

// 监听语音识别事件
speechRecognition.addEventListener('start', () => {
  console.log('语音识别开始');
});

speechRecognition.addEventListener('result', (event) => {
  const { results } = event;
  for (let i = 0; i < results.length; i++) {
    const { transcript, confidence } = results[i];
    console.log(`转录结果: ${transcript}, 置信度: ${confidence}`);
  }
});

speechRecognition.addEventListener('error', (event) => {
  console.error('发生错误:', event);
});

// 开始语音识别
speechRecognition.start();
```

ok，用这个例子放入StartNode里尝试一下，创建一个myVoicejs文件，写入上述代码，然后试运行：

![1707211005530.png](http://localhost:3090/public/img/2024/02/1707211005530.png)

ok，能用。

但是这个api在语音录入的时候，没有什么反馈之类的，我想做一个语音可视化的界面来提供这种反馈效果。

### 2.Voice graphics render

现在开始尝试做一下语音的图形化。

首先上github上找一下现成的语音可视化的库，能白嫖就白嫖。看了一些现成的，都是那种折线图的动画，可以我想做环形的动画...

所以还是试着做一个简单的例子吧。多方百度后，发现MDN官网给了一个现成的例子：  
https://mdn.github.io/voice-change-o-matic/

这个例子的核心：

```js
export function setAudioCtx() {
  // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // this.analyser = this.audioCtx.createAnalyser();
  // nalyserNode.minDecibels属性用于设置快速傅立叶变换（FFT）数据的最小值，取值范围为-100到0，默认值为-100。该属性可以与AnalyserNode.maxDecibels属性一起使用，用于指定FFT数据的缩放范围。
  this.analyser.minDecibels = -90;
  this.analyser.maxDecibels = -10;
  this.analyser.smoothingTimeConstant = 0.85;
  // 失真效果 createWaveShaper()是AudioContext对象的一个方法，用于创建一个WaveShaperNode对象。该对象通常被用来给音频添加失真效果，也可以用于实现音频的变形处理，如改变音频的音高或音色等。
  const distortion = this.audioCtx.createWaveShaper();
  // createGain是Web Audio API提供的方法之一，用于创建增益节点（ Gain Node ），也称为音量节点。增益节点允许你控制音频信号的音量，即音频的相对强度或音量级别。这在音频处理和音频效果中非常有用，因为它可以让你动态调整音频的音量，创建渐入渐出效果，以及实现音频混音等任务。
  const gainNode = this.audioCtx.createGain();
  // createBiquadFilter()是Web Audio API中的一个方法，用于创建一个双二阶滤波器（Biquad Filter）节点。双二阶滤波器是一种音频滤波器，可以对音频信号进行滤波处理，改变其频率响应。
  const biquadFilter = this.audioCtx.createBiquadFilter();
  // createConvolver是AudioContext对象的一个方法，用于创建一个卷积器节点ConvolverNode。该节点可以对输入的音频信号应用卷积运算，以实现音频处理效果，如滤波、混响等。卷积器节点在音频处理中常用于创建音频效果，例如通过应用滤波器来改变音频的频率响应，或者通过应用混响效果来模拟不同的声学环境。
  const convolver = this.audioCtx.createConvolver();

  // 用于创建回声延迟效果节点（Echo Delay Effect Node）。回声延迟效果节点可以对音频信号应用回声效果，通过调整延迟时间、反馈量等参数来控制回声的特征，实现音频的混响、回声等效果。
  const echoDelay = createEchoDelayEffect(this.audioCtx);
  // 支持getUserMedia 进行以下操作
  if (navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    const constraints = { audio: true };
    const that = this;
    let source;
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      // console.log(stream);
      source = that.audioCtx.createMediaStreamSource(stream);
      source.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      // // convolver.connect(gainNode);
      echoDelay.placeBetween(gainNode, that.analyser);
      // analyser.connect(audioCtx.destination);
      visualize(that.analyser);
    });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
}

// 绘制图像渲染函数
function visualize(analyser) {
  let canvas = document.querySelector(".visualizer");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.className = "visualizer";
    canvas.width = 80;
    canvas.height = 100;
    canvas.style = "border-radius: 4px;";
    const dom = document.querySelector(".cavbox");
    dom.appendChild(canvas);
  }
  const canvasCtx = canvas.getContext("2d");
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  sessionStorage.setItem("voicerender", true);

  //   const visualSetting = visualSelect.value;
  //   console.log(visualSetting);

  //   if (visualSetting === "sinewave") {
  if (1) {
    analyser.fftSize = 2048;
    const bufferLength = analyser.fftSize;
    // We can use Float32Array instead of Uint8Array if we want higher precision
    // const dataArray = new Float32Array(bufferLength);
    const dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    const draw = function () {
      // console.log(sessionStorage.getItem("voicerender") == "false");

      const drawVisual = requestAnimationFrame(draw);
      if (sessionStorage.getItem("voicerender") == "false") {
        // console.log(sessionStorage.getItem("voicerender"));
        // console.log(1);
        cancelAnimationFrame(drawVisual);
        return;
      } else {
        // console.log(sessionStorage.getItem("voicerender"));
      }

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "rgb(200, 200, 200)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";

      canvasCtx.beginPath();

      const sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = (v * HEIGHT) / 2;

        if (i === 0) {
          // canvasCtx.moveTo(x, y);
          // canvasCtx.arc(40, 50, y / 2, 0, 360);
        } else {
          // canvasCtx.lineTo(x, y);
          // canvasCtx.arc(x, y, r)
          canvasCtx.arc(40, 50, y / 4, 0, 360);
          // canvasCtx.arc(40, 50, x / 2, 0, 360);
        }

        x += sliceWidth;
      }

      // canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();

      // if (!sessionStorage.getItem("voicerender")) {
      //   console.log(sessionStorage.getItem("voicerender"));
      //   return 0;
      // }
    };

    draw();
  } else if (visualSetting == "frequencybars") {
    analyser.fftSize = 256;
    const bufferLengthAlt = analyser.frequencyBinCount;

    // See comment above for Float32Array()
    const dataArrayAlt = new Uint8Array(bufferLengthAlt);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    const drawAlt = function () {
      drawVisual = requestAnimationFrame(drawAlt);

      analyser.getByteFrequencyData(dataArrayAlt);

      canvasCtx.fillStyle = "rgb(0, 0, 0)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLengthAlt) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArrayAlt[i];

        canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    drawAlt();
  } else if (visualSetting == "off") {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.fillStyle = "red";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}
```

上述代码是来自voice-change-o-matic，我改动了绘制函数的部分，他这个例子绘制的是折线图，所以我直接在绘制函数里进行了小小的改动，这样就可以达到圆环的效果！

最后，将这些内容整合起来，就完成了。