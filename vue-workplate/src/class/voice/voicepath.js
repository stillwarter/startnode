/**
 * word 模糊处理
 */
import { pathTo } from "@/tool/routerto/base";

let lib, leap, library, 实验室;
lib = leap = library = 实验室 = function () {
  pathTo("lib");
};

let study, 学习;
study = 学习 = function () {
  pathTo("stu");
};
// const lib = (leap = library = function () {
//   pathTo("lib");
// });
const strategWords = {
  lib,
  leap,
  library,
  实验室,
  学习,
  study,
};

export function handleVoiceWords(key) {
  let keyaim = key
    .replace(
      /(\ |\s*(.*?)\s+$|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\(|\)|\{|\}|\;|\:|\"|\'|\,|\，|\。|\“|\”|\‘|\’|\¥|\？|\（|\）|\；|\：|\、|\！|\<|\.|\>|\/|\?)/g,
      ""
    )
    .toLowerCase();
  if (strategWords[keyaim]) {
    console.log(keyaim, strategWords[keyaim]);
    strategWords[keyaim]();
    return 1;
  } else {
    return 0;
  }
}
// export function handleVoiceWords(words) {}
