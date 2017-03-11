
/*--------------------------*/
/* Build scripts            */
/*--------------------------*/

var browserify = require("browserify");
var del = require("del");
var gulp = require("gulp");
var gulpUglify = require("gulp-uglify");
var runSequence = require("run-sequence");
var tsify = require("tsify");
var vinylBuffer = require("vinyl-buffer");
var vinylSourceStream = require("vinyl-source-stream");

var paths = {
    browserifyEntries: ["src/index.ts"]
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
        standalone: "angular-stats"
    })
        .plugin(tsify)
        .bundle()
        .pipe(vinylSourceStream("angular-stats.js"))
        .pipe(vinylBuffer())
        .pipe(gulp.dest("dist/"));
});

gulp.task("compile-ts-mim", function () {
    return browserify({
        basedir: ".",
        cache: {},
        entries: paths.browserifyEntries,
        packageCache: {},
        standalone: "angular-stats"
    })
        .plugin(tsify)
        .bundle()
        .pipe(vinylSourceStream("angular-stats.mim.js"))
        .pipe(vinylBuffer())
        .pipe(gulpUglify({mangle: false}))
        .pipe(gulp.dest("dist/"));
});

gulp.task("build", function () {
    runSequence(
        "empty-dist",
        "compile-ts",
        "compile-ts-mim"
    );
});