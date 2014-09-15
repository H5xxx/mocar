var gulp = require('gulp'),
    open = require("gulp-open"),
    connect = require('gulp-connect'),
    seajs = require('gulp-seajs'),
    del = require('del'),
    copy = require('gulp-copy'),
    // combineCSS = require('combine-css'),
    concat = require('gulp-concat'),
    htmlreplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    // minify = require('gulp-minify'),
    minifyCSS = require('gulp-minify-css');

var dest = __dirname, //本地开发时的监测目录，部署时用dist目录
    releaseDest = "dist/",
    port = 8088,
    watchPath = [ //监测的文件路径
        dest + "/html/**/*.html",
        dest + "/js/**/*.js",
        dest + "/css/**/*.css"
    ],
    openPath = dest + "/html/index.html", //用浏览器打开的文件路径
    distOpenPath = releaseDest + "/html/index.html", //用浏览器打开的文件路径
    openOption = {
        url: "http://127.0.0.1:" + port + "/html/index.html?code=FAKECODE#/"
    },
    openOption2 = {
        url: "http://127.0.0.1:" + port + "/html/index.html?code=FAKECODE#/service/1/cart"
    },
    distOpenOption = {
        url: "http://127.0.0.1:" + port + "/html/index.html?code=FAKECODE#/"
    };

//用浏览器打开html目录下的index.html文件
gulp.task('open', /*['server'],*/ function() {
    gulp.src(openPath)
        .pipe(open("", openOption));
    // gulp.src(openPath)
    //     .pipe(open("", openOption2));
});

/*
  在project根目录下启动静态文件服务器
  插件doc: https://github.com/AveVlad/gulp-connect
*/
gulp.task('connect', function() {
    connect.server({
        port: port,
        root: dest,
        directoryListing: true,
        livereload: true
    });
});
/*
  在dist目录下启动静态文件服务器
  插件doc: https://github.com/AveVlad/gulp-connect
*/
gulp.task('connect-dist', function(cb) {
    connect.server({
        port: port,
        root: releaseDest,
        directoryListing: true,
        livereload: true
    });
    cb();
});
gulp.task('reload-html', function() {
    gulp.src(watchPath)
        .pipe(connect.reload());
});
//监测dist目录中的变动，并触发reload
gulp.task('connect-watch', function() {
    gulp.watch([watchPath], ['reload-html']);
});

gulp.task('clean', function(cb) {
    del(['dist/**/*'], function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Files deleted');
        }
        cb(err);
    });
});
//cmd transport & concat
gulp.task('concat', ['clean'], function(cb) {
    //把js/lib/目录下的所有js 按顺序合并到一个大文件中
    gulp.src([
        'js/lib/iScroll-v4.2.5.js',
        'js/lib/template.js',
        'js/lib/sea.js',
        'js/lib/zepto.js',
        'js/lib/spine.js',
        'js/lib/route.js',
        'js/lib/route.js',
        'js/lib/manager.js'
    ])
        .pipe(concat('libAllInOne.js', {
            newLine: ';'
        }))
        .pipe(gulp.dest('dist/js/lib/'));
    //把所有的业务代码合并到一个大文件中
    gulp.src('js/page/index.js')
        .pipe(seajs('page/index'))
        .pipe(gulp.dest('dist/js/page/'));
    cb();
});

//combine css
gulp.task('combineCSS', function(cb) {
    //TODO 目前只是对css文件做简单的拼接合并，以后用专门的css 合并工具
    gulp.src([
        'css/base.css',
        'css/home.css',
        'css/service.css',
        'css/cart.css',
        'css/schedule.css',
        'css/success.css',
    ])
        .pipe(concat('cssAllInOne.css'))
        .pipe(gulp.dest('dist/css/'));
    cb();
});
//压缩css/js
gulp.task('compress', function() {
    gulp.src('dist/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css/'));

    gulp.src('dist/js/lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/lib/'));
    gulp.src('dist/js/page/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/page/'));
});

//使用合并之后的js/css
gulp.task('relocateHtml', ['concat', 'combineCSS'], function(cb) {
    gulp.src('html/index.html')
        .pipe(htmlreplace({
            'css': '../css/cssAllInOne.css',
            'js': '../js/lib/libAllInOne.js'
        }))
        .pipe(gulp.dest('dist/html/'));
    gulp.src("css/icons/*.*")
        .pipe(copy("dist/"));
    cb();
});

//使用合并压缩之后的js/css
gulp.task('releaseHtml', function(cb) {
    gulp.src('html/index.html')
        .pipe(htmlreplace({
            'css': '../css/cssAllInOne.css',
            'js': '../js/lib/libAllInOne.js'
        }))
        .pipe(gulp.dest('dist/html/'));
    gulp.src("css/icons/*.*")
        .pipe(copy("dist/"));
    cb();
});

gulp.task('default', ['connect', 'open', 'connect-watch']);
//合并小文件
gulp.task('combine', ['clean', 'concat', 'combineCSS', 'relocateHtml', "connect-dist", "open"]);
//在combine的基础上压缩js大文件
gulp.task('release', ['compress', 'releaseHtml', "connect-dist", "open"]);

