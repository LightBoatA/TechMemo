- \<img>单标签称为自闭合标签，其中的alt属性有两个作用
  - 代替文本
  - 让屏幕阅读器可以知晓图片的内容，这会对网页的可访问性有很大提升
- \<p>标签在新窗口中打开的属性`target="_blank"`
- \<figure> 标签用于表示一组媒体内容，通常包括图像、插图、照片、代码示例等，以及它们的标题。这个标签可以让开发者更好地结构化和语义化媒体内容的组合，并且方便屏幕阅读器等辅助技术正确解读和呈现。
    ```html
    <figure>
    <img src="example.jpg" alt="Example Image">
    <figcaption>This is an example image.</figcaption>
    </figure>

    ```
- \<em>love</em>斜体
- \<form>表单的`action`属性表示提交的目标链接
- 占位符：`placeholder`
- `<button type="submit">Submit</button>`
- 为了使选择一个单选按钮自动取消选择另一个，两个按钮必须有具有相同值的 name 属性。
- `fieldset` 元素用于在 Web 表单中将相关的输入和标签组合在一起。是块级元素
- `legend` 元素充当 `fieldset` 元素中内容的标题。 它为用户提供了有关他们应该在表单的该部分中输入什么的上下文。它会把这部分输入内容框起来。