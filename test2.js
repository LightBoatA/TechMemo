function calculateWinner(hands1, hands2) {
  let sum1 = 0; // 玩家1的分数
  let sum2 = 0; // 玩家2的分数

  for (let i = 0; i < Math.min(3, hands1.length); i++) {
    sum1 += hands1[i];
  }

  for (let i = 0; i < Math.min(3, hands2.length); i++) {
    sum2 += hands2[i];
  }

  return Math.max(sum1, sum2);
}

// 测试
const hands1 = [1, 2, 3];
const hands2 = [2, 2, 3];
const result = calculateWinner(hands1, hands2);
console.log(result); // 输出 7
function animateSwap(index1, index2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 交换处理：

      resolve();
    }, 1000);
  });
}
