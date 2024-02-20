export const publishsubscriptionmodehead = `发布订阅模式又叫观察者模式，它定义了对象间一钟一对多的依赖关系，当一个对象状态改变的时候，所有依赖于它的对象都将得到通知。
在js里，我们一般用事件模型来替代传统的发布订阅模式。

发布—订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦。它的应用非常
广泛，既可以用在异步编程中，也可以帮助我们完成更松耦合的代码编写。发布—订阅模式还可
以用来帮助实现一些别的设计模式，比如中介者模式。 从架构上来看，无论是MVC还是MVVM，
都少不了发布—订阅模式的参与，而且JavaScript本身也是一门基于事件驱动的语言。

当然，发布—订阅模式也不是完全没有缺点。创建订阅者本身要消耗一定的时间和内存，而
且当你订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中。另外，
发布—订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联
系也将被深埋在背后，会导致程序难以跟踪维护和理解。特别是有多个发布者和订阅者嵌套到一
起的时候，要跟踪一个bug不是件轻松的事情。
`;

export const codedemo = `
document.body.addEventListener( 'click', function(){ 
    alert(2); 
}, false ); 
document.body.click();   // 模拟用户点击 

`;

export const codedemo2 = `
var salesOffices = {};   
 // 定义售楼处 
salesOffices.clientList = [];  
  // 缓存列表，存放订阅者的回调函数 
salesOffices.listen = function( fn ){      
this.clientList.push( fn );   
  // 增加订阅者 
 // 订阅的消息添加进缓存列表 
}; 
salesOffices.trigger = function(){   
 // 发布消息 
for( var i = 0, fn; fn = this.clientList[ i++ ]; ){ 
 fn.apply( this, arguments );    
// (2) // arguments 是发布消息时带上的参数 
} 
};
`;
