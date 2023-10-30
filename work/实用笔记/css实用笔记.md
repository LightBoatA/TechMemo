在 CSS 中，您可以使用 `background` 属性来设置背景图片的排列和显示方式。下面是一些常见的背景图片排列和显示方式：

1. `background-repeat` 属性：设置背景图像的重复方式。
   - `repeat`：默认值，背景图像将在纵向和横向上平铺。
   - `repeat-x`：背景图像将在横向上平铺，但不在纵向上平铺。
   - `repeat-y`：背景图像将在纵向上平铺，但不在横向上平铺。
   - `no-repeat`：背景图像将不平铺，仅显示一次。

2. `background-position` 属性：设置背景图像的起始位置。
   - `top left`、`top center`、`top right`、`center left`、`center center`、`center right`、`bottom left`、`bottom center`、`bottom right` 或者使用像素值或百分比值来指定位置。

3. `background-size` 属性：设置背景图像的大小。
   - `auto`：默认值，背景图像保持其原始大小。
   - `cover`：背景图像被缩放以覆盖整个背景区域，可能会被裁剪。
   - `contain`：背景图像被缩放以在背景区域内适应，并且图像完全可见。

下面是一个例子：

```css
.element {
  background-image: url('example.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
```

