
/*--------------------------*/
/* Build scripts            */
/*--------------------------*/

var babelify = require("babelify");
var browserify = require("browserify");
var del = require("del");
var fs = require("fs");
var gulp = require("gulp");
var gulpUglify = require("gulp-uglify");
var runSequence = require("run-sequence");
var tsify = require("tsify");
var vinylBuffer = require("vinyl-buffer");
var vinylSourceStream = require("vinyl-source-stream");

var package = JSON.parse(fs.readFileSync("./package.json"));

var paths = {
    browserifyEntries: ["src/index.ts"],
};


/*--------------------------*/
/* Prod                     */
/*--------------------------*/

gulp.task("empty-dist", function () {
    return del.sync(["dist/**/*"]);
});

gulp.task("compile-ts", function () {
    var gulpTypescriptProject = gulpTypescript.createProject("tsconfig.json");
    return gulp.src(paths.tsEntries)
        .pipe(gulpTypescriptProject())
        .pipe(gulp.dest("dist/"));
});

gulp.task("concat-files", function () {
    return gulp.src(paths.js)
        .pipe(gulpConcat("angular-stats.min.js"))
        .pipe(gulpUglify({mangle: false}))
        .pipe(gulp.dest("dist/"));
});

gulp.task("clean-dist", function () {
    return del.sync(["dist/**/*", "!dist/angular-stats.min.js"]);
});

gulp.task("build", function () {
    runSequence(
        "empty-dist",
        "compile-ts",
        "concat-files",
        "clean-dist"
    );
});