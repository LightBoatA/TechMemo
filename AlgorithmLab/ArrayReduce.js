const arr = [1,2,3,4,5,6,7,8,9];

// 复杂实现
Array.prototype.reduce = function(callback, initialVal) {
    // this就是调用此方法的数组
    if (this === undefined) {
        throw new TypeError('this is null or not undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }
    // const res = [];
    let sum = initialVal;

    // 将this强制转换为对象
    const o = Object(this);
     // >>>0 保证len为number，且为正整数
    const len = o.length >>> 0;
    for (let i = 0; i < len; i++) {
        // 检查i是否在O的属性（会检查原型链）
        if (i in o) {
            sum = callback(sum, o[i], i, o);
        }
    }
    return sum;
}
console.log(arr.reduce(function(sum, val) {
    return sum + val;
}, 0));