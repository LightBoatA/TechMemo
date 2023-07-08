function parent(a) {
    return function() {
        console.log(a++);
    }
}
// 执行一次父函数
const son = parent(1);

// 执行n次子函数的时候，父函数作用域中的变量一直存在
son();
son();
son();
son();
son();
// 输出1,2,3,4,5