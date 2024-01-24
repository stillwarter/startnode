<script setup>
import { toRaw, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const curpath = toRaw(router).currentRoute.value.fullPath;
const meun = ref(toRaw(router).currentRoute.value.matched[0].children);

const pathTo = (name) => {
  // console.log(toRaw(router).currentRoute.value);
  // router.push(curpath + "/" + path);
  router.push({
    name,
  });
};

const directorykey = ref(0);
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    directorykey.value += 1;
  },
  { immediate: true }
);
</script>

<template>
  <div class="stubox" :key="directorykey">
    <div class="leftmeun">
      <div
        v-for="(item, index) in meun"
        :key="index"
        @click="pathTo(item.name)"
      >
        {{ item.path }}
        <div
          class="cursorpoint transition"
          v-for="(citem, cindex) in item.children"
          :key="cindex"
          @click.stop="pathTo(citem.name)"
        >
          {{ citem.name }}
        </div>
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
    top: 24px;
  }
  .ctx {
    padding: 20px 50px;
  }
}

.cursorpoint {
  padding-left: 20px;
}
.cursorpoint:hover {
  color: aqua;
}
</style>
