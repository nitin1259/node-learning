const asyncAdd = (a, b) =>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if(typeof a === 'number' && typeof b ==='number'){
                resolve(a+b);
            }else{
                reject('Enter the valid agument');
            }
        }, 1500);
    })
}

// asyncAdd(5,9).then( res => console.log(res)).catch(errorMsg => console.log(errorMsg));
// asyncAdd(5,'9').then( res => console.log(res)).catch(errorMsg => console.log(errorMsg));

// promise chaining
asyncAdd(5, 9).then(res =>{
    console.log(res);
    return asyncAdd('res', 36);
}).then(res => {
    console.log('Output should be 50 = ' + res);
}).catch(errorMsg =>{
    console.log(errorMsg);
})

asyncAdd(5, 9).then(res =>{
    console.log(res);
    return asyncAdd(res, 36);
}).then(res => {
    console.log('Output should be 50 = ' + res);
}).catch(errorMsg =>{
    console.log(errorMsg);
})

/*

var somePromise = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve("Message: Call is getting resolved.")
        // reject('Something wrong while getting data... ')
    }, 2000);
})


somePromise.then(message =>{
    console.log(message);
}, (errorMsg) =>{
    console.log('Error: '+errorMsg)
})

*/