<script setup>
import { ref, onMounted } from "vue";
let show = ref(0);
const tt = ref(null);

const props = defineProps({
  ct: String,
  tiptype: {
    type: String,
    default: "success",
  },
  delay: {
    type: [String, Number],
    default: 3,
  },
});

onMounted(() => {
  setTimeout(() => {
    show.value = 1;
  }, 100);
  setTimeout(() => {
    show.value = 0;
  }, props.delay * 1000);
});
</script>

<template>
  <transition>
    <div v-if="tiptype == 'success'" class="tip" v-show="show">
      {{ tiptype }} : {{ ct }}
    </div>
    <div v-else-if="tiptype == 'err'" class="tip err" v-show="show">
      {{ tiptype }} : {{ ct }}
    </div>

    <!-- <div class="tip" v-show="show">请先输入tag内容... {{ ct }}</div> -->
  </transition>
</template>

<style lang="less" scoped>
.tip {
  position: absolute;
  z-index: 100;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background: greenyellow;
  border-radius: 4px;
}

.err {
  background: palevioletred;
  color: #fff;
}

/* 进入之前和离开后的样式 */
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* 离开和进入过程中的样式 */
.v-enter-active,
.v-leave-active {
  /* 添加过渡动画 */
  transition: opacity 0.5s ease;
}
/* 进入之后和离开之前的样式 */
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
