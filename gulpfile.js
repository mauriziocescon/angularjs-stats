
/*--------------------------*/
/* Build scripts            */
/*--------------------------*/

var del = require("del");
var gulp = require("gulp");
var gulpConcat = require("gulp-concat");
var gulpTypescript = require("gulp-typescript");
var gulpUglify = require("gulp-uglify");
var runSequence = require("run-sequence");

var paths = {
    tsEntries: ["src/index.ts", "src/angular-stats.service.ts"],
    js: ["dist/index.js", "dist/angular-stats.service.js"]
};


/*--------------------------*/
/* Prod                     */
/*--------------------------*/

gulp.task("empty-dist", function () {
    return del.sync(["dist/**/*"]);
});

gulp.task("compile-ts", function () {
    return gulp.src(paths.tsEntries)
        .pipe(gulpTypescript())
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