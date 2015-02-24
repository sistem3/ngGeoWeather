angular.module('templates-main', ['geoWeatherDirective.tpl.html']);

angular.module("geoWeatherDirective.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("geoWeatherDirective.tpl.html",
    "<div class=\"geoWeather container\">\n" +
    "    <div class=\"{{weather.background}}\">\n" +
    "        <div class=\"container\">\n" +
    "            <h1 class=\"col-md-12\">Local Weather <span ng-click=\"refreshWeather()\"><i class=\"fa fa-refresh\"></i></span></h1>\n" +
    "        </div>\n" +
    "        <div ng-if=\"weather.loading\" class=\"geoWeather__loader\">\n" +
    "            <div>\n" +
    "                <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "            </div>\n" +
    "            <p ng-bind=\"weather.loadingMessage\"></p>\n" +
    "        </div>\n" +
    "        <div ng-if=\"weather.error\">\n" +
    "            <h3 ng-bind=\"weather.errorMessage\"></h3>\n" +
    "        </div>\n" +
    "        <div ng-if=\"!weather.loading\" class=\"container geoWeather__content\">\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <h2><span ng-bind=\"weather.today.weather[0].main\"></span> <span ng-bind-html=\"weather.today.icon\"></span></h2>\n" +
    "                <h3><i class=\"fa fa-angle-up\"></i> High: <span ng-bind=\"weather.today.main.temp_max\"></span>&deg; | <i class=\"fa fa-angle-down\"></i> Low: <span ng-bind=\"weather.today.main.temp_min\"></span>&deg;</h3>\n" +
    "            </div>\n" +
    "            <section class=\"col-md-4\">\n" +
    "                <h4>Today - <span ng-bind=\"weather.todaysDate | date: mediumDate\"></span></h4>\n" +
    "                <h5>Location: <i class=\"fa fa-map-marker\"></i> <span ng-bind=\"weather.location\"></span></h5>\n" +
    "                <p><i class=\"wi wi-sunrise\"></i> Sunrise: <span ng-bind=\"weather.today.sys.sunrise * 1000 | date: 'HH:mm a'\"></span> | <i class=\"wi wi-sunset\"></i> Sunset: <span ng-bind=\"weather.today.sys.sunset * 1000 | date: 'HH:mm a'\"></span></p>\n" +
    "            </section>\n" +
    "            <section class=\"hidden-xs col-md-4\">\n" +
    "                <h4>Wind direction: <span ng-bind=\"weather.today.wind.deg\"></span> <i class=\"wi wi-wind-default _{{weather.today.wind.deg}}-deg\"></i></h4>\n" +
    "                <h5>Wind speed: <span ng-bind=\"weather.today.wind.speed\"></span></h5>\n" +
    "                <p>Wind chill: <span ng-bind=\"weather.today.wind.gust\"></span></p>\n" +
    "            </section>\n" +
    "            <section class=\"hidden-xs col-md-4\">\n" +
    "                <!--<h4>Visibility: <span ng-bind=\"weather.atmosphere.visibility\"></span></h4>-->\n" +
    "                <h5>Humidity: <span ng-bind=\"weather.today.main.humidity\"></span></h5>\n" +
    "                <p>Pressure: <span ng-bind=\"weather.today.main.pressure\"></span></p>\n" +
    "            </section>\n" +
    "            <section class=\"col-md-12 geoWeather__forecast\" ng-if=\"!weather.foreCastHide\">\n" +
    "                <h3 ng-click=\"foreCollapse = !foreCollapse\"><i class=\"fa fa-calendar\"></i> Forecast <span><i class=\"fa\" ng-class=\"foreCollapse ? 'fa-chevron-up' : 'fa-chevron-down'\"></i></span></h3>\n" +
    "                <ul class=\"list-unstyled\" ng-show=\"foreCollapse\">\n" +
    "                    <li ng-repeat=\"items in weather.forecast\" ng-show=\"!$first\" class=\"col-md-2\">\n" +
    "                        <h3><span ng-bind=\"items.dt * 1000 | date: 'EEE - dd MMM'\"></span></h3>\n" +
    "                        <h4><span ng-bind=\"items.weather[0].main\"></span> <span ng-bind-html=\"items.icon\"></span></h4>\n" +
    "                        <h5><i class=\"fa fa-angle-up\"></i> High: <span ng-bind=\"items.temp.max\"></span>&deg;</h5>\n" +
    "                        <h5><i class=\"fa fa-angle-down\"></i> Low: <span ng-bind=\"items.temp.min\"></span>&deg;</h5>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </section>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
