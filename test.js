function solution( hands1 ,  hands2 ) {
    const n = hands1.length;
    let s1 = 0;
    let s2 = 0;
    
    for (let i = 0; i < n; i++) {
        const p1 = hands1[i];
        const p2 = hands2[i];
        
        let sum1 = 0;
        for (let j = 0; j < Math.min(3, p1.length); j++) {
            sum1 += p1[j];
        }
        s1 = Math.max(s1, sum1);
        
        let sum2 = 0;
        for (let j = 0; j < Math.min(3, p2.length); j++) {
            sum2 += p2[j];
        }
        s2 = Math.max(s2, sum2);
    }
    return s1 > s2 ? s1 : s2;
}

console.log(solution([1, 2, 3],[2, 2, 3]));