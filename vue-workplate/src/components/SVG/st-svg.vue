<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  svgsize: Number,
});

const svgbox = ref(null);
onMounted(() => {
  const svgdom = svgbox.value.children[0];
  svgdom.setAttribute("width", props.svgsize);
});
</script>

<template>
  <div ref="svgbox" class="svgbox">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.svgbox {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<!-- 
usedemo
  <stSvg :svgsize="size">
  <div v-html="icon1"></div>
</stSvg>
-->
