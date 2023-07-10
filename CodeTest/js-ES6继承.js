class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
      console.log('调用了父类构造函数');
    }

    sayHello() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
  }

  class Student extends Person {
    constructor(name, age, grade) {
      super(name, age); // 调用父类的构造函数
      this.grade = grade;
    }

    study() {
      console.log(`${this.name} is studying in grade ${this.grade}.`);
    }
  }
  // 创建 Person 类的实例
  const person = new Person('John', 30);
  person.sayHello(); // 输出：Hello, my name is John and I am 30 years old.
  
  // 创建 Student 类的实例
  const student = new Student('John', 16, 10);
  student.sayHello(); // 输出：Hello, my name is John and I am 16 years old.
  student.study();   // 输出：John is studying in grade 10.