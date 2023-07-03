// 每次遍历数组，选择最小的元素，并将其与当前位置交换。
// 重复进行上述步骤，直到数组排序完成。
function selectionSort(arr) {
    // 外层循环控制排序次数，length-1次
    for (let i = 0; i < arr.length - 1; i++) {
        // 内层循环控制每次排序涉及到的元素，排除前面已经排好的元素
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            // 找到最小值的索引
            if (arr[j] < arr[min]) min = j;
        }
        // 最小值和当前位置值交换
        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
        console.log(i, arr);
    }
}

const arr = [7,5,2,4,1,3,6,0];
selectionSort(arr);
console.log(arr); 