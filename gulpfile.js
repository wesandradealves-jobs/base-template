var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    multiDest = require('gulp-multi-dest'),
    imagemin = require('gulp-imagemin'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    destOptions = {
        mode: 0755
    },
    sass = require('gulp-sass'),
    runSequence = require('run-sequence');

gulp.task('sass', function() {
    gulp.src('**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            level: {
                1: {
                    cleanupCharsets: true, // controls `@charset` moving to the front of a stylesheet; defaults to `true`
                    normalizeUrls: true, // controls URL normalization; defaults to `true`
                    optimizeBackground: true, // controls `background` property optimizations; defaults to `true`
                    optimizeBorderRadius: true, // controls `border-radius` property optimizations; defaults to `true`
                    optimizeFilter: true, // controls `filter` property optimizations; defaults to `true`
                    optimizeFont: true, // controls `font` property optimizations; defaults to `true`
                    optimizeFontWeight: true, // controls `font-weight` property optimizations; defaults to `true`
                    optimizeOutline: true, // controls `outline` property optimizations; defaults to `true`
                    removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
                    removeNegativePaddings: true, // controls removing negative paddings; defaults to `true`
                    removeQuotes: false, // controls removing quotes when unnecessary; defaults to `true`
                    removeWhitespace: true, // controls removing unused whitespace; defaults to `true`
                    replaceMultipleZeros: true, // contols removing redundant zeros; defaults to `true`
                    replaceTimeUnits: true, // controls replacing time units with shorter values; defaults to `true`
                    replaceZeroUnits: true, // controls replacing zero values with units; defaults to `true`
                    roundingPrecision: false, // rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
                    selectorsSortingMethod: 'standard', // denotes selector sorting method; can be `'natural'` or `'standard'`, `'none'`, or false (the last two since 4.1.0); defaults to `'standard'`
                    specialComments: 1, // denotes a number of /*! ... */ comments preserved; defaults to `all`
                    tidyAtRules: true, // controls at-rules (e.g. `@charset`, `@import`) optimizing; defaults to `true`
                    tidyBlockScopes: true, // controls block scopes (e.g. `@media`) optimizing; defaults to `true`
                    tidySelectors: true // controls selectors optimizing; defaults to `true`,
                }
            },
            properties: {
                ieFilters: true, // controls keeping IE `filter` / `-ms-filter`
                iePrefixHack: true, // controls keeping IE prefix hack
                ieSuffixHack: true, // controls keeping IE suffix hack
                spaceAfterClosingBrace: true // controls keeping space after closing brace - `url() no-repeat` into `url()no-repeat`
            }
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
        .pipe(multiDest(['./'], destOptions))
        .pipe(browserSync.stream());
});

gulp.task('images', function(){
  return gulp.src('assets/imgs/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/imgs'));
});

gulp.task('css-dist', function(){
  return gulp.src('*.css')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist'));
});

gulp.task('vendors-js', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.js','node_modules/jquery-touchswipe/jquery.touchSwipe.js'])
    .pipe(uglify())
    .pipe(concat('vendors.js'))
    .pipe(multiDest(['assets/js/'], destOptions));
});

gulp.task('commons-js', function() {
  return gulp.src(['assets/**/*.js'])
    .pipe(uglify())
    .pipe(concat('commons.js'))
    .pipe(multiDest(['assets/js/'], destOptions));
});

gulp.task('dist-js', function() {
    return gulp.src(['assets/js/vendors.js','assets/js/commons.js'])
        .pipe(gulp.dest('dist/assets/js/')
    );
});

gulp.task('minify', function() {
    return gulp.src('*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./dist'));
});

gulp.task('fonts', function() {
    return gulp.src('assets/fonts/*')
        .pipe(gulp.dest('dist/assets/fonts/')
    );
});

gulp.task('htaccess', function() {
    return gulp.src('./.htaccess')
        .pipe(gulp.dest('dist')
    );
});

gulp.task('clean:distjs', function () {
    return del.sync(['dist/assets/js/commons.js','dist/assets/js/vendors.js']);
});

gulp.task('clean:js', function () {
    return del.sync(['assets/js/commons.js','assets/js/vendors.js']);
});

gulp.task('serve', ['sass', 'clean:js', 'vendors-js', 'commons-js'], function() {
    browserSync.init({
        server: './'
    });
    gulp.watch('**/*.sass', ['sass']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
});

gulp.task('build', function (callback) {
    console.log('Building project...')
    runSequence('clean:distjs', ['dist-js', 'css-dist', 'minify', 'images', 'fonts', 'htaccess'],
        callback
    );
});

gulp.task('default', ['serve']);
