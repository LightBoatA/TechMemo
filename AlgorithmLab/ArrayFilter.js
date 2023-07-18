// filter简单实现

function myFilter(arr, callback) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            res.push(arr[i]);
        }
    }
    return res;
}

const arr = [1,2,3,4,5,6,7,8,9];
console.log(myFilter(arr, item => item < 6));

// 复杂实现
Array.prototype.filter = function(callback, thisArg) {
    // this就是调用此方法的数组
    if (this === undefined) {
        throw new TypeError('this is null or not undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }
    const res = [];

    // 将this强制转换为对象
    const o = Object(this);
     // >>>0 保证len为number，且为正整数
    const len = o.length >>> 0;
    for (let i = 0; i < len; i++) {
        // 检查i是否在O的属性（会检查原型链）
        if (i in o) {
            if (callback.call(thisArg,o[i],i,o)) {
                res.push(o[i]);
            }
        }
    }
    return res;
}
console.log(arr.filter(function(item) {
    console.log(this);
    return item > 5;
}, arr));