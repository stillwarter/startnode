<script setup>
const props =defineProps ({
  label: {
    type: String,
    default: "输入标签",
  },
  value: {
    type: [String, Object, Array],
  },
});
</script>

<template>
  <div class="stinput">
    <label class="mg-r10" for="stinput">{{ label }}:</label>
    <textarea
      id="stinput"
      cols="行数"
      rows="列数"
      v-model="value.title"
    ></textarea>
  </div>
</template>
