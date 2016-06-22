var compass     = require('gulp-compass');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('compass', function () {
    gulp
        .src('./sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'stylesheets',
            sass: 'sass'
        }))
        .pipe(gulp.dest('./stylesheets'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('watch', ['browserSync', 'compass'], function () {
    gulp.watch('./sass/*.scss', ['compass']);
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./scripts/*.js', browserSync.reload);
    gulp.watch('./stylesheets/*.css', browserSync.reload);
});
