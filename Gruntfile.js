'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-html2js');

  grunt.initConfig({
    html2js: {
      options: {
        // custom options, see below
      },
      main: {
        src: ['src/**/*.tpl.html'],
        dest: 'src/geoWeatherDirectiveTemplate.js'
      },
    }
  });

  grunt.registerTask('default', [
    'html2js'
  ]);
};