// 反复提交，重复开启定时器
const debounce = (fn, delay) => {
    let timer = null;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay);
    }
};
  