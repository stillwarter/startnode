export const his = `TS的目标是成为JS程序的静态类型检查器，确保我们的类型正确。
当然在ts之前，也有很多对js类型的约束和检查的解决方法，比如eslint，tslint，flow（vue2就是用的flow）等？

2013：微软的visual studio2013开始内置ts
2014：ts1.0发布，同年将代码仓库搬到github
2016：ts2.0发布，引入许多重大语法更新
2018：3.0发布
2020：4.0发布
2023：5.0发布
`;


export const baseuse=`介绍一下基本的ts语法和用法
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
  js的运行环境（运行时）有浏览器和node，他们是不认识ts的
`