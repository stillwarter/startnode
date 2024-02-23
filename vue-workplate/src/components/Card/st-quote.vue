<script setup>
const props = defineProps({
  ctx: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="quotebox">
    <div class="quote">
      {{ ctx }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.quotebox {
  padding: 10px;
  background: #d1d1d1;
  position: relative;
  border-radius: 6px;
  
  .quote {
    padding: 4px;
    white-space: pre-wrap;
    border-left: 3px solid #999;
  }
}
</style>
