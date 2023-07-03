// 创建对象、赋予其属性和方法、返回对象
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this);
        console.log(this.name);
    }
    return o;
}

let person1 = createPerson('张莎莎', 18, '学生');
let person2 = createPerson('张天狗', 28, '前端开发');

person1.sayName();
