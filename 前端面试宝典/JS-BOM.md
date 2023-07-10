# JavaScript BOM (Browser Object Model)

JavaScript BOM（浏览器对象模型）是一组用于与浏览器窗口进行交互的 JavaScript API。它提供了访问和操作浏览器窗口及其各个组件的能力。以下是 BOM 的重要知识点：

### 概述
- 全局变量会变成`window`对象的属性、全局方法会变成window的方法
- 调用的时候可以省略`window`

### 和DOM的关系
- `window.document` 获取当前窗口中的文档对象。
- 
### 全局对象 window
- `window` 对象是 JavaScript 的全局对象，表示浏览器窗口。
- `window.innerWidth` 和 `window.innerHeight` 获取浏览器窗口的内部宽度和高度。
- `window.location` 获取和操作当前页面的 URL 信息。
- `window.document` 获取当前窗口中的文档对象。

### Window 事件
- `window.onload` 当页面（文档、图像、脚本文件、CSS文件）加载完成时触发，用于执行初始化操作。
  - `document`的`DOMContentLoaded`事件，是DOM加载完毕，不包含其他。
- `window.onresize` 当窗口大小发生改变时触发，常配合`window.innerWidth`用于响应页面布局变化。
- `window.onunload` 当页面被关闭或离开时触发，用于执行清理操作。

### URL 操作
- `window.location.href` **获取**或**设置**当前页面的 URL（地址栏中显示的全部）。
  - `location.host` 返回主机(域名)。
  - `location.port`
  - `location.pathname`
  - `location.search` 返回参数 ?及后面的东西
  - `location.hash` 返回#及后面的内容
- `window.location.reload()` 刷新，重新加载当前页面。
- `window.location.assign(url)` 跳转到指定的 URL，记录历史，可以后退。
- `window.location.replace(url)` 替换当前页面为指定的 URL，不可以后退。

### 弹窗和对话框
- `window.alert(message)` 弹出一个警告框，显示指定的消息。
- `window.prompt(message, default)` 弹出一个对话框，提示用户输入内容。
- `window.confirm(message)` 弹出一个确认对话框，询问用户是否确定。

### 定时器
- `window.setTimeout(callback, delay)` 在指定的延迟后执行一次回调函数。
  - `clearTimeout(timerID)` 停止定时器
- `window.setInterval(callback, interval)` 每隔一定时间执行一次回调函数，形成循环。

### 屏幕信息
- `window.screen.width` 和 `window.screen.height` 获取屏幕的宽度和高度。
- `window.screen.availWidth` 和 `window.screen.availHeight` 获取可用的屏幕宽度和高度。


### 历史记录
- `window.history.length` 获取历史记录中的页面数量。
- `window.history.back()` 返回到上一个历史页面。
- `window.history.forward()` 前进到下一个历史页面。
- `window.history.go(-1)` 前进或后退几步

### 弹出窗口和标签页
- `window.open(url, target, features)` 打开一个新的浏览器窗口或标签页。

### 客户端信息
- `window.navigator.userAgent` 获取客户端浏览器的用户代理字符串。
- `window.navigator.language` 获取客户端浏览器的首选语言。

### 客户端存储
- `window.localStorage` 提供了访问本地存储的 API，用于存储和读取数据。
- `window.sessionStorage` 提供了访问会话存储的 API，存储的数据在会话结束后被清除。


