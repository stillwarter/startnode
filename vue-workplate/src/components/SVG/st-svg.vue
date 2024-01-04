<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  svgsize: [Number, String],
  topath: String,
});

const svgbox = ref(null);

const pathTo = () => {
  if (props.topath) {
    router.push(props.topath);
  }
};

onMounted(() => {
  const svgdom = svgbox.value.children[0];
  svgdom.setAttribute("width", props.svgsize);
});
</script>

<template>
  <div ref="svgbox" class="svgbox" @click="pathTo">
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
