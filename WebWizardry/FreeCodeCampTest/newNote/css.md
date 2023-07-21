## `<meta name="viewport" content="width=divice-width, initial-scale=1.0"/>`解释：
  - 这句代码是用于设置网页在移动设备上的视口（viewport）的元信息。具体含义如下：

  - `<meta>`：HTML中的元信息标签，用于提供文档的元数据。
  - `name="viewport"`：指定元信息的名称为"viewport"，表示这是用于视口设置的元信息。
  - `content="width=device-width, initial-scale=1.0"`：设置视口的内容，包含两个属性：
    - `width=device-width`：表示视口的宽度与设备的宽度相等，即网页的宽度会根据设备的宽度来自动调整，适应不同设备的屏幕尺寸。
    - `initial-scale=1.0`：表示初始缩放比例为1.0，即网页的初始显示比例为正常大小，不进行缩放。

  通过这个 `<meta>` 标签的设置，可以确保网页在移动设备上有良好的显示效果，使得网页内容在不同设备上都能自动适应屏幕大小，并且保持初始显示比例，避免出现显示不完整或过大过小的问题。这对于移动设备的用户体验非常重要。
## hr元素也可以设置样式
```css
hr {
  height: 3px;
  background-color: brown;
  border-color: brown;
}
```


```css

```