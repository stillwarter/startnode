export const publishsubscriptionmodehead = `发布订阅模式又叫观察者模式，它定义了对象间一钟一对多的依赖关系，当一个对象状态改变的时候，所有依赖于它的对象都将得到通知。
在js里，我们一般用事件模型来替代传统的发布订阅模式。
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
