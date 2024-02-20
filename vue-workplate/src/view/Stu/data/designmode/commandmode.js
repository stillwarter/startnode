export const commandmodehead = `命令模式是最简单和优雅的模式之一，其中的命令command指的是一个执行某些特定事情的指令。
命令模式是js一种隐形的模式。

假设有一个快餐店，而我是该餐厅的点餐服务员，那么我一天的工作应该是这样的：当某位客人点餐或者打来订餐电话后，我会记录需求写在清单上，然后交给厨房。
客人不关心那些厨师帮他炒菜。当然客人有一些其他服务，比如定时订单，撤回订单等等。
这些记录着订餐信息的清单，便是命令模式中的命令对象。
`;

export const codedemo = `
<body> 
<button id="button1">点击按钮 1</button>
<button id="button2">点击按钮2</button> 
<button id="button3">点击按钮3</button> 
</body> 

<script> 
var button1 = document.getElementById( 'button1' ), 
var button2 = document.getElementById( 'button2' ), 
var button3 = document.getElementById( 'button3' ); 

var setCommand = function( button, command ){ 
    button.onclick = function(){ 
        command.execute(); 
    } 
}; 

var MenuBar = { 
    refresh: function(){ 
        console.log( '刷新菜单目录' ); 
    } 
}; 
 
var SubMenu = { 
    add: function(){ 
        console.log( '增加子菜单' ); 
    }, 
    del: function(){ 
        console.log( '删除子菜单' ); 
    } 
}; 

var RefreshMenuBarCommand = function( receiver ){ 
    this.receiver = receiver; 
}; 
 
RefreshMenuBarCommand.prototype.execute = function(){ 
    this.receiver.refresh(); 
}; 
 
var AddSubMenuCommand = function( receiver ){ 
    this.receiver = receiver; 
}; 
AddSubMenuCommand.prototype.execute = function(){ 
    this.receiver.add(); 
    }; 
    var DelSubMenuCommand = function( receiver ){ 
    this.receiver = receiver; 
    }; 
    DelSubMenuCommand.prototype.execute = function(){ 
    console.log( '删除子菜单' ); 
};

var refreshMenuBarCommand = new RefreshMenuBarCommand( MenuBar ); 
var addSubMenuCommand = new AddSubMenuCommand( SubMenu ); 
var delSubMenuCommand = new DelSubMenuCommand( SubMenu ); 
setCommand( button1, refreshMenuBarCommand ); 
setCommand( button2, addSubMenuCommand ); 
setCommand( button3, delSubMenuCommand );
</script>

`;

export const codedemo2 = `
var setCommand = function( button, func ){ 
    button.onclick = function(){ 
        func();  
    } 
}; 
 
var MenuBar = { 
    refresh: function(){ 
        console.log( '刷新菜单界面' ); 
    } 
}; 
 
var RefreshMenuBarCommand = function( receiver ){ 
    return function(){ 
        receiver.refresh(); 
    } 
}; 
 
var refreshMenuBarCommand = RefreshMenuBarCommand( MenuBar ); 
 
setCommand( button1, refreshMenuBarCommand );
`;

