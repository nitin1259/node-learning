const request = require('request');

const getGeoCode = (address) =>{

    const encodedAddress = encodeURIComponent(address);

    return new Promise((resolve, reject) =>{
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=NI43FJwOfJfIE0ECvDcRMMJdAcGfs3RE&location=${encodedAddress}`,
            json: true
        }, (error, response, body)=>{
            if (error) {
                reject('Unable to connect to the map api server');
            } else if (response.statusCode !== 200 || !body) {
                reject('Invalid address entered to seach');
            }else{
                const results = {
                    address: body.results[0].providedLocation.location,
                    lat: body.results[0].locations[0].latLng.lat,
                    lng: body.results[0].locations[0].latLng.lng
                };
                resolve(results);
            }
        })
    })
};



getGeoCode('24401').then(res =>{
    console.log(JSON.stringify(res, undefined, 2))
}).catch(errorMsg =>{
    console.log(errorMsg);
})
