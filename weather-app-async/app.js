const request = require('request');
const geoCode = require('./geocode/geocode')
const yargs = require('yargs');
const weather = require('./temperature/get-temp');

const argv = yargs
    .option({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Enter the street address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// console.log(argv.a);
const address = argv.a;

geoCode.getGeoCode(address, (error, results)=>{
    if(error){
        console.log('Some problem occure while getting the geoCodes')
    }else{
        // console.log(`lat : ${results.lat} & lng : ${results.lng}`);
        // console.log(JSON.stringify(results, undefined, 2));
        console.log(`Address is: ${results.address}`)
        weather.getWeather(results.lat, results.lng, (errorMsg, weatherResult)=>{
            if(errorMsg){
                console.log(errorMsg);
            }else{
                console.log(`Temperature is ${weatherResult.temp}, but it feels like ${weatherResult.apperantTemp}.`)
            }
        });
    }
});

// console.log(geoLocation); 
