
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
    tsEntries: ["src/angular-stats.ts"],
    js: ["dist/index.js", "dist/angular-stats.service.js"]
};


/*--------------------------*/
/* Prod                     */
/*--------------------------*/

gulp.task("empty-dist", function () {
    return del.sync(["dist/**/*"]);
});

gulp.task("compile-ts", function () {
    var tsProject = gulpTypescript.createProject("tsconfig.json");
    return gulp.src(paths.tsEntries)
        .pipe(tsProject())
        .pipe(gulpUglify({mangle: false}))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("build", function () {
    runSequence(
        "empty-dist",
        "compile-ts"
    );
});