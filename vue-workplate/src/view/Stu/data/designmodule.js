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

export const jsoopundestand = `对于多态我的理解：
对于某些操作，多态似乎将请求和运行两者分开，比如我有一个“发出叫声”的请求，拆分一下，就是叫的动作和叫的载体，对应就是类和类方法。
所以，我们可以做一个大的请求函数，用于运行类下的方法函数。
这样达到“分离”的目的。
`;

export const jsooptype = ` 
String str;
str = "abc";    // - 没有问题
// str = 2;     // - 报错

// - 现在我们尝试把上面让鸭子和鸡叫的例子换成 Java 代码:

// - 鸭子类
public class Duck {
    public void makeSound() {
        // - 在Java语言中, 标准输入输出流使用 'println(print line)'.
        // - C 语言 中 "stdio.h" 库中的标准函数 "printf()" (print format)
        System.out.println('嘎嘎嘎');
    }
}

// - 鸡类
public class Chicken {
    public void makeSound() {
        System.out.println('咯咯咯');
    }
}

// - AnimalSound 动物叫的类
public class AnimalSound {
    public void makeSound(Duck duck) {  // {1}
        duck.makeSound()
    }
}

public class Test {
    public static void main(String args[]) {
        AnimalSound animalSound = new AnimalSound();
        Duck duck = new Duck();
        animalSound.makeSound(duck);    // 输出: 嘎嘎嘎
    }
}`;

export const jsoopextend = ` 
// - 创建一个抽象类 Animal
public abstract class Animal {
    abstract void makeSound();  // - 抽象方法
}
public class Chicken extends Animal {
    public void makeSound() {
        System.out.println('咯咯咯');
    }
}
public class Duck extends Animal {
    public void makeSound() {
        System.out.println('嘎嘎嘎');
    }
}
Animal duck = new Duck();       // {1}
Animal chicken = new Chicken(); // {2}
public class AnimalSound {
    // - 接受 Animal 类型的参数
    public void makeSound(Animal animal) {
        animal.makeSound();
    }
}
public class Test {
    public static void main(String args[]) {
        AnimalSound animalSound = new AnimalSound();
        Animal duck = new Duck();
        Animal chicken = new Chicken();
        animalSound.makeSound(duck);    // 输出 嘎嘎嘎
        animalSound.makeSound(chicken); // 输出 咯咯咯
    }
}`;

export const jsoopwork = `Martin Fowler 在《重构:改善既有代码的设计》里写到:

多态的最根本好处在于, 你不必再向对象询问 "你是什么类型" 而后根据得到的答案调用对象的某个行为 -- 你只管调用该行为就是了, 其他的一切多态机制都会为你安排妥当.
`;

export const jsooppackage = `封装的目的是将信息隐藏. 一般而言, 我们讨论的封装是封装数据和封装实现. 这一节将讨论更广义的封装, 不仅包括封装数据和封装实现, 还包括封装类型和封装变化。
`;

export const jsooppackagecode = `
 var myObject = (function() {
      // - 私有(private) 变量
      var _name = 'sven'; 
      return {
          // - 公开(public) 方法
          getName: function() {
              return _name;
          }
      }
  })();

  console.log(myObject.getName());    // 输出: sven
  console.log(myObject._name);        // 输出: undefined
  
`;

export const jsooppackagechange = `考虑你的设计中那些地方可能变化, 这种方式与关注会导致重新设计的原因相反. 它不是考虑什么时候回迫使你的设计改变, 而是考虑你怎样才能够在不重新设计的情况下进行改变. 这里的关键在于封装发生变化的概念, 这也是许多设计模式的主题.
`;

export const jsoopclone = `
const Plane = function () {
     this.blood = 100;
     this.attackLevel = 1;
     this.defenseLevel = 1;
  };
  
  let plane = new Plane();
  plane.blood = 500;
  plane.attackLevel = 10;
  plane.defenseLevel = 7;
  
  let clonePlane = Object.create(plane);
  console.log(clonePlane);            // Plane {}
  console.log(clonePlane.blood);      // 500
  console.log(clonePlane.attackLevel);// 10
  
  // 若不支持obj。create方法的浏览器 则使用：
  Object.create = Object.create || function(obj) {
    var F = Function() {};
    F.prototype = obj;
    return  new F();
  }`;

export const jsoopobjprototype = `
let obj1 = {};
let obj2 = {};
// 可以利用 ES5 提供的 Object.getPrototypeOf 来查看这两个对象的原型:
console.log(Object.getPrototypeOf( obj1 ) === Object.prototype);  // true
console.log(Object.getPrototypeOf( obj2 ) === Object.prototype);  // true

`;

export const jsoopobjnew = `
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

let person = new Person('Kew');
console.log(person.name);
console.log(person.getName());
console.log(Object.getPrototypeOf(person) === Person.prototype);
console.log('\/n' +  '//' + ('*'.repeat(66)) + '\/n');

`;

export const jsoopundestandnew = `
function Person(name) {
    this.name = name;
}
Person.prototype.getName = function() {
    return this.name;
}

// - (A)
var objectFactory = function() {
    // - (1) 从 Object.prototype 上克隆一个空的对象.
    var obj = new Object();

    // - (2) 取得外部传入的构造器, 此例是 Person.
    var Constructor = [].shift.call(arguments);

    // - (3) 执行正确的原型.
    // - tip: 我们根据 "JavaScript 原型图"(见下 "图(1)") 可以看出,
    //   obj.__proto__ 会指向它的构造函数的原型(Object.prototype),
    //   此处把 Constructor.prototype 赋值给 obj.__proto__ 是修正原型指向.
    obj.__proto__ = Constructor.prototype;

    // - (4) 借用外部传入的构造器给 obj 设置属性
    var ret = Constructor.apply(obj, arguments);

    // - (5) 确保构造器总是会返回一个对象
    return typeof ret === 'object' ? ret : obj;
}

let a = objectFactory(Person, "seven");

console.log(a);     // Person { name: 'seven' }
console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === Person.prototype);

// - 我们看到, 分别调用下面两句代码产生了一样的结果:
var b = objectFactory(Person, 'sven');
var bb = new Person('sven');

`;

export const jsoopthis = `跟别的语言大相径庭的是, JavaScript 的 this 总指向一个对象, 而具体指向哪个对象是在运行时 基于函数的执行环境动态绑定的, 而非函数被声明时的环境.
`;

export const jsoopthisf1 = `
var obj = {
    a: 1,
    getA: function() {
        alert(this === obj);    // output: true
        alert(this.a);      // output: 1
    }
};
obj.getA();

`;
