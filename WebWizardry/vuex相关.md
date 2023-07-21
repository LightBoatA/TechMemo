# vue2下vuex
## 概述
vuex是实现组件之间全局状态管理的一种机制，可以方便地实现组件之间数据的共享。
**好处**
- 集中管理共享的数据，易于开发和后期维护
- 高效地实现组件之间的数据共享，提高开发效率
- 存储在vuex中的数据都是响应式的，能够实时保持数据与页面的同步

**什么样的数据适合存到vuex中**
一般只有组件之间共享的数据才需要放到vuex中

## 使用步骤
- install
- 导入vuex包
  - import
  - Vue.use(Vuex)
- 创建store对象， 挂到vue示例中

## 核心概念
**state**
state提供唯一的公共数据源，所有共享的数据都要统一放到Store的state中进行存储。

读取值：
- 方式一：模板中访问：`$store.state.count`
- 方式二：
  - 从vuex中按需导入`mapState`函数
  - 通过此函数将当前组件需要的全局数据，映射为当前组件的`computed`属性，模板中直接调用`count`就可以了
    ```js
    computed: {
        ...mapState(['count'])
    }
    ```
**Mutations**
修改state中的数据，只能通过此方式修改，不能直接操作state中的数据，可以集中监控所有数据的变化

使用：
- 在mutations里面可以定义多个函数（函数的第一个参数是state），用来操作state，在里面直接调用`state.count`
- 可以传递自定义参数
- 组件中的调用方式：
  - 方式一：在组件中：`this.$store.commit('函数名')`
  - 方式二：从vuex中导入`mapMutations`函数，映射为当前组件的methods方法
     ```js
    methods: {
        ...mapMutations(['add', 'addN']),
        handler1() {
            this.add();
        }
    }
    ```
  - 方式三：不需要自己定义点击处理函数，直接在模板中调用对应的函数就可以了，有参数的加括号和参数，没有参数的直接函数名就可以
注意：不要再mutations函数中写异步操作

**Action**
Action用于处理异步任务，在Action中还是通过触发mutation的方式间接变更数据，可以传参（此示例没展示）
```js
actions: {
    addAsync(context) {
        settimeout(() => {
            context.commit('add') // 调用mutations中的add函数
        }, 1000)
    }
}
```
在组件的处理函数中触发Action
- 方式一：
    ```js
    methods: {
        handler1() {
            this.$store.dispatch('addAsync');
        }
    }
    ```
- 方式二：从vuex中导入`mapActions`函数，映射为当前组件的methods方法
    ```js
    methods: {
        ...mapActions(['addAsync', 'addNAsync']),
        handler1() {
            this.addAsync();
        }
    }
    ```
- 方式三：不需要自己定义点击处理函数，直接在模板中调用对应的函数就可以了
注意：
- action中不能直接修改state中的数据，只能通过`context.commit('mutations中的函数'),只有mutation可以修改state数据
- `dispatch`用于触发actions
- `commit`用于触发mutations

**Getter**
对store中的数据进行加工处理，形成新的数据，类似计算属性。不会修改state中的数据，只是一个包装作用

使用方式：
- 方式一：`this.$store.getters.showNum`
- 方式二：导入`mapGetters`，在computed中扩展出来可以直接调用

# v4.x
## vuex和单纯的全局对象不同点：
- Vuex 的状态存储是响应式的。
- 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

## 创建
1. 创建一个store实例，通过`createStore`
2. 将store实例作为插件安装`app.use(store)`

## 获取对象和触发变更
- 在main.js中（疑问）
    ```js
    store.commit('increment')

    console.log(store.state.count) // -> 1
    ```
- 在vue组件中
    ```js
    methods: {
    increment() {
        this.$store.commit('increment')
        console.log(this.$store.state.count)
    }
    }
    ```

## 核心概念

### state
**单一状态树**
将整个应用程序的状态存储在一个单一的数据结构中，每个应用将仅仅包含一个 store 实例。这样做的好处是可以实现状态的一致性和可预测性。另一个优点是方便进行状态的调试和跟踪。
> 与单一状态树相对立的是分散状态管理的思想。在分散状态管理的模式中，应用的状态不是集中存储在一个单一的状态树中，而是分布在多个组件之间或各个组件自身内部。
> 这样做的好处是每个组件相对独立，可以更灵活地处理状态和状态变化，使得组件之间的耦合度较低，便于重用和维护。
> 然而，因为状态是分布在多个组件中，所以状态的一致性和可预测性较难保证，组件之间的状态传递和管理可能会比较复杂。当应用规模变大，状态逻辑复杂时，可能导致状态管理的混乱和难以维护。
> 这也是为什么状态管理库（如Vuex、Redux等）采用单一状态树模式的主要原因之一。

**在vue组件中获得vuex状态**
- 简单方法：在计算属性中返回。
  > 这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。
    ```js
    const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
        return store.state.count
        }
    }
    }
    ```
- 子组件能通过 this.$store 访问到，因为Vuex 通过 Vue 的插件系统将 store 实例从根组件中“注入”到所有的子组件里。
    ```js
    computed: {
        count () {
            return this.$store.state.count
        }
    }
    ```
- 使用mapState 辅助函数
    ```js
    // 在单独构建的版本中辅助函数为 Vuex.mapState
    import { mapState } from 'vuex'

    export default {
    // ...
    computed: mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,

        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
            return state.count + this.localCount
            }
        })
    }
    ```
    当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
    ```js
    computed: mapState([
        // 映射 this.count 为 store.state.count
        'count' 
    ])
    ```
    展开运算符：
    ```js
    computed: {
        localComputed () { /* ... */ },
        // 使用对象展开运算符将此对象混入到外部对象中
        ...mapState({
            // ...
        })
    }
    ```
### Getter
- 方法一：通过`this.$store.getters.doneTodosCount`
- 方法二：通过方法访问，给getter返回一个函数，则它被访问时可以传参。
  > 注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。而作为属性时会缓存
    ```js
    getters: {
        // ...
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
        }
    }
    ```
    ```js
    store.getters.getTodoById(2)
    ```
- 方法三：mapGetters 辅助函数：通过扩展运算符，扩展到computed的对象中，上面有代码示例。可以改名：
    ```js
        ...mapGetters({
            // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
            doneCount: 'doneTodosCount'
        })
    ```
### Mutation
- 提交载荷：
  - 传入额外的参数，在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
  - 另一种方式，直接提交包含`type`属性的对象
    ```js
    store.commit({
        type: 'increment',
        amount: 10
    })
    ```
- 使用常量替代 Mutation 事件类型,这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然
- mutation必须是同步函数：否则会在调试时导致状态不可追踪
- 在组件中的使用方式：`this.$store.commit('xxx')` 提交 `mutation`，或者使用 `mapMutations` 辅助函数

### Action
- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。
- Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，但它不是 store 实例本身
- 常用ES6的参数解构来简化代码
    ```js
    actions: {
        increment ({ commit }) {
            commit('increment')
        }
    }
    ```
- 组合多个 action:在一个action中调用另一个返回promise的action:
    ```js
    actionB ({ dispatch, commit }) {
        return dispatch('actionA').then(() => {
            commit('someOtherMutation')
        })
    }
    ```
### Module
Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块
- 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
- 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
- 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
    ```js
    getters: {
        sumWithRootCount (state, getters, rootState) {
            return state.count + rootState.count
        }
    }
    ```
- 关于命名空间的问题此处不详记了，用时文档查

### 组合式API
- 可以通过调用 `useStore `函数，来在 `setup` 钩子函数中访问 `store`。这与在组件中使用选项式 API 访问 `this.$store` 是等效的。
    ```js
    import { useStore } from 'vuex'

    setup () {
        const store = useStore()
    }
    ```
- 为了访问 `state` 和 `getter`，需要创建 `computed` 引用以保留响应性，这与在选项式 API 中创建计算属性等效
    ```js
    import { computed } from 'vue'
    import { useStore } from 'vuex'

    export default {
    setup () {
        const store = useStore()

        return {
        // 在 computed 函数中访问 state
        count: computed(() => store.state.count),

        // 在 computed 函数中访问 getter
        double: computed(() => store.getters.double)
        }
    }
    }
    ```
- 要使用 mutation 和 action 时，只需要在 setup 钩子函数中调用 commit 和 dispatch 函数。
    ```js
    export default {
    setup () {
        const store = useStore()

        return {
            // 使用 mutation
            increment: () => store.commit('increment'),

            // 使用 action
            asyncIncrement: () => store.dispatch('asyncIncrement')
            }
        }
    }
    ```
# 进阶

### 严格模式
开启严格模式，仅需在创建 store 的时候传入 strict: true，在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
**不要在发布环境下启用严格模式**，避免性能损失。可以通过构建工具来处理：
```js
const store = createStore({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```
在严格模式下，有个问题：表单元素用`v-model`的时候，会试图直接修改`state`，这时就会报错。解决方法：
- 可以将其分解成`:value`和`@input=`来解决，很繁琐
- 使用带有 `setter` 的双向绑定计算属性
    ```js
    computed: {
        message: {
            get () {
                return this.$store.state.obj.message
            },
            set (value) {
                this.$store.commit('updateMessage', value)
            }
        }
    }
    ```
### 插件
可以自定义插件，有内置插件Logger，用于调试

# 面试常见问题

## 对vuex的个人理解

**特点**
- 是一种应用于vue的状态管理模式，核心是解决数据共享
- 以相应的规则，保证状态以一种可预测的方式发生变化

**缺点**
store只有一份，复杂的数据需要依赖于模块。Vuex状态是一个树状结构，最终会将模块的状态挂载到根模块上。
- 模块和状态名字冲突
- 模块需要增加命名空间
- 数据不够扁平化、调用的时候过长
- 对TS支持不友好

**原理**
- Vuex3核心是通过new Vue()创建一个Vue实例，进行数据共享。
- Vuex4核心是通过创建一个响应式对象进行数据共享，reactive()

## 如何监听vuex中数据的变化
- 通过vue的watch直接监听
- 通过store.subscribe监控状态变化
  - 维持一个subscribe数组
  - 每次调用subscribe(fn,...)的时候就添加到数组中一个订阅者
  - 在commit的时候，会依次执行subs中的fn

## 页面刷新后vuex中的数据丢失怎么解决？
- 采用vuex持久化插件，将数据存储到localStorage或者sessionStorage中
  > 常见的比如vuex-persistedstate:每次加载，先从本地取出来，每次数据变化，它使用subscribe来监听，并把最新状态存储到本地

## mutation和action的区别
- 在action中可以处理异步逻辑
- action中可以进行多次commit操作，包括action中也可以调用action
- 只有在mutation中可以修改数据，严格模式下
  > 严格模式下，watch变化，每次变化，判断是不是通过commit做的
- dispatch时会将action包装成promise，而mutation则没进行包装

```js

```