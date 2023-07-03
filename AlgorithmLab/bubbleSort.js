// 通过相邻元素的比较和交换，将较大的元素逐渐向数组的末尾冒泡。
// 重复遍历数组，直到没有交换发生，即数组已排序。
function bubbleSort(arr) {
    // 外层循环控制排序次数，length-1次
    for (let i = 0; i < arr.length - 1; i++) {
        // 内层循环控制每次排序涉及到的元素，截止到末尾已经排好的元素前
        for (let j = 0; j < arr.length -1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 比后一项大就交换
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
        // console.log(i, arr);
    }
    return arr;
}

const arr = [7,5,2,4,1,3,6,0];
console.log(bubbleSort(arr));
console.log(arr); // 会修改原数组