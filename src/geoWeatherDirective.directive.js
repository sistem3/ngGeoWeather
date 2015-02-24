'use strict';

angular.module('sistem3.ng-geo-weather', ['templates-main'])
  .directive('geoWeatherDirective', ['$http', '$filter', function ($http, $filter) {
    return {
      templateUrl: 'geoWeatherDirective.tpl.html',
      restrict: 'EA',
      link: function ($scope, element, attrs) {
        //console.log('Add geo Weather Directive');
        $scope.weather = {};
        $scope.weather.loading = true;
        $scope.weather.loadingMessage = 'Loading your weather...';
        $scope.weather.background = 'defaultBg';
        $scope.weather.todaysDate = new Date();
        $scope.weather.timeNow = $filter('date')($scope.weather.todaysDate, 'shortTime');

        if (attrs.forecastHide === "true") {
          $scope.weather.foreCastHide = true;
        }

        // Check GeoLocation Support
        if ("geolocation" in navigator) {
          //console.log("GeoLocation Available");
          navigator.geolocation.getCurrentPosition(function(position) {
            getLocation(position);
          });
        } else {
          //console.log("GeoLocation Not Available");
        }
        // Get location from Google Maps
        var getLocation = function(position) {
          var apiKey = 'AIzaSyDI-MPoDrmVJnK2qAYtDZr9aR9pOzHCSiI';
          $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + apiKey).success(function(data) {
            //console.log(data);
            $scope.weather.location = data.results[0].address_components[3].long_name;
            getWeather($scope.weather.location);
            if (!attrs.forecastHide || attrs.forecastHide === "false") {
              getForecast($scope.weather.location);
            }
          });
        };
        // Get Weather from Yahoo
        var getWeather = function(locationName) {
          $scope.weather.loading = true;
          $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + locationName + '&units=metric').success(function(data) {
            console.log(data);
            $scope.weather.today = data;
            $scope.weather.today.icon = getWeatherIcon(data.weather[0].description);
            $scope.weather.loading = false;
            //checkDayNight($scope.weather.timeNow, $scope.weather.sunrise, $scope.weather.sunset);
          });
        };

        var getForecast = function(locationName) {
          $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + locationName + '&units=metric').success(function(data) {
            console.log(data);
            $scope.weather.forecast = [];
            angular.forEach(data.list, function(key, value) {
              key.icon = getWeatherIcon(key.weather[0].description);
              this.push(key);
            }, $scope.weather.forecast);
          });
        };

        $scope.refreshWeather = function() {
          getWeather($scope.weather.location);
        };

        var checkDayNight = function(timeNow, sunrise, sunset) {
          //console.log("Time now = " + timeNow + " Sunrise is = " + sunrise + " sunset is = " + sunset);
          var nowAmPmCheck = timeNow.slice(-2);
          if (nowAmPmCheck === "PM") {
            if (timeNow > sunset) {
              $scope.weather.background = 'nightBg';
            } else {
              $scope.weather.background = 'defaultBg';
            }
          } else {
            if (timeNow < sunrise) {
              $scope.weather.background = 'nightBg';
            } else {
              $scope.weather.background = 'defaultBg';
            }
          }
        };

        var getWeatherIcon = function(weather) {
          //console.log(weather);
          switch(weather) {
            case 'thunderstorm with light rain':
            case 'thunderstorm with rain':
            case 'thunderstorm with heavy rain':
              return '<i class="wi wi-storm-showers"></i>';
              break;
            case 'light thunderstorm':
            case 'thunderstorm with light drizzle':
            case 'thunderstorm with drizzle':
            case 'thunderstorm with heavy drizzle':
              return '<i class="wi wi-day-storm-showers"></i>';
              break;
            case 'thunderstorm':
              return '<i class="wi wi-day-thunderstorm"></i>';
              break;
            case 'heavy thunderstorm':
            case 'ragged thunderstorm':
              return '<i class="wi wi-thunderstorm"></i>';
              break;
            case 'light intensity drizzle':
              return '<i class="wi wi-day-sprinkle"></i>';
              break;
            case 'drizzle':
            case 'light intensity shower rain':
              return '<i class="wi wi-sprinkle"></i>';
              break;
            case 'heavy intensity drizzle':
            case 'light intensity drizzle rain':
            case 'drizzle rain':
            case 'shower drizzle':
            case 'shower rain and drizzle':
            case 'heavy intensity drizzle rain':
            case 'heavy shower rain and drizzle':
            case 'shower rain':
            case 'heavy intensity shower rain':
              return '<i class="wi wi-showers"></i>';
              break;
            case 'light rain':
            case 'moderate rain':
            case 'ragged shower rain':
              return '<i class="wi wi-rain-mix"></i>';
              break;
            case 'heavy intensity rain':
            case 'very heavy rain':
              return '<i class="wi wi-rain"></i>';
              break;
            case 'extreme rain':
              return '<i class="wi wi-rain-wind"></i>';
              break;
            default:
              return '<i class="wi wi-day-sunny"></i>'
              break;
          }
        };
      }
    };
  }]);