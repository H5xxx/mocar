var gulp = require('gulp'),
    open = require("gulp-open"),
    connect = require('gulp-connect');

var dest = "dist",
    port = 8080,
    watchPath = dest + "/**", //监测的文件路径
    openPath = dest + "/index.html", //用浏览器打开的文件路径
    openOption = {
        url: "http://127.0.0.1:" + port
    };

//用浏览器打开dest目录下的index.html文件
gulp.task('open', /*['server'],*/ function(){
  gulp.src(openPath)
      .pipe(open("", openOption));
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
