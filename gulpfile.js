var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
require('gulp-watch');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss  = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var versionFormat = require('gulp-package-version-format');

gulp.task('sass', function() {
    gulp.src('sass/**/pake-style.scss')
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


gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('versionFormat', function(){
    gulp.src('./package.json')
        .pipe(versionFormat())
        .pipe(gulp.dest('./'));
});