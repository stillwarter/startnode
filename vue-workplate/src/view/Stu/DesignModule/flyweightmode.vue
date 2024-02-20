<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import { flyweightmodehead } from "../data/designmode/flyweightmode";
</script>

<template>
  <div>
    <h2>享元模式</h2>
    <div>
      <stQuote class="mg-b10" :ctx="flyweightmodehead" />
    </div>

    <div>
        <div>
            <h3>
                1.初始享元模式
            </h3>
            <div>
                假设有个内衣工厂，目前有50种男士内衣和50种女士内衣，为了推销，工厂订了一批塑料模特。
                正常情况下需要男女各50个模特，然后让他们每人分别穿上意见内衣拍摄。
                <br>
                最后要得到一张照片，50男50女，所以会产出100张照片，若有10000种内衣呢。<br>
                接下来考虑优化一下场景，虽然有100种内衣，但很显然并不需要50个男模特和50个女模特，分别要一个就够了。
                这样同样的场景下，只需要2个对象的产出和100个对象的产出是一样的，节省了内存。
            </div>
        </div>

        <div>
            <h3>2.内部状态和外部状态</h3>
            <div>
                上述例子是享元模式的雏形，
            </div>
        </div>
    </div>
  </div>
</template>
