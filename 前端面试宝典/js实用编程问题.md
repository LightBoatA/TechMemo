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



  ```javascript
    
  ```