mocar
=====
###一、本地调试环境搭建流程
####1.1 安装构建工具Gulp.js
假设本地已经准备好Node环境和npm依赖管理器，在命令行执行```npm install -g gulp```把gulp全局安装到本地。

```
$ npm install -g gulp
```

####1.2 安装Gulp插件和相关第三方库
到mocar项目根目录下，在命令行中执行```npm install```安装Gulp插件和相关第三方库

```
$ npm install
```

####1.3 运行Gulp命令预览效果
到mocar项目根目录下，在命令行中执行```gulp```

```
$ gulp
```
默认情况下，运行```gulp```命令会执行如下操作：

1. 在8088端口（gulpfile.js中设置）启动以当前目录为根目录的静态文件服务器。
2. 用系统默认浏览器，打开 http://127.0.0.1:8088/ 页面，导航到 html -> service.html 查看页面运行效果。
3. 监控js/css/html目录中的修改操作，并刷新浏览器打开的步骤2中的页面。

####1.4 合并压缩js/css/images等静态文件
TODO