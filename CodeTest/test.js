    // 数组方法测试

    // let arr = [1,2,3,4,5,6,7,8,9];

    // let res = arr.find((value,index) => value > 5);
    // console.log(res === arr);
    // console.log('res:', res)
    // console.log('原数组:', arr);

    // function spinalCase(str) {
    //     str = str.replace(/_/g, ' ');
    //     const strArr = str.split(' ');
    //     if (strArr.length == 1) {
    //         str = str.replace(/[A-Z]/g, " $1");
    //     }
    //     console.log(str);
    // return str.trim().split(' ').join('-').toLowerCase();
    // }
    // function spinalCase(str) { 

    //     str=str.replace(/_/g," "); 
    //     var arr=str.split(" "); 
    //     if( arr.length==1 ){ 
    //         str=str.replace(/([A-Z])/g," $1"); 
    //     } 
    //     console.log(str);
    //     // str=str.trim().toLowerCase().replace(/[\s]/g,"-"); 
    //     return str.trim().split(' ').join('-').toLowerCase();
    //     // return str; 
    // } 
    
    
    // console.log(spinalCase('thisIsSpinalTap'));

    // 斐波那契奇数和
    // function sumFibs(num) {
    //     let a = 1;
    //     let sum = 2;
    //     for (let b = 1; a + b <= num;) {
    //         const newNum = a + b;
    //         sum += newNum % 2 === 1 ? newNum : 0;
    //         [a, b] = [b, newNum];
    //     }
    // return sum;
    // }
    // console.log(sumFibs(2));

    // function sumPrimes(num) {
    //     let sum = 0;
    //     function isPrime(n) {
    //         if (n < 2) return false;
    //         for (let i = 2; i <= Math.sqrt(n); i++) {
    //             if (n % i === 0) return false;
    //         }
    //         return true;
    //     }
    //     for (let i = 2; i <= num; i++) {
    //         if (isPrime(i)) sum += i;
    //     }
    // return sum;
    // }
    // console.log(sumPrimes(2));

    // function binaryAgent(str) {
    //     // 转为数组
    //     const strArr = str.split(' ');
    //     // 遍历改造数组
    //     const letterArr = strArr.map(binaryCode => {
    //         // 转为十进制数字
    //         const code = parseInt(binaryCode, 2);
    //         // 转换成字母
    //         const letter = String.fromCharCode(code);
            
    //         return letter;
    //     });
        
    //     // 数组转为字符串
    //     const resStr = letterArr.join('');
    // return resStr;
    // }
    
    // const a = binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");

    // const str = 'AB';
    // const a = str.charCodeAt(1);
    // const b = a.toString(2);
    // console.log(b);
    // function convert(str) {
    //     const obj = {
    //         ' ': '&nbsp;',
    //         '<': '&lt;',
    //         '>': '&gt;',
    //         '&': '&amp;',
    //         '"': '&quot;',
    //         "'": '&apos;',
    //     }
        
    // const arr = str.split(' ');
    // // const resArr = arr.map(word => obj[word]? obj[word] : word);
    // const resArr = arr.map(word => {
    //     const a = obj[word];
    //     console.log(word);
    //     if (a) {
    //         return obj[word];
    //     } else {
    //         return word;
    //     }
    // });
    
    // return resArr.join(' ');
    // }
    
    // // const a = convert("Stuff in 'quotation marks'");
    // const a = convert("<>");
    // console.log(a);

    function sym(...args) {
        const resSet = new Set();
        for (let i = 0; i < args.length; i++) {
            for(num of args[i]) {
                resSet.has(num) ? resSet.delete(num) : resSet.add(num);
            }
        }
        
    return Array.from(resSet);
    }
    
    const a = sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);

    console.log(a);