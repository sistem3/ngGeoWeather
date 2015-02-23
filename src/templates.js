angular.module('templates-main', ['geoWeatherDirective.tpl.html']);

angular.module("geoWeatherDirective.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("geoWeatherDirective.tpl.html",
    "<div class=\"geoWeather container\">\n" +
    "    <div class=\"{{weather.background}}\">\n" +
    "        <div class=\"container\">\n" +
    "            <h1 class=\"col-md-12\">Local Weather <a href=\"https://www.yahoo.com/?ilc=401\" target=\"_blank\"><img src=\"https://poweredby.yahoo.com/white.png\" width=\"134\" height=\"29\"/></a> <span ng-click=\"refreshWeather()\"><i class=\"fa fa-refresh\"></i></span></h1>\n" +
    "        </div>\n" +
    "        <div ng-if=\"weather.loading\" class=\"geoWeather__loader\">\n" +
    "            <div>\n" +
    "                <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "            </div>\n" +
    "            <p ng-bind=\"weather.loadingMessage\"></p>\n" +
    "        </div>\n" +
    "        <div ng-if=\"!weather.loading\" class=\"container geoWeather__content\">\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <h2><span ng-bind=\"weather.forecast[0].text\"></span> <span ng-bind-html=\"weather.forecast[0].icon\"></span></h2>\n" +
    "                <h3><i class=\"fa fa-angle-up\"></i> High: <span ng-bind=\"weather.forecast[0].high\"></span>&deg; | <i class=\"fa fa-angle-down\"></i> Low: <span ng-bind=\"weather.forecast[0].low\"></span>&deg;</h3>\n" +
    "            </div>\n" +
    "            <section class=\"col-md-4\">\n" +
    "                <h4>Today - <span ng-bind=\"weather.todaysDate | date: mediumDate\"></span></h4>\n" +
    "                <h5>Location: <i class=\"fa fa-map-marker\"></i> <span ng-bind=\"weather.location\"></span></h5>\n" +
    "                <p><i class=\"wi wi-sunrise\"></i> Sunrise: <span ng-bind=\"weather.sunrise\"></span> | <i class=\"wi wi-sunset\"></i> Sunset: <span ng-bind=\"weather.sunset\"></span></p>\n" +
    "            </section>\n" +
    "            <section class=\"hidden-xs col-md-4\">\n" +
    "                <h4>Wind direction: <span ng-bind=\"weather.wind.direction\"></span> <i class=\"wi wi-wind-default _{{weather.wind.direction}}-deg\"></i></h4>\n" +
    "                <h5>Wind speed: <span ng-bind=\"weather.wind.speed\"></span></h5>\n" +
    "                <p>Wind chill: <span ng-bind=\"weather.wind.chill\"></span></p>\n" +
    "            </section>\n" +
    "            <section class=\"hidden-xs col-md-4\">\n" +
    "                <h4>Visibility: <span ng-bind=\"weather.atmosphere.visibility\"></span></h4>\n" +
    "                <h5>Humidity: <span ng-bind=\"weather.atmosphere.humidity\"></span></h5>\n" +
    "                <p>Pressure: <span ng-bind=\"weather.atmosphere.pressure\"></span></p>\n" +
    "            </section>\n" +
    "            <section class=\"col-md-12 geoWeather__forecast\" ng-if=\"!weather.foreCastHide\">\n" +
    "                <h3 ng-click=\"foreCollapse = !foreCollapse\"><i class=\"fa fa-calendar\"></i> Forecast <span><i class=\"fa\" ng-class=\"foreCollapse ? 'fa-chevron-up' : 'fa-chevron-down'\"></i></span></h3>\n" +
    "                <ul class=\"list-unstyled\" ng-show=\"foreCollapse\">\n" +
    "                    <li ng-repeat=\"items in weather.forecast\" ng-show=\"!$first\" class=\"col-md-3\">\n" +
    "                        <h3><span ng-bind=\"items.day\"></span> - <small ng-bind=\"items.date\"></small></h3>\n" +
    "                        <h4><span ng-bind=\"items.text\"></span> <span ng-bind-html=\"items.icon\"></span></h4>\n" +
    "                        <h5><i class=\"fa fa-angle-up\"></i> High: <span ng-bind=\"items.high\"></span>&deg; | <i class=\"fa fa-angle-down\"></i> Low: <span ng-bind=\"items.low\"></span>&deg;</h5>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </section>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
