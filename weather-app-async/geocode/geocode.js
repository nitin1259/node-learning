const request = require('request');

const getGeoCode = (address, callbackFunc) => {

    const encodedAddress = encodeURIComponent(address);
    // console.log(encodedAddress);
    // console.log(decodeURIComponent(encodedAddress));

    request({
        // url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=AIzaSyB5X-H6Ngctdv_N7thDVCgBru5i_yocb94',
        // url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyB5X-H6Ngctdv_N7thDVCgBru5i_yocb94`,
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=NI43FJwOfJfIE0ECvDcRMMJdAcGfs3RE&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        /*
            passing with googleapis
            console.log( JSON.stringify(response, undefined, 2) );
            console.log(JSON.stringify(body, undefined, 2));
            console.log(`Location is ${body.results[0].geometry.location.lat}, ${body.results[0].geometry.location.lng}`)
        */
        if (error) {
            console.log('Unable to connect to the map api server');
            callbackFunc(error);
        } else if (response.status === 'ZERO_RESULTS') {
            console.log('Invalid address entered to seach')
            callbackFunc(error);
        }
        // pasing with mapquest.
        // console.log(`Address is: ${body.results[0].providedLocation.location}`)
        // console.log(`Latitude location is: ${body.results[0].locations[0].latLng.lat}`);
        // console.log(`Longitude Location is: ${body.results[0].locations[0].latLng.lng}`) 

        const results = {
            address: body.results[0].providedLocation.location,
            lat: body.results[0].locations[0].latLng.lat,
            lng: body.results[0].locations[0].latLng.lng
        };
        callbackFunc(undefined, results);
    });
}

module.exports = {
    getGeoCode
}