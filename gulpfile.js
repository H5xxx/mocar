var gulp = require('gulp'),
    open = require("gulp-open"),
    livereload = require('gulp-livereload');

var dest = "dist",
    port = 8080,
    openPath = dest + "/index.html", //用浏览器打开的文件路径
    openOption = {
        url: "http://127.0.0.1:" + port
    };
//在dest目录下启动静态文件服务器
gulp.task('server', function(next) {
  var connect = require('connect'),
      server = connect();
  server.use(connect.static(dest)).listen(process.env.PORT || port, next);
});

//用浏览器打开dest目录下的index.html文件
gulp.task('open', ['server'], function(){
  gulp.src(openPath)
      .pipe(open("", openOption));
});

//监测dest目录本地文件改动，并重新打开dest目录下的index.html
gulp.task('watch', ['server'], function() {
  var server = livereload();
  gulp.watch(dest + '/**').on('change', function(file) {
      server.changed(file.path);

      gulp.src(openPath)
          .pipe(open("", openOption));
  });
});

gulp.task('default', ['server', 'open', 'watch']);