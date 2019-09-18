'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
require('gulp-watch');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const versionFormat = require('gulp-package-version-format');

// sassコンパイル
gulp.task('sass', function() {
    return gulp.src('sass/**/pake-style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(rename({extname: '.min.css'}))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});


// package.jsonのバージョン簡略化
gulp.task('packagejson', function(){
    return gulp.src('./package.json')
        .pipe(versionFormat())
        .pipe(gulp.dest('./'));
});

// ファイル監視
gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', gulp.task('sass'));
});

// デフォルト処理
gulp.task('default', gulp.series(gulp.parallel('watch')));