const arr = [1, [2, [3, [4, 5]]], 6];
// => [1, 2, 3, 4, 5, 6]

// 方法1: 参数表示展开深度,infinity表示无穷大
const flattenedArray = arr.flat(Infinity);

// 正则表达式方法（不足版）
// const flattenedArray2 = JSON.stringify(arr).replace(/\[|\]/g, '').split(',');
// [ '1', '2', '3', '4', '5', '6' ]

// 正则表达式方法
const arrStr = JSON.stringify(arr).replace(/\[|\]/g, '');
// "1, 2, 3, 4, 5, 6 "
const jsonStr = '[' + arrStr + ']';
// "[1, 2, 3, 4, 5, 6 ]"
const flattenedArray3 = JSON.parse(jsonStr);
// => [1, 2, 3, 4, 5, 6]


// 用reduce和concat
// 递归
// reduce的初始值是[]
function flattenArrayReduce(arr) {
  return arr.reduce((result, item) => result.concat(Array.isArray(item) ? flattenArrayReduce(item) : item), []);
}
const flattenedArray4 = flattenArrayReduce(arr);

// 递归: 参考答案版
function flattenArrayRecursive(arr) {
    let res = [];
    for (item of arr) {
        Array.isArray(item) ? res = res.concat(flattenArrayRecursive(item)) : res.push(item);
    }
    return res;
}
const flattenedArray5 = flattenArrayRecursive(arr);
console.log(flattenedArray5); 

// 递归: 自己写得闭包版
function flattenArrayRecursive(arr) {
    const res = [];
    function func(arr) {
        for (item of arr) {
            Array.isArray(item) ? func(item) : res.push(item);
        }
    }

    func(arr);
    return res;
}
const flattenedArray6 = flattenArrayRecursive(arr);
console.log(flattenedArray6); 

// 递归总结：
// 模式1：递归函数带返回值，可以收集递归后的结果（推荐）
// 模式2：递归函数不带返回值，直接在一个公共res上操作，这可能用到闭包，res为外层函数值