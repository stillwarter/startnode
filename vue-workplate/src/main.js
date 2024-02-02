import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// 自定义字体
import "./style/font.css";
// 常用类
import "./style/useful.css";
// 全部css变量
import "./style/color.css";
const app = createApp(App);
// app.config.globalProperties.$Message='message';
app.use(router).mount("#app");

setInterval(function () {
  check();
}, 1000);
var check = function () {
  function doCheck(a) {
    if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
      (function () {})["constructor"]("debugger")();
    } else {
      (function () {})["constructor"]("debugger")();
    }
    doCheck(++a);
  }
  try {
    doCheck(0);
  } catch (err) {}
};
check();
