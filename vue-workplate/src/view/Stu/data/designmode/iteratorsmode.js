export const iteratorsmodehead = `迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

迭代器模式是一种相对简单的模式，并且大部分语言都内置了迭代器。
`;

export const iteratorsdemo = `
var each = function( ary, callback ){ 
    for ( var i = 0, l = ary.length; i < l; i++ ){ 
     callback.call( ary[i], i, ary[ i ] );  // 把下标和元素当作参数传给 callback 函数 
    } 
}; 
    each( [ 1, 2, 3 ], function( i, n ){ 
    alert ( [ i, n ] ); 
}); `;

export const iteratorsdemotwo = `
var compare = function( ary1, ary2 ){ 
    if ( ary1.length !== ary2.length ){ 
    throw new Error ( 'ary1 和 ary2 不相等' ); 
   } 
    each( ary1, function( i, n ){ 
    if ( n !== ary2[ i ] ){ 
     throw new Error ( 'ary1 和 ary2 不相等' ); 
    } 
   }); 
    alert ( 'ary1 和 ary2 相等' ); 
}; 
   compare( [ 1, 2, 3 ], [ 1, 2, 4 ] ); 
     // throw new Error ( 'ary1 和 ary2 不相等' );`;

export const iteratorsoutdemo = `
var Iterator = function( obj ){ 
    var current = 0; 
 
    var next = function(){ 
        current += 1; 
    }; 
 
    var isDone = function(){ 
        return current >= obj.length; 
    }; 
 
    var getCurrItem = function(){ 
        return obj[ current ]; 
    }; 
 
    return { 
        next: next, 
        isDone: isDone, 
        getCurrItem: getCurrItem 
    } 
}; 

var compare = function( iterator1, iterator2 ){ 
    while( !iterator1.isDone() && !iterator2.isDone() ){ 
        if ( iterator1.getCurrItem() !== iterator2.getCurrItem() ){ 
             throw new Error ( 'iterator1和iterator2不相等' ); 
        } 
        iterator1.next(); 
        iterator2.next(); 
    } 
 
    alert ( 'iterator1和iterator2相等' ); 
} 
 
var iterator1 = Iterator( [ 1, 2, 3 ] ); 
var iterator2 = Iterator( [ 1, 2, 3 ] ); 
 
compare( iterator1, iterator2 );  // 输出：iterator1和iterator2相等 
`;
