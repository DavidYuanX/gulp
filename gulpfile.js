var gulp = require('gulp');
var sass = require('gulp-sass');
var babel       = require('gulp-babel');
// var minify      = require('gulp-minify');
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync');
var reload = browserSync.reload;
/**
 * sass
 */
gulp.task('sass', function() {
      return gulp.src('scss/**/*.scss')
      .pipe(sass({sourcemap: true}))
      .pipe(gulp.dest('www/css'))
      .pipe(reload({ stream:true }));
  });
/**
 * compile es6
 */
gulp.task('babel', function () {
  gulp.src('scripts/*.js')
      .pipe(babel({
          presets: ['es2015']
      }))
      // .pipe(minify())
      .pipe(uglify())
      .pipe(gulp.dest('www/js'))
      .pipe(reload({ stream:true }));
});
/**
 * 监视文件改动并重新载入
 */
gulp.task('browser-sync', ['sass','babel'], function() {
  browserSync(
      {
        open: false,
        server: 'www',
        // host: "192.168.1.30",
        port: 8888
      });
  // '*.html', 'css/**/*.css',
  gulp.watch(['www/*.html'], reload);
  gulp.watch(['scripts/**/*.js'], ['babel'], reload);
  gulp.watch(['scss/**/*.scss'], ['sass'], reload);
});
/**
 * 执行 gulp 默认事件
 */
 gulp.task('default', ['browser-sync']);


