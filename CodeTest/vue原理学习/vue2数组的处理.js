// 创建新的数组原型对象，继承自 Array.prototype
let newArrayProto = Object.create(Array.prototype);

// 保存原始的数组原型对象
let oldArrayProto = Array.prototype;

// 遍历需要拦截的数组方法，并在新的数组原型对象上进行定义
['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'].forEach(method => {
    newArrayProto[method] = function(...args) {
        // 监测变化
        console.log('调用了数组的' + method + '方法');
        // 执行正常逻辑，调用原始的数组方法
        oldArrayProto[method].apply(this, args);
    }
})

// 创建一个数组对象
let arr = [1, 2, 3, 4, 5];

// 将 arr 的原型设置为 newArrayProto，以便使用拦截的数组方法
Object.setPrototypeOf(arr, newArrayProto);

// 调用 push 方法，触发拦截逻辑，并输出信息
arr.push(666);

// 打印数组对象
console.log(arr);
