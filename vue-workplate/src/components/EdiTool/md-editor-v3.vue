<script setup>
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { showMessage } from "@/tool/message";

import { postImg } from "@/api/edit.js";
const mdeditor = ref(null);
// const text = ref("# 编辑计划书/日志/随笔");
const text = ref("## 编辑计划书 or 日志 or 随笔(请编辑标题)");

/**
 * 图片上传
 */
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        postImg(file).then((res) => {
          mdeditor.value
            ?.insert(() => {
              return {
                targetValue: `\n\n![${res.data.imgname}](${res.data.fileposition}/${res.data.imgname})`,
                select: true,
                deviationStart: 0,
                deviationEnd: 0,
              };
            })
        });
      });
    })
  );
};
</script>

<template>
  <MdEditor v-model="text" @onUploadImg="onUploadImg" ref="mdeditor" />
</template>
