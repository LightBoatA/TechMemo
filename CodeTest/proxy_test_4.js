// 将被代理的类绑定到一个全局实例集合
const userList = [];

class User {
    constructor(name) {
        this.name_ = name;
    }

}

const proxy = new Proxy(User, {
    construct() {
        const newUser = Reflect.construct(...arguments);
        // 每次创建对象，都把它添加到集合中
        userList.push(newUser);
        return newUser;
    }
})

new proxy('王大兽')
new proxy('杨建党')
new proxy('猪大刚')

console.log(userList)