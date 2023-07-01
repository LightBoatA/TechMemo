- 数组合并去重、数组去重，用set
  ```javascript
  // 数组合并
  let newArr = Array.from(new Set([...arr1, ...arr2]))
  // 数组去重
  let newArr = Array.from(new Set(arr))
  ```
- 对象搜索：写一个 函数，遍历一个对象数组（第一个参数）并返 回一个包含相匹配的属性-值对（第二个参数）的所有对象的数组。<br/>
    例如，如果第一个参数是 

    `[{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }]`

    第二个参数是​ `{ last: "Capulet" }`​，那么你必须从数组（第一个参数）返回其中的第三个对象，因为它包含了作为第二个参数传递的属性-值对<br/>
    提示：
    - 遍历对象用`for...in `
    - 查询属性，用`hasOwnProperty`  
    <br/>

    ```javascript
    function where(collection, source) {
        return collection.filter(obj => {
            for ( let key in source) {
                if (!obj.hasOwnProperty(key) || obj[key] !== source[key]) return false;
            }
            return true;
        });
    }

    where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
    ```
- 判断单词是否是大写字母开头
  ```javascript
    /[A-Z]/.test(before[0]);
  ```
- 字符替换
  ```javascript
    str.replace(before, after);
  ```
- 正则匹配
  ```javascript
    const mat = str.match(正则);
    mat[0]才是被匹配到的内容
  ```
- 正则表达式
  - 方括号里的^是取反，外面的^是以...开头
- 一般表示键值对的对应关系：用对象就可以了
- 字符串和数组的转换
  ```javascript
    const arr = str.split('');
    const str = arr.join('');
  ```
- 在所有大写字母前加一个空格
   `str.replace(/([A-Z])/g, ' $1')` $1表示匹配到的字符，注意，加了括号才有捕获组，否则只是普通的匹配
- 
- 判断一个值是否为基本bool值？只有true和false符合条件
  ```javascript
    typeof x === 'boolean';
  ```
- 求一组数的最小公倍数：
  - 两个数的最小公倍数是能够同时被这两个数整除的最小的正整数。最小公倍数可以通过以下公式计算：

  `LCM(a, b) = (a * b) / GCD(a, b)`

  其中，`GCD(a, b)` 表示 a 和 b 的最大公约数。

  ```javascript
  // arr中的形式为[1,5]或[8,2]表示范围，未排序
    function smallestCommons(arr) {
      // 两个数的最大公约数：辗转相除法
      function gcd(a, b) {
        while (b !== 0) {
          var temp = b;
          b = a % b;
          a = temp;
        }
        return a;
      }
      arr.sort();
      let res = arr[0];
      for (let i = arr[0] + 1; i <= arr[1]; i++) {
        // 直接套用公式
          res = (res * i)/gcd(res, i);
      }
  return res;
  }
  ```

- 自己实现数组的find方法：
  - 编写函数，查找数组（第一个参数）并返回数组中第一个通过某种方法（第二个参数）验证的元素。
  ```javascript
    function find(arr, func) {
      for (val of arr) {
          if (func(val)) return val;
      }
      return undefined;
    }

    find([1, 2, 3, 4], function(num){ return num % 2 === 0; });
  ```
- 判断一项内容是否为数组：
  ```javascript
    Array.isArray(x);
  ```
- 把一个二进制字符串"01000001"转换成字符
  ```javascript
    String.fromCharCode(parseInt("01000001", 2));
  ```
- 注意这两种方法的调用方式：一个用实例调用，一个是静态方法：
  ```javascript
    String.prototype.charCodeAt()
    String.fromCharCode()
    // charCodeAt()用法
    const str = 'AB';
    const a = str.charCodeAt(1); // 传入索引，不传就是索引为0
    console.log(a);
    // 输出66
  ```
- 数字转换为二进制字符输出
  ```javascript
    let number = 10;
    let binary = number.toString(2);

    console.log(binary); // 输出 "1010"
  ```
- 匹配电话号码
  这个正则表达式用于匹配符合美国电话号码格式的字符串。让我们逐个解析它的不同部分：

1. `1?`：这个部分表示可选项，匹配前面的数字 `1`，即电话号码可能以 `1` 开头，也可能没有。

2. `\s?`：这个部分表示可选的空格字符，匹配零个或一个空格。

3. `\d{3}`：这个部分表示匹配三个数字，即电话号码的区号。

4. `[\s-]?`：这个部分表示可选的空格或短横线字符，用于分隔区号和电话号码的前三个数字。

5. `\d{3}`：这个部分表示匹配三个数字，即电话号码的前三个数字。

6. `[\s-]?`：这个部分表示可选的空格或短横线字符，用于分隔前三个数字和后四个数字。

7. `\d{4}`：这个部分表示匹配四个数字，即电话号码的后四个数字。

8. `|`：这个符号表示逻辑上的或，用于将两种匹配模式连接起来。

9. `1?`：这个部分表示可选项，匹配前面的数字 `1`，即电话号码可能以 `1` 开头，也可能没有。

10. `\s?`：这个部分表示可选的空格字符，匹配零个或一个空格。

11. `\(`：这个部分表示匹配左括号 `(`。

12. `\d{3}`：这个部分表示匹配三个数字，即电话号码的区号。

13. `\)`：这个部分表示匹配右括号 `)`。

14. `[\s-]?`：这个部分表示可选的空格或短横线字符，用于分隔区号和电话号码的前三个数字。

15. `\d{3}`：这个部分表示匹配三个数字，即电话号码的前三个数字。

16. `[\s-]?`：这个部分表示可选的空格或短横线字符，用于分隔前三个数字和后四个数字。

17. `\d{4}`：这个部分表示匹配四个数字，即电话号码的后四个数字。

综合起来，这个正则表达式能够匹配多种形式的美国电话号码，包括以下几种情况：

- 格式为 `XXX-XXX-XXXX` 或 `XXX XXX XXXX` 的电话号码。
- 格式为 `(XXX) XXX-XXXX` 的电话号码。
- 格式为 `1-XXX-XXX-XXXX`、`1 XXX-XXX-XXXX`、`1XXX-XXX-XXXX` 或 `1XXX XXX XXXX` 的电话号码。

  ```javascript
    function telephoneCheck(str) {
      // 正则表达式
      const telRegExp = /1?\s?\d{3}[-\s]?\d{3}[-\s]?\d{4}|1?\s?\(\d{3}\)[-\s]?\d{3}[-\s]?\d{4}/;
      const arr = str.match(telRegExp);

      return arr!== null && arr[0].length === str.length;
      }
  ```
调用 `match()` 方法后，返回的是一个数组，其中包含了匹配到的结果。

假设我们有以下代码：
```javascript
var str = "Hello, 123-456-7890 is my phone number.";
var result = str.match(/\d{3}-\d{3}-\d{4}/);
console.log(result);
```

输出结果：
```
[ '123-456-7890', index: 7, input: 'Hello, 123-456-7890 is my phone number.', groups: undefined ]
```

在这个例子中，我们使用正则表达式 `/\d{3}-\d{3}-\d{4}/` 来匹配字符串中的电话号码。调用 `match()` 方法后，返回的结果是一个数组 `[ '123-456-7890', index: 7, input: 'Hello, 123-456-7890 is my phone number.', groups: undefined ]`。

这个数组中的第一个元素是匹配到的字符串 `'123-456-7890'`，它是满足正则表达式的电话号码。

除了匹配到的字符串之外，返回的数组还包含其他的属性：
- `index`：表示匹配到的字符串在原始输入字符串中的起始索引位置。
- `input`：表示原始的输入字符串。
- `groups`：表示捕获组的匹配结果，这里未使用捕获组，所以为 `undefined`。

需要注意的是，如果没有匹配到任何结果，`match()` 方法会返回 `null`。在使用返回的数组时，应该先进行判断是否为 `null`，以避免出现错误。

- 对等差分数组：
  题目描述：
  > 创建一个函数，接受两个或多个数组，返回所给数组的 对等差分(symmetric difference) (△ or ⊕)数组.<br/>而数学术语 "对等差分" 的集合就是指由所有只在两个集合其中之一的元素组成的集合(A △ B = C = {1, 4}). <br/>对于传入的额外集合 (如 D = {2, 3}), 你应该安装前面原则求前两个集合的结果与新集合的对等差分集合 (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).

 ```javascript
    function sym(...args) {
    const arr = []; // 用于存储函数参数
    
    // 将函数参数转换为数组
    for (arrEle of arguments) {
        arr.push(arrEle);
    }
    
    
    const resArr = arr.reduce((accArr, curArr) => {
        const tempArr = []; // 临时存放结果
        
        // 循环A数组，把不在B数组里的元素存入结果数组
        for (num of accArr) {
            if (curArr.indexOf(num) < 0) tempArr.push(num);
        }
        
        // 循环B数组，把不在A数组里的元素存入结果数组
        for (num of curArr) {
            if (accArr.indexOf(num) < 0) tempArr.push(num);
        }
        
        // 把当前临时结果数组返回
        return tempArr;
    }, []);
    
    // 结果数组去重并返回
    return Array.from(new Set(resArr));
}

sym([1, 2, 3], [5, 2, 1, 4]);
  ```


  ```javascript
    
  ```