const myInstanceof = function(test, Ctor) {
    // 基本数据类型都返回false
    if (typeof left !== 'object' || left === null) return false;

    // 获取原型对象
    let proto = Object.getPrototypeOf(test);

    // 逐层查找
    while(true) {
        if (proto === null) return false;
        if (proto === Ctor.prototype) return true;
        // 向上层寻找，注意是test的原型向上找
        proto = Object.getPrototypeOf(proto)

    }
}