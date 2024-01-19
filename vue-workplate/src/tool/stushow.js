import { showMessage } from "@/tool/message";
/**
 * 用于处理stu页面的文章内容
 */

/**
 * 获取h标签及其子h标签
 * 做个规范-只能有一个h1，并且只返回第一个
 */
export function getTitleH1() {
  const h1dom = document.querySelectorAll("h1");
  if (h1dom.length > 1) {
    showMessage("只能由一个h1", "err");
  }
  return h1dom[0].innerHTML;
}

/**
 * 获取h2和h3
 * 目前只处理这两个吧~
 */
export function findH() {
  const arr = [];
  const h2dom = document.querySelectorAll("h2");
  const h3dom = document.querySelectorAll("h3");
  addList(arr, h2dom, "h2");
  addList(arr, h3dom, "h3");

  arr.sort((a, b) => {
    const charA = a.inner[0];
    const charB = b.inner[0];

    if (charA < charB) {
      return -1;
    }
    if (charA > charB) {
      return 1;
    }

    return 0;
  });
  return arr;
}

function addList(arr, obj, type) {
  for (const item of obj) {
    arr.push({
      dom: item,
      inner: item.innerHTML,
      type,
    });
  }
}
