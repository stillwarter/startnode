<script setup>
import { ref } from "vue";
import { postPlanMd } from "@/api/edit.js";
import { useRouter } from "vue-router";
import { showMessage } from "@/tool/message";
import mdEditorV3 from "@/components/EdiTool/md-editor-v3.vue";
import dayjs from "dayjs";
const router=useRouter()
const update = dayjs(new Date().now).format("YYYY-MM-DD HH:mm:ss");

/* 编辑完成保存 */
const onSave = (v, h) => {
  console.log(v);

  h.then((html) => {
    const parmas = {
      update,
      data: JSON.stringify(html),
    };
    postPlanMd(parmas).then((res) => {
      showMessage("保存成功");
      router.push("plan")
    });
  });
};
</script>
<template>
  <div class="planbox">
    <div class="editorbox">
      <mdEditorV3 @onSave="onSave" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.planbox {
  width: 100vw;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  .editorbox {
    width: 80%;
    min-height: calc(100vh - 24px);
    #md-editor-v3 {
      min-height: calc(100vh - 24px);
    }
  }
}
</style>
