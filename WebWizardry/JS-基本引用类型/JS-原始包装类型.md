# 原始包装类型
```js
let s1 = 'abcdefg';
let s2 = s1.substring(2);
```
- 在这个例子里：原始值本身不是对象，它逻辑上不应该有方法。实际上，每当用到某个原始值的方法或属性时，**后台**都会**创建**一个相应的**原始包装类型**的对象。
- 原始包装类型：`Boolean`、`String`、`Number`
- `new Object()`能根据相应的值，返回相应的包装类型