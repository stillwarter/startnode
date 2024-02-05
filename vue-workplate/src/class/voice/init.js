export function init() {
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  if (navigator.mediaDevices.getUserMedia === undefined) {
    //getUserMedia是 JavaScript 中的一个函数，用于获取用户的媒体流（例如摄像头、麦克风）。它允许网页应用程序在浏览器中访问用户的音频和视频输入设备，从而实现实时音频和视频通信、录制视频或音频等功能。
    navigator.mediaDevices.getUserMedia = function (constraints) {
      // First get ahold of the legacy getUserMedia, if present
      // 首先获取遗留的getUserMedia（如果存在）
      const getUserMedia =
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      // Some browsers just don't implement it - return a rejected promise with an error
      // 有些浏览器就是不实现它——返回一个被拒绝的承诺并返回一个错误
      // to keep a consistent interface 保持一致的界面
      if (!getUserMedia) {
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      // 否则，使用Promise包装对旧navigator.getUserMedia的调用
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }

  // 通过XHR为卷积器节点抓取音轨
  // let soundSource;
  // let ajaxRequest = new XMLHttpRequest();

  // ajaxRequest.open(
  //   "GET",
  //   "https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg",
  //   true
  // );

  // ajaxRequest.responseType = "arraybuffer";

  // ajaxRequest.onload = function () {
  //   const audioData = ajaxRequest.response;

  //   audioCtx.decodeAudioData(
  //     audioData,
  //     function (buffer) {
  //       // soundSource = audioCtx.createBufferSource();
  //       convolver.buffer = buffer;
  //     },
  //     function (e) {
  //       console.log("Error with decoding audio data" + e.err);
  //     }
  //   );
  // };

  // ajaxRequest.send();

  // 进行音频录制的主块
  let source;
  //
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // createAnalyser()是AudioContext对象的一个方法，用于创建一个AnalyserNode对象。该对象可以对音频信号进行实时的快速傅立叶变换（FFT），以得到音频的时域/频域数据。通过这些数据，可以实现时域分析、频域分析、音频可视化动效等。
  const analyser = audioCtx.createAnalyser();
  // nalyserNode.minDecibels属性用于设置快速傅立叶变换（FFT）数据的最小值，取值范围为-100到0，默认值为-100。该属性可以与AnalyserNode.maxDecibels属性一起使用，用于指定FFT数据的缩放范围。
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;
  // 在上述代码中，将minDecibels设置为-90，maxDecibels设置为-10，这意味着将FFT数据的范围从-100到0映射到-90到-10之间。smoothingTimeConstant属性用于设置平滑时间常数，取值范围为0到1，用于平滑FFT数据，以减少噪声和波动。

  // 失真效果 createWaveShaper()是AudioContext对象的一个方法，用于创建一个WaveShaperNode对象。该对象通常被用来给音频添加失真效果，也可以用于实现音频的变形处理，如改变音频的音高或音色等。
  const distortion = audioCtx.createWaveShaper();
  // createGain是Web Audio API提供的方法之一，用于创建增益节点（ Gain Node ），也称为音量节点。增益节点允许你控制音频信号的音量，即音频的相对强度或音量级别。这在音频处理和音频效果中非常有用，因为它可以让你动态调整音频的音量，创建渐入渐出效果，以及实现音频混音等任务。
  const gainNode = audioCtx.createGain();
  // createBiquadFilter()是Web Audio API中的一个方法，用于创建一个双二阶滤波器（Biquad Filter）节点。双二阶滤波器是一种音频滤波器，可以对音频信号进行滤波处理，改变其频率响应。
  const biquadFilter = audioCtx.createBiquadFilter();
  // createConvolver是AudioContext对象的一个方法，用于创建一个卷积器节点ConvolverNode。该节点可以对输入的音频信号应用卷积运算，以实现音频处理效果，如滤波、混响等。卷积器节点在音频处理中常用于创建音频效果，例如通过应用滤波器来改变音频的频率响应，或者通过应用混响效果来模拟不同的声学环境。
  const convolver = audioCtx.createConvolver();

  // 用于创建回声延迟效果节点（Echo Delay Effect Node）。回声延迟效果节点可以对音频信号应用回声效果，通过调整延迟时间、反馈量等参数来控制回声的特征，实现音频的混响、回声等效果。
  const echoDelay = createEchoDelayEffect(audioCtx);

  // 支持getUserMedia 进行以下操作
  if (navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    const constraints = { audio: true };
    // const constraints =null
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        // createMediaStreamSource是Web Audio API中的一个方法，用于创建一个新的MediaStreamAudioSourceNode对象。该方法需要传入一个媒体流对象（MediaStream对象），来自MediaStream的音频就可以被播放和操作。
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(distortion);
        distortion.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        // // convolver.connect(gainNode);
        echoDelay.placeBetween(gainNode, analyser);
        // analyser.connect(audioCtx.destination);

        visualize();
        //   voiceChange();
      })
      .catch(function (err) {
        console.log("The following gUM error occured: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }

  function createEchoDelayEffect(audioContext) {
    const delay = audioContext.createDelay(1);
    const dryNode = audioContext.createGain();
    const wetNode = audioContext.createGain();
    const mixer = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    delay.delayTime.value = 0.75;
    dryNode.gain.value = 1;
    wetNode.gain.value = 0;
    filter.frequency.value = 1100;
    filter.type = "highpass";

    return {
      apply: function () {
        wetNode.gain.setValueAtTime(0.75, audioContext.currentTime);
      },
      discard: function () {
        wetNode.gain.setValueAtTime(0, audioContext.currentTime);
      },
      isApplied: function () {
        return wetNode.gain.value > 0;
      },
      placeBetween: function (inputNode, outputNode) {
        inputNode.connect(delay);
        delay.connect(wetNode);
        wetNode.connect(filter);
        filter.connect(delay);

        inputNode.connect(dryNode);
        dryNode.connect(mixer);
        wetNode.connect(mixer);
        mixer.connect(outputNode);
      },
    };
  }

  const canvas = document.querySelector(".visualizer");

  const canvasCtx = canvas.getContext("2d");
  function visualize() {
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

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

      console.log(bufferLength);
      const draw = function () {
        const drawVisual = requestAnimationFrame(draw);

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
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      };

      draw();
    } else if (visualSetting == "frequencybars") {
      analyser.fftSize = 256;
      const bufferLengthAlt = analyser.frequencyBinCount;
      console.log(bufferLengthAlt);

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
          canvasCtx.fillRect(
            x,
            HEIGHT - barHeight / 2,
            barWidth,
            barHeight / 2
          );

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
}