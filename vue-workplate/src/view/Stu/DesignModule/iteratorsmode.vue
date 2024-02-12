<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import { iteratorsmodehead } from "../data/designmode/iteratorsmode";
</script>

<template>
  <div class="combox">
    <h2>迭代器模式</h2>
    <div>
      <p>前言：</p>
      <stQuote class="mg-b10" :ctx="iteratorsmodehead" />
    </div>

    <div>
      <div>
        <h3>1.11</h3>
        <div>1</div>
      </div>
    </div>
  </div>
</template>
