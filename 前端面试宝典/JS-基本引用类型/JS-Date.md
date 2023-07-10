
# JavaScript Date类型常用用法

## 创建Date对象

可以使用`new Date()`构造函数来创建一个`Date`对象。如果不传递参数，则会创建一个表示当前日期和时间的`Date`对象。

```javascript
const currentDate = new Date();
console.log(currentDate);
```

可以通过传递参数来指定日期和时间的具体值。参数可以是一个日期字符串、时间戳或年、月、日等组成的具体数值。

```javascript
// 使用日期字符串
const date1 = new Date("2023-01-01");
console.log(date1);

// 使用时间戳
const timestamp = 1626259200000;
const date2 = new Date(timestamp);
console.log(date2);

// 使用具体数值
const date3 = new Date(2023, 0, 1, 12, 0, 0); // 年、月、日、时、分、秒
console.log(date3);
```

## 获取日期和时间信息

可以使用`Date`对象的方法和属性来获取日期和时间的各种信息。

```javascript
const date = new Date();

// 获取年份
const year = date.getFullYear();
console.log(year);

// 获取月份（注意月份从0开始，0表示一月）
const month = date.getMonth();
console.log(month);

// 获取日期
const day = date.getDate();
console.log(day);

// 获取星期几（0表示星期日，1表示星期一，以此类推）
const weekday = date.getDay();
console.log(weekday);

// 获取小时
const hours = date.getHours();
console.log(hours);

// 获取分钟
const minutes = date.getMinutes();
console.log(minutes);

// 获取秒数
const seconds = date.getSeconds();
console.log(seconds);

// 获取毫秒数
const milliseconds = date.getMilliseconds();
console.log(milliseconds);
```

## 格式化日期和时间

可以使用`Date`对象的方法和一些特定的格式化函数来格式化日期和时间。`toLocaleString`有浏览器兼容问题，每个浏览器显示的格式可能不同

```javascript
const date = new Date();

// 格式化为本地字符串
const localString = date.toLocaleString();
console.log(localString);

// 格式化为本地日期字符串
const localDateString = date.toLocaleDateString();
console.log(localDateString);

// 格式化为本地时间字符串
const localTimeString = date.toLocaleTimeString();
console.log(localTimeString);

// 格式化为ISO字符串
const isoString = date.toISOString();
console.log(isoString);

// 自定义格式化
const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
console.log(formattedDate);
```

## 比较日期和时间

可以使用`Date`对象的方法来比较日期和时间的先后顺序。

```javascript
const date1 = new Date("2023-01-01");
const date2 = new Date("2023-02-01");

// 比较日期先后顺序
if (date1 < date2) {
  console.log("date1 在 date2 之前");
} else if (date1 > date2) {
  console.log("date1 在 date2 之后");
} else {
  console.log("date1 和 date2 相同");
}
```

## 修改日期和时间

可以使用`Date`对象的方法来修改日期和时间的值。

```javascript
const date = new Date();

// 设置年份
date.setFullYear(2022);

// 设置月份
date.setMonth(5); // 5 表示六月

// 设置日期
date.setDate(15);

// 设置小时
date.setHours(10);

// 设置分钟
date.setMinutes(30);

// 设置秒数
date.setSeconds(45);

console.log(date);
```
### 时间戳

在JavaScript中，时间戳（Timestamp）是指表示某个特定时间点的数值，通常是相对于某个参考时间的毫秒数。

#### `Date.getTime()`

`Date`对象的`getTime()`方法用于获取该日期对象的UTC时间戳（从1970年1月1日0时0分0秒开始计算的毫秒数）。

示例：
```javascript
const now = new Date();
const timestamp = now.getTime();
console.log(timestamp); // 输出当前的UTC时间戳
```

#### `Date.now()`

`Date.now()`是一个静态方法，用于获取当前的UTC时间戳，相当于调用`new Date().getTime()`。

示例：
```javascript
const timestamp = Date.now();
console.log(timestamp); // 输出当前的UTC时间戳
```

#### 时间戳的应用

- 时间戳可以用于记录事件发生的顺序，比较事件的先后顺序。
- 时间戳可以用于计算时间差，例如计算两个时间点之间的时间间隔。
- 时间戳可以用于缓存数据，根据时间戳判断数据是否过期。
- 时间戳可以用于生成唯一的标识符，结合其他信息生成具有唯一性的字符串。

#### 其他时间戳的相关内容

- `Date.parse()`：用于解析一个表示日期的字符串，并返回对应的UTC时间戳。
- `Date.UTC()`：用于根据指定的UTC日期和时间参数返回对应的UTC时间戳。
- `new Date(timestamp)`：通过给定的UTC时间戳创建一个`Date`对象。

请注意，时间戳通常是基于UTC时间的，但也可以根据需要进行时区转换。在处理时间戳时，建议使用UTC时间进行计算和比较，以避免时区引起的问题。

### UTC时间
UTC（Coordinated Universal Time）是一种标准的时间标识系统，用于标识世界各地的时间，它基于原子钟的时间测量。UTC时间是一种基于国际原子时的时间标准，不受时区影响，全球范围内统一。

与UTC时间相关的概念包括：

1. UTC时间戳：表示从1970年1月1日0时0分0秒（UTC时间）起经过的秒数。在编程中常用的`Date`对象的`getTime()`方法返回的就是UTC时间戳。
2. UTC字符串：表示具体的日期和时间，格式为`YYYY-MM-DDTHH:mm:ss.sssZ`。例如，`2023-07-01T12:30:00.000Z`表示UTC时间的2023年7月1日12时30分0秒。
3. UTC偏移：表示相对于UTC时间的时区偏移量。例如，东八区（北京时间）的UTC偏移为+08:00，西五区（纽约时间）的UTC偏移为-05:00。

UTC时间是一种全球通用的标准时间，常用于跨时区的时间比较和数据存储。在开发中，通常使用UTC时间进行时间戳的处理和服务器与客户端之间的时间