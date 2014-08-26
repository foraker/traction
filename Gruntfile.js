module.exports = function(grunt) {
  var SRC = [
    'src/core.js',
    'src/computedAttribute.js',
    'src/ie.js',
    'src/model.js',
    'src/decorator.js',
    'src/view.js',
    'src/viewCollection.js',
    'src/template_helpers/formatting.js',
    'src/rendering/nodeStrategy.js',
    'src/rendering/appendStrategy.js',
    'src/rendering/prerenderedStrategy.js',
    'src/rendering/templateStrategy.js',
    'src/bindings/binding.js',
    'src/bindings/contentBinding.js',
    'src/bindings/formattedContentBinding.js',
    'src/bindings/attributeBinding.js',
    'src/bindings/factory.js',
    'src/rails/model.js',
    'src/rails/collection.js',
    'src/forms/field.js',
    'src/forms/textField.js',
    'src/forms/textArea.js',
    'src/forms/select.js',
    'src/forms/checkbox.js',
    'src/forms/form.js'
  ]

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
        src: SRC,
        options: {
          specs: 'spec/**/*spec.js',
          helpers: ['spec/support/specHelper.js','spec/support/**/*.js'],
          vendor: [
            "bower_components/jquery/dist/jquery.js",
            "bower_components/underscore/underscore.js",
            "bower_components/backbone/backbone.js",
            "bower_components/underscore.string/lib/underscore.string.js"
          ]
        }
      }
    },
    exec: {
      compile: {
        command: "rm -rf ./src ./spec && coffee --output ./ --compile coffee/",
        stdout: true,
        stderr: true
      },
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: SRC,
        dest: 'traction.js'
      }
    },
    uglify: {
      traction: {
        files: {
          "traction.min.js": "traction.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', 'watch:compile');
  grunt.registerTask('test', 'jasmine:traction');
  grunt.registerTask('build', ['exec:compile', 'concat', 'uglify:traction']);
};
