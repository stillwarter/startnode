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

