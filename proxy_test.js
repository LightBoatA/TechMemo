// 目标对象
const target = {
    id: 'target'
}

// 处理程序对象
const handler = {
    // 定义一个get捕获器，对于所有属性都适用
    // get () {
    //     return 'handler override';
    // }

    // 有参数的get:目标对象、属性、代理对象
    // get (trapTarget, property, receiver) {
    //     console.log(trapTarget);
    //     console.log(property);
    //     console.log(receiver);
    //     // 正常返回
    //     return trapTarget[property]
    // }
    // 适用反射API重建原始行为
    // get () {
    //     return Reflect.get(...arguments);
    // }

    // 使用反射，更简单写法：
    get: Reflect.get,
}

const proxy = new Proxy(target, handler);

console.log(target.id === proxy.id) // true
console.log(target === proxy) // false

// 关于get
console.log(target.id); // target
console.log(proxy.id); // handler override