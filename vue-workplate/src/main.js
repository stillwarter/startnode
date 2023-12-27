import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// 自定义字体
import "./style/font.css";
// 常用类
import "./style/useful.css";
createApp(App).use(router).mount("#app");
