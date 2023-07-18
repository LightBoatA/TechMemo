function func() {
    console.log(Array.isArray(arguments));
    // let args = Array.from(arguments);
    // let args = [].concat(arguments);
    let args = Array.prototype.concat.apply([],arguments);
    console.log(args);
    console.log(Array.isArray(args));
}

func(1,2,3,4)