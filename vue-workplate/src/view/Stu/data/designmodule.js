export const jsoopinfo = `设计模式的定义是: 在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案。

🎯 《设计模式》一书的副标题是"可复用面向对象软件的基础;

🎨 在java等静态类型语言中，无法动态地给已存在的对象添加职责，所以一般通过包装类的方式来实现装饰者模式。
但在js中，给对象动态添加职责是再简单不过的事情。
这就造成js语音的装饰着模式不再关注于给对象动态添加职责，而是关注于给函数动态添加职责。

实际上, 在 java 等静态类型语言中, 让子类来 "决定" 创建何种对象的原因是为了让程序迎合 依赖倒置原则 (DIP). 在这些语言中创建对象时, 先解开对象类型之间的耦合关系非常重要, 这样才有机会在将来让对象表现出多态性.

而在 js 这种类型模糊的语言中, 对象多态性是天生的, 一个变量既可以指向一个类, 又可以随时指向另外一个类. js 不存在类型耦合的问题, 自然也没有必要刻意去把对象 "延迟" 到子类创建, 也就是说, js 实际上不需要工厂方法模式的.

JavaScript 没有提供传统面向对象语言中的类式继承, 而是通过原型委托的方式来实现对象与对象之间的继承. JavaScript 也没有在语言层面提供对抽象类和接口的支持.
`;

export const jsoopcodeinfo = `
  var duck = {
      duckSinging: function() {
          console.log('嘎嘎嘎');
      }
  };
  var chicken = {
      duckSinging: function() {
          console.log('嘎嘎嘎');
      }
  }
  var choir = [];     // - 合唱团
  var joinChoir = function(animal) {
      if (animal && typeof animal.duckSinging === 'function') {
          choir.push(animal);
          console.log('恭喜加入合唱团');
          console.log('合唱团的成员数量: ' + choir.length);
      }
  };
  joinChoir(duck);        // 恭喜加入合唱团
  joinChoir(chicken);     // 恭喜加入合唱团 
`;

export const jsoopcodeinfopol = `
  // - 类式多态
  const makeSound = function (animal) {
      // 此处调用对象下的 sound() 方法
      animal.sound();
  };
  const Duck = function () {};
  Duck.prototype.sound = function () {
      console.log("嘎嘎嘎");
  };
  const Chicken = function () {};
  Chicken.prototype.sound = function () {
      console.log("咯咯咯");
  };
  makeSound(new Duck());
  makeSound(new Chicken());
  const Dog = function () {};
  Dog.prototype.sound = function () {
      console.log("汪汪汪");
  };
  makeSound(new Dog());

  // js - 多态示例
  const googleMap = {
      show: function () {
          console.log("开始渲染谷歌地图");
      }
  };
  const baiduMap = {
      show: function () {
          console.log("开始渲染百度地图");
      }
  };
  const renderMap = function (map) {
      if (map.show instanceof Function) {
          map.show();
      }
  };
  renderMap(googleMap);
  renderMap(baiduMap);
  const sogouMap = {
      show: function () {
          console.log("开始渲染百度地图");
      }
  };
  renderMap(sogouMap);
`;

export const jsoopcodeinfoP = `
  var makeSound = function() {
      animal.sound();
  };
  // - 然后把可变的部分各自封装起来, 我们刚才谈到的多态性实际上指的是对象的多态性:
  var Duck = function() {}
  Duck.prototype.sound = function() {
      console.log('嘎嘎嘎');
  };

  var Chicken = function(){}
  Chicken.prototype.sound = function(){
      console.log( '咯咯咯' );
  };

  makeSound( new Duck() );    // 嘎嘎嘎
  makeSound( new Chicken() ); // 咯咯咯

  var Dog = function(){}
  Dog.prototype.sound = function(){
      console.log( '汪汪汪' );
  };
  makeSound( new Dog() ); // 汪汪汪
`;

export const jsoopcodeinfoNoP = `
  var makeSound = function( animal ){
      if ( animal instanceof Duck ){
          console.log( '嘎嘎嘎' );
      } else if ( animal instanceof Chicken ){
          console.log( '咯咯咯' );
      }
  };
  var Duck = function(){};
  var Chicken = function(){};
  makeSound( new Duck() );    // 嘎嘎嘎
  makeSound( new Chicken() ); // 咯咯咯
`;
