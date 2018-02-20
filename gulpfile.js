var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});
 
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './'
    });
    gulp.watch('**/*.sass', ['sass']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);