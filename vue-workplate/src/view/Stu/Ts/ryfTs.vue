<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import {his,baseuse} from "./data/ryfts"
</script>

<template>
  <div class="combox">
    <h2>阮一峰的ts教程</h2>

    <div>
      <div>
        <h3>0.历史</h3>
        <div>
            在开始正式学习之前，先了解ts相关的发展历史：
            <stQuote class="mg-b10" :ctx="his" />
        </div>
      </div>

      <div>
        <h3>1.基础用法</h3>
        <div>
            <stQuote class="mg-b10" :ctx="baseuse" />
        </div>
      </div>
    </div>
  </div>
</template>
