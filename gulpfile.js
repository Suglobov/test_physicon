var
    gulp = require('gulp'),
    p = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    // spritesmith = require('gulp.spritesmith-multi');
    babel = require('gulp-babel');

gulp.task('browser-sync', function () {
    browserSync({server: true}, function (err, bs) {
        // console.log(bs.options.urls.local);
    });
});

gulp.task('less', function () {
    return gulp.src('./less/*.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        // .pipe(concat('main.less'))
        .pipe(less())
        // .pipe(p.cleanCss())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(csso())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('js', function () {
    return gulp.src('./src/js/*.*')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./js/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function () {
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    gulp.start('less');
    watch('./less/*.*', function () {
        gulp.start('less');
    });
});

gulp.task('default', ['browser-sync', 'watch']);