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
      compile: {
        files: ['coffee/**/*.coffee'],
        tasks: ['exec:compile', 'jasmine:traction']
      },
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
        command: "coffee --output ./ --compile coffee/",
        stdout: true,
        stderr: true
      },
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'src/core.js',
          'src/computedAttributes.js',
          'src/view.js',
          'src/viewCollection.js',
          'src/rendering/nodeStrategy.js',
          'src/rendering/appendStrategy.js',
          'src/rendering/prerenderedStrategy.js',
          'src/rendering/templateStrategy.js'
        ],
        dest: 'traction.js'
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', 'watch:compile');
};