<!-- 
  说明，这是一个svg icon的容器，
  展示一个icon，以及对应的文字说明。

  容器需要一个长度，一个位置标识,然后结合使用stsvg组件
  
  支持上下左右四个方向

  islink? 若是link 则需要传递router相关参数

  margin? 与svg的间隔距离

 -->

<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  position: String,
  icontag: String,
  svgsize: {
    type: [Number, String],
    default: 20,
  },
  margin: {
    type: [Number, String],
    default: 0,
  },
  pathname: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="st-iconcard"
    :class="props.position == 'left' || props.position == 'right' ? 'flex' : ''"
  >
    <div
      v-if="props.position == 'top'"
      :style="'margin-bottom:' + margin + 'px'"
    >
      <div v-if="props.pathname">
        <RouterLink :to="{ name: props.pathname }">{{ icontag }}</RouterLink>
      </div>
      <span v-else> {{ icontag }}</span>
    </div>

    <div
      v-if="props.position == 'left'"
      :style="'margin-right:' + margin + 'px'"
    >
      <div v-if="props.pathname">
        <RouterLink :to="{ name: props.pathname }">{{ icontag }}</RouterLink>
      </div>
      <span v-else> {{ icontag }}</span>
    </div>

    <!-- svg -->
    <slot></slot>

    <div
      v-if="props.position == 'right'"
      :style="'margin-left:' + margin + 'px'"
    >
      <div v-if="props.pathname">
        <RouterLink :to="{ name: props.pathname }">{{ icontag }}</RouterLink>
      </div>
      <span v-else> {{ icontag }}</span>
    </div>

    <div
      v-if="props.position == 'bottom'"
      :style="'margin-top:' + margin + 'px'"
    >
      <div v-if="props.pathname">
        <RouterLink :to="{ name: props.pathname }">{{ icontag }}</RouterLink>
      </div>
      <span v-else> {{ icontag }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.st-iconcard {
  cursor: pointer;
}
.flex {
  display: flex;
  align-items: center;
}

div{
  text-align: center;
}

p {
  margin: 2px;
}

span {
  font-size: 12px;
}

a {
  color: #000;
}
a:hover {
  color: aqua;
}
</style>
