<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "输入标签",
  },
  value: {
    type: [String, Object, Array],
  },
  width:Number,
  rows:{
    type:[Number,String],
    default:2
  }
});
</script>

<template>
  <div class="stinput">
    <label class="mg-r10" for="stinput">{{ label }}:</label>
    <textarea
      class="mo-textarea"
      id="stinput"
      :rows="rows"
      v-model="value.title"
      style="width: 80%;"
    ></textarea>
  </div>
</template>

<style lang="less" scoped>

.stinput{
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 去除默认样式 */
textarea {
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  background-color: transparent;
  font-size: inherit;
  width: 50%;
  font-family: "catbite";
}

textarea:focus {
  outline: none;
}

/* 自定义样式 */
.mo-textarea {
  display: inline-block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  color: #606266;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* 提示文字 */
.mo-textarea::placeholder {
  color: #c0c4cc;
}

/* 鼠标hover */
.mo-textarea:hover {
  border-color: #c0c4cc;
}

/* 获得焦点 */
.mo-textarea:focus {
  border-color: #3677f0;
}
</style>
