function reactive(target) {
    return new Proxy(target, handler);
}

let handler = {
    get(target, key) {
        let val = target[key];
        if (typeof val === 'object') {
            return new Proxy(val, handler);
        }
        console.log('正在对'+target+'的'+key+'属性取值，值为'+val);
        return val;
    },
    set(target,key,value) {
        target[key] = value;
        console.log('为'+target+'的'+key+'属性设置值，值为'+value);
        if (Array.isArray(target) && key === 'length') {
            // 处理数组的 length 属性
            return true;
        }
        
        return true;
    }
}

let obj = {
    name: 'zss',
    age: 26,
    info: {
        hobby: 'sing',
        n: [1,2,3,4],
    },
    likes: ['eat', 'look','learn']
}
const proxy = reactive(obj);

proxy.name = 'zm';
proxy.age = 27;
proxy.info.hobby = 'watch';
// proxy.info.n.push(666);
proxy.likes.push('laugh');
