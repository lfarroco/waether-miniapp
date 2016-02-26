(function () {

	"use strict";

	var app = angular.module('weatherApp', []);

	app.controller('homeCtrl', function ($scope, $http, locationFactory) {

		//app status
		$scope.isRequestingZipCode = false;
		$scope.invalidZipcode = false;

		//user location info
		$scope.location = {
			name : '',
			found : false,
			zipcode : 0,
			country : ''
		};

		//weather info
		$scope.weather = {
			desc : '',
			temp : 0,
			tempComment : ''
		}
		
		$scope.getPosInfo = function(position){
			
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;

			locationFactory.position(lat, lon).then(function (response) {

				//if the user switched to zipcode query while wayting for a location reply, ignore this results
				if ($scope.isRequestingZipCode)
					return;

				$scope.assignApiData(response);

			});
			
		}

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
		
		$scope.submitZipcode = function (zipcode) {

			$scope.isRequestingZipCode = true;
			$scope.invalidZipcode = false;

			locationFactory.zipcode(zipcode).then(function (response) {

				$scope.isRequestingZipCode = false;

				if (response.cod === "404")
					$scope.invalidZipcode = true;
				else
					$scope.assignApiData(response);

			});

		}

		$scope.assignApiData = function (data) {

			//assigns received data to the $scope
			
			var celsius = parseInt((data.main.temp - 273.15) * 10)/10; //kelvin to celsius
			var msg = '';
			
			//funny messages : )
			if(celsius > 40)
				msg = 'Let\'s fry some eggs in the floor!';
			if(celsius < 40 & celsius > 30)
				msg = 'Pretty hot, isn\'t it? We better go to the beach!';
			if(celsius < 30 & celsius > 20)
				msg = 'It\'s so cozy! How about some tea and a good book?';
			if(celsius < 20 & celsius > 10)
				msg = 'It\'s getting cold, grab me some hot chocolate!';
			if(celsius < 20 & celsius > 10)
				msg = 'Don\'t forget your coat!';
			if(celsius < 10 )
				msg = 'I think that I saw a penguin around here...';

			$scope.location = {

				found : true,
				name : data.name,
				icon : data.weather[0].icon,
				country : data.sys.country
			};

			$scope.weather = {
				desc : data.weather[0].description,
				temp : celsius + '°C',
				msg: msg
			};
			
		}

	}); //end home controller
	
	app.factory('locationFactory', function ($http) {

		var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';

		var appId = '44db6a862fba0b067b1930da0d769e98';

		return {

			position : function (lat, lon) {

				var promise =
					$http({
						url : apiUrl,
						method : 'GET',
						params : {
							lat : lat,
							lon : lon,
							appid : appId
						}
					}).then(function (response) {

						return response.data;

					});

				return promise;

			},
			zipcode : function (zipcode) {

				var promise = $http({
						url : apiUrl,
						method : 'GET',
						params : {
							zip : zipcode + ',us',
							appid : appId
						}
					}).then(function (response) {

						if (response.cod == 404)
							return {
								error : 404
							}
						else
							return response.data;

					});

				return promise;

			}

		};

	}); //end location factory

}());