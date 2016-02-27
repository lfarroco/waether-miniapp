app.factory('locationFactory', ['$http', function ($http) {

    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';

    var appId = '44db6a862fba0b067b1930da0d769e98';

    return {

        position: function (lat, lon) {

            var promise =
                $http({
                    url: apiUrl,
                    method: 'GET',
                    params: {
                        lat: lat,
                        lon: lon,
                        appid: appId
                    }
                }).then(function (response) {

                    return response.data;

                });

            return promise;

        },
        zipcode: function (zipcode) {
 
            var promise = $http({
                url: apiUrl+'?zip='+zipcode + ',us'+'&appid='+appId,
                method: 'GET'
            }).then(function (response) {

                if (response.cod == 404)
                    return {
                        error: 404
                    }
                else
                    return response.data;

            });

            return promise;

        }

    };

}]); //end location factory