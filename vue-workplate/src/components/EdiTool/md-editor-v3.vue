<script setup>
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { postImg } from "@/api/edit.js";
const text = ref("# 编辑计划书");

// const onUploadImg = (files) => {
//   console.log(typeof files);
//   postImg(JSON.stringify(files));
// };

const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("file", file);

        // axios
        //   .post("/api/img/upload", form, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   })
        //   .then((res) => rev(res))
        //   .catch((error) => rej(error));
        postImg(form);
      });
    })
  );

  callback(res.map((item) => item.data.url));
};
</script>

<template>
  <MdEditor v-model="text" @onUploadImg="onUploadImg" />
</template>
