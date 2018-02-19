var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {
    
    browserSync.init({
        server: "./"
    });

    gulp.watch("**/*.sass", ['sass']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);