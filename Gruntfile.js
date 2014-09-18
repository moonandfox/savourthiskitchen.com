// grunt
// http://gruntjs.com/getting-started
module.exports = function(grunt) {

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  // dotenv
  // https://github.com/scottmotte/dotenv
  var dotenv = require('dotenv');
  dotenv.load();

  console.log('Loading ' + process.env.NODE_ENV + ' environment (' + process.env.SHOPIFY_STORE_URL + ')');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shopify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-spritesmith-hd');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    // grunt-contrib-copy
    // https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      images: {
        files: [{
          flatten: true,
          expand: true,
          src: ['images/**'],
          dest: 'shop/assets/'
        }]
      }
    },
    // grunt-contrib-concat
    // https://github.com/gruntjs/grunt-contrib-concat
    concat: {
      // fancybox-specific JS
      fancybox: {
        src: [
          'bower_components/fancybox/source/jquery.fancybox.js',
          'bower_components/fancybox/source/helpers/jquery.fancybox-thumbs.js',
          'scripts/fancybox/fancybox.js'
        ],
        dest: 'shop/assets/fancybox.js',
      },
      // general JS
      theme: {
        src: [
          'scripts/*.js'
        ],
        dest: 'shop/assets/theme.js',
      }
    },
    // grunt-spritesmith-hd
    // https://github.com/davidtheclark/grunt-spritesmith-hd
    // this is "HD" version of https://github.com/Ensighten/grunt-spritesmith
    spriteHD: {
      options: {
        destImg: 'shop/assets',
        destCSS: 'styles/sprites',
        imgUrl: '',
        engine: 'gm',
        cssFormat: 'scss',
        cssOpts: {
          functions: false
        }
      },
      social: {
        src: ['images/icons/*.{png,jpg,gif}'],
        spriteName: 'icons'
      }
    },
    // grunt-contrib-sass
    // https://github.com/gruntjs/grunt-contrib-sass
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['*.scss'],
          dest: '.build/css',
          ext: '.scss.liquid'
        },{
          expand: true,
          cwd: 'styles',
          src: ['*.css'],
          dest: '.build/css',
          ext: '.css.liquid'
        }]
      }
    },
    // grunt-autoprefixer
    // https://github.com/nDmitry/grunt-autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      files: {
        expand: true,
        flatten: true,
        src: ['.build/css/*.scss.liquid', '.build/css/*.css.liquid'],
        dest: 'shop/assets'
      }
    },
    // grunt-shopify
    // https://github.com/wilr/grunt-shopify
    shopify: {
      options: {
        api_key: process.env.SHOPIFY_API_KEY,
        password: process.env.SHOPIFY_PASSWORD,
        url: process.env.SHOPIFY_STORE_URL,
        theme: process.env.SHOPIFY_STORE_THEME,
        base: 'shop/'
      }
    },
    // grunt-contrib-watch
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        livereload: true,
      },
      shopify: {
        files: ['shop/**'],
        tasks: ['shopify'],
      },
      sass: {
        files: ['styles/**'],
        tasks: ['css'],
      },
      images: {
        files: ['images/*'],
        tasks: ['copy:images']
      },
      sprites: {
        files: ['images/icons/*'],
        tasks: ['spriteHD']
      },
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['scripts']
      }
    }
  });

  grunt.registerTask('scripts', 'Build javascript files', ['concat'])

  grunt.registerTask('css', 'Build CSS files', ['sass', 'autoprefixer'])

  // grunt (default)
  grunt.registerTask('default', 'Watch files and upload changes to Shopify', ['watch']);
}

