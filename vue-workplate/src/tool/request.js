import axios from "axios";
import { showMessage } from "@/tool/message";
const baseURL = "node-work";

const service = axios.create({
  baseURL,
  // timeout:5000
});

// 统一错误拦截处理
service.interceptors.response.use(
  (response) => {
    if (response.data) {
      // 数据正常，进行的逻辑功能
      return response;
    } else {
      // 如果返回的 success 是 false，表明业务出错，直接触发 reject
      // 抛出的错误，被 catch 捕获
      showMessage(response.data.message,"err");
      return Promise.reject(new Error(response.data.message));
    }
  },
  (error) => {
    // 对响应错误做点什么
    showMessage(error,"err");
    return Promise.reject(error)
  }
);
export default service;
