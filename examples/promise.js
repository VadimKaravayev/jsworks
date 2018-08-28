let promiseCleanRoom = new Promise((resolve, reject)=> {
    let isClean = false;
    if (isClean) {
        resolve('clean');
    } else {
        reject('not cleaned');
    }
});

promiseCleanRoom.then((fromResolve)=> {
    console.log(`Room is ${fromResolve}.`);
}).catch((fromReject)=> {
    console.log(fromReject);
});