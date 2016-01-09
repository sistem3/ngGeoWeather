'use strict';

describe('Directive: geoWeatherDirective', function () {

  // load the directive's module and view
  beforeEach(module('oneStepBeyondApp'));
  beforeEach(module('app/geoWeatherDirective/geoWeatherDirective.tpl.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<geo-weather-directive></geo-weather-directive>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('loading message should be Loading your weather...', function () {
    expect(element.scope().weather.loadingMessage).toBe('Loading your weather...');
  });

  it('loading should be true on load', function () {
    expect(element.scope().weather.loading).toBe(true);
  });
});