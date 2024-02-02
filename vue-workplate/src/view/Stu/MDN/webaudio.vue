<script setup>
import { webaudiohead } from "../data/MDN/webaudio";
import stQuote from "@/components/Card/st-quote.vue";
</script>

<template>
  <div class="combox">
    <div>
      <h2>web audio api</h2>
      <div>
        <p>前言：</p>
        <stQuote class="mg-b10" :ctx="webaudiohead" />
      </div>

      <div>
        <div>
          <h3>1.概念</h3>
          <div>
            web audio api可以让用户使用音频上下文（audiocontext）
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
