const { src, dest, watch, series } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')

function html() {
    return src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('./dist/'))
}

function styles() {
    return src('./src/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/styles/'))
}

function js() {
    return src('./src/scripts/*.js')
        .pipe(terser())
        .pipe(dest('./dist/scripts/'))
}

function assets() {
    return src('./src/images/**/*', { encoding: false }).pipe(
        dest('./dist/images/')
    )
}

function watchTask() {
    watch('./src/*.html', html)
    watch('./src/styles/**/*.scss', styles)
    watch('./src/scripts/*.js', js)
    watch('./src/images/*', assets)
}

exports.default = series(html, styles, js, assets, watchTask)
