var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            format: 'beautify',
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