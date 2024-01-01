import { h, render } from "vue";
import stPrompt from "@/components/Prompt/st-prompt.vue";
export function showMessage(ct, tiptype = "success", delay = 3) {
  const body = document.documentElement;
  const dom = h(stPrompt, { ct, tiptype, delay });
  render(dom, body);
  if (!dom.key) {
    dom.key = 1;
  }
}

// const addtest = () => {
//   // 尝试h函数挂载组件
//   let body = document.documentElement;
//   const props = {
//     title: "tt",
//   };
//   // render(h(stPrompt), body);
//   const dom = h(stPrompt, { ct: "test" });
//   render(dom, body);
//   if (!dom.key) {
//     dom.key = 1;
//   }
//   console.log(dom);
// };
