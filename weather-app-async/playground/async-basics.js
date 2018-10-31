console.log("Starting application");

setTimeout(() => {
    console.log('Inside the callback of first settimeout function');
}, 2000);

setTimeout(() => {
    console.log('another callback setTimeOut fucntion with 0 time interval');
}, 0);

console.log("Finishing applciation")