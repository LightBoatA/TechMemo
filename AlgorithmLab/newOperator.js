function newOerator(Ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new TypeError('Type Error');
    }

    // 以Ctor的prototype为原型，创建对象
    const obj = Object.create(Ctor.prototype);
    // 执行构造函数，指定构造函数中的this为新对象
    const res = Ctor.apply(obj, args);

    const isObjcet = typeof res === 'object' && res !== null;
    const isFunction = typeof res === 'function';

    return isObjcet || isFunction ? res : obj;
}