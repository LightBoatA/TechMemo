# 谈谈你对vue的理解

**声明式编程**：
- 简单、不需要关注实现，**按要求填代码**就可以。就只需要提供原料，它会提供**结果**。
- 与其相对的是命令式编程，更关注过程；声明式更**关注结果**。
- 命令式的比如jquery
- 举例子：数组求和，自己累加的过程就是命令式编程，用reduce就是声明式编程

**MVVM**
- vue没有完全遵循mvvm的模式，比如它会获取文档节点进行操作，这其实违背了这种思想

**虚拟DOM**
- js模拟的DOM对象，比真实DOM对象节省很多属性
- vue渲染的核心就是调用渲染方法（rander），将模板转换成虚拟DOM，再转换成真实DOM

**组件化**
 高内聚、低耦合、单向数据流（从上到下）
 - 大幅提高应用开发效率、测试性、复用性
 - 降低更新范围，只重新渲染变化的组件

# 谈谈对SPA的理解

**基本概念**
- SPA(single-page application)单页应用，默认情况下我们编写Vue/React都只有一个html页面，并提供一个挂载点，最终打包后会在此页面中引入对应的资源。（页面的渲染全部是由JS动态进行渲染的）。切换页面时通过监听路由变化，渲染对应页面的Client Side Rendering,客户端渲染CSR
- MPA(Multi-page application)多页应用，多个html页面。每个页面必须重复加载js/css等相关资源（服务器端返回完整的html，同时数据也可以在后端进行获取一并返回“模板引擎”）。多页应用跳转需要整页资源刷新。Serve Side Rendering，服务器端渲染SSR

> 如何分清在哪渲染：HTML是在前端动态生成的-客户端渲染，在服务器端处理好并返回的是-服务端渲染

**和多页面相比，优缺点**
|    | 单页面应用 | 多页面应用      |
|--------|-----|-----------|
| 组成   | 一个主页面和页面组件  | 多个完整的页面    |
| 刷新方式   | 局部刷新  | 整页刷新    |
| SEO搜索引擎优化   | 无法实现  | 容易实现 |
|页面切换|速度快，用户体验好|切换加载资源，速度慢，用户体验差 |
|维护成本|相对容易|相对复杂|

总结SPA特点
- 用户体验好、快、内容的改变不需要重新加载整个页面，服务端压力小
- SPA应用不利于搜索引擎的抓取
- 首次渲染速度相对较慢（第一次返回空的HTML，需要再次请求首屏数据）白屏时间长

**解决方案**
- 静态页面预渲染，在构建时生成完整的html页面（就是在打包的时候，先将页面放到浏览器中运行一下，将HTML保存起来），仅适合静态页面网站。变化率不高的网站
- SSR+CSR的方式：首屏采用服务端渲染的方式，后续交互采用客户端渲染的方式

# Vue为什么需要虚拟DOM
**基本概念**
- 就是用js对象来描述真实DOM
- 直接操作DOM性能低
- 不依赖真实平台环境，可以实现跨平台

**vue中虚拟DOM是如何生成的**
- 模板会被编译为渲染函数render
- 在接下来的挂载过程中，会调用render函数，返回的对象就是虚拟dom
- 在后续的patch过程中进一步转化为真实dom

**VDOM是如何做到diff的**
- 挂载过程结束后，会记录第一次生成的VDOM-oldVnode
- 当响应式数据发生变化时，将会引起组件重新render，此时就会生成新的VDOM-newVnode
- 使用oldVnode和newVnode做diff操作，将更改的部分应用到真实DOM上，从而转换为最小量的DOM操作，高效更新视图

# 说一下你对响应式数据的理解

**什么是响应式数据**
当数据发生变化的时候，vue能够监测到，并且将视图进行相应的更新

**如何实现的？**
- vue2中，通过Object.defineProperty将属性劫持，数组则是通过重写数组方法来实现的。多层对象通过递归实现
- vue3，采用proxy

**vue2处理的缺陷**
- 在vue2中使用xx，需要对每个属性添加getter和setter，性能差
- 当新增和删除属性时无法监测到变化，需要通过\$set和\$delete实现
- 需要对数组单独处理
- 对于ES6中新产生的Map、Set这些数据结构不支持

# Vue2中如何检测数组的变化？
关于defineProperty对于数组的表现：https://cloud.tencent.com/developer/news/485729
简单总结：Object.defineProperty 在数组中的表现和在对象中的表现是一致的，数组的索引就可以看做是对象中的 key
- 通过索引访问或设置对应元素的值时，可以触发 getter 和 setter 方法。
- 通过 push 或 unshift 会增加索引，对于新增加的属性，需要再手动初始化才能被observe。（问题：怎样手动初始化？）
- 通过 pop 或 shift 删除元素，会删除并更新索引，也会触发 setter 和 getter 方法。

所以，Object.defineProperty是有监控数组下标变化的能力的，只是Vue2.x放弃了这个特性，因为非常耗费性能。

**实现数组劫持**
- 数组考虑性能原因，没有用defineProperty对数组每一项进行拦截，而是选择重写数组的（push/pop/unshift/shift/reverse/sort/splice）七个会改变原数组的方法
  
**数组处理的缺点**
- 数组的索引和长度变化是无法监控到的

**具体实现代码**
- 创建一个新的原型对象，其原型是老对象
- 对新原型对象的7个方法进行重写
- 给数组设置新的原型对象
```js
// 创建新的数组原型对象，继承自 Array.prototype
let newArrayProto = Object.create(Array.prototype);

// 保存原始的数组原型对象
let oldArrayProto = Array.prototype;

// 遍历需要拦截的数组方法，并在新的数组原型对象上进行定义
['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'].forEach(method => {
    newArrayProto[method] = function(...args) {
        // 监测变化
        console.log('调用了数组的' + method + '方法');
        // 执行正常逻辑，调用原始的数组方法
        oldArrayProto[method].apply(this, args);
    }
})

// 创建一个数组对象
let arr = [1, 2, 3, 4, 5];

// 将 arr 的原型设置为 newArrayProto，以便使用拦截的数组方法
Object.setPrototypeOf(arr, newArrayProto);

// 调用 push 方法，触发拦截逻辑，并输出信息
arr.push(666);

// 打印数组对象
console.log(arr);

```

# nextTick()
vue会批量渲染，不会修改一个数据就渲染一次，而是将修改放到队列中，一次性渲染，渲染结束后，再调用nextTick。
Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次状态更改，每个组件都只更新一次。
> 注意，nextTick要放在数据更改之后，他们会被放到queue里，按顺序执行
- vue视图渲染是异步的，使用nextTick方法可以保证用户定义的逻辑在更新之后执行。
- 可用于获取更新后的DOM，多次调用nextTick会被合并

# vue中如何进行依赖收集
依赖收集：让属性记住，它依赖了哪个模板
- 每个属性都拥有自己的dep属性，存放他所依赖的watcher，当属性变化后，会通知自己对应的watcher去更新
- 默认在初始化时会调用render函数，会访问到属性的getter，此时会触发属性依赖收集dep.depend
- 当属性发生修改时，会触发watcher更新，dep.notify()

代码梳理总结：
**关于Dep依赖**
- 每一个属性会创建一个Dep实例，里面的subs数组存放所有依赖（watcher），也就是视图中所有用到此属性的地方
- 属性在初始化时，会被访问getter时，收集依赖
- 在set时，通知所有依赖进行更新

**关于watcher**
- 视图在编译和渲染时，每处用到数据的地方，都会创建一个watcher
- watcher中传入更新此处视图的方法
- 在New这个watcher的时候，它会被添加到对应属性的依赖列表里，这样实现的，设置一个全局Flag，值为自己，这样，它用到哪个属性，哪个属性的getter就会被触发，就会把这个watcher添加到自己的列表里，它访问完属性后，再把那个全局flag设成null

# vue.set方法是如何实现的
**概念解释**
- 这是vue2中的方法，解决新增属性默认不是响应式的问题
- defineProperty只能监测已经存在的属性，不能监控新创建的属性、数组索引的修改、也无法侦测到

**实现方法**
-  如果是数组调用`Vue.set(array,1,100)`，会调用重写的splice方法（这样可以更新视图）
-  如果是对象本身已有的属性，直接修改即可
-  如果新增一个属性，直接调用`defineReactive`将属性设置成响应式的
-  如果对象本身不是响应式的，那么也不需要把属性定义成响应式属性（只要对象属性被劫持过了，就会给它添加一个__ob__的属性）
-  最后通过调用`ob.dep.notify()`，进行视图更新

# Vue中的v-show和v-if怎么理解

**使用v-if，查看模板编译结果（vue2，3也差不多）**
```html
<div v-if="exists" id="app">{{ msg }}</div>
```
结果：`exists`为真，创建div，否则，创建空的empty节点
```js
function render() {
  with(this) {
    return (exists) ? _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_v(_s(msg))]) : _e()
  }
}
```
**使用v-show**
- 控制display,为none或元素原来设置的值

**怎样选择**
- `v-if`可以阻断内部代码是否执行，如果条件不成立，不会执行内部逻辑
- 如果页面逻辑在第一次加载时候已经确定后续不会频繁更改，则采用`v-if`
- `v-if`的优先级更高

# computed和watch区别
vue2中有三种watcher（渲染watcher、计算属性watcher、用户watcher）
vue3中有三种effect（渲染effect、计算属性effect、用户effect）

**computed**
- 可以简化模板中复杂的表达式，可以作为属性直接在模板中使用
- 仅当用户取值时才会执行对应的方法
- 具备缓存，以来的值不发生变化，对其取值时计算属性方法不会重新执行
- 不支持异步逻辑

**watch**
- 监控值的变化，当变化发生时调用对应的回调函数。经常用于监控某个值的变化，进行一些操作
> vue3提供了onCleanup函数作为watch的第三个参数，让用户更加方便地解决了清理问题（异步请求可能由于返回顺序问题，显示的不是最新结果）

# ref和reactive的区别
**基本概念**
- reactive用于处理对象类型的数据响应式，底层用的new Proxy()
- ref通常用于处理原始值响应式，底层采用Object.defineProperty()实现
- 
**reactive实现原理**
- 如果不是对象，直接返回
- 返回一个代理Proxy
  - get/set
  - deleteProperty
  - has
  - ownkeys
- 可以处理数组、Map、Set

**ref实现原理**
- 把原始类型包装成实例，如果是对象，返回一个proxy
- Object.defineProperty设置getter/setter

# watch和watchEffect的区别
**基本概念**
- watchEffect立即运行一个函数，被动地追踪它的依赖，当这些依赖改变时重新执行该函数
- watch侦测一个或多个响应式数据源并在数据源变化时调用一个回调函数

**原理**
- 底层都是通过new ReactiveEffect实现的：
  ```js
    const effect = new ReactiveEffect(getter, scheduler);
    effect.run();

    // 传入的函数就是getter
    watchEffect(() => {
        app.innerHTML = state.name; // 数据变化后，会调用scheduler内部会再出发effect.run()重新运行getter
    });

    // getter/cb函数 数据变化后，会调用scheduler，内部会调用cb
    watch(() => state.name, (newVal, oldVal) => {})
  ```

**区别**
- watchEffect不需要明确写依赖那些源属性，更方便，但依赖关系不明确，深层的对象更好，不用watch那样递归地监测每一个属性

# 插槽slot
**原理**
- 普通插槽就是一个映射关系，根据插槽名称，渲染对应的元素
  - 父组件渲染好
  - 子组件的slot根据对应的slot名字进行替换
- 作用域插槽：
  - 父组件渲染时，把\<template>内的内容编译成一个函数，需要子组件传入的数据作为参数
  - 子组件的slot渲染时，把对应数据传进去，渲染出对应的元素
  - 子组件中的slot再替换掉
- 区别：普通组件在父组件渲染，作用域插槽在子组件内部渲染

**使用场景**
通过插槽可以让用户更好地队组建进行扩展和定制化。可以通过具名插槽指定渲染的位置。常用的组件，例如：弹框组件、布局组件、表格组件、树组件
# 如何将template转换render函数

# new Vue()过程中做了些什么

# Vue.observable你有了解过吗

# v-if和v-for哪个优先级更高

# 生命周期有哪些？
**vue2**
- `beforeCreated`:数据没有被观测、在开发第三方插件时候可能会用到
- `created`: 实例创建完了，数据被观测过了，但还没有el属性
- `beforeMount`: 
- `mounted`: 挂载完，能拿到实际的元素
- `beforeUpdate`:
- `update`:组件更新完毕
- `beforeDestory`:实例还存在
- `destroyed`:实例不存在了
**vue3**
- 在最前面添加了`setup`，是组合api的入口
- 改名，` destory`改为`unmount`
- 组合式API里用钩子：
  - 前面都加个`on`
  - 没有`onBeforeCreate`和`onCreated`，因为setup取代了这两个
**什么时候发送请求**
- 更多在mounted中，也可以在created中，因为请求是异步的，其实在这两个哪里都行
# keep-alive
内置组件

**使用场景**
- 动态组件
- 路由

**原理**
- 内部有一个**缓存表**，初次正常渲染
- 渲染时候如果缓存表里有这个组件，就把它直接赋给vnode，**不再重新初始化**
- 关于超缓存：用LRU算法，Least Recently Used的缩写，即**最近最少**使用，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰

**问题**
如果组件数据不更新。<br>
解决方法：
- 可以用actived()钩子，在里面重新获取数据
- 有router的项目，每次进入路由时候，会执行beforeRouteEnter钩子，可以在里面的next方法中重新获取数据

# Vue-Router中有几种钩子，具体作用

# Vue-Router几种模式的区别
# Vue3和Vue2的区别
**视图更新方面**
- vue2通过xx进行数据劫持，需要对属性重写添加getter和setter，性能差
- vue2新增属性和删除属性时无法监控变化，需要通过$set、\$delete实现
- vue2的数组不采用xx进行数据劫持：一方面是对所有索引进行劫持会浪费性能，另一方面是很少通过索引去操作数组。所以它选择重写对数组的7的操作方法。但长度变化监测不到，需要$set
- vue3采用proxy的方式，代理对象或数组，避免了以上的问题
**模块化**
- vue3更注重模块的拆分，在2.0中无法单独使用部分模块，需要引入完整的vue.js（例如只想使用响应式部分，但需要引入完整的vue.js），new出来的实例对象，所有东西都在这个vue对象上，无论用不用到。vue3中的模块之间耦合度低，模块可以独立使用。减少了内存消耗，减少了用户加载时间。
**获取props**
- vue2:直接this.xxx
- vue3:setup(prps,context) {console.log(props)}
**API模式**
- vue2选项型API
  - 代码碎片化，处理同一个逻辑的代码被分散到各处，需要不断跳转到相关代码的区块，不易开发和维护
- vue3合成型API
  - 可以把相同逻辑点的代码放在一块
  - 可以把每个逻辑分成独立的模块，最后再在带有模板的vue中调用
**新增watchEffect**
**生命周期**
- 创建是setup
# Vue.use是干什么的

# Vue.extend

# Vue组件的data为什么必须是个函数