<template>
  <div class="dayitem">
    <div class="dayline">
      <div class="handicon"></div>
      <div style="position: sticky; top: 100px; padding-right: 40px;">
        <h2 class="daytitle">
          {{ data?.title }}
        </h2>

        <div class="iconcountbox">
          <stIcontag>
            <p style="position: absolute; right: 10px;">10</p>
          </stIcontag>
        </div>

        <p class="date">{{ year }}-12-{{ day.day + 1 }}</p>
        <!-- <p class="handleicon" @click="openEditItem(index, data)">edit</p> -->
      </div>
    </div>
    <div class="logcontent">
      <!-- <p v-if="day.data">{{ JSON.parse(JSON.stringify(day.data)).yourlog }}</p> -->
      {{ data?.yourlog }}

      <!-- {{ JSON.parse(day.data) || "no log" }} -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import stIcontag from "@/components/Tag/st-icontag.vue";
const props = defineProps({
  index: Number,
  day: [Number, String, Object],
  data: [Object],
});
const date = new Date();
const year = ref(date.getFullYear());

const emits = defineEmits(["openEdit"]);
const openEditItem = (index, data) => {
  emits("openEdit", index, data);
};
</script>

<style lang="less" scoped>
.dayitem {
  width: 1200px;
  box-sizing: border-box;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: 1fr 1fr;
  .dayline {
    box-sizing: border-box;
    border-left: 2px solid #d8dee4;
    position: relative;
    padding-left: 30px;
    .handicon {
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      position: absolute;
      top: -16px;
      left: -5px;
      zoom: 1.5;
    }
    .handicon::before {
      content: "";
      display: block;
      width: 6px;
      height: 0px;
      position: absolute;
      left: -6px;
      border: 1px solid #000;
      z-index: -1;
      animation: leftrotate 3s ease-in-out infinite;
      transform-origin: 10px 1px;
    }
    .handicon::after {
      content: "";
      display: block;
      width: 6px;
      height: 0px;
      position: absolute;
      right: -6px;
      z-index: -1;
      animation: rightrotate 3s ease-in-out infinite;
      transform-origin: -2px 1px;
      border: 1px solid #000;
    }
    .daytitle {
      max-width: 50%;
      display: flex;
      box-sizing: border-box;
      text-align: left;
      position: relative;
      top: -36px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .date {
      text-align: left;
      color: #abb8c3;
      font-size: 20px;
    }
    .handleicon {
      position: absolute;
      text-align: left;
      top: 0;
      cursor: pointer;
    }
  }
  .logcontent {
    min-height: 400px;
    text-align: left;
    font-size: 20px;
    position: relative;
    top: -36px;
  }
}

.iconcountbox {
  width: 100px;
}

//
@keyframes leftrotate {
  0% {
    transform: rotate(0deg);
    border: 1px solid #000;
  }
  50% {
    border: 1px solid #999;
  }
  100% {
    transform: rotate(360deg);
    border: 1px solid #000;
  }
}

@keyframes rightrotate {
  0% {
    transform: rotate(0deg);
    border: 1px solid #000;
  }
  50% {
    border: 1px solid #999;
  }
  100% {
    transform: rotate(360deg);
    border: 1px solid #000;
  }
}

//
p,
h2 {
  margin: 0;
}
</style>
