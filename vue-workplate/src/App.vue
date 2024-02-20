<template>
  <div>
    <workhead></workhead>
    <aimwork></aimwork>
    <div style="margin-top: 24px;">
      <router-view></router-view>
    </div>
  </div> 
</template>

<script setup>
import workhead from "@/view/head/base.vue";
import aimwork from "@/view/aimwork/base.vue"
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
