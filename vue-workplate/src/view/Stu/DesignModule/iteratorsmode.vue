<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import {
  iteratorsmodehead,
  iteratorsdemo,
  iteratorsdemotwo,
  iteratorsoutdemo,
} from "../data/designmode/iteratorsmode";
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
        <h3>1.实现一个迭代器</h3>
        <div>
          迭代器模式无非是为了循环访问聚合对象中的各个元素，比如jq中的$.each函数。
          <pre>
            {{ iteratorsdemo }}
          </pre>
        </div>
      </div>

      <div>
        <h3>2.内部迭代器</h3>
        <div>
          上述例子就是一个内部迭代器，其函数内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用。
          <br />
          内部迭代器在调用的时候非常方便，外界不关心迭代器内部的实现，跟迭代器交互仅仅是一次初始调用。
          但可以说是优点，符合封闭隔离，但同时由于迭代规则也制定好，遇到新需求就要重新修改。
          <br />
          <pre>
            {{ iteratorsdemo }}
          </pre>
          比如有一个判断的需求，判断2个数组的元素值是否完全相等，若不该写each函数本身，我们能入手的似乎只剩下：
          <pre
            >{{ iteratorsdemotwo }}
          </pre>
          代码本身不好看，能这样写你还得感谢js可以将函数作为参数进行传递。在一些没有闭包的语音里，内部函数迭代器本身的实现也相当复杂，比如c语言的内部迭代器使用函数指针来实现的。
          循环处理所需要的数据都要以参数的形式明确地从外面传递进去。
        </div>
      </div>

      <div>
        <h3>3.外部迭代器</h3>
        <div>
          外部迭代器必须显式的请求迭代下一个元素。
          外部迭代器增加了一些调用的复杂度，但也相对增强了迭代器的灵活性。下面的例子的迭代器实现来自《松本行弘的程序世界》，原例用ruby，这里改写为js：
          <pre>
            {{ iteratorsoutdemo }}
          </pre>
          外部迭代器虽然调用方式相对复杂，但它的适用面更广，也能满足更多变的需求。内部迭代
          器和外部迭代器在实际生产中没有优劣之分，究竟使用哪个要根据需求场景而定。
        </div>
      </div>

      <div>
        <h3>4.迭代类数组对象和字面量对象</h3>
        <div>
            迭代器模式不仅可以迭代数组，还可以迭代一些类数组对象，无论是内部迭代器还是外部迭代器只要被迭代的聚合对象拥有length属性，那它就可用被迭代。
            <br>
            js里，fon in语句可以用来迭代普通字面量对象的属性。
        </div>
      </div>

      <div>
        <h3>5.倒叙迭代器</h3>
        <div>
            由于GoF中对迭代器模式的定义非常松散，所以我们可以有多种多样的迭代器实现。总的来说，迭代器模式提供了循环访问对象的方法，但没有规定是顺序，倒叙还是中序来循环遍历。
            js里，fon in语句可以用来迭代普通字面量对象的属性。
        </div>
      </div>
    </div>
  </div>
</template>
