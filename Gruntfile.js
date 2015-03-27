/*global module:false, require:false */
/**!
 * Gruntfile
 * Follow README.md to get started
 */
module.exports = function (grunt) {

  /**
   * Load all grunt tasks.
   */
  require('load-grunt-tasks')(grunt);

  /**
   * Displays the elapsed execution time of grunt tasks
   */
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    jshint: {
      all: [
        'src/*.js'
      ]
    },

    uglify: {
      app: {
        files: [{
          expand: true,
          cwd: '',
          src: 'src/*.js',
          dest: 'command-bus.min.js'
        }]
      }
    },

    watch: {
      scripts: {
        files: [
          'src/*.js',
          'tests/*.js'
        ],
        tasks: ['test']
      }
    }
  });

  grunt.registerTask('test', [
    'karma:unit',
    'jshint:all'
  ]);

  grunt.registerTask('build', [
    'karma:unit',
    'jshint:all',
    'uglify'
  ]);

};
