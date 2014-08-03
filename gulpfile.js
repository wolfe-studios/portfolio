var gulp            = require('gulp');
var exec              = require('child_process').exec;
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var mainBowerFiles  = require('main-bower-files');
var minifyCSS       = require('gulp-minify-css');
var concat          = require('gulp-concat');
var webpack         = require('gulp-webpack');
var uglify          = require('uglify-js');
var rev             = require('gulp-rev');
var imageResize     = require('gulp-image-resize');
var connect         = require('gulp-connect');
var Q               = require('q');
var harp            = require('harp');
var del             = require('del');
var openPage        = require("gulp-open");
var bower           = require("bower");

/**
*  CLEAN
*
*  Delete files and directories
*/
gulp.task('clean:all', function() {
  return Q.promise(function(resolve, error) {
    del(['.tmp/', 'build/', 'public/css/', 'public/js/', 'public/libs/', 'public/images/'], resolve);
  });
});

gulp.task('clean:build', function() {
  return Q.promise(function(resolve, error) {
    del(['build/'], resolve);
  });
});

gulp.task('clean:libs', function() {
  return Q.promise(function(resolve, error) {
    del(['.tmp/libs/', 'public/libs/'], resolve);
  });
});

gulp.task('clean:css', function() {
  return Q.promise(function(resolve, error) {
    del(['.tmp/css/', 'public/css/'], resolve);
  });
});

gulp.task('clean:js', function() {
  return Q.promise(function(resolve, error) {
    del(['.tmp/js/', 'public/js/'], resolve);
  });
});

gulp.task('clean:images', function() {
  return Q.promise(function(resolve, error) {
    del(['.tmp/images/', 'public/images/'], resolve);
  });
});


/**
*  CSS PREPROCESSING
*
*  Sass, vender prefix, minify, move
*/
gulp.task('css', ['clean:css'], function() {
  var stream = gulp.src('resources/scss/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest('public/css'))
      .pipe(connect.reload());

  return stream;
});

gulp.task('css:production', ['clean:css'], function() {
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
gulp.task('images', ['clean:images'], function() {
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

gulp.task('images:production', ['clean:images'], function() {
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
*  JAVASCRIPT PREPROCESSING
*
*  bower file, common js modules, uglify, minify
*/
gulp.task('bower', function() {
  exec('bower install', function(err, stdout, stderr) {
    if (stdout.match(/2\.\d/)) {
      resolve();
    }
    else {
      reject(new Error('Bower install failed in gulp', err));
    }
  });
});

gulp.task('bowerFiles', ['clean:js'], function() {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('public/libs'));
});

gulp.task('js', ['bowerFiles'], function() {
  var stream = gulp.src('resources/js/**/*.js').
      pipe(webpack({
        output: {filename: "site.js"}
      }))
      .pipe(gulp.dest('build/js/'))
      .pipe(connect.reload());

  return stream;
});


/**
*  HARP FRAMEWORK
*
*  Run harp to process public/ files into build/
*  1. Cleans build folder
*  2. Preprocess CSS, JS, Images
*  3. Build with Harp
*/
gulp.task('harp', ['clean:build', 'css', 'images', 'js'], function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'build', resolve);
  });
});


/**
*  WATCH
*
*  Rerun process after any of these files are edited
*/
gulp.task('watch', function() {
  gulp.watch('resources/scss/**/*.scss', ['css', 'harp']);
  gulp.watch('resources/js/**/*.js', ['js']);
  gulp.watch('resources/images/**/*.{jpg,png,gif}', ['images', 'harp']);
  gulp.watch('public/**/*.jade', ['harp']);
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
gulp.task('default', ['harp', 'watch', 'connect'], function() {
  //Now open in browser
  var stream = gulp.src("build/index.html")
      .pipe(openPage("", {
        app: "Google Chrome",
        url: "http://localhost:8000"
      }));

  return stream;
});

gulp.task('production', ['clean', 'css:production', 'images:production', 'js', 'harp']);