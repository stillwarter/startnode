<script setup>
import { ref } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import { getMyPlanCtx } from "@/api/plan.js";
import "md-editor-v3/lib/preview.css";
import { useRouter } from "vue-router";
const router = useRouter();
const mdtitle = {
  title: router.currentRoute.value.query.title,
};
const precontent = ref("");
getMyPlanCtx(mdtitle).then((res) => {
  precontent.value = res.data.data;
});
</script>

<template>
  <div class="basebox flexcenter">
    <div class="prebox">
      <MdPreview
        style="border-radius: 4px"
        editorId="mypre"
        v-model="precontent"
      />
      <MdCatalog editorId="mycata" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.prebox {
  width: 80%;
  margin-top: 30px;
}

</style>
