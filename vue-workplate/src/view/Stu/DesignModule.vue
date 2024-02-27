<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import stLogQuestion from "@/components/Card/st-log-question.vue";
import { designoverview } from "./data/base.js";

import singlemodule from "./DesignModule/singlemodule.vue";
import { getTitleH1, findH, getTopDes } from "@/tool/stushow.js";

const directorytitle = ref("目录");
const directoryctx = ref([]);
const pagedis = ref(window.screen.height);
const hkey = ref(0);

const toH = (dom, index) => {
  // 将目标元素滚动到可视区域
  dom.scrollIntoView({
    behavior: "smooth",
  });
  setTimeout(() => {
    hkey.value = index;
  }, 800);
};

const handleScroll = () => {
  // console.log("滚动高度", window.pageYOffset);
  const dis = document.documentElement.scrollTop;

  pagedis.value = parseInt(dis);
  // console.log(directoryctx.value[0].dt-parseInt(dis));
  // console.log(window.innerWidth);
  console.log();
  if (directoryctx.value.length != 0 && dis < directoryctx.value[0].dt - 200) {
    hkey.value = 0;
    return;
  }
  for (const i in directoryctx.value) {
    // 若当前元素距离顶部位置 减去 滚动距离顶部位置是大于0的 说明当前该元素内容还出现在页面上
    // 要找到当前内容超出1/3的位置,就是说他距离顶部只有1/3留到页面上
    // 比如第一个h2(底部)距离顶部888,那么滚动条滚到888的时候就已经没了,所以我们预留个1/4 当只有1/4出现在屏幕时候,就已经是下一个内容了
    // 不行 每个块的高度不一样,
    // 如果当前块高度
    // 当dis到888后,第一个就没了,预留200的空间,当888-200--dis的时候,这个时候就应该是下一个块了

    // console.log(parseInt(dis)-directoryctx.value[i].dt);
    // if (!(parseInt(directoryctx.value[i].dt * 3) / 4 - dis > 0)) {
    //   hkey.value = Number(i) + 1;
    // }
    if (dis > directoryctx.value[i].dt - 200) {
      hkey.value = Number(i) + 1;
    }
  }
};
window.addEventListener("scroll", handleScroll, true);

onMounted(async () => {
  const h1 = getTitleH1();
  directorytitle.value = h1 + "目录";
  directoryctx.value = await findH();

  // const foo = (n) =>
  //   new Promise((resolve) =>
  //     n < 3 ? setTimeout(() => ++n && resolve(foo(n)), 1000) : resolve(n)
  //   );

  // (async () => console.log(await foo(0)))(); // 8秒后打印8
});
</script>

<template>
  <div class="directorybox">
    <div>
      <h1>设计模式</h1>
      <stLogQuestion
        bordercolor="#6dd5ed"
        :content="designoverview"
        style="width: 100%;"
      />

      <!-- <JsOOP /> -->

      <router-view />

      <!-- <singlemodule /> -->
    </div>
    <div class="directory">
      <p>{{ directorytitle }}</p>
      <div class="titlelist">
        <div v-for="(item, index) in directoryctx" :key="index">
          <p
            v-if="item.type == 'h3'"
            class="h3p transition"
            @click="toH(item.dom, index)"
          >
            <span
              v-if="hkey == index"
              style="color: rgb(21, 202, 49) !important;"
            >
              {{ item.inner }}</span
            >
            <span v-else>{{ item.inner }}</span>
          </p>
          <p v-else class="h2p transition" @click="toH(item.dom, index)">
            <span
              v-if="hkey == index"
              style="color: rgb(21, 202, 49) !important;"
            >
              {{ item.inner }}</span
            >
            <span v-else>{{ item.inner }}</span>
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
  padding-top: 10px;
  box-sizing: border-box;
  top: 24px;
  position: sticky;
  height: calc(100vh - 24px);
  overflow: auto;
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
