'use strict';

angular.module('sistem3.osb-geo-weather', ['osb-geo-weather-template'])
  .directive('osbGeoWeather', ['$http', '$filter', function ($http, $filter) {
    return {
      templateUrl: 'osbGeoWeather.tpl.html',
      restrict: 'EA',
      link: function ($scope, element, attrs) {
        //console.log('Add geo Weather Directive');
        $scope.weather = {};
        $scope.weather.forecast = {};
        $scope.weather.loading = true;
        $scope.weather.loadingMessage = 'Loading your weather...';
        $scope.weather.error = false;
        $scope.weather.errorMessage = 'There seems to be a problem fetching your weather';
        $scope.weather.forecast.loading = true;
        $scope.weather.forecast.loadingMessage = 'Loading your forecast...';
        $scope.weather.forecast.error = false;
        $scope.weather.forecast.errorMessage = 'There seems to be a problem fetching your forecast';
        $scope.weather.background = 'defaultBg';
        $scope.weather.apiBase = 'http://api.openweathermap.org/data/2.5/';
        $scope.weather.apiKey = '893dd0afe360cf42975f84a9b97cd4ec';
        $scope.weather.todaysDate = new Date();
        $scope.weather.timeNow = $filter('date')($scope.weather.todaysDate, 'HH:mm');
        // Check for forecast hide attribute
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
          $scope.weather.error = true;
          $scope.weather.loading = false;
          //console.log("GeoLocation Not Available");
        }
        // Get location from Google Maps
        var getLocation = function(position) {
          var apiKey = 'AIzaSyDI-MPoDrmVJnK2qAYtDZr9aR9pOzHCSiI';
          $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + apiKey)
            .success(function(data) {
              //console.log(data);
              $scope.weather.location = data.results[0].address_components[3].long_name;
              getWeather($scope.weather.location);
              if (!attrs.forecastHide || attrs.forecastHide === "false") {
                getForecast($scope.weather.location);
              }
            })
            .error(function(data) {
              //console.log(data);
              $scope.weather.error = true;
              $scope.weather.loading = false;
            });
        };
        // Get Today's Weather from OpenWeather API
        var getWeather = function(locationName) {
          $scope.weather.loading = true;
          $http.get($scope.weather.apiBase + 'weather?q=' + locationName + '&units=metric&APPID=' + $scope.weather.apiKey)
            .success(function(data) {
              $scope.weather.error = false;
              $scope.weather.today = data;
              $scope.weather.today.icon = '<i class="wi wi-owm-' + data.weather[0].id + '"></i>';
              $scope.weather.loading = false;
              checkDayNight($scope.weather.timeNow, $scope.weather.today.sys.sunrise, $scope.weather.today.sys.sunset);
            })
            .error(function(data) {
              //console.log(data);
              $scope.weather.error = true;
              $scope.weather.loading = false;
            });
        };
        // Get Weather Forecast from OpenWeather API
        var getForecast = function(locationName) {
          $http.get($scope.weather.apiBase + 'forecast/daily?q=' + locationName + '&units=metric&APPID=' + $scope.weather.apiKey)
            .success(function(data) {
              $scope.weather.forecast.error = false;
              $scope.weather.forecast.days = [];
              angular.forEach(data.list, function(key, value) {
                key.icon = '<i class="wi wi-owm-' + key.weather[0].id + '"></i>';
                this.push(key);
              }, $scope.weather.forecast.days);
              $scope.weather.forecast.loading = false;
            })
            .error(function(data) {
              $scope.weather.forecast.error = true;
              $scope.weather.forecast.loading = false;
            });
        };
        // Refresh function
        $scope.refreshWeather = function() {
          getWeather($scope.weather.location);
        };
        // Day/Night Checker
        var checkDayNight = function(timeNow, sunrise, sunset) {
          var sunRiseTime = $filter('date')(sunrise * 1000, 'HH:mm');
          var sunSetTime = $filter('date')(sunset * 1000, 'HH:mm');
          //console.log("Time now = " + timeNow.slice(0,2) + " Sunrise is = " + sunRiseTime.slice(0,2) + " sunset is = " + sunSetTime.slice(0,2));
          if (timeNow.slice(0,2) > sunSetTime.slice(0,2)) {
            $scope.weather.background = 'nightBg';
          } else if (timeNow.slice(0,2) < sunRiseTime.slice(0,2)) {
            $scope.weather.background = 'nightBg';
          } else {
            $scope.weather.background = 'defaultBg';
          }
        };
      }
    };
  }]);