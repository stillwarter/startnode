export const strategymodehead = `所谓的的代理模式就是为一个对象找一个替代对象，以便对原对象进行访问。
保护的代理：需要做一些过滤工作；
虚拟代理：减少部分资源开销？还有一些其他的分类代理，实现不同的需求

此外，js最常用的代理模式是虚拟代理和缓存代理；虽然代理模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。
当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。
`;

export const xiaomingstory = `小明遇到女神a，小明决定给女神a送一束花表白。刚好小明打听到a和他有一个共同朋友b，
于是内向的小明决定让b来替代自己完成送花这件事情。
（虽然这个故事必然以悲剧收场，因为追mm的最好方式是送一辆宝马）
`;

export const xiaomingcodewithoutagent = `
var Flower = function(){}; 
 
var xiaoming = { 
    sendFlower: function( target ){ 
        var flower = new Flower(); 
        target.receiveFlower( flower ); 
    } 
}; 
 
var A = { 
    receiveFlower: function( flower ){ 
        console.log( '收到花 ' + flower ); 
    } 
}; 
 
xiaoming.sendFlower( A );

var B = { 
    receiveFlower: function( flower ){ 
        A.receiveFlower( flower );     } 
    }; 
     
var A = { 
    receiveFlower: function( flower ){ 
        console.log( '收到花 ' + flower ); 
    } 
}; 
    
xiaoming.sendFlower( B ); 

`;

export const xiaomingcodewithfine = `
var Flower = function(){}; 
 
var xiaoming = { 
    sendFlower: function( target){ 
        var flower = new Flower(); 
        target.receiveFlower( flower ); 
    } 
}; 
 
var B = { 
    receiveFlower: function( flower ){ 
        A.listenGoodMood(function(){    // 监听A的好心情 
            A.receiveFlower( flower ); 
        }); 
    } 
}; 
 
var A = { 
    receiveFlower: function( flower ){ 
        console.log( '收到花 ' + flower ); 
    }, 
    listenGoodMood: function( fn ){ 
        setTimeout(function(){    // 假设10秒之后A的心情变好          fn();         
        }, 10000 ); 
    } 
}; 
 
xiaoming.sendFlower( B ); `;

export const xiaomingcodewithfakeragent = `
var B = { 
    receiveFlower: function( flower ){ 
        A.listenGoodMood(function(){    // 监听A的好心情 
             var flower = new Flower();    // 延迟创建flower 对象 
             A.receiveFlower( flower ); 
        }); 
    } 
};`;

export const imgwithout = `
var myImage = (function(){ 
    var imgNode = document.createElement( 'img' ); 
    document.body.appendChild( imgNode ); 
 
    return { 
        setSrc: function( src ){ 
            imgNode.src = src;         
        }  
    } 
})(); 
myImage.setSrc( 'http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );`;

export const imgwithagent = `
var myImage = (function(){ 
    var imgNode = document.createElement( 'img' ); 
    document.body.appendChild( imgNode ); 
 
    return { 
        setSrc: function( src ){ 
            imgNode.src = src;         
        }  
    } 
})(); 
 
var proxyImage = (function(){ 
    var img = new Image; 
    img.onload = function(){ 
        myImage.setSrc( this.src ); 
    } 
    return { 
        setSrc: function( src ){ 
            myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' ); 
            img.src = src;         
        } 
    } 
})(); 
 
proxyImage.setSrc( 'http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' ); `;

export const savewithagent = `
var mult = function(){ 
    console.log( '开始计算乘积' ); 
    var a = 1; 
    for ( var i = 0, l = arguments.length; i < l; i++ ){ 
        a = a * arguments[i];  
    }  
    return a; 
}; 
 
mult( 2, 3 );    // 输出：6 
mult( 2, 3, 4 );    // 输出：24

// 加入代理后
var proxyMult = (function(){ 
    var cache = {}; 
    return function(){ 
        var args = Array.prototype.join.call( arguments, ',' ); 
        if ( args in cache ){ 
            return cache[ args ]; 
        } 
        return cache[ args ] = mult.apply( this, arguments ); 
    } 
})(); 
 
proxyMult( 1, 2, 3, 4 );    // 输出：24 
proxyMult( 1, 2, 3, 4 );    // 输出：24 `;

export const heightsavewithagent = `
/**************** 计算乘积 *****************/ 
var mult = function(){ 
    var a = 1; 
    for ( var i = 0, l = arguments.length; i < l; i++ ){ 
        a = a * arguments[i];  
    } 
    return a; 
}; 
 
/**************** 计算加和 *****************/ 
var plus = function(){ 
    var a = 0; 
    for ( var i = 0, l = arguments.length; i < l; i++ ){ 
        a = a + arguments[i];  
    } 
    return a; 
}; 
 
/**************** 创建缓存代理的工厂 *****************/ 
var createProxyFactory = function( fn ){ 
    var cache = {}; 
    return function(){ 
        var args = Array.prototype.join.call( arguments, ',' ); 
        if ( args in cache ){ 
            return cache[ args ]; 
        } 
        return  cache[ args ] = fn.apply( this, arguments ); 
    } 
}; 
 
var proxyMult = createProxyFactory( mult ), 
proxyPlus = createProxyFactory( plus ); 
 
alert ( proxyMult( 1, 2, 3, 4 ) );    // 输出：24 
alert ( proxyMult( 1, 2, 3, 4 ) );    // 输出：24 
alert ( proxyPlus( 1, 2, 3, 4 ) );    // 输出：10 
alert ( proxyPlus( 1, 2, 3, 4 ) );    // 输出：10 `;
