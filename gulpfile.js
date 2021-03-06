const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const nearley = require("gulp-nearley");
const tslint = require("gulp-tslint");
const typescript = require("gulp-typescript");

const ts_project = typescript.createProject("tsconfig.json");

gulp.task("build:grammar", function () {
  return gulp.src("src/**/*.ne")
      .pipe(nearley())
      .pipe(gulp.dest("build/"));
});

gulp.task("build:script", function () {
  return gulp.src("src/**/*.ts")
      .pipe(ts_project())
      .pipe(gulp.dest("build/"));
})

gulp.task("build", gulp.parallel("build:grammar", "build:script"));

gulp.task("clean", function () {
  return del([
    "build/",
    "log/"
  ]);
});

gulp.task("lint:javascript", function () {
  return gulp.src("src/**/*.js")
      .pipe(eslint(".eslintrc"))
      .pipe(eslint.failAfterError());
});

gulp.task("lint:typescript", function () {
  return gulp.src("src/**/*.ts")
      .pipe(tslint({ configuration: "tslint.json" }))
      .pipe(tslint.default.report({
        summarizeFailureOutput: true,
        emitError: true
      }));
});

gulp.task("lint", gulp.parallel("lint:javascript", "lint:typescript"));
gulp.task("default", gulp.parallel("build"));

gulp.task("npm:prepack", gulp.series("clean", "build"));
