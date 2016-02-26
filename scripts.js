

var app = function () { };

if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=44db6a862fba0b067b1930da0d769e98';

        jQuery.ajax(api, function (res) {

            console.log(res);

        });

    });
    
    } else {
    console.log('not');
}
