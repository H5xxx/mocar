var gulp = require('gulp'),
    open = require("gulp-open"),
    connect = require('gulp-connect');

var dest = __dirname, //本地开发时的监测目录，部署时用dist目录
    port = 8088,
    watchPath = [ //监测的文件路径
        dest + "/html/**/*.html", 
        dest + "/js/**/*.js", 
        dest + "/css/**/*.css"
    ],
    openPath = dest + "/html/index.html", //用浏览器打开的文件路径
    openOption = {
        url: "http://127.0.0.1:" + port + "/html/index.html?code=WXFAKECODE#/"
    },
    openOption2 = {
        url: "http://127.0.0.1:" + port + "/html/index.html?code=WXFAKECODE#/service/1/cart"
    };

//用浏览器打开dest目录下的index.html文件
gulp.task('open', /*['server'],*/ function(){
    gulp.src(openPath)
        .pipe(open("", openOption));
    // gulp.src(openPath)
    //     .pipe(open("", openOption2));
});

/*
  在dist目录下启动静态文件服务器
  插件doc: https://github.com/AveVlad/gulp-connect
*/
gulp.task('connect', function() {
    connect.server({
        port:port,
        root: dest,
        directoryListing: true,
        livereload: true
    });
});

gulp.task('reload-html', function () {
    gulp.src(watchPath)
        .pipe(connect.reload());
});
//监测dist目录中的变动，并触发reload
gulp.task('connect-watch', function () {
    gulp.watch([watchPath], ['reload-html']);
});

gulp.task('default', ['connect', 'open', 'connect-watch']);
