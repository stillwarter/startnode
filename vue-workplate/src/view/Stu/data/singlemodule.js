export const singlemodulehead = `单例模式的定义是： 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中 的 window 对象等。在 JavaScript 开发中，单例模式的用途同样非常广泛。试想一下， 当我们单击登录按钮的时候，页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击 多少次登录按钮，这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单例模式来创建。
`;

export const singlemodulecode = `
// 单例设计模式的实现：面向对象
var Singleton = function(name) {
  this.name = name;
  this.instance = null;
}
Singleton.prototype.getName = function(){
  return this.name;
}
Singleton.getInstance = function(name) {
  if(!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
}

var instance1 = Singleton.getInstance('why');
var instance2 = Singleton.getInstance('www');
console.log(instance1===instance2); // 输出true

var obj1 = new Singleton('why');
var obj2 = new Singleton('www');
console.log(obj1.getName());        // 输出why
console.log(obj2.getName());        // 输出www`;
