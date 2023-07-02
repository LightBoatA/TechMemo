// 利用代理对函数参数验证
const sum = function(a, b) {
    return a + b;
}

const handler = {
    apply(target, thisArg, argumentsList) {
        for (arg of argumentsList) {
            if (typeof arg !== 'number')
                throw '参数必须是数值类型'
        }

        // 不要忘记重建原始行为
        return Reflect.apply(...arguments)
    }
}

const proxy = new Proxy(sum, handler);

console.log(sum(7,'我')); // 7我
console.log(proxy(7,'我')); // 抛出错误
console.log(proxy(7,8)); // 15
