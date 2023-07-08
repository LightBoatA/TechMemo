function test(arr) {
    arguments[0].push(5);
    console.log(arr);
    console.log(arguments[0] === arr);
    return arr;
}

const arr = [1,2,3];
const rtArr = test(arr);
console.log('arr原数组:', arr);
console.log(rtArr === arr);
const arr1 = arr;
console.log(arr1 === arr);
arr1.push(8);
console.log(arr);

function test2(num) {
    arguments[0]++;
    console.log(num);
}
let n = 5;
test2(n);
console.log('n为：',n);

// new.target
function King() {
    console.log(new.target);
}

new King();