<script setup>
import stLogQuestion from "@/components/Card/st-log-question.vue";
import JsOOP from "./JsOOP/JsOOP.vue";
import { designoverview } from "./data/base.js";

import singlemodule from "./DesignModule/singlemodule.vue";
</script>

<template>
  <div>
    <h1>设计模式</h1>
    <stLogQuestion
      bordercolor="#6dd5ed"
      :content="designoverview"
      style="width: 80%"
    />

    <JsOOP />

    <singlemodule />
  </div>
</template>

<style lang="less" scoped>
h1 {
  margin: 0;
}
</style>
