<script setup>
import { ref,toRaw } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const curpath = toRaw(router).currentRoute.value.fullPath;
const meun = ref(toRaw(router).currentRoute.value.matched[0].children);

const pathTo = (path) => {
  router.push(curpath + "/" + path);
};
</script>

<template>
  <div class="libbox">
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
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.libbox {
  width: 100vw;
  min-height: calc(100vh - 24px);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 5fr;
  .leftmeun {
    border-right: 1px solid #000;
    padding-left: 16px;
    padding-top: 10px;
  }
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
</style>
