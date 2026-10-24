import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';
import plumber from 'gulp-plumber';
import versionFormat from 'gulp-package-version-format';

const sass = gulpSass(dartSass);

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
