export const his = `TS的目标是成为JS程序的静态类型检查器，确保我们的类型正确。
当然在ts之前，也有很多对js类型的约束和检查的解决方法，比如eslint，tslint，flow（vue2就是用的flow）等？

2013：微软的visual studio2013开始内置ts
2014：ts1.0发布，同年将代码仓库搬到github
2016：ts2.0发布，引入许多重大语法更新
2018：3.0发布
2020：4.0发布
2023：5.0发布
`;

export const baseuse = `介绍一下基本的ts语法和用法
1.类型声明
  ts代码最显著的特点就是变量加上了类型声明
  let foo:string;
  函数也是如此，在后续会介绍函数的类型声明。

  当变量的值与声明的类型不一致，ts就会报错。另外，ts规定，变量只有赋值之后才能使用，否则就要报错。

2.类型推断
  类型声明不是必须的，若没有，ts就会自己推断类型。
  let foo=12
  上述示例，foo并没有类型声明，ts会推断它的类型为number，若后续这个变量被赋予其他类型的值，则会报错。

  ts的设计思想有这个：类型声明可选，可以加也可以不加，这样设计可以很好的从js过渡到ts（因为你不加也可以跑 笑）

3.ts的编译
  js的运行环境（运行时）有浏览器和node，他们是不认识ts的。所以ts必须先转换为js，ts官方没有做运行环境，只提供编译器。
  编译时，会将类型声明和类型相关的代码全部删除，只留下能够运行的js代码，并不会改变js的运行结果。
  所以 ts的类型检测只是编译时的类型检测，不是运行时的类型检测，一旦代码编译为了js，就不会再检查类型。

4.值与类型
  ts需要分清值和类型（value and type）。
  类型时针对值得，可以视为后者的一个元属性。ts代码只涉及类型，不涉及值。所有与值相关的处理，都由js完成。
  这一点请务必牢记，ts项目里，实际存在两种代码？一种时底层的值代码，另一种时上层的类型代码。前者使用js语法，后者使用ts语法。
  它们可以分离，ts的编译过程实际上就是，将类型代码全部拿掉的过程，只保留值代码。

5.ts playgorund
  使用最简单的方法就是使用官方的在线编译页面，TypeScript Playground

6.tsc编译器
  ts官方提供的编译器就是tsc，可以将ts编译为js。
  npm install -g typescript

  编译脚本：
  tsc可以一次编译一个或多个ts文件：
  tsc file1.ts file2.ts ...
  tsc可以一次将多个ts文件编译为一个js文件：
  tsc file1.ts file2.ts --outFile app.js
  tsc可以指定保存的目录：
  tsc app.ts --outDir dist
  tsc可以编译为指定的js版本（建议使用es2015来兼容低端的浏览器）
  tsc --target es2015 app.ts

  编译的错误处理：
  编译过程，若没有报错，tsc不会有任何显示。
  若报错，tsc命令就会显示报错信息
  app.ts:2:1 - error TS2322 Type "String" is not assignble to type "number"
  ...
  上述例子就是一个，但是编译还是会通过，编译结果也会是可执行的js文件。

  若希望报错就停止编译，不产生编译产物，可以使用参数：
  tsc --noEmitOnError app.ts
  tsc 还有一个参数值检测类型是否正确，不生产js文件：
  tsc --noEmit app.ts

  更多命令参数，请查看官网或tsc编译器一章。

  tsconfig.json:
  ts允许将tsc的编译参数写在配置文件里，只要当前目录有这个文件，tsc就会自动读取，所以编译时可以不写参数：
  tsc file1.ts file2.ts --outFile dist/app.js
  上述命令转换成配置文件：
  {
    "files":["file1.ts","file2.ts"],
    compilerOptions:{
      "outFile":"dist/app.js"
    }
  }
  有了这个配置，直接运行tsc即可。

其他：这里不介绍ts-node模块了，等以后有用到再看吧。
`;

export const anytype = `2.1 基本含义

    any类型没有任何限制，该类型的变量可以随意赋予任意类型的值。变量类型一旦设置为any，ts就会关闭这个变量的类型检测。即使有明显的错误，只要句法正确，就不会报错。
    实际开发里，any类型适用于一下场景：
    （1）出于特殊原因，需要关闭某些变量的类型检测。
    （2）为了让老的js项目快速迁移到ts。

2.2 类型推断问题

    对于开发者没有指定类型，ts就必须自己推断变量类型，若无法推断出来，ts就会认为该变量类型是any。
    function add(x+y){
      return x+y
    }
    add(1,[2,3])
    这个例子，函数add的参数变量都没有足够的信息说明，ts无法推断，所以会认为any。这是一种很糟糕的情况。
    ts提供一个编译选项，noImplicitAny，这个选项，只要推断出any类型就会报错。注意是推断，你自己用any还是可以的。当然，你没有为变量赋值的话，这个参数也不会进行报错。const没有这种问题，因为js规定const声明变量，必须同时进行初始化。

2.3 污染问题

    any类型除了关闭类型检测，还有一个很大的问题，那就是会污染其他变量：
    let x:any='hello'
    let y:number
    y=x //不报错
    y*123 //不报错
    y.toFixed() //不报错

    上面的例子，变量x是any，实际值是一个字符串，变量y是数字，但是他被赋予值为x的时候，并不会报错。然后变量y继续进行各种运算，ts也检测不出错误。

2.4 unknown类型

    为了解决上述的污染问题，ts3.0引入了unknown类型，他与any含义相同，表示类型不确定，可能是任意类型，但是他有一些限制，不像any那样只有，可以说是严格版any。
    相似之处在于，所有类型的值都可以分配给unknown类型：
    let x:unknown
    x=1
    x=true
    x='t'

    上面的例子不会有报错，这与any行为一致。
    unknown与any不同于，它不能直接使用，有以下限制：
    （1）unknown类型无法直接赋值给其他变量类型（除了any类型和unknown类型）
    let v:unknown=123
    let v1:boolean=v //报错
    （2）不能直接调用unknown类型变量的方法和属性
    let v1:unknown ={t:1}
    v1.foo //报错
    unknown类型使用变量属性或方法或直接作为函数执行，都会报错。
    （3）unknown类型只能进行比较运算，取反运算 typeof运算和instanceof运算，其他运算会报错

    那么如何使用unknown类型呢？
    答案是只有经过类型缩小，他的变量才可以使用，所谓类型缩小，就是缩小unknown类型的范围：
    let a:unknown=1
    if(typeof a === 'number') return a+10
    
    上面的例子，就是一个类型缩小的过程。

2.5 never类型
    为了保持集合论的对应关系，以及类型运算的完整性，ts还引入了空类型的概念，即类型为空，不包含任何值。
    当你用了这个类型后，变量无法被赋值。
    这个类型另一个特点就是可以被赋予给其他任意类型。
`;

export const tstypesystem=`3.1 基本类型

    js有8种类型，boolean，string，number，bigint，symbol，object，undefined，null，ts继承了这些，你可以将这些类型看作ts的基本类型。
    注意：上述类型都是小写字母，首写字母大写的Number，String，Boolean等在js里是内置对象，不是类型名称。
    另外，undefined和null既可以作为值，也可以作为类型。

    这里补充一下undefined和null吧：
    undefined表示未定义（即未给出定义，以后可能有定义）
    null表示为空（此处没有值）
    注意，若没有声明类型的变量，被赋值undefined或null，在关闭编译设置noImplicitAny和strictNullChecks时，它们的类型会被推断为any。
    为了避免这种情况，你需要打开strictNullChecks这个选项。

3.2 包装对象类型

    js的8种类型种，object属于复合类型，除了undefined和null两个特殊值，其余5个都是原始类型。
    这五种（boolean，string，number，bigint，symbol）都有对应的包装对象（wrapper object）。所谓包装对象，值得时这些值在需要时，会自动产生对象：
    'hello'.charAt(1) // 'e'

    上面的例子，字符串hello执行了charAt方法，但是js里，只有对象才有方法，而tsring是一个原始类型，之所以可以运行，是因为在调用方法时候，字符串自动转换为包装对象。
    这样方便处理字符串，省却了转换的麻烦。

    五种类型里，symbol和bigint无法直接获取它的包装对象。

3.3 包装对象和字面量类型

    由于包装对象的存在，导致一个原始类型的值都有包装对象和字面量两种情况。
    'hello' // 字面量
    new String('hello') // 包装对象

    上面的例子，说明字面量和包装对象的类似处，为了区分，ts提供的大小写。大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。
    let s1:String='j'
    let s2:String=new String('j')
    // 正确的

    let s3:string='t'
    let s4:string=new String('t')
    // 报错

    上述例子说明字面量和包装类型的不同。
    这里建议只写小写类型，不用大写类型，因为绝大多数变量使用原始变量的场合，都是使用的字面量；而且，ts讲很多内置方法的参数，定义为了小写类型。

3.4 Object类型和object类型

    复合类型obj也有大小写区分

    3.4.1 Object
    大写的Object类型代表js中广义对象，所有可以转换为对象的值，都是Object类型。事实上除了undefined和null这两个类型不能转换为对象，其他任何值就可以赋值给Object类型。

    3.4.2 object
    小写的object类型代表js中狭义对象，即可以用字面量表示的对象，只包含对象，数组和函数，不包括原始类型的值。

3.5 值类型

    ts规定，单个值也是一种类型，称为值类型。
    let x:'hello'
    x=1 // 报错
    x=hello // 正确

    上述例子表示变量x的值只能是hello，赋值为其他字符串就会报错。而这点很像js的const，ts推断类型时，遇到const声明的变量，若变量没有注明类型，就会推断其为值类型。
    当然，若const声明的是一个变量，就不会推断为值类型。

3.6 联合类型

    它指的是多个类型组成的一个新类型，使用符号|
    let x:string|number

    当然也可以和值类型联合表示，表示一个变量的若干种可能
    let g=1|2

    处理联合类型可能会用到类型缩小

3.7 交叉类型

    intersection types指的是多个类型组成的新类型
    let x:string&number

    上面这个例子表面x时同时由数值和字符串组成，当然这可能，所以实际ts会认为x的实际类型是never
    交叉类型主要用于对象的合成：
    let obj:
      {foo:string}&
      {bar:number}

    obj={
      foo:'tt',
      bar:0
    }

3.8 type命令
    
    这个命令是用于定义一个类型的别名的。
`

export const array=`4.1 简介

    ts数组有一个根本特点，所有成员的类型必须相同，但是成员的数里不确定。
    let arr:number[]=[1,2]

    若成员对象比较复杂，可以写到括号里
    let arr:(nunber|string):[]
    
    上面的例子说明arr的成员类型是number或string

    数组的第二种写法是ts内置的array接口：
    let arr:Array<number>=[1,2,3]
    let arr2:Array<number|string>

    上面的写法本质上属于泛型了，详见后续泛型章节。

4.2 数组的类型推断

    若数组变量没有声明类型，ts就会推断数组成员的类型，这时，推断行为会因为值得不同，而有所不同。若变量得初始值是空数组，那么ts会推断数组类型是any[]

4.3 只读数组

    js规定，const命令声明的数组变量是可以改变成员的。但很多时候有不允许变动数组成员的需求。
    const arr:readonly number[]=[0,1]

    上面的例子就是只读例子。

    然后你要知道子类型是继承父类型的所有特征，并加上自己的特征。
    let a1:number[]=[1,2]
    let a2:readonly number[]=a1 // 正确

    注意 readonly关键字不能与数组的泛型写法一起使用。
`
export const tuple=`5.1 简介

    元组是ts特有的数据类型，js没有。它表示成员变量类型可以自由的设置的数组。
    由于成员类型可能不一样，所以声明的时候要提前说好：
    const s:[string,string,boolean]=['a','b',true]

    上述例子中欧给，元组s的前两个成员类型是string，最后就是布尔，写法与数组还是有差异的：
    let a:number[]=[1] // 数组
    let t:[number]=[1] // 元组

    使用元组，必须给出元素的类型，不能省略，否则ts会将其推断为数组。
    let a=[1,true] // a类型被推断为(number | boolean)

    元组成员的类型可以在后面加？ 表示该成员可选，但是这个问好必须处于必选成员之后，有点像js function的默认参数。

    5.2 只读元组

    元组也是可以只读的
    let t = readonly [number,string]
    let ts=Readonly<[number,string]>
`