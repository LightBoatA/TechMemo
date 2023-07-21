

// 先来理解这段代码：
function greet() {
    console.log(`Hello, ${this.name}!`);
  }
  
  // Create an object
  const person = {
    name: 'John',
  };
  
 // Assign the "greet" function to the "sayHello" property of the "person" object
  person.sayHello = greet;
  
  // 重要的一步：当我们通过对象.属性调用函数时，this指向当前对象
  person['sayHello']();
  

// 根据这个原理，我们完成apply的代码设计
// Function.prototype.call = function(context = window, ...args) {
Function.prototype.apply = function(context = window, args = []) {
    if (typeof this !== 'function') {
        throw new TypeError('Type Error');
    }

    // 把此函数变成目标对象的一个属性
    const fn = Symbol('fn'); // 防止和对象中其他属性重名
    // this就是这个函数
    context[fn] = this;

    // 通过对象.属性或对象[属性]的方式来调用函数
    const res = context[fn](...args);

    delete context[fn];

    return res;
}



greet.apply(person)