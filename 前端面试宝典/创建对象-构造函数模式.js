function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name);
    }
}

let person1 = new Person('张莎莎', 18, '学生');
let person2 = new Person('张天狗', 28, '前端开发');

person1.sayName();
