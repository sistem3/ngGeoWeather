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
        dest: 'src/templates.js'
      },
    }
  });

  grunt.registerTask('default', [
    'html2js'
  ]);
};