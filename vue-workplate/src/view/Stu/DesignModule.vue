<script setup>
import { onMounted, ref } from "vue";
import stLogQuestion from "@/components/Card/st-log-question.vue";
import JsOOP from "./JsOOP/JsOOP.vue";
import { designoverview } from "./data/base.js";

import singlemodule from "./DesignModule/singlemodule.vue";
import { getTitleH1, findH } from "@/tool/stushow.js";

const directorytitle = ref("目录");
const directoryctx = ref([]);

const toH = (dom) => {
  // 将目标元素滚动到可视区域
  dom.scrollIntoView({
    behavior: "smooth",
  });
};

onMounted(() => {
  const h1 = getTitleH1();
  directorytitle.value = h1 + "目录";

  directoryctx.value = findH();
});
</script>

<template>
  <div class="directorybox">
    <div>
      <h1>设计模式</h1>
      <stLogQuestion
        bordercolor="#6dd5ed"
        :content="designoverview"
        style="width: 100%"
      />

      <JsOOP />

      <!-- <singlemodule /> -->
    </div>
    <div class="directory">
      <p>{{ directorytitle }}</p>
      <div class="titlelist">
        <div v-for="(item, index) in directoryctx" :key="index">
          <p
            v-if="item.type == 'h3'"
            class="h3p transition"
            @click="toH(item.dom)"
          >
            {{ item.inner }}
          </p>
          <p v-else class="h2p transition" @click="toH(item.dom)">
            {{ item.inner }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
h1 {
  margin: 0;
}

.directorybox {
  display: grid;
  grid-template-columns: 4fr 1fr;
  position: relative;
}

.directory {
  margin-left: 20px;
  padding-left: 10px;
  top: 0;
  position: sticky;
  height: 20px;
  .titlelist {
    margin-left: 10px;
    margin-top: 10px;
    border-left: 1px dotted silver;
    padding-left: 10px;
  }
}

p {
  margin: 0;
}

.h3p {
  padding-left: 14px;
  cursor: pointer;
  color: #666;
}

.h2p {
  cursor: pointer;
}

.h3p:hover,
.h2p:hover {
  color: rgb(229, 46, 76);
}
</style>
