var gulp = require('gulp');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');;
var webpackConfig = require('./webpack.config.js');
 
gulp.task('webpack', function () {
    gulp.src(['./src/*.ts', './.src/*.ts'])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('connect', function() {
  connect.server({
    root: './www'
  });
});
 
gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', ['webpack']);
});
 
gulp.task('default', ['webpack','watch','connect']);
