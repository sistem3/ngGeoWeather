angular.module('osb-geo-weather-template', ['osbGeoWeather.tpl.html']);

angular.module("osbGeoWeather.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("osbGeoWeather.tpl.html",
    "<div class=\"geoWeather container\">\n" +
    "    <div class=\"{{weather.background}}\">\n" +
    "        <div class=\"container\">\n" +
    "            <h1 class=\"col-md-12\">Local Weather <span ng-click=\"refreshWeather()\"><i class=\"fa fa-refresh\"></i></span></h1>\n" +
    "        </div>\n" +
    "        <div ng-if=\"weather.loading\" class=\"geoWeather__loader text-center\">\n" +
    "            <div>\n" +
    "                <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "            </div>\n" +
    "            <p ng-bind=\"weather.loadingMessage\"></p>\n" +
    "        </div>\n" +
    "        <div ng-if=\"weather.error\" class=\"container\">\n" +
    "            <h4 class=\"col-md-12\" ng-bind=\"weather.errorMessage\"></h4>\n" +
    "        </div>\n" +
    "        <div ng-if=\"!weather.loading\" class=\"container geoWeather__content\">\n" +
    "            <div ng-hide=\"weather.error\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <h2><span ng-bind=\"weather.today.weather[0].description\"></span> <span ng-bind-html=\"weather.today.icon\"></span> <span ng-bind=\"weather.today.main.temp | number: 2\"></span>&deg;</h2>\n" +
    "                    <h3><i class=\"fa fa-angle-up\"></i> High: <span ng-bind=\"weather.today.main.temp_max | number: 2\"></span>&deg; | <i class=\"fa fa-angle-down\"></i> Low: <span ng-bind=\"weather.today.main.temp_min | number: 2\"></span>&deg;</h3>\n" +
    "                </div>\n" +
    "                <section class=\"col-md-4\">\n" +
    "                    <h4>Today - <span ng-bind=\"weather.todaysDate | date: mediumDate\"></span></h4>\n" +
    "                    <h5>Location: <i class=\"fa fa-map-marker\"></i> <span ng-bind=\"weather.location\"></span></h5>\n" +
    "                    <p><i class=\"wi wi-sunrise\"></i> Sunrise: <span ng-bind=\"weather.today.sys.sunrise * 1000 | date: 'HH:mm a'\"></span> | <i class=\"wi wi-sunset\"></i> Sunset: <span ng-bind=\"weather.today.sys.sunset * 1000 | date: 'HH:mm a'\"></span></p>\n" +
    "                </section>\n" +
    "                <section class=\"hidden-xs col-md-4\">\n" +
    "                    <h4>Wind direction: <span ng-bind=\"weather.today.wind.deg  | number: 0\"></span> <i class=\"wi wi-wind-default _{{weather.today.wind.deg | number: 0}}-deg\"></i></h4>\n" +
    "                    <h5>Wind speed: <span ng-bind=\"weather.today.wind.speed | number: 2\"></span></h5>\n" +
    "                </section>\n" +
    "                <section class=\"hidden-xs col-md-4\">\n" +
    "                    <h4>Humidity: <span ng-bind=\"weather.today.main.humidity | number: 2\"></span></h4>\n" +
    "                    <h5>Pressure: <span ng-bind=\"weather.today.main.pressure | number: 2\"></span></h5>\n" +
    "                </section>\n" +
    "            </div>\n" +
    "            <section class=\"col-md-12 geoWeather__forecast\" ng-if=\"!weather.foreCastHide\">\n" +
    "                <h3 ng-click=\"foreCollapse = !foreCollapse\"><i class=\"fa fa-calendar\"></i> Forecast <span><i class=\"fa\" ng-class=\"foreCollapse ? 'fa-chevron-up' : 'fa-chevron-down'\"></i></span></h3>\n" +
    "                <div ng-if=\"weather.forecast.loading\" class=\"geoWeather__loader\">\n" +
    "                    <div>\n" +
    "                        <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "                    </div>\n" +
    "                    <p ng-bind=\"weather.forecast.loadingMessage\"></p>\n" +
    "                </div>\n" +
    "                <div ng-if=\"weather.forecast.error\">\n" +
    "                    <h5 ng-bind=\"weather.forecast.errorMessage\"></h5>\n" +
    "                </div>\n" +
    "                <ul ng-if=\"!weather.forecast.loading\" class=\"list-unstyled\" ng-show=\"foreCollapse\">\n" +
    "                    <li ng-repeat=\"days in weather.forecast.days\" ng-show=\"!$first\" class=\"col-md-4\">\n" +
    "                        <h3><span ng-bind=\"days.dt * 1000 | date: 'EEE - dd MMM'\"></span></h3>\n" +
    "                        <h4><span ng-bind=\"days.weather[0].description\"></span> <span ng-bind-html=\"days.icon\"></span></h4>\n" +
    "                        <h5><i class=\"fa fa-angle-up\"></i> High: <span ng-bind=\"days.temp.max | number: 2\"></span>&deg;</h5>\n" +
    "                        <h5><i class=\"fa fa-angle-down\"></i> Low: <span ng-bind=\"days.temp.min | number: 2\"></span>&deg;</h5>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </section>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

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