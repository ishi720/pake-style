'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
require('gulp-watch');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss  = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var versionFormat = require('gulp-package-version-format');

// sassコンパイル
gulp.task('sass', function() {
    return gulp.src('sass/**/pake-style.scss')
    	.pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(rename({extname: '.min.css'}))
        .pipe(minifyCss({advanced:false}))
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