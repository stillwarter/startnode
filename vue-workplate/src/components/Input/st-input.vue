<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "输入标签",
  },
});
</script>

<template>
  <div class="stinput">
    <label class="mg-r10" for="stinput">{{ label }}:</label>
    <input type="text" id="stinput" />
  </div>
</template>

<style lang="less" scoped>
.stinput {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
}

input[type="text"]:focus {
  border: 1px solid burlywood;
}

.input_control {
  width: 180px;
  margin: 20px auto;
}
input[type="text"] {
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  padding: 20px;
  height: 1.7em;
  border-radius: 4px;
  border: 1px solid #c8cccf;
  color: #6a6f77;
  display: block;
  outline: 0;
  padding: 0 1em;
  text-decoration: none;
  width: 80%;
  text-align: left;
}
</style>
