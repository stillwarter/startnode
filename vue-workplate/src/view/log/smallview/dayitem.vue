<template>
  <div class="dayitem">
    <div class="dayline">
      <div class="handicon"></div>
      <div style="position: sticky; top: 100px; padding-right: 40px;">
        <h2 class="daytitle">
          {{ data?.title }}
        </h2>
        <div class="iconcountbox">
          <stIcontag
            icontag="疑问"
            class="mg-b10"
            :backcolor="['#ee9ca7', '#ffdde1']"
            :iconpath="questionicon"
          >
            <p style="position: absolute; right: 10px;">
              {{ data?.qustinolist.length }}
            </p>
          </stIcontag>

          <stIcontag
            icontag="收获"
            class="mg-b10"
            :backcolor="['#2980B9', '#6DD5FA', '#005AA7']"
            :iconpath="collecticon"
          >
            <p style="position: absolute; right: 10px;">
              {{ data?.collectionlist.length }}
            </p>
          </stIcontag>

          <stIcontag
            icontag="想法"
            :backcolor="['#a8ff78', '#78ffd6']"
            class="mg-b10"
            :iconpath="ideaicon"
          >
            <p style="position: absolute; right: 10px;">
              {{ data?.idealist.length }}
            </p>
          </stIcontag>
        </div>

        <p class="date">
          {{ year }} - {{ day.mouth < 10 ? "0" + day.mouth : day.mouth }} -
          {{ day.day + 1 < 10 ? "0" + (day.day + 1) : day.day + 1 }}
        </p>
        <div class="handleicon" @click="openEditItem(index, data)">
          <stSvg svgsize="20" v-html="editicon" />
        </div>
      </div>
    </div>
    <div class="logcontent">
      <p style="white-space: pre-wrap">
        {{ data?.yourlog }}
      </p>
      <div v-for="(item, index) in data?.qustinolist" :key="index">
        <stLogQuestion
          :iconpath="questionicon"
          :content="item"
          bordercolor="#ffdde1"
        />
      </div>

      <div v-for="(item, index) in data?.collectionlist" :key="index">
        <stLogQuestion
          :iconpath="collecticon"
          :content="item"
          bordercolor="#6dd5ed"
        />
      </div>

      <div v-for="(item, index) in data?.idealist" :key="index">
        <stLogQuestion
          :iconpath="ideaicon"
          :content="item"
          bordercolor="#78ffd6"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import stIcontag from "@/components/Tag/st-icontag.vue";
import stSvg from "@/components/SVG/st-svg.vue";
import stLogQuestion from "@/components/Card/st-log-question.vue";
import { questionicon } from "@/assets/svg/log/questionicon";
import { collecticon } from "@/assets/svg/log/collecticon";
import { ideaicon } from "@/assets/svg/log/ideaicon";
import { editicon } from "@/assets/svg/log/editicon";
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
  grid-template-columns: 1fr 2.5fr;
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
      max-width: 90%;
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
      cursor: pointer;
    }
  }
  .logcontent {
    min-height: 400px;
    max-height: calc(100vh - 300px);
    text-align: left;
    font-size: 20px;
    position: relative;
    overflow: auto;
    top: -36px;
    div {
      text-align: left;
    }
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
