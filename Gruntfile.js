module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      specs: {
        files: ['src/**/*.js', 'spec/**/*.js'],
        tasks: 'jasmine:traction'
      }
    },
    jasmine: {
      traction: {
        src: ['src/core.js', 'src/**/*.js'],
        options: {
          specs: 'spec/**/*spec.js',
          helpers: 'spec/*Helper.js',
          vendor: ["vendor/jquery-2.0.1.js", "vendor/underscore.js", "vendor/backbone.js"]
        }
      }
    },
    exec: {
      compile: {
        command: "coffee --output ./ --watch coffee/",
        stdout: false,
        stderr: false
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['exec:compile', 'watch']);
};