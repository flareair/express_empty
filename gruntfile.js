module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Define the configuration for all the tasks
  grunt.initConfig({


    less: {
      development: {
        files: {
          'public/css/production.css': 'assets/less/main.less'
        }
      }
    },

    // Prefixer

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      files: {
        src: 'public/css/production.css',
        dest: 'public/css/production.css'
      }
    },

    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
      },
      dist: {
        src: [
          'assets/js/script.js'
         ],
        dest: 'public/js/production.js',
      },
    },

    //minify css

    cssmin: {
      minify: {
        src: 'public/css/production.css',
        dest: 'public/css/production.css'
      }
    },


    copy: {
      main: {
        files: [
          {
              expand: true,
              cwd: 'assets/vendor/font-awesome/css',
              src: ['font-awesome.min.css'],
              dest: 'public/css'
          },
          {
              expand: true,
              cwd: 'assets/vendor/font-awesome/fonts',
              src: ['**'],
              dest: 'public/fonts'
          },
          {
              expand: true,
              cwd: 'assets/vendor/jquery/dist',
              src: ['jquery.min.js'],
              dest: 'public/js'
          },
          {
              expand: true,
              cwd: 'assets/vendor/bootstrap/dist/js',
              src: ['bootstrap.min.js'],
              dest: 'public/js'
          },
        ]
      }
    },

    // watch task
    watch: {
      scripts: {
        files: ['assets/js/{,*/}*.js'],
        tasks: ['concat'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['assets/less/{,*/}*.less'],
        tasks: ['less','autoprefixer','cssmin']
      }
    }
  });

  grunt.registerTask('serve',[
    'connect',
    'watch'
  ]);
  grunt.registerTask('build', [
    'concat','less','autoprefixer','cssmin'
  ]);
};