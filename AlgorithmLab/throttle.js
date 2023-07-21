const throttle = (fn, delay) => {
    const startTime = 0;
    return function() {
        const curTime = new Date().getTime();
        if ( curTime - startTime >= delay) {
            fn.apply(this,arguments);
            startTime = curTime;
        }
    }
}
