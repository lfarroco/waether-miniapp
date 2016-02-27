app.controller('homeCtrl', ['$scope', 'locationFactory', 'messageFactory',
    function ($scope, locationFactory, messageFactory) {

        var timeout = 3000;

        //app status
        $scope.isRequestingZipCode = false;
        $scope.invalidZipcode = false;
       
        //user location info
        $scope.location = {
            name: '',
            found: false,
            zipcode: 0,
            country: ''
        };

        //weather info
        $scope.weather = {
            desc: '',
            temp: 0,
            tempComment: ''
        }

        //exposes the factory to a function in the scope
        $scope.getPosInfo = function (position) {

            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            locationFactory.position(lat, lon).then(function (response) {

                //if the user switched to zipcode query while wayting for a location reply, ignore this results
                if ($scope.isRequestingZipCode)
                    return;

                $scope.assignApiData(response);

            });

        }

        $scope.start = function () {

            if ("geolocation" in navigator) {

                navigator.geolocation.getCurrentPosition(

                    //success callback
                    $scope.getPosInfo,
                
                    //error callback
                    function (err) {

                        $scope.isRequestingZipCode = true;

                    });
            } else {

                $scope.isRequestingZipCode = true;

            }

            setTimeout(function () {


                if ($scope.location.found) {
                    return
                }


                $scope.isRequestingZipCode = true;
                $scope.$apply();

            }, timeout);

        }

        $scope.submitZipcode = function (zipcode) {

            $scope.isRequestingZipCode = true;
            $scope.invalidZipcode = false;

            locationFactory.zipcode(zipcode).then(function (response) {

                $scope.isRequestingZipCode = false;

                if (response.cod === "404") {
                    
                    $scope.invalidZipcode = true;
                    $scope.isRequestingZipCode = true;

                }
                else {
                    $scope.assignApiData(response);
                }

            });

        }

        $scope.assignApiData = function (data) {

            //assigns received data to the $scope
			
            var celsius = (parseInt((data.main.temp - 273.15)) * 10) / 10; //kelvin to celsius
        
            var msg = messageFactory.temp(celsius);

            $scope.location = {

                found: true,
                name: data.name,
                icon: data.weather[0].icon,
                country: data.sys.country
            };

            $scope.weather = {
                desc: data.weather[0].description,
                temp: celsius + '°C',
                msg: msg
            };

        }

        $scope.start();

    }]); //end home controller