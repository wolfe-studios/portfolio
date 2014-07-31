var gulp = require('gulp');
var Q    = require('q');
var harp = require('harp');
var resize = require('gulp-image-resize');

gulp.task('harp', function() {
  return Q.promise(function(resolve, error) {
      harp.compile('site', '../production', resolve);
  });
});

gulp.task('default', ['harp'], function() {
  // place code for your default task here
});