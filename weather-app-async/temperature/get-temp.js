const request = require('request');


const getWeather = (lat, lng, callBackFunc) => {

    request(
        {
            url: `https://api.darksky.net/forecast/e2cf739021a60d47a5c8f51a536a9e37/${lat},${lng}`,
            json: true
        },
        (error, response, body) => {
            if (error) {
                callBackFunc('Unable to connect to Forecast.io');
            } else if (!error && response.statusCode === 200) {
                callBackFunc(undefined,  { temp : body.currently.temperature, apperantTemp: body.currently.apparentTemperature});
            } else {
                callBackFunc('Unable to fetch weather !!!')
            }
        })
}


module.exports.getWeather = getWeather;