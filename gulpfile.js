const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')

function html() {
    return src('./src/*.html').pipe(dest('./dist/'))
}

exports.html = html

function styles() {
    return src('./src/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/styles/'))
}

exports.styles = styles

function js() {
    return src('./src/scripts/*.js').pipe(dest('./dist/scripts/'))
}

exports.js = js

function assets() {
    return src('./src/images/*').pipe(dest('./dist/images/'))
}

exports.assets = assets

function watchTask() {
    watch('./src/*.html', html)
    watch('./src/styles/**/*.scss', styles)
    watch('./src/scripts/*.js', js)
    watch('./src/images/*', assets)
}

exports.watchTask = watchTask

exports.default = series(html, styles, js, assets, watchTask)
