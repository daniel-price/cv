const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const cssImport = require("gulp-cssimport");
const del = require("del");
const sass = require("gulp-sass")(require("sass"));

gulp.task("html", function () {
  return gulp
    .src(["app/**/*.hbs"])
    .pipe($.if("*.js", $.uglify()))
    .pipe($.if("*.css", $.csso()))
    .pipe(
      $.useref({
        searchPath: "{app, .}",
      })
    )
    .pipe(gulp.dest("public"));
});

gulp.task("styles", function () {
  return gulp
    .src("app/styles/*.scss")
    .pipe(sass())
    .pipe(cssImport())
    .pipe(gulp.dest("public/styles"));
});

gulp.task("clean", function () {
  return del([".sass-cache", "public", "docs/index.html"]);
});

const build = gulp.series("clean", "styles", "html");
gulp.task("default", build);
