const yargs = require('yargs');
const axios = require('axios');

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

const address = argv.address;

const encodedAddress = encodeURIComponent(address);

const geoCodeApi = `http://www.mapquestapi.com/geocoding/v1/address?key=NI43FJwOfJfIE0ECvDcRMMJdAcGfs3RE&location=${encodedAddress}`

axios.get(geoCodeApi).then(res => {
    if (!res.data) {
        // console.log(res.data + res.data.statusCode)
        throw new Error('Invalid address entered to seach.');
    }
    const body = res.data;
    console.log(body.results[0].providedLocation.location);
    const lat = body.results[0].locations[0].latLng.lat;
    const lng = body.results[0].locations[0].latLng.lng;

    var weatherApi = `https://api.darksky.net/forecast/e2cf739021a60d47a5c8f51a536a9e37/${lat},${lng}`
    return axios(weatherApi);

})
    .then(res => {
        const body = res.data;
        const weatherResult = { temp: body.currently.temperature, apperantTemp: body.currently.apparentTemperature }
        console.log(`Temperature is ${weatherResult.temp}, but it feels like ${weatherResult.apperantTemp}.`)
    })
    .catch(error => {
        console.log(error.message);
    })
