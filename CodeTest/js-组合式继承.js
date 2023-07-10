// 父类构造函数
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

// 父类原型上添加方法
SuperType.prototype.sayName = function() {
    console.log(this.name);
}


// 子类构造函数
function SubType(name, age) {
    // 调用父类构造函数，继承属性
    SuperType.call(this, name);
    this.age = age;
}

// 修改子类原型对象，继承方法
SubType.prototype = new SuperType();

// 子类自己的方法
SubType.prototype.sayAge = function() {
    console.log(this.age);
}

let instance1 = new SubType('zss', 26);
instance1.colors.push('yellow');
console.log(instance1.colors); // [ 'red', 'blue', 'green', 'yellow' ]
instance1.sayName();
instance1.sayAge();

let instance2 = new SubType('whh', 26);
console.log(instance2.colors); // [ 'red', 'blue', 'green' ]
instance2.sayName();
instance2.sayAge();