# node文件读取功能

我做node后台时候，由于没有直接连接数据库，所以会常用到文件生成写入功能，替代数据库。

结构一下目前路由函数的功能（以md写入为例）：

1.  日期好像是由前端传入的？不过想想，好像不需要传入时间参数，调用的时候直接取当前的年月数据就可以了。所以在实例化这个类的时候，需要提前写入年月数据。
2.  在有了年月数据后，需要生成目标文件路径。
3.  在文件路径后，需要判断写入的文件是否存在，不存在就生成文件夹。
4.  判断是否存在目标文件。
5.  进行文件写入。

目前封装好了前两项，使用方式就是实例化后调用对应的方法。目前的问题就是：

这个类需要无法对不同的文件参数进行处理，解决方法很简单，构造器里添加参数即可。然后再往远点想，除了路径生成，我们需要读取文件的时候呢？是方法扩展还是做一个新的类？