let p = new Promise(() => {});
setTimeout(console.log,0,p);
// 结果 Promise { <pending> }

// 定时退出
let p1 = new Promise((resolve, reject) => {
    setTimeout(reject, 2000);
})
// 要添加reject的处理，否则报错
p1.catch((error) => {
    // console.error('Promise rejected:', error);
});
setTimeout(console.log, 0, p1);
setTimeout(console.log, 3000, p1);
// 输出结果：
// Promise { <pending> }
// Promise { <pending> }
// Promise { <rejected> undefined } 状态落定后，后面会跟一个值

// 直接实例化一个已解决的期约：
let p2 = Promise.resolve(); // 这是Promise的静态方法
// 等价于 let p1 = new Promise((resolve, reject) => resolve())
// 接受一个参数，能把任何类型的值，转换为期约解决状态的那个值
let p3 = Promise.resolve('ok啦');
let p4 = Promise.resolve(4);
console.log(p3);
console.log(p4);
// result:
// Promise { 'ok啦' }
// Promise { 4 }

// 直接实例化一个已拒绝的期约：
// let p5 = Promise.reject();
// 这个错误不能被try/catch捕获，只能通过特定的拒绝处理程序捕获
// 接受一个参数，能把任何类型的值，转换为被拒绝的理由
let p6 = Promise.reject('优冰');
// 要添加reject的处理，否则报错
p6.catch((error) => {
    // console.error('Promise rejected:', error);
});
console.log(p6);
// result:
// Promise { <rejected> '优冰' }
console.log();