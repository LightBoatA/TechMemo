## Flex 布局

### 什么是 Flex 布局？

Flex 布局是 CSS3 中引入的一种新的布局方式，用于实现页面元素的弹性布局。它可以使元素在容器内灵活地调整位置、尺寸和顺序，适应不同的屏幕大小和设备。

### Flex 容器和项目

在使用 Flex 布局时，需要将元素的父容器设置为 Flex 容器，通过设置容器的 `display` 属性为 `flex` 或 `inline-flex` 来实现。Flex 容器中的每个子元素称为 Flex 项目。

### 主轴和交叉轴

Flex 布局将容器分为主轴和交叉轴两个方向。主轴是 Flex 项目排列的方向，可以是水平方向（默认）或垂直方向。交叉轴是与主轴垂直的方向。

### 容器属性

以下是常用的 Flex 容器属性：

- `flex-direction`: 定义 Flex 项目的排列方向（主轴方向），可以是：
  - `row`（水平方向，默认）
  - `row-reverse`（水平方向反向）
  - `column`（垂直方向）
  - `column-reverse`（垂直方向反向）

- `flex-wrap`: 定义 Flex 项目是否换行，默认是 `nowrap`（不换行），可以设置为：
  - `wrap`（换行）
  - `wrap-reverse`（反向换行）

- `justify-content`: 定义 Flex 项目在主轴上的对齐方式，可以是：
  - `flex-start`（起点对齐，默认）
  - `flex-end`（终点对齐）
  - `center`（居中对齐）
  - `space-between`（两端贴边，项目之间平均分布）
  - `space-around`（项目两侧间隔相等，项目之间间隔为项目宽度的一半）
  - `space-evenly`（项目之间间隔相等）

- `align-items`: 定义 Flex 项目在交叉轴上的对齐方式，可以是：
  - `flex-start`（起点对齐）
  - `flex-end`（终点对齐）
  - `center`（居中对齐，默认）
  - `baseline`（基线对齐，项目的第一行文字基线对齐）
  - `stretch`（拉伸对齐，如果项目没有设置高度，则拉伸填满整个交叉轴）

- `align-content`: 定义多行 Flex 项目在交叉轴上的对齐方式，当容器内有多行项目时生效，可以是：
  - `flex-start`（起点对齐）
  - `flex-end`（终点对齐）
  - `center`（居中对齐）
  - `space-between`（两端对齐，项目之间平均分布）
  - `space-around`（项目两侧间隔相等，项目之间间隔为项目高度的一半）
  - `stretch`（拉伸对齐，如果项目没有设置高度，则拉伸填满整个交叉轴）

### 简写
- `flex-flow`是`flex-direction`和 `flex-wrap`的简写属性


### 项目属性

以下是常用的 Flex 项目属性：

- `flex-grow`: 定义 Flex 项目的放大比例，默认为 0，即不放大。如果所有项目的 `flex-grow` 都为 1，则它们将等分剩余空间。

- `flex-shrink`: 定义 Flex 项目的缩小比例，默认为 1，即允许缩小。如果某个项目的 `flex-shrink` 为 0，则它不会缩小。

- `flex-basis`: 定义 Flex 项目在主轴上的初始尺寸，默认为 `auto`，即项目的原始尺寸。可以设置为具体的长度值，例如 `100px`。

- `flex`: 是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的缩写，可以通过

一个属性同时设置这三个值。例如 `flex: 1 0 200px;` 表示项目的放大比例为 1，缩小比例为 0，初始尺寸为 200px。

- `align-self`: 定义单个 Flex 项目在交叉轴上的对齐方式，可以覆盖容器的 `align-items` 属性。

### 示例代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flex 布局示例</title>
  <style>
    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 200px;
    }

    .item {
      flex: 1;
      text-align: center;
      padding: 10px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="item">项目 1</div>
    <div class="item">项目 2</div>
    <div class="item">项目 3</div>
  </div>
</body>
</html>
```

在这个示例中，我们创建了一个 Flex 容器，其中包含三个 Flex 项目。容器设置了水平主轴方向，并使用 `justify-content: center` 和 `align-items: center` 将项目在容器内水平垂直居中显示。每个项目都设置了 `flex: 1`，使它们等分容器的剩余空间。项目还设置了一些基本样式，例如文本居中和边框。
