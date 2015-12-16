var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html');

gulp.task('build', function () {
  // (JS) Sopator
  //gulp.src('js/*.js')
  gulp.src(['js/sopator.js','js/controller.js'])
  .pipe(concat('sopator.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'));

  // (JS) Vendor
  gulp.src(['js/jquery-2.1.4.min.js','js/bootstrap.min.js'])
  .pipe(concat('vendor.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'));

  // (CSS) Styles
  gulp.src('css/*.css')
  .pipe(concat('style.min.css'))
  .pipe(minifyCss({compatibility:'ie8'}))
  .pipe(gulp.dest('dist/css/'));

  // (HTML) All
  gulp.src('./*.html')
  .pipe(minifyHTML({conditionals: true, spare: true}))
  .pipe(gulp.dest('dist/'));

  // (IMAGES)
  gulp.src('images/*.*')
  .pipe(gulp.dest('dist/images/'));

  // (FONTS)
  gulp.src('fonts/*.*')
  .pipe(gulp.dest('dist/fonts/'));
});
