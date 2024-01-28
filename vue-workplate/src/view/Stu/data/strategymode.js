export const strategymodehead = `策略模式的定义是: 定义一系列的算法, 把它们一个个封装起来, 并且使它们可以相互替换。
策略模式的目的就是将算法的使用和算法的实现分离开来。
一个基于策略模式的程序至少由 2 部分组成：一是一组策略类，封装具体的算法并负责求解过程；二是环境类(Context上下文)，他接收请求然后将请求委托给策略类，要做到这个说明ctx必须维持对某个策略对象的引用。
优点：1.策略模式使用组合，委托和多态等思想，可以有效避免多重条件分支语句；2.策略模式提供开放-封闭原则的支持，将算法封装在独立策略类里，使其易于扩展和复用；3.策略模式利用组合和委托的方式让ctx有执行算法的能力，这也是继承的更轻便替代方案。
`;

export const strategymodecount1 = `
// 计算奖金：最初版本
var calculateBouns = function(level,salary) {
  if(level=='S') {
    return salary * 4;
  }
  if(level=='A') {
    return salary * 3;
  }
  if(level=='B') {
    return salary * 2;
  }
}
console.log(calculateBouns('S',4000));  // 输出16000
console.log(calculateBouns('A',3000));  // 输出9000
console.log(calculateBouns('B',2000));  // 输出4000`;

export const strategymodecount2 = `
// 计算奖金：面向对象完善版本
var PerformanceS = function(){};
PerformanceS.prototype.calculate = function(salary) {
  return salary * 4;
}

var PerformanceA = function(){};
PerformanceA.prototype.calculate = function(salary) {
  return salary * 3;
}

var PerformanceB = function(){};
PerformanceB.prototype.calculate = function(salary) {
  return salary * 2;
}

var Bouns = function() {
  this.salary = null;
  this.strategy = null;
}
Bouns.prototype.setSalary = function(salary) {
  this.salary = salary;
}
Bouns.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
}
Bouns.prototype.getBouns = function() {
  return this.strategy.calculate(this.salary);
}
var bouns = new Bouns();
bouns.setSalary(4000);
bouns.setStrategy(new PerformanceS());
console.log(bouns.getBouns());  // 输出16000

bouns.setSalary(3000);
bouns.setStrategy(new PerformanceA());
console.log(bouns.getBouns());  // 输出9000

bouns.setSalary(2000);
bouns.setStrategy(new PerformanceB());
console.log(bouns.getBouns());  // 输出4000`;

export const strategymodecount3 = `
// 计算奖金：JavaScript的完善版本
var strategy = {
  'S': function(salary) {
    return salary * 4;
  },
  'A': function(salary) {
    return salary * 3;
  },
  'B': function(salary) {
    return salary * 2;
  }
}
var calcluateBouns = function(level,salary) {
  return strategy[level](salary);
}
console.log(calcluateBouns('S',4000));  // 输出16000
console.log(calcluateBouns('A',3000));  // 输出9000
console.log(calcluateBouns('B',2000));  // 输出4000

`;

export const strategymodecount4 = `
 var S = function( salary ){
      return salary * 4;
  };
  var A = function( salary ){
      return salary * 3;
  };
  var B = function( salary ){
      return salary * 2;
  };
  var calculateBonus = function( func, salary ){
      return func( salary );
  };
  calculateBonus( S, 10000 ); // 输出： 40000
`;
