<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import {
  his,
  baseuse,
  anytype,
  tstypesystem,
  array,
  tuple,
  tsclass,
} from "./data/ryfts";
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

      <div>
        <h3>2.any类型</h3>
        <div>
          <stQuote class="mg-b10" :ctx="anytype" />
        </div>
      </div>

      <div>
        <h3>3.ts类型系统</h3>
        <div>
          <stQuote class="mg-b10" :ctx="tstypesystem" />
        </div>
      </div>

      <div>
        <h3>4.ts的数组类型</h3>
        <div>
          <stQuote class="mg-b10" :ctx="array" />
        </div>
      </div>

      <div>
        <h3>5.ts的元组类型</h3>
        <div>
          <stQuote class="mg-b10" :ctx="tuple" />
        </div>
      </div>

      <div>
        <h3>6.ts的类</h3>
        <div>
          <stQuote class="mg-b10" :ctx="tsclass" />
        </div>
      </div>
    </div>
  </div>
</template>
