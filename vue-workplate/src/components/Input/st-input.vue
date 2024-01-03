<script setup>
import { ref, watch } from "vue";
const emit = defineEmits(["update:contentvalue"]);
const props = defineProps({
  label: {
    type: String,
    default: "输入标签",
  },
  contentvalue: {
    type: [String, Object, Array, Number],
  },
});

const contentvalue = ref(props.contentvalue);
//因为prop中的值非动态响应，所以需要通过watch监听，immediate 初始化时接收父组件中的传值
watch(
  () => props.contentvalue,
  (newval, oldval) => {
    contentvalue.value = props.contentvalue;
    console.log(newval);
  }
);

// 发送事件
const contentvalueChange = () => {
  emit("update:contentvalue", contentvalue.value);
};
</script>

<template>
  <div class="stinput">
    <label class="mg-r10" for="stinput">{{ label }}:</label>
    <input
      type="text"
      id="stinput"
      v-model="contentvalue"
      @change="contentvalueChange"
    />
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
