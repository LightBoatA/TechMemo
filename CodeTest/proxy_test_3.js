// 代理实现类实例化时必须传参
class User {
    constructor(name) {
        this.name_ = name;
    }
}

const handler = {
    construct(target, argumentsList, newTarget) {
        console.log(target);
        console.log(argumentsList);
        console.log(newTarget);
        if (argumentsList[0] === undefined) {
            throw '请传入参数么么哒'
        } else {
            // 注意这里的传入参数，千万别写成...argumentsList
            return Reflect.construct(...arguments);
        }
    }
}

const proxy = new Proxy(User,handler)

console.log(new User());
console.log(new User('zss'));
console.log(new proxy('zss'));
console.log(new proxy());