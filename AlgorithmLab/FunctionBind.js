Function.prototype.bind = function(context, ...args) {
    if (typeof this !== 'function') {
      throw new Error("Type Error");
    }

    // 把当前函数保存起来
    const originFunc = this;

    return function Func() {
        //当一个函数通过 new 关键字来调用时，会创建一个新的对象，并将该对象绑定到函数的 this 上。
        //此时，函数内部的 this 就指向这个新创建的对象。
        // 因此，这个判断可以用来确定当前函数 F 是否被用作构造函数调用。
        if (this instanceof Func) {
            return new originFunc(...args, ...arguments);
        }

        return originFunc.apply(context, [...args,...arguments]);
    }
}

// 关于为什么传入[...args,...arguments]两个参数
function add(a, b, c) {
    return a + b + c;
  }
  
const boundAdd = add.bind(null, 1, 2);

console.log(boundAdd(3)); // 输出：6
  