<script setup>
import { ref } from "vue";
import { getPlanList } from "@/api/plan";
const mdlist = ref(0);
getPlanList().then((res) => {
  mdlist.value = res.data.data;
});
</script>

<template>
  <h1 class="centerh1">Plans</h1>
  <div class="basebox flexjustifycenter">
    <div class="listbox" v-if="mdlist.length">
      <div class="mg-b10 cursorpoint" v-for="(item, index) in mdlist">
        <router-link
          class="fontsize20"
          :to="'/planpreview?title=' + item.substring(0, item.length - 3)"
          >{{ item.substring(0, item.length - 3) }}</router-link
        >
      </div>
    </div>
    <div class="mg-t30" v-else>
      本月还没有记录哟~
    </div>

    <div class="meunbtn">
      <router-link :to="'/planedit'">add</router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.listbox {
  width: 60%;
  padding-top: 10px;
}

.meunbtn {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px;
  cursor: pointer;
}
</style>
