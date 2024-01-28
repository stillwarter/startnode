<script setup>
import stQuote from "@/components/Card/st-quote.vue";
import { onMounted } from "vue";
import {
  strategymodehead,
  strategymodecount1,
  strategymodecount2,
  strategymodecount3,
  strategymodecount4,
} from "../data/strategymode";

let tween = {
  linear: (t, b, c, d) => (c * t) / d + b,
  easeIn: (t, b, c, d) => c * (t /= d) * t + b,
  strongEaseIn: (t, b, c, d) => c * (t /= d) * t * t * t * t + b,
  // or es6增加指数运算 (t, b, c, d) => c*(t/=d)*(t**4)+b
  strongEaseOut: (t, b, c, d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b,
  sinEaseIn: (t, b, c, d) => c * (t /= d) * t * t + b,
  sinEaseOut: (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b,
};

const Animate = function (dom) {
  this.dom = dom;
  this.startimer = 0;
  this.startpos = 0;
  this.endpos = 0;
  this.porpertyname = null; // dom节点需要改变的css属性名
  this.duration = null;
  this.easing = null; //缓动算法
};

/**
 * 启动动画，负责启动定时器
 */
Animate.prototype.start = function (porpertyname, endpos, duration, easing) {
  this.startimer = +new Date();
  this.startpos = this.dom.getBoundingClientRect()[porpertyname];
  this.porpertyname = porpertyname;
  this.endpos = endpos;
  this.duration = duration;
  this.easing = tween[easing];

  let self = this;
  self.update(2);
  // if (self.step() === false) {
  //   clearInterval(timeid);
  // }
  // requestAnimationFrame(self.step);

  // let timeid = setInterval(function () {
  //   if (self.step() === false) {
  //     clearInterval(timeid);
  //   }
  // }, 19);
};

/**
 * 帧动画函数，负责计算小球当前位置以及更新css属性的方法
 */
Animate.prototype.step = function () {
  let t = +new Date();
  if (t >= this.startimer + this.duration) {
    this.update(this.endpos);
    // requestAnimationFrame(() =>
    //   update(this.dom, this.endpos, this.porpertyname)
    // );
    return false;
  }
  let pos = this.easing(
    t - this.startimer,
    this.startpos,
    this.endpos - this.startpos,
    this.duration
  );
  this.update(pos);
  // const self = this;
  // requestAnimationFrame(this.update);
  // requestAnimationFrame(() => update(this.dom, pos, this.porpertyname));

  // function update(dom, pos, porpertyname, startimer, duration, t) {
  //   dom.style[porpertyname] = pos + "px";
  //   if (t >= this.startimer + this.duration) {
  //     return;
  //   } else {
  //     requestAnimationFrame(() => update(this.dom, pos, this.porpertyname));
  //   }
  // }
};
/**
 * 负责更新
 */
Animate.prototype.update = function (pos) {
  // let t = +new Date();
  // if (t >= this.startimer + this.duration) {
  //   console.log(1);
  //   this.update(this.endpos);
  //   return false;
  // } else {
  //   console.log(2);
  //   requestAnimationFrame(() => this.update(2));
  // }
  this.dom.style[this.porpertyname] = pos + "px";
  pos++;
  requestAnimationFrame(() => this.update(pos));
};

// onMounted(() => {
//   const sphere = document.getElementById("sphere");
//   let animate = new Animate(sphere);
//   sphere.addEventListener(
//     "click",
//     function () {
//       animate.start("left", 1000, 10000, "strongEaseIn");
//     },
//     false
//   );
// });
</script>

<template>
  <div class="commbox">
    <div>
      <h2>策略模式</h2>
      <div>
        <p>前言：</p>
        <stQuote class="mg-b10" :ctx="strategymodehead" />
      </div>

      <div>
        <div>
          <h3>1.案例：计算奖金</h3>
          <div>
            案例描述：某公司的年终奖是根据员工的工资基数和年底绩效来发放的。例如，绩效为S的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资，绩效为B的人年终奖有2倍工资，财务部要求我们提供一段代码，来方便他们计算员工的年终奖。
            <pre>
            {{ strategymodecount1 }}
          </pre
            >
            上面的是最简单那的计算奖金的写法，根据不同条件返回不同的结果。不过他没有拆分，所以当条件很多的时候，会很繁琐。
            <br />
            来看策略模式是怎样的：
            <pre>
            {{ strategymodecount2 }}
          </pre
            >
            上面就是面向对象的写法，将计算部分分成多个不同的类，然后使用bouns统一管理，this.strategy.calculate(this.salary)方法就是
            将计算奖金的操作委托给策略对象，也就是说，在bouns方法里，会有一个属性存储对应的策略对象。
            <br />
            不过看着好像还挺繁琐，感觉还不如直接用if？再看看js的策略模式的表现：
            <pre>{{ strategymodecount3 }}</pre>
            js里，由于函数也是对象，所以最简单的做法是将strategy直接定义为函数，在调用的时候，注意传入不同参数即可。
          </div>
        </div>

        <div>
          <h3>2.多态的策略模式中的体现</h3>
          <div>
            通过策略模式，可以消除部分条件分支语句，所有和计算有关的逻辑将被单独出来，每次发送的计算请求，
            发送体本身不参与计算，计算由策略类负责，不同的策略返回不同的数据，这正是对象多态性的表现。
          </div>
        </div>

        <div>
          <h3>3.使用策略模式实现缓动动画</h3>
          <div>
            <span class="color-red">(TODO)</span>
            js里，可以改变某元素的css的属性达到动画的效果，目标是编写一个动画类和一些缓动计算，让小球在页面中运动。<br />
            记录一下需要的材料：<br />
            * 小球的初始位置 <br />
            * 小球移动的目标位置 <br />
            * 动画开始的准确时间点 <br />
            * 小球动画持续时间 <br />
            随后，我们创建一个定时器去运行这个动画，不断更新css属性，让小球动起来。

            <!-- TODO! -->
            <!-- <p id="sphere">small</p> -->
          </div>
        </div>

        <div>
          <h3>4.策略模式的优缺点</h3>
          <div>
            之前提到过优点，所以也会有点缺点： <br />
            * 增加额外策略，代码量可能增加 <br />
            * 必须了解每个策略负责做什么，这个有违最少知识原则
          </div>
        </div>

        <div>
          <h3>5.一等函数与策略模式</h3>
          <div>
            peter
            norvig说过：“在一等函数的语言中，策略模式是隐藏的。strategy就是值为函数的变量。”<br />
            在js里，策略模式可以直接融合到语言（语法）本身里，当我们对主题函数调用时，可以根据不同传参返回不同结果，这算是js函数对象的多态性？
            <pre>
              {{ strategymodecount4 }}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.commbox {
  width: 100%;
}

#sphere {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #0ba495;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
