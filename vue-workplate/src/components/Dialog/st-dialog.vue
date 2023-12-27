<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  data: [Object, Array],
  title: {
    type: String,
    default: "弹框标题",
  },
});

const emits = defineEmits(["closeDialog", "sureDialog"]);
const close = () => {
  emits("closeDialog");
};
const sure = () => {
  emits("sureDialog");
};
</script>

<template>
  <transition>
    <div class="dialogmask flexcenter" v-show="show">
      <div class="mianbox">
        <h2 class="mg-t0">{{ title }}</h2>

        <div class="editbox">
          <slot></slot>
        </div>

        <div class="footerbtn mg-t20">
          <div class="btnsure flexcenter" @click="sure">确认</div>
          <div class="btncancel flexcenter" @click="close">取消</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.dialogmask {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  backdrop-filter: blur(10px);
}

.mianbox {
  width: 600px;
  min-height: 30px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 3px 3px 8px 1px rgba(203, 203, 203, 0.79);
  padding: 24px;
  .footerbtn {
    width: 100%;
    display: flex;
    justify-content: center;
    .btnsure {
      padding: 10px;
      border-radius: 6px;
      background: gold;
      cursor: pointer;
      margin-right: 30px;
    }
    .btncancel {
      padding: 10px;
      border-radius: 6px;
      background: gainsboro;
      cursor: pointer;
    }
  }
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
