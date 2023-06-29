# 前端框架-vue

### React、Vue 框架对比



### 组件通信

- **Props 和 Emit:**
  - 应用场景：适用于父子组件之间的通信，父组件通过 props 向子组件传递数据，子组件通过 emit 触发事件将数据传递回父组件。
  - 优点：简单易用，适用于简单的组件通信需求。
  - 缺点：对于层级较深或多个组件之间的通信，props 需要逐级传递，比较繁琐。

  示例：
  ```html
  <child-component :propName="data"></child-component>
  ```
  ```javascript
  this.$emit('eventName', data);
  ```
- **$refs**
  - 在 Vue 中，可以使用 `$refs` 来实现父子组件之间的消息传递。`$refs` 是一个用于访问子组件的引用的特殊属性。

  1. 在父组件中，给子组件添加 `ref` 属性，可以是字符串或者是一个回调函数。
     ```html
     <template>
       <child-component ref="childRef"></child-component>
     </template>
     ```

  2. 在父组件中，通过 `$refs` 访问子组件的实例，并调用子组件的方法或访问其属性。
     ```javascript
     export default {
       mounted() {
         this.$refs.childRef.childMethod(); // 调用子组件的方法
         const childData = this.$refs.childRef.childData; // 访问子组件的属性
       },
     }
     ```

  3. 在子组件中，可以通过 `$parent` 访问父组件的实例，从而实现向父组件传递消息。
     ```javascript
     export default {
       methods: {
         sendToParent() {
           this.$parent.parentMethod(); // 调用父组件的方法
           this.$parent.parentData = 'Hello Parent'; // 修改父组件的属性
         },
       },
     }
     ```

  需要注意的是，使用 `$refs` 和 `$parent` 可能会引入紧密的**耦合关系**，因此在设计组件之间的通信时，应该考虑使用 Vue 的官方推荐的数据流管理方式，如 Vuex 或事件总线。只在必要的情况下才使用 `$refs` 和 `$parent`。

- **Provide 和 Inject:**

    - 应用场景：适用于**跨层级**组件之间的通信，祖先组件通过 provide 提供数据，后代组件通过 inject 注入数据。
    - 优点：可以在任意层级的组件之间进行数据传递，避免了逐级传递 props。
    - 缺点：**破坏了组件之间的封装性**，不太适用于复杂的应用场景。

    示例：
    ```javascript
    // 祖先组件提供数据
    provide() {
        return {
            data: this.data
        };
    }

    // 后代组件注入数据
    inject: ['data']
    ```

- **EventBus:**

    - 应用场景：适用于**任意组件**之间的通信，可以通过事件总线进行订阅和发布消息。
    - 优点：灵活性高，可以在任意组件之间进行通信。
    - 缺点：需要手动管理事件订阅和取消订阅，不太适用于大型应用，**容易造成事件命名冲突**。

    示例：
    ```javascript
    // 创建事件总线
    const bus = new Vue();

    // 发布消息
    bus.$emit('eventName', data);

    // 订阅消息
    bus.$on('eventName', callback);
    ```

- **Vuex:**

    - 应用场景：适用于大型应用或需要共享状态的组件之间的通信。
    - 优点：提供了集中式的状态管理，方便多个组件之间共享数据。
    - 缺点：**适用于大型应用**，对于小型应用可能过于繁琐。

    示例：
    ```javascript
    // 定义 store
    const store = new Vuex.Store({
        state,
        mutations,
        actions
    });

    // 在组件中使用 store
    this.$store.state.data = newData;
    ```

### 数据双向绑定原理

### diff 算法
Vue 使用 Virtual DOM 和 Diff 算法来高效地更新视图。

Diff 算法是用于比较新旧 Virtual DOM 树的差异，然后只对发生变化的部分进行更新，以提高性能。

Vue 的 Diff 算法主要采用了以下几个策略：

1. **同级比较：** Vue 只会在同级进行节点比较，不会跨级比较。这样可以减少比较的时间复杂度。
2. **节点复用：** 当节点类型相同时，Vue 会尽可能地复用该节点，避免不必要的 DOM 操作。
3. **key 值优化：** 在使用 v-for 渲染列表时，为每个节点添加唯一的 key 值，这样 Vue 可以通过 key 值判断节点的移动、新增、删除等操作，减少 DOM 操作的次数。
4. **差异策略：** Vue 通过优先比较节点的标签名、关键属性等来判断是否是相同节点，然后再进一步比较子节点。
5. **批量更新：** Vue 会将同一事件循环中的所有数据变化进行批量更新，以减少 DOM 操作次数。

这些策略使得 Vue 在更新视图时能够高效地计算出最小的变更，并将变更应用到实际的 DOM 中，从而提升性能和用户体验。

### 虚拟DOM
Virtual DOM（虚拟 DOM）是一种表示真实 DOM 树的 JavaScript 对象结构。它是一种用于优化前端渲染性能的技术。

在传统的 Web 开发中，当数据发生变化时，我们通常直接操作真实的 DOM 元素来更新视图。这种方式效率较低，因为每次操作真实 DOM 都会触发浏览器的重排和重绘操作，消耗大量的计算资源。

Virtual DOM 的思想是在内存中构建一个轻量级的虚拟 DOM 树，它与真实 DOM 树保持一致的结构，但不会进行实际的渲染。当数据发生变化时，Virtual DOM 会与之前的虚拟 DOM 进行比较，找出差异，并将差异应用到真实 DOM 上，从而只更新发生变化的部分，减少了不必要的 DOM 操作，提高了渲染性能。

Virtual DOM 有以下优点：

1. **提高性能：** Virtual DOM 通过批量更新和最小化 DOM 操作，减少了浏览器的重排和重绘操作，提高了渲染性能。
2. **跨平台：** Virtual DOM 不依赖于具体的浏览器 API，因此可以在不同的平台上运行，如浏览器、移动端和服务器端。
3. **简化开发：** Virtual DOM 提供了一种声明式的编程模型，将视图与数据的关系抽象出来，简化了前端开发的复杂性。

虽然 Virtual DOM 增加了一定的内存开销，但由于其优化了渲染过程，使得整体性能得到了提升。在现代的前端框架中，如 React 和 Vue，都采用了 Virtual DOM 技术来进行高效的视图更新。

其他问题：
以下是你的笔记的标准Markdown格式：

1. **`v-if`和`v-show`的区别？**

   - 都可以控制元素的显示和隐藏。
   - `v-show`是通过控制元素的`display`属性来实现显示和隐藏；`v-if`是将DOM元素整个添加和删除。
   - `v-if`在切换时有一个局部编译/卸载的过程，会销毁和重建内部的事件监听和子组件；`v-show`只是**简单地切换CSS**。
   - `v-if`**是真正的条件渲染**；`v-show`在从`false`变为`true`时不会触发组件的生命周期，而`v-if`会**触发生命周期**。
   - `v-if`的切换效率较低，而`v-show`的效率较高。

如果需要**频繁切换**元素的可见性，推荐使用**v-show**。只有在**初始渲染时确定元素是否显示或隐藏**，且不需要频繁切换时，才使用**v-if**。

2. **如何理解MVVM？**

   MVVM是Model-View-ViewModel的缩写，是一种**前端开发的架构模式**。
   - M：模型，对应的是数据。
   - V：视图，即用户界面，对应的是DOM。
   - VM：视图模型，是Vue的实例对象，连接View和Model的桥梁。
   - MVVM的核心是提供对View和ViewModel的双向数据绑定，当数据改变时，ViewModel能监听到数据的变化并自动更新视图；当用户操作视图时，ViewModel也可以监听到视图的变化，然后通知数据进行改动，实现双向数据绑定。
   - ViewModel通过双向绑定将View和Model连接起来，它们之间的同步是自动的，无需人为干涉，因此我们只需关注业务逻辑，无需操作DOM，也不需要关注数据的状态，因为它们由MVVM统一管理。

3. `v-for`中的`key`**值的作用是什么？**

   在`v-for`中，`key`属性用于**标识**每个迭代的子元素，以便在更新过程中跟踪元素的身份。它在Vue的**虚拟DOM算法**中扮演着重要的角色。

    以下是`key`属性的作用和重要性：

    1. **唯一标识**：`key`属性用于唯一标识每个被迭代的子元素。Vue使用`key`来确定每个元素的身份，以便在重新渲染时准确追踪每个元素的变化。

    2. **优化渲染**：使用适当的`key`可以帮助Vue识别元素的变化并最小化DOM操作。当元素的顺序、数量或内容发生变化时，Vue可以更高效地更新和重新排序元素，而不必重新创建和销毁整个元素。

    3. **避免重复状态**：`key`属性还有助于避免在组件中复用相同的状态。通过为每个迭代元素分配唯一的`key`，Vue可以确保每个元素拥有自己独立的状态，而不会被错误地复用之前的状态。

    需要注意的是，`key`属性的值必须是**唯一且稳定的**，最好使用具有唯一标识的值，例如每个元素的唯一ID。避免使用迭代的索引作为`key`，因为**索引在列表中的位置可能会发生变化**，这可能导致不必要的重新渲染问题。

    总结起来，`key`属性在`v-for`中起到了**优化渲染**、唯一标识和避免重复状态的作用，对于列表渲染非常重要。

4. 对Vue生命周期的理解：

   组件从创建到销毁的过程就是其生命周期。Vue的生命周期包括以下阶段：

   - 创建阶段：
     - `beforeCreate`：实例创建之前，属性和方法不能使用。
     - `created`：实例创建完成后，可以使用数据、修改数据，不会触发`updated`，也不会更新视图。

   - 挂载阶段：
     - `beforeMount`：完成模板的编译，虚拟DOM创建，即将渲染，可以修改数据，不会触发`updated`。
     - `mounted`：将编译好的模板挂载到页面，可以发送异步请求和访问DOM节点。

   - 更新阶段：
     - `beforeUpdate`：组件数据更新前

，数据为新值，页面上的数据为旧值，组件即将更新，可以修改数据。
     - `updated`：重新渲染后，数据和页面都是新的，避免在此更新数据。

   - 销毁阶段：
     - `beforeDestroy`：实例销毁前，可以继续使用实例，可以清除定时器等。
     - `destroyed`：组件已完全销毁，所有东西都被清理。

   当使用`keep-alive`时，还有两个额外的生命周期钩子：
   - `activated`：组件被激活时调用。
   - `deactivated`：组件被停用时调用。

5. 在`created`和`mounted`中请求数据有什么区别？

   - `created`在渲染前调用，通常用于初始化属性和渲染前的操作。
   - `mounted`在模板渲染完成后调用，一般用于初始化页面后对元素节点进行操作。
   - 在`mounted`中请求数据可能会出现闪屏问题，而在`created`中不会。

   一般情况下，使用`created`较多。如果请求的数据影响到DOM元素，则使用`created`；如果请求的数据与DOM无关，则可以放在`mounted`中。
   
   - **created**适合进行一些**初始化**的操作和数据请求，而**mounted**适合进行需要**操作DOM**的任务和与DOM相关的操作。

    - 需要注意的是，在created钩子函数中发起的异步请求，可能在组件的mounted钩子函数执行之前返回，因此在mounted钩子函数中应该进行数据就绪的判断，避免在数据未完全加载时进行相关操作。

6. Vue中的修饰符有哪些？

   1. 事件修饰符：
      - `.stop`：阻止事件冒泡。
      - `.prevent`：阻止默认行为。
      - `.capture`：内部元素触发的事件先在此处理。
      - `.self`：只有当`event.target`是当前元素时触发。
      - `.once`：事件只会触发一次。
      - `.passive`：立即触发默认行为。
      - `.native`：将当前元素作为原生标签看待。

   2. 按键修饰符：
      - `.keyup`：键盘抬起时触发。
      - `.keydown`：键盘按下时触发。

   3. 系统修饰符：
      - `.ctrl`
      - `.alt`
      - `.meta`

   4. 鼠标修饰符：
      - `.left`：鼠标左键。
      - `.right`：鼠标右键。
      - `.middle`：鼠标中键。

   5. 表单修饰符：
      - `.lazy`：在输入完成后才进行更新。
      - `.trim`：自动去除输入内容前后的空格。
      - `.number`：将输入转为数字。


7. Vue中如何进行组件通信？

   - 父组件向子组件传递数据：
     - 使用`props`在父组件中定义

自定义属性，然后在子组件中使用`props`接收。
     - 使用`$ref`，引用信息会注册在父组件的`$refs`对象上。

   - 子组件向父组件传递数据：
     - 使用`$emit`在子组件中绑定自定义事件，并在触发时传递参数，父组件需要使用事件监听来接收参数。

   - 兄弟组件之间传递数据：
     - 可以创建一个新的Vue实例，使用`$on`和`$emit`来进行数据传输。
   
   - 使用Vuex进行组件间的状态管理。

9. `keep-alive`是什么？如何使用？

   `keep-alive`是Vue的一个内置组件，用于缓存不活动的组件实例，而不是销毁它们。它可以将组件的状态保存在内存中，**以避免重复渲染DOM节点**，减少加载时间和性能消耗，从而提高用户体验。

   使用`keep-alive`时，将需要缓存的组件包裹在`<keep-alive>`标签内，如：
   ```html
   <keep-alive>
     <component-to-cache></component-to-cache>
   </keep-alive>
   ```

10. Axios是如何封装的？

    通常对Axios进行封装的步骤包括：

    1. 下载并引入Axios库。
    2. 创建Axios实例，设置通用配置。
    3. 封装请求响应拦截器，对请求和响应进行统一处理。
    4. 封装接口，根据业务需求创建不同的API函数，内部使用Axios发送请求。
    5. 将封装好的接口抛出，供项目中其他地方使用。

11. Vue路由如何进行参数传递？

    Vue路由可以通过以下方式进行参数传递：

    - `params`传参：
      - 使用`this.$router.push({ name: 'index', params: { id: item.id } })`进行跳转。
      - 在目标组件中使用`this.$route.params.id`获取参数。

    - 路由属性传参：
      - 使用`this.$router.push({ name: '/index/${item.id}' })`进行跳转。
      - 在路由配置中设置`path: '/index/:id'`。

    - `query`传参（可以解决页面刷新参数丢失的问题）：
      - 使用`this.$router.push({ name: 'index', query: { id: item.id } })`进行跳转。

12. Vue路由的`hash`模式和`history`模式有什么区别？

    - `hash`模式的路由地址中包含`#`符号，而`history`模式则没有。
    - 在刷新页面时，`hash`模式会加载对应页面，而`history`模式默认会返回404错误，需要后端额外配置。
    - `hash`模式支持低版本浏览器，而`history`模式不支持，因

    为后者使用的是HTML5的`history.pushState`方法。

    在使用Vue路由时，默认使用的是`hash`模式，如果需要使用`history`模式，需要在创建Vue实例时进行配置：
    ```js
    const router = new VueRouter({
      mode: 'history',
      routes: [...]
    })
    ```

13. **Vue中的路由导航守卫有哪些？**

    路由导航守卫是Vue Router提供的一些钩子函数，用于控制路由的跳转行为。常用的导航守卫有以下几个：

    - `beforeEach`：在路由**跳转之前**调用，可以用来进行全局的权限校验、登录验证等。
    - `afterEach`：在路由跳转之后调用，可以用来进行页面的统计、埋点等。
    - `beforeResolve`：在路由**解析之前**调用，可以在**异步路由组件被解析**之后再渲染组件。
    - `beforeEnter`：在单个路由配置中定义，用于该路由独享的前置守卫。
    - `beforeRouteUpdate`：在当前路由改变，但是该组件被复用时调用。
    - `beforeRouteLeave`：在当前路由离开时调用，可以用来询问用户**是否保存修改**等操作。

    导航守卫可以通过使用`router.beforeEach`等方法来注册。

    另外一种解释：
    
    路由导航守卫是 Vue Router 中的一项功能，用于在路由导航过程中对路由进行控制和管理。它可以在路由切换之前、之后以及在路由切换过程中执行一些逻辑操作。

    Vue Router 提供了三种导航守卫：

    1. 全局前置守卫（`beforeEach`）：在路由切换之前执行，可以用来进行一些全局的前置处理逻辑，例如用户身份验证、权限验证等。
    2. 全局解析守卫（`beforeResolve`）：在路由组件解析之前执行，用于确保**异步**路由组件被解析完毕。
    3. 全局后置钩子（`afterEach`）：在路由切换之后执行，可以用来进行一些全局的后置处理逻辑，例如页面统计、滚动行为控制等。

    此外，还可以为每个路由配置单独的守卫：

    1. 路由独享的前置守卫（`beforeEnter`）：在进入特定路由之前执行，用于对**该路由**进行特定的前置处理逻辑。
    2. 组件内的守卫（beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave）：在组件内部定义的守卫，用于对组件的路由进行针对性的处理，例如在**进入、更新或离开**路由时执行特定的逻辑。

    使用路由导航守卫可以实现诸如**权限控制**、**页面访问验证**、**路由切换动画**、**数据加载**等功能。它为开发者提供了一种在路由切换过程中进行拦截和处理的方式，从而更好地控制和管理应用程序的路由行为。


### 什么是Composition API
Composition API是Vue 3.x中引入的一种全新的API风格，用于组织和复用组件的逻辑。它是对Vue 2.x中选项式API（Options API）的补充和扩展，提供了更灵活、更可组合的方式来编写组件代码。

Composition API的核心概念是使用`setup`函数来组织组件的逻辑代码。在组件中，可以通过`setup`函数来定义组件的状态、计算属性、方法、生命周期钩子等等。相比于Vue 2.x中将这些逻辑分散在不同的选项中（如`data`、`methods`、`computed`等），Composition API将它们统一放在一个函数中，使得逻辑更加集中和可组合。

使用Composition API，可以更好地重用和组合逻辑。通过函数的形式，我们可以将相似的逻辑抽象成可复用的函数，并在多个组件中使用。这样，我们可以更好地管理组件的代码，并提高代码的可读性和维护性。

另外，Composition API还提供了一些辅助函数，如`reactive`、`computed`、`watch`等，用于处理状态的响应式更新、计算属性的定义以及侦听状态变化等。这些辅助函数使得组件的编写更加简洁和直观。

总而言之，Composition API是Vue 3.x中的一种新的组件编写风格，通过`setup`函数和辅助函数来组织和复用组件的逻辑代码，提供了更灵活、更可组合的方式来编写Vue组件。它可以使得组件的代码更清晰、更易维护，并提供更好的开发体验和性能优化。

举例：
当使用Vue 3的Composition API编写组件时，可以使用`reactive`函数创建响应式对象，以便在组件中进行状态管理。以下是一个示例，展示了如何使用`reactive`创建响应式对象并在组件中使用它：

```vue
<template>
  <div>
    <p>Username: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
    <button @click="updateUser">Update User</button>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    // 创建响应式对象
    const user = reactive({
      username: 'John Doe',
      email: 'johndoe@example.com',
    });

    // 更新用户信息
    const updateUser = () => {
      user.username = 'Jane Smith';
      user.email = 'janesmith@example.com';
    };

    // 返回响应式对象和方法
    return {
      user,
      updateUser,
    };
  },
};
</script>
```

在上面的例子中，我们使用`reactive`函数创建了一个响应式对象`user`，其中包含了`username`和`email`两个属性。然后，我们定义了一个方法`updateUser`，当按钮被点击时，会更新`user`对象的属性。

通过`setup`函数，我们将`user`对象和`updateUser`方法返回，使它们在模板中可用。在模板中，我们可以直接使用`user`对象的属性来显示用户的用户名和电子邮件地址，并通过点击按钮来触发`updateUser`方法来更新用户信息。

这个例子展示了使用`reactive`函数创建响应式对象的用法，以及在组件中使用响应式对象进行状态管理。通过这种方式，我们可以轻松地对状态进行更新，并让组件自动响应状态的变化，以便实时更新视图。

在Vue 2中，我们可以使用`data`选项来定义响应式数据，并在组件中使用它们。以下是使用Vue 2实现上述代码的示例：

```vue
<template>
  <div>
    <p>Username: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
    <button @click="updateUser">Update User</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: 'John Doe',
        email: 'johndoe@example.com',
      },
    };
  },
  methods: {
    updateUser() {
      this.user.username = 'Jane Smith';
      this.user.email = 'janesmith@example.com';
    },
  },
};
</script>
```

这个例子展示了在Vue 2中如何使用`data`选项定义响应式数据，并在组件中使用它们进行状态管理。尽管在Vue 2中没有像Vue 3的Composition API那样明确的函数来创建响应式对象，但通过使用`data`选项，我们仍然可以实现类似的功能。