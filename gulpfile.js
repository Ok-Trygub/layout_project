'use strict';

const APP = 'app';
const DIST = 'dist';
let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let cleanCSS = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
let rename = require('gulp-rename');
let sourcemaps = require('gulp-sourcemaps');


function buildStyles() {
    return gulp.src(`./${DIST}/scss/pages/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['node_modules'],
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 3 versions'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write(`./`))
        .pipe(gulp.dest(`./${DIST}/styles`))
}

function addApp(done) {
    gulp.src(`./${DIST}/pages/*.html`)
        .pipe(gulp.dest(`./${APP}/pages`))
        .pipe(gulp.src(`./${DIST}/styles/*.css`))
        .pipe(gulp.dest(`./${APP}/styles`))
        .pipe(gulp.src(`./${DIST}/scripts/*.js`))
        .pipe(gulp.dest(`./${APP}/scripts`))
        .pipe(gulp.src(`./${DIST}/images/*`))
        .pipe(gulp.dest(`./${APP}/images`))
        .pipe(gulp.src(`./${DIST}/fonts/*`))
        .pipe(gulp.dest(`./${APP}/fonts`))
    done()
}

exports.default = async function () {
    gulp.watch(`./${DIST}/scss/**/*.scss`, gulp.series(buildStyles));
};

exports.addApp = addApp;
