'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    html2js: {
      options: {
        // custom options, see below
      },
      main: {
        src: ['src/**/*.tpl.html'],
        dest: 'src/osbGeoWeatherTemplate.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('template', ['html2js']);
};