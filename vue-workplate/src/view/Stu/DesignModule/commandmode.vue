<script setup>
import { onMounted } from "vue";
import { Animate } from "@/class/Demo/stu-desigin-animate";
import stQuote from "@/components/Card/st-quote.vue";
import {
  commandmodehead,
  codedemo,
  codedemo2,
} from "../data/designmode/commandmode";

// 小球移动
onMounted(() => {
  var ball = document.getElementById("ball");
  var pos = document.getElementById("pos");
  var moveBtn = document.getElementById("moveBtn");
  var cancelBtn = document.getElementById("cancelBtn");

  var MoveCommand = function (receiver, pos) {
    this.receiver = receiver;
    this.pos = pos;
    this.oldPos = null;
  };

  MoveCommand.prototype.execute = function () {
    this.receiver.start("left", this.pos, 1000, "strongEaseOut");
    this.oldPos =
      this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
    // 记录小球开始移动前的位置
  };

  MoveCommand.prototype.undo = function () {
    this.receiver.start("left", this.oldPos, 1000, "strongEaseOut");
    // 回到小球移动前记录的位置
  };

  var moveCommand;
  moveBtn.onclick = function () {
    var animate = new Animate(ball);
    moveCommand = new MoveCommand(animate, pos.value);
    moveCommand.execute();
  };
  cancelBtn.onclick = function () {
    moveCommand.undo();
    // 撤销命令
  };
}); //////
</script>

<template>
  <div>
    <h2>命令模式</h2>
    <div>
      <stQuote class="mg-b10" :ctx="commandmodehead" />
    </div>

    <div>
      <div>
        <h3>1.命令模式的用途</h3>
        <div>
          命令模式最常见的应用场景：有时候需要向某些对象发送请求，但是并不知道请求的接受者是谁，也不知道请求的操作是什么。
          <br />
          此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接受者能够消除彼此之间的耦合关系。
          <br />
          拿订餐来说，客人需要向厨师发送请求，但完全不知道这些厨师的名字和联系方式，也不知道炒菜步骤。命令模式把客人订餐的请求封装为command对象，也就是订餐中的订餐对象。
          这个对象会被传递，客人不需要知道厨师名字，从而解开请求调用者和请求接收者之间的耦合关系。
          <br />
          此外，相对于过程化的请求调用，command对象有更长的生命周期。对象的生命周期是跟初始请求无关的，因为这个请求已经被封装在command对象方法中，成为对象的行为。
          我们可以在程序的任意时刻去调用这个方法，就像厨师可以在客人预定1小时后才能帮他炒菜。
          除了这两点之外，命令模式还支持撤销排队等操作。
        </div>
      </div>

      <div>
        <h3>2.例子--菜单程序</h3>
        <div>
          假设我们正在编写一个用户界面程序，该用户界面上至少有10的button按钮，因为项目比较复杂，所以我们决定让某个程序员负责绘制这些按钮，另外一些程序员则负责编写点击按钮后的具体行为，这些行为都被封装到对象里。<br />
          在大型的项目开发中，这是很正常的分工，对于绘制按钮的程序员来说，他并不知道某个按钮将来会干什么。
          <br />
          回想一下命令模式的应用场景：<br />
          有时候需要将某些对象发送请求，但是并不知道请求的接收者是谁，也不知道具体操作是什么，此时希望用一种松耦合的方式来设计软件，使得请求发送者和请求接受者能够消除彼此间的耦合关系。
          <br />
          这样你就会理解在这里使用命令模式的理由：点击按钮后，我们不知道接收者是什么对象，接收者做什么。
          <br />
          设计模式的主题总是将不变的事物和变化的事物分离，命令模式也不例外。
          <pre>{{ codedemo }}</pre>
          接下来定义setcommand函数，这个函数负责往按钮上安装命令。可以肯定的是，点击按钮会执行某个command命令，
          执行命令的动作被约定为调用command对象的execute方法。虽然不知道这些命令代表什么操作，但负责绘制按钮的程序员不关心这些事情，它只需要预留好安装命令的接口，command对象自然知道如何和正确的对象沟通
          <br />
          最后，负责编写点击按钮之后的具体行为的程序员上交了他们的成果，他们完成了刷新菜单界面，增加子菜单和删除子菜单这几个功能，这几个功能被分布在menuBar和submenu这两个对象中，
          在让button绑定这些操作之前，我们先把这些行为封装到命令里。
          最后就是把命令接收者传入到command对象中，并且把command对象安装到button上面。

          <br />
          <br />
          上述代码简单来说就是将操作封装起来（以类的形式使用），这就是操作对象，然后调用setCommand方法，为不同的button绑定不同的操作对象。
        </div>
      </div>

      <div>
        <h3>3.js中的命令模式</h3>
        <div>
          说起来有点奇怪，你看上面的代码，无非就是无中生有的引入command对象和receiver这两个角色，是不是我们把简单的事情负责化了？
          直接绑定也不是什么麻烦的事情。
          <br />
          这种说法是正确的，命令模式将过程式的请求调用封装在command对象的execute方法里，通过封装方法调用将运算快包装成形。
          command对象就可用被四处传递，所以在调取命令的时候，客户不需要关心事情是如何运行的。
          <br />
          命令模式的由来，其实是回调函数的一个面向对象的替代品。
          <br />
          js作为将函数视为一等公民（对象）的语言，和策略模式一样，命令模式也早就融入到js里。运算快不一定要封装到command.execute里，也可以封装到普通函数中。
          函数作为一等对象，本身就可用被四处传递。即使我们依然需要请求“接收者”，那也未必使用面向对象的方式，闭包同样可以完成功能。
          <br />
          在面向对象设计中，命令模式的接收者被当成command对象的属性保存起来，同时约定执行命令的操作调用command.execute方法。
          在使用闭包的命令模式实现中，接收者被封闭在闭包产生的环境里，执行命令的操作可以更简单，仅仅执行回调函数即可。
          无论接受者被保存为对象的属性，还是被封闭在闭包产生的环境中，在将来执行命令的时候，接收者都能被顺利访问。
          <br />
          闭包实现的命令模式如下：
          <pre>{{ codedemo2 }}</pre>
        </div>
      </div>

      <div>
        <h3>4.撤销命令</h3>
        <div>
          命令模式的作用不仅是封装运算块，而且可以很方便的给命令对象增加撤销操作。就像订餐时可以通过电话取消订单一样。
          在之前的例子里有一个animate类（对应书5.4节），现在页面有一个input文本框和一个button按钮，文本框中可以输入一些数字，表示小球引动后的水平位置。
          我们现在加一个撤回按钮，让小球回到上一次的位置。
          <br />

          <div style="display: block">
            <div
              id="ball"
              style="
                position: relative;
                background: #000;
                width: 50px;
                height: 50px;
                border-radius: 50%;
              "
            ></div>

            输入小球移动后的位置：<input id="pos" />
            <button id="moveBtn">开始移动</button>
            <button id="cancelBtn">cancel</button>
          </div>

          撤销是命令模式里一个非常有用的功能，试想一下开发一个围棋程序的时候，我们把每一步
          棋子的变化都封装成命令，则可以轻而易举地实现悔棋功能。同样，撤销命令还可以用于实现文
          本编辑器的Ctrl+Z功能。

          此外重做命令也可以按这种思路来
        </div>
      </div>

      <div>
        <h3>5.命令队列</h3>
        <div>
          订餐的故事里，若订餐数量过多而厨师人手不够，则可以让订单进行排队处理。<br>
          队列在动画的运用场景也非常多，比如用户有连续点击的习惯，当用户二次点击的时候，小球动画可能尚未结束，而用户喜欢这两个动作排队进行。
          <br>
          把请求封装为命令的优点再次体现出来，对象的生命周期几乎伴随页面时永久的，除非我们主动回收它。
          <br>
          <span class="color-red">也就是说命令对象的生命周期与初始请求发生的时间无关！</span>
          <br>
          这一点在本节出现过多次。命令模式我的理解就是将过程式的代码封装为一个命令函数，在需要的时候调用这个命令函数。
          当我们不知道什么人在什么时候什么环境下调用这个命令的时候，我们就可用将命令对象先做好，等到需要的时候用。而之前
          用闭包处理的命令对象，用书上的话说，就是保证，在任何环境下都能使命令成功运行。
          <br>
          我们可以将一组动画的运动过程全部封装成命令对象，然后再把他们压入一个队列栈堆里。当动画执行完后，主动通知队列并取出第一个命令对象执行。
        </div>
      </div>

      <div>
        <h3>6.宏命令</h3>
        <div>
          宏命令是命令模式和组合模式的联用产物，后续写。
        </div>
      </div>
    </div>
  </div>
</template>
