var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var minifyCSS       = require('gulp-minify-css');
var rev             = require('gulp-rev');
var imageResize     = require('gulp-image-resize');
var connect         = require('gulp-connect');
var Q               = require('q');
var harp            = require('harp');



/**
*  HARP FRAMEWORK
*
*  Run harp to process static public files
*/
gulp.task('harp', function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'build', resolve);
  });
});


/**
*  CSS PREPROCESSING
*
*  Sass, vender prefix, minify, move
*/
gulp.task('css', function() {
  var stream = gulp.src('resources/scss/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('public/css'))
      .pipe(connect.reload());

  return stream;
});

gulp.task('css:production', function() {
  var stream = gulp.src('resources/scss/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(minifyCSS({ noAdvanced: true }))
      .pipe(gulp.dest('public/css'));

  return stream;
});


/**
*  IMAGE PROCESSING
*
*  Take the existing portfolio images and create thumbnails
*  automatically to be used on the site.
*/
gulp.task('images', function() {
  var stream = gulp.src('resources/images/**/*.{jpg,png,gif}')
    .pipe(imageResize({
      width : 185,
      height : 300,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('public/images/thumbnails'))
    .pipe(connect.reload());

  return stream;
});

gulp.task('images:production', function() {
  var stream = gulp.src('resources/images/**/*.{jpg,png,gif}')
    .pipe(imageResize({
      width : 185,
      height : 300,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('public/images/thumbnails'));

  return stream;
});


/**
*  WATCH
*
*  Rerun process after any of these files are edited
*/
gulp.task('watch', function() {
  gulp.watch('resources/scss/**/*.scss', ['css', 'harp']);
  gulp.watch('resources/images/**/*.{jpg,png,gif}', ['images', 'harp']);
});


/**
*  CONNECT SERVER
*
*  Loads the server locally and reloads when
*  connect.reload() is called.
*/
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 8000,
    livereload: true
  });
});


/**
*  BUILD TASKS
*
*  Local and production build tasks
*/
gulp.task('default', ['css', 'images', 'harp', 'watch', 'connect']);
gulp.task('production', ['css:production', 'images', 'harp']);