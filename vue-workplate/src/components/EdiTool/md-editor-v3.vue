<script setup>
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const text = ref('# 编辑计划书');

</script>

<template>
  <MdEditor v-model="text" />
</template>
