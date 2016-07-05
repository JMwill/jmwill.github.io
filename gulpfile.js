const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const del         = require('del');

/* gulp plugin */
const imagemin    = require('gulp-imagemin');
const compass     = require('gulp-compass');
const eslint      = require('gulp-eslint');
const sourcemaps  = require('gulp-sourcemaps');
const babel       = require('gulp-babel');
const concat      = require('gulp-concat');

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('compass', () => {
    gulp
        .src('./src/sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './dist/stylesheets',
            sass: './src/sass'
        }))
        .pipe(gulp.dest('./dist/stylesheets'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('imagemin', () => {
    gulp.src('./src/images/*')
        .pipe(imagemin({
            optimizationLevel: 5, // 优化等级
            progressive: true, // 无损压缩jpg图片
            interlaced: true, // 隔行扫描gif进行渲染
            multipass: true // 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('babelIt', ['eslint'], () => {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('genDistAppJs', ['babelIt'], () => {
    return gulp.src([
        './dist/scripts/utils.js',
        './dist/scripts/bg.js',
        './dist/scripts/loadImage.js',
        './dist/scripts/index.js'
    ])
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/scripts/'));
})

gulp.task('eslint', () => {
    return gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('clean:dist', () => {
    return del(['./dist']);
});

gulp.task('watch', ['browserSync', 'compass', 'genDistAppJs'], () => {
    gulp.watch('./src/sass/*.scss', ['compass']);
    gulp.watch('./src/scripts/**/*.js', ['genDistAppJs']);
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./dist/scripts/*.js', browserSync.reload);
    gulp.watch('./dist/stylesheets/*.css', browserSync.reload);
});

gulp.task('serve', ['clean:dist', 'imagemin', 'watch']);

gulp.task('dist', ['clean:dist', 'imagemin', 'compass']);
