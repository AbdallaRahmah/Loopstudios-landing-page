const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const sourcemaps = require("gulp-sourcemaps");

function html() {
  return src("./src/*.html").pipe(dest("./dist/"));
}

exports.html = html;

function styles() {
  return src("./src/styles/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(cssnano())
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/styles/", { sourcemaps: "." }));
}

exports.styles = styles;

function js() {
  return src("./src/scripts/*.js").pipe(dest("./dist/scripts/"));
}

exports.js = js;

function assets() {
  return src("./src/images/*").pipe(dest("./dist/images/"));
}

exports.assets = assets;

function watchTask() {
  watch("./src/*.html").on("change", html);
  watch("./src/styles/**/*.scss").on("change", styles);
  watch("./src/scripts/*.js").on("change", js);
}

exports.watchTask = watchTask;

exports.default = series(html, styles, js, assets, watchTask);
