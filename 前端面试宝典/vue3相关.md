### VUE3学习笔记

### 应用与根组件相关
- `.mount()`它的返回值是**根组件实例而非应用实例**。
- 确保在挂载应用实例之前完成所有应用配置！
- 全局范围注册组件
```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

### 模板语法
- 在底层机制中，Vue 会将模板编译成高度优化的 JavaScript 代码。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。
- 可以动态绑定多个属性值
```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}

<div v-bind="objectOfAttrs"></div>
```
- 属性名也可以是动态参数
```js
<a :[attributeName]="url"> ... </a>
<a @[eventName]="doSomething">
```
- 当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写，单文件组件内的模板不受此限制。

### 响应式基础
reactive() API 有两条限制：

reactive() 的种种限制归根结底是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制。

1. 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效。

2. 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着：
   1. 我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失：
    ```js
    let state = reactive({ count: 0 })

    // 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
    state = reactive({ count: 1 })
    ```
   2. 我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性：
    ```js
    const state = reactive({ count: 0 })

    // n 是一个局部变量，同 state.count
    // 失去响应性连接
    let n = state.count
    // 不影响原始的 state
    n++

    // count 也和 state.count 失去了响应性连接
    let { count } = state
    // 不会影响原始的 state
    count++

    // 该函数接收一个普通数字，并且
    // 将无法跟踪 state.count 的变化
    callSomeFunction(state.count)
    ```

- ref解包
  - 文本插值可解包，不用.value
  - 顶层属性，模板中可解包
  - 当一个 ref 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样：
    ```js
    const count = ref(0)
    const state = reactive({
    count
    })

    console.log(state.count) // 0

    state.count = 1
    console.log(count.value) // 1
    ```
    注意：跟响应式对象不同，当 ref 作为响应式数组或像 Map 这种原生集合类型的元素被访问时，不会进行解包。
    ```js
    const books = reactive([ref('Vue 3 Guide')])
    // 这里需要 .value
    console.log(books[0].value)

    const map = reactive(new Map([['count', ref(0)]]))
    // 这里需要 .value
    console.log(map.get('count').value)
    ```    
### 计算属性
- 我们推荐使用计算属性来描述**依赖响应式状态**的**复杂逻辑**
- `computed()` 方法期望接收一个 `getter 函数`，返回值为一个计算属性 `ref`
- Vue 的计算属性会**自动追踪响应式依赖**
- 若我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，然而，不同之处在于计算属性值会**基于其响应式依赖被缓存**。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 author.books 不改变，无论多少次访问 publishedBooksMessage 都会立即返回先前的计算结果，而不用重复执行 getter 函数。
- **不要在 getter 中做异步请求或者更改 DOM**！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此 getter 的职责应该仅为计算和返回该值。

### 类与样式的绑定
- 绑定class
  - 传递对象，控制几个类的显示
  - 传递数组
- 绑定style
  - 传递对象
  - 绑定一个包含多个样式对象的数组

### 条件渲染
- 如果想切换不止一个元素
    ```js
    <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
    </template>
    ```
- v-show 会在 DOM 渲染中保留该元素；v-show 仅切换了该元素上名为 display 的 CSS 属性。
- v-if vs v-show
  - v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

  - v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

  - 相比之下，v-show 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS display 属性会被切换。

  - 总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。

### v-for
- 可以使用解构
- 可以遍历对象：三个参数，你也可以只用一个或两个
  ```js
  <li v-for="(value, key, index) in myObject">
    {{ index }}. {{ key }}: {{ value }}
  </li>
  ```
- v-for使用范围值：n的初始值从1而不是0开始
  ```js
  <span v-for="n in 10">{{ n }}</span>
  ```
- 可以用template标签包裹循环多个元素

### 数组变化侦测
- 变更方法：push()四组、sort()、reverse()、splice()，vue能够侦听到变化
- 不可变方法：filter()、concat()、slice()，要替换一下
  ```js
  // `items` 是一个数组的 ref
  items.value = items.value.filter((item) => item.message.match(/Foo/))
  ```
- 有时，我们希望显示数组经过过滤或排序后的内容，而不实际变更或重置原始数据。在这种情况下，你可以创建返回已过滤或已排序数组的计算属性。
  ```js
  const numbers = ref([1, 2, 3, 4, 5])

  const evenNumbers = computed(() => {
    return numbers.value.filter((n) => n % 2 === 0)
  })
  ```
  注意：在计算属性中使用 reverse() 和 sort() 的时候务必小心！这两个方法将变更原始数组，计算函数中不应该这么做。请在调用这些方法之前创建一个原数组的副本：
  ```diff
  - return numbers.reverse()
  + return [...numbers].reverse()
  ```
### 事件处理
- 事件传入自定义参数和默认参数
  ```js
  <!-- 使用特殊的 $event 变量 -->
  <button @click="warn('Form cannot be submitted yet.', $event)">
    Submit
  </button>

  <!-- 使用内联箭头函数 -->
  <button @click="(event) => warn('Form cannot be submitted yet.', event)">
    Submit
  </button>
  ```
- 修饰符
  - 事件修饰符
  - 按键修饰符
    - 键盘按键别名
    - 系统按键
    - 鼠标按键
### 表单输入绑定
- v-model 还可以用于各种不同类型的输入，textarea、select 元素。它会根据所使用的元素自动使用对应的 DOM 属性和事件组合：
  <ul><li>文本类型的 <code>&lt;input&gt;</code> 和 <code>&lt;textarea&gt;</code> 元素会绑定 <code>value</code> property 并侦听 <code>input</code> 事件；</li><li><code>&lt;input type="checkbox"&gt;</code> 和 <code>&lt;input type="radio"&gt;</code> 会绑定 <code>checked</code> property 并侦听 <code>change</code> 事件；</li><li><code>&lt;select&gt;</code> 会绑定 <code>value</code> property 并侦听 <code>change</code> 事件。</li></ul>
- 可以将多个复选框绑定到同一个数组或集合的值：
  ```js
  const checkedNames = ref([])
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  ```
- 修饰符
  - `.lazy` change事件更新，而不是input事件更新
  - `.number` 输入自动转为数字
  - `.trim` 去除空格

- 侦听器
  - 在状态变化时执行一些“副作用”：比如更改DOM、根据异步操作结果去修改另一处的状态。
  - 侦听的数据原类型：
    ```js
    const x = ref(0)
    const y = ref(0)

    // 单个 ref
    watch(x, (newX) => {
      console.log(`x is ${newX}`)
    })

    // getter 函数
    watch(
      () => x.value + y.value,
      (sum) => {
        console.log(`sum of x + y is: ${sum}`)
      }
    )

    // 多个来源组成的数组
    watch([x, () => y.value], ([newX, newY]) => {
      console.log(`x is ${newX} and y is ${newY}`)
    })
    ```
- 直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发。相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调：（有疑问）

  ```js
  watch(
    () => state.someObject,
    () => {
      // 仅当 state.someObject 被替换时触发
    }
  )
  ```
- 即时回调：watch 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。
  ```js
  watch(source, (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  }, { immediate: true })
  ```
- `watchEffect()`允许我们自动跟踪回调的响应式依赖。回调会立即执行，不需要指定 immediate: true。在执行期间，它会自动追踪 todoId.value 作为依赖（和计算属性类似）。每当 todoId.value 变化时，回调会再次执行。有了 watchEffect()，我们不再需要明确传递 todoId 作为源值。
  ```js
  watchEffect(async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  })
  ```
  但是对于有多个依赖项的侦听器来说，使用 watchEffect() 可以消除手动维护依赖列表的负担。此外，如果你需要侦听一个嵌套数据结构中的几个属性，watchEffect() 可能会比深度侦听器更有效，因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。
- `watch`和`watchEffect`：区别是追踪响应式依赖的方式
  -`watch`只会追踪明确侦听的数据源，能更精确地控制回调函数的触发时机
  - `watchEffect`自动追踪所有能访问到的响应式属性，这更方便，但有时其响应性依赖关系不那么明确 
- 回调触发时机：Vue 组件更新之前，如果想要在之后：可以用`watchPostEffect()`

### props
- 如果使用&lt;script setup&gt;形式，用`defineProps`宏，否则：props 必须以 props 选项的方式声明，props 对象会作为 setup() 函数的第一个参数被传入
  ```js
  export default {
    props: ['title'],
    setup(props) {
      console.log(props.title)
    }
  }
  ```
### 自定义事件
- 在模板中触发：$emit
  ```js
  <!-- BlogPost.vue, 省略了 <script> -->
  <template>
    <div class="blog-post">
      <h4>{{ title }}</h4>
      <button @click="$emit('enlarge-text')">Enlarge text</button>
    </div>
  </template>
  ```
- 通过 defineEmits 宏来声明需要抛出的事件：
  ```js
  <script setup>
  const emit = defineEmits(['enlarge-text'])

  emit('enlarge-text')
  </script>
  ```
- 通过 emits 选项定义组件会抛出的事件:
  ```js
  export default {
    emits: ['enlarge-text'],
    setup(props, ctx) {
      ctx.emit('enlarge-text')
    }
  }
  ```


### 注册
- 全局注册
  ```js
  import MyComponent from './App.vue'

  app.component('MyComponent', MyComponent)
  ```
- 局部注册：先import导入组件
  - 在使用 &lt;script setup&gt; 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：
  - 没有使用 &lt;script setup&gt;则需要使用 components 选项来显式注册：
  ```js
  export default {
    components: {
      ComponentA
    },
    setup() {
      // ...
    }
  ```

### Props
- 除了使用字符串数组来声明 prop 外，还可以使用对象的形式：key 是 prop 的名称，而值则是该 prop 预期类型的**构造函数**。
  ```js
  defineProps({
    titile: String,
    likes: Number
  })
  ```
  也可以进行更复杂的类型检查：每个属性是对象，可以设置其`type`/`default`/ `required`/`validator(value)`

- 如果prop名字很长，推荐小驼峰形式
- 当传递不同类型的值时，注意动态绑定的细节，如果是常量字符串，可以是静态绑定，如果是其他类型，即便是常量也需要动态绑定。因为它们是表达式，否则会被解析为字符串。
 ```html
  <!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
  <BlogPost is-published />

  <!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
  <!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
  <BlogPost :is-published="false" />

  <!-- 根据一个变量的值动态传入 -->
  <BlogPost :is-published="post.isPublished" />

  ``` 
- 可以使用对象绑定多个prop：v-bind=xxx
```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}

<BlogPost v-bind="post" />
// 等价于：
<BlogPost :id="post.id" :title="post.title" />
```
- vue非常不建议子组件修改prop，如果想用其做初始值，那么可以另外定义一个变量；如果想进一步处理，可以通过计算属性；如果一定要更改，可以抛出自定义事件，通知父组件来更改

### 事件

- 事件校验：要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个布尔值来表明事件是否合法。
  ```js
    <script setup>
    const emit = defineEmits({
      // 没有校验
      click: null,

      // 校验 submit 事件
      submit: ({ email, password }) => {
        if (email && password) {
          return true
        } else {
          console.warn('Invalid submit event payload!')
          return false
        }
      }
    })

    function submitForm(email, password) {
      emit('submit', { email, password })
    }
    </script>
  ```
### 组件v-model
- 当使用在一个组件上时，v-model 会被展开为如下的形式：
  ```html
    <CustomInput
      :modelValue="searchText"
      @update:modelValue="newValue => searchText = newValue"
    />
  ```
  所以，组件内部要这样写：
  ```html
  <!-- CustomInput.vue -->
    <script setup>
    defineProps(['modelValue'])
    defineEmits(['update:modelValue'])
    </script>

    <template>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </template>
  ```
  可以给modelValue改名：这样就改成title了，所有modelValue的地方改成title：
  ```html
    <MyComponent v-model:title="bookTitle" />
  ```
  
  还可以通过计算属性:
  ```html
    <!-- CustomInput.vue -->
    <script setup>
    import { computed } from 'vue'

    const props = defineProps(['modelValue'])
    const emit = defineEmits(['update:modelValue'])

    const value = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })
    </script>

    <template>
      <input v-model="value" />
    </template>
  ```
- 多个v-model绑定：借助v-model参数，即上面说的改名，可以在一个组件上创建多个v-model双向绑定：
  ```html
    <UserName
      v-model:first-name="first"
      v-model:last-name="last"
    />
  ```
  ```js
    <script setup>
    defineProps({
      firstName: String,
      lastName: String
    })

    defineEmits(['update:firstName', 'update:lastName'])
    </script>

    <template>
      <input
        type="text"
        :value="firstName"
        @input="$emit('update:firstName', $event.target.value)"
      />
      <input
        type="text"
        :value="lastName"
        @input="$emit('update:lastName', $event.target.value)"
      />
    </template>
  ```
- 能够处理v-model修饰符，但需要自定义编写，不复杂，具体看文档

### 透传attributes
- 指的是传递给一个组件，却没有被该组件声明为props或emits的属性，或者v-on事件监听器。最常见的例子就是`class`、`style`和`id`。
- 当一个组件以单个元素为根作渲染时，透传的属性会被自动添加到根元素上。
- 能够深层传递
- 可以禁用此项功能
- 多根节点的组件，表现不同，需格外设置

```js

```

```html

```