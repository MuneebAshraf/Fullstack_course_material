// function getLocation(callback) {
//     navigator.geolocation.getCurrentPosition( function (position) {
//         callback( position );
//     } );
// }
// function getWeather(coords, callback) {
//     const apiKey = "ea5b74743f5cfa2d5238cb6e791db5ce";
//     const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&apiKey=' + apiKey
//     const req = new XMLHttpRequest();
//     req.open( 'GET', url );
//     req.onload = function () {
//         if ( req.status === 200 ) {
//             callback( JSON.parse( req.responseText ) );
//         } else {
//             callback( new Error( req.statusText ) );
//         }
//     };
//     req.send();
// }
// getLocation( function (coords) {
//     getWeather( coords, function (weather) {
//         console.log("res1", weather );
//     } );
// } );

const getLocationAsPromise = () => {
    return new Promise( (resolve, reject) => {
        try {
            navigator.geolocation.getCurrentPosition( (position) => {
                resolve( (position.coords) );
            } );
        } catch ( e ) {
            reject( new Error( e ) );
        }
    } );
}
const getWeatherAsPromise = (coords) => {
    return new Promise( (resolve, reject) => {
    const apiKey = "ea5b74743f5cfa2d5238cb6e791db5ce";
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.latitude + '&lon=' + coords.longitude + '&apiKey=' + apiKey
    const req = new XMLHttpRequest();
        req.open( 'GET', url );
        req.onload = () => {
            if ( req.status === 200 ) {
                resolve( ( JSON.parse( req.response ) ) );
            } else {
                reject( new Error( req.statusText ) );
            }
        }
    req.send();
    })
}

//use get location as promise and get weather as promise
// getLocationAsPromise( (coords) => {
//     getWeatherAsPromise( coords, (weather) => {
//         console.log( "reg2", weather );
//     } ).catch( (err) => {
//         console.log(err);
//     });
// } ).catch(
//     (err) => {
//         console.log(err);
//     }
// );

//use get location as promise and get weather as promise with async/await
const getWeather = async () => {
    try {
        const coords = await getLocationAsPromise();
        const weather = await getWeatherAsPromise(coords);
        console.log("async", weather);
        document.getElementById( 'weather' ).innerHTML = weather.main.temp + ' ' + weather.weather[ 0 ].description;
    } catch ( err ) {
        console.log(err);
    }
}
getWeather();
