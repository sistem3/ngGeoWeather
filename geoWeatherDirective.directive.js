'use strict';

angular.module('sistem3.ng-geo-weather')
  .directive('geoWeatherDirective', ['$http', '$filter', function ($http, $filter) {
    return {
      templateUrl: 'app/geoWeatherDirective/geoWeatherDirective.html',
      restrict: 'EA',
      link: function ($scope, element, attrs) {
        //console.log('Add geo Weather Directive');
        $scope.weather = {};
        $scope.weather.loading = true;
        $scope.weather.loadingMessage = 'Loading your weather...';
        $scope.weather.background = 'defaultBg';
        $scope.weather.todaysDate = new Date();
        $scope.weather.timeNow = $filter('date')($scope.weather.todaysDate, 'shortTime');

        //console.log(attrs);
        if (attrs.forecastHide === "true") {
          $scope.weather.foreCastHide = true;
        }

        // Check GeoLocation Support
        if ("geolocation" in navigator) {
          //console.log("GeoLocation Available");
          navigator.geolocation.getCurrentPosition(function(position) {
            //console.log(position.coords.latitude);
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
          });
        };
        // Get Weather from Yahoo
        var getWeather = function(locationName) {
          $scope.weather.loading = true;
          $scope.weather.forecast = [];
          $http.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + locationName + '") and u="c"&format=json').success(function(data) {
            //console.log(data.query.results.channel);
            $scope.weather.sunrise = data.query.results.channel.astronomy.sunrise;
            $scope.weather.sunset = data.query.results.channel.astronomy.sunset;
            $scope.weather.atmosphere = data.query.results.channel.atmosphere;
            $scope.weather.wind = data.query.results.channel.wind;
            checkDayNight($scope.weather.timeNow, $scope.weather.sunrise, $scope.weather.sunset);
            angular.forEach(data.query.results.channel.item.forecast, function(key, value) {
              key.icon = getWeatherIcon(key.text);
              this.push(key);
            }, $scope.weather.forecast);
            $scope.weather.loading = false;
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
            case 'Cloudy':
            case 'Mostly Cloudy':
              return '<i class="wi wi-cloudy"></i>';
              break;
            case 'Partly Cloudy':
              return '<i class="wi wi-day-cloudy"></i>';
              break;
            case 'Sunny':
            case 'Mostly Sunny':
            case 'Mostly Clear':
              return '<i class="wi wi-day-sunny"></i>';
              break;
            case 'Light Rain/Wind':
              return '<i class="wi wi-day-rain-wind"></i>';
              break;
            case 'AM Clouds/PM Sun':
              return '<i class="wi wi-day-cloudy"></i> | <i class="wi wi-night-alt-cloudy"></i>';
              break;
            case 'AM Showers':
            case 'Rain Early':
              return '<i class="wi wi-day-rain"></i>';
              break;
            case 'PM Showers':
              return '<i class="wi wi-night-showers"></i>';
              break;
            case 'PM Rain':
              return '<i class="wi wi-night-rain"></i>';
              break;
            case 'Snow':
            case 'Light Snow':
              return '<i class="wi wi-day-snow"></i>';
              break;
            case 'Rain':
              return '<i class="wi wi-rain"></i>';
              break;
            case 'Showers':
            case 'Light Rain':
              return '<i class="wi wi-showers"></i>';
              break;
            case 'PM Light Rain/Wind':
              return '<i class="wi wi-night-rain-wind"></i>';
              break;
            case 'AM Showers/Wind':
              return '<i class="wi wi-day-rain-wind"></i>';
              break;
            case 'Clouds Early/Clearing Late':
              return '<i class="wi wi-day-cloudy"></i> | <i class="wi wi-night-clear"></i>';
              break;
            default:
              return '<i class="wi wi-day-sun"></i>'
              break;
          }
        };
      }
    };
  }]);