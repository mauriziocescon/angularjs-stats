
/*--------------------------*/
/* Build scripts            */
/*--------------------------*/

var babelify = require("babelify");
var browserify = require("browserify");
var del = require("del");
var fs = require("fs");
var gulp = require("gulp");
var gulpUglify = require("gulp-uglify");
var path = require("path");
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
    return browserify({
        basedir: ".",
        cache: {},
        entries: paths.browserifyEntries,
        packageCache: {},
        standalone: ["angularStats"]
    })
        .plugin(tsify)
        .transform(babelify, {presets: ["es2015"], extensions: [".tsx", ".ts"]})
        .bundle()
        .pipe(vinylSourceStream(appendVersionToFileName("app.js")))
        .pipe(vinylBuffer())
        .pipe(gulpNgAnnotate())
        .pipe(gulpUglify({mangle: false}))
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("build", function () {
    runSequence(
        "empty-dist",
        "compile-ts"
    );
});