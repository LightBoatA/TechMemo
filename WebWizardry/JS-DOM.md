# DOM

### 获取元素
- DOM 提供的 API 方法：这些是古老的用法，不太推荐使用：
  - `getElementById`
  - `getElementsByTagName`
- HTML5 提供的新方法：
  - `querySelector`
  - `querySelectorAll`

### 操作元素

#### 改变元素内容
- `element.textContent`: 设置或获取元素的文本内容，不解析 HTML 标签。
- `element.innerHTML`: 设置或获取元素的 HTML 内容，会解析 HTML 标签。

#### 元素属性操作
- `element.src`: 设置或获取元素的 `src` 属性。
- `element.href`: 设置或获取元素的 `href` 属性。
- `element.id`: 设置或获取元素的 `id` 属性。
- `element.title`: 设置或获取元素的 `title` 属性。

#### 样式操作
- `element.style.xxx`: 操作元素的行内样式，例如 `element.style.fontSize`、`element.style.backgroundColor`。
- `element.className`: 操作元素的类名样式。

> 注意：
> 1.在 JavaScript 中，样式属性采用驼峰命名法，例如 `fontSize`、`backgroundColor`。
> 2.通过 JavaScript 修改 `style` 样式操作会产生行内样式，其权重较高。

### 节点操作

#### 节点概述
- 元素节点的 `nodeType` 为 1。
- 属性节点的 `nodeType` 为 2。
- 文本节点的 `nodeType` 为 3。

#### 父子节点
- `node.parentNode`: 获取元素的父节点，即最近的一个父节点。
- `node.childNodes`: 获取元素的子节点列表，包括各种节点类型（符合 W3C 标准）。
- `node.children`: 获取元素的元素子节点列表，返回一个数组（重点）。

- `node.firstChild/lastChild`: 获取元素的第一个/最后一个子节点，包含各种节点类型。
- `node.firstElementChild/lastElementChild`: 获取元素的第一个/最后一个元素子节点，兼容性较差（仅支持 IE9 及以上）。

#### 兄弟节点
- `node.previousSibling`: 获取元素的前一个兄弟节点。
- `node.nextSibling`: 获取元素的后一个兄弟节点。
- `node.previousElementSibling`: 获取元素的前一个元素兄弟节点，兼容性较差（仅支持 IE9 及以上）。
- `node.nextElementSibling`: 获取元素的后一个元素兄弟节点，兼容性较差（仅支持 IE9 及以上）。

#### 创建节点
- `document.createElement('tagName')`: 创建一个指定标签名的元素节点。

#### 添加节点
- `node.appendChild(child)`: 将一个子节点添加到父节点的末尾。
- `node.insertBefore(child, referenceNode)`: 在指定的参考节点之前插入一个子节点。

#### 删除节点
- `node.removeChild(child)`: 从父节点中移除一个子节点。

#### 复制节点
- `node.cloneNode()`: 复制节点。
  - 如果不传递参数或参数为 `false`，则进行浅拷贝，即只克隆节点本身，不克隆子节点。
  - 如果参数为 `true`，则进行深拷贝，会克隆节点本身以及所有子节点。

> 注意：
> 1.在浅拷贝中，新复制的节点和原始节点共享相同的子节点。
> 2.在深拷贝中，新复制的节点及其所有子节点都是全新创建的，与原始节点没有关联。


### 元素偏移量

#### offset系列

- `element.offsetParent` 获取当前元素的定位父级元素，即最近的已定位（设置了 `position` 属性）的父级元素，如果实在没有，那就body。

- `element.offsetTop` 获取当前元素相对于其 `offsetParent` 元素顶部的距离，不带单位
- `element.offsetLeft` 获取当前元素相对于其 `offsetParent` 元素左侧的距离，不带单位

- `element.offsetWidth` 获取当前元素的宽度，包括内容、内边距和边框（不包含margin、不带单位）。
- `element.offsetHeight` 获取当前元素的高度，包括内容、内边距和边框。

> 注意：
> - `offsetTop`、`offsetLeft`、`offsetWidth` 和 `offsetHeight` 返回的值是相对于当前元素的 `offsetParent` 元素而言的。

#### offset系列和style的区别
- `style`只能是行内样式表才能获取到
- `style.width`不包含`padding`和`border`
- `style.width`获得的是带单位的字符串
- `style`是可读写属性，`offset`系列是只读

#### client系列
- `element.clientTop`: 获取元素上边框的像素宽度
- `element.clientLeft`: 获取元素左边框的像素宽度
- `element.clientWidth`: 获取元素**内容区域的宽度**，不包括元素的内边距和边框宽度
- `element.clientHeight`: 获取元素内容区域的高度，不包括元素的内边距和边框高度

> 注意：
> - `offset`系列属性获取的是元素在页面上的位置和尺寸，包括边框、内边距和滚动条占用的空间。
> - `client`系列属性获取的是元素内容区域的位置和尺寸，不包括边框和滚动条占用的空间。
>
#### scroll系列
- `element.scrollTop`: 获取元素内容区域顶部被隐藏的像素数，即向上滚动的距离（被卷去的头部）
  - 扩展：如果是页面被卷去多少：`window.pageYOffset`
- `element.scrollLeft`: 获取元素内容区域左侧被隐藏的像素数，即向左滚动的距离
- `element.scrollWidth`: 获取元素内容区域的宽度，包含padding,不包括边框，包括**被隐藏**的部分（真正的内容的大小）
- `element.scrollHeight`: 获取元素内容区域的高度，包括被隐藏的部分
- `element.scrollTo(x, y)`: 滚动到指定的坐标位置，x为水平滚动位置，y为垂直滚动位置
- `element.scrollIntoView()`: 滚动到元素可见区域内，如果参数为true，则元素顶部与视口顶部对齐，否则元素底部与视口底部对齐

#### 三大系列的对比：
`element.offsetWidth` 包含边框
`element.clientWidth` 不包含边框
`element.scrollWidth` 不包含边框、包含隐藏

#### 三大系列主要用法：
- offset系列经常用于获得元素位置 offsetLeft/offsetTop
- client系列经常用于获取元素内容大小 clientWidth/clientHeight
- scroll系列经常用于获取滚动出去的距离 scrollTop/scrollLeft
- 注意：页面的滚动距离：window.pageXOffset

### 事件
### mouseover和mouseenter
- mouseover有冒泡机制，给父盒子绑定，经过子盒子时候也会触发
- mouseenter没有冒泡机制，只会自己触发，经过子不会触发