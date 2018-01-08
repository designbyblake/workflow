var gulp = require('gulp'),
    combineMq = require('gulp-combine-mq'),
    prettify = require('gulp-html-prettify');

//Combines media queries
gulp.task('combineMq', function() {
    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');
    return gulp.src('build/_temp/style.css')
        .pipe(combineMq({
            beautify: true
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('./'));
});

//Cleans up crappy html output
gulp.task('templates', function() {
    gulp.src('build/_dirty/*.html')
        .pipe(prettify({
            indent_char: ' ',
            indent_size: 4
        }))

    .pipe(gulp.dest('./public/html/'))
});

gulp.task('default', ['combineMq']);