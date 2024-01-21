<script setup>
import { toRaw, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const curpath = toRaw(router).currentRoute.value.fullPath;
const meun = ref(toRaw(router).currentRoute.value.matched[0].children);

const pathTo = (path) => {
  router.push(curpath + "/" + path);
};
</script>

<template>
  <div class="stubox">
    <div class="leftmeun">
      <div
        class="cursorpoint transition"
        v-for="(item, index) in meun"
        :key="index"
        @click="pathTo(item.path)"
      >
        {{ item.path }}
      </div>
    </div>

    <div class="ctx">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.stubox {
  width: 100vw;
  min-height: calc(100vh - 24px);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 5fr;
  .leftmeun {
    border-right: 1px solid #000;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 10px;
    height: 100vh;
    position: sticky;
    top: 0px;
  }
  .ctx {
    padding: 20px 50px;
  }
}

.cursorpoint:hover {
  color: aqua;
}
</style>
