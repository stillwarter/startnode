import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": {},
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      comps: path.resolve(__dirname, "src/components"),
    },
  },
  server: {
    // host: '192.168.0.45',
    // port: 8080,
    proxy: {
      // 接口地址代理
      "/node-work": {
        target: "http://127.0.0.1:3090", // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace(/^\/node-work/, "/"),
      },
      //
      "/api": {
        target: "https://fishpi.cn",
        changeOrigin: true,
      },
    },
  },
});
