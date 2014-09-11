/*
 * FastButton要解决的问题：移动端流量器click事件300ms的延迟问题，ghost click/点击穿透的问题
 * 优点：完美兼容不支持touch事件/pc端的浏览器。
 * 缺点：Google出品，没有缺点。
 * 原理：Creating Fast Buttons for Mobile Web Applications https://developers.google.com/mobile/articles/fast_buttons?hl=de-DE.
 * 使用方法： new FastButtom(elem, clickHandler) 
 *  翻滚吧，少年！
 * 变更记录：
 *  2014-09-11 加入lazyTap的补丁，解决点击元素隐藏后出发input类型获取焦点从而弹出虚拟键盘的问题。
 *  2014-09-11 注释掉touchstart 和 touchend时的stopPropagation，解决无法scroll的问题
 */
define(function(require, exports, module) {
    var clickbuster = {};

    function FastButton(element, handler) {
        this.element = element;
        this.handler = handler;

        element.addEventListener('touchstart', this, false);
        element.addEventListener('click', this, false);
        this._lazyTap = element.hasAttribute('lazytap');
    };

    FastButton.prototype.handleEvent = function(event) {
        switch (event.type) {
            case 'touchstart':
                this.onTouchStart(event);
                break;
            case 'touchmove':
                this.onTouchMove(event);
                break;
            case 'touchend':
                this.onClick(event);
                break;
            case 'click':
                this.onClick(event);
                break;
        }
    };

    FastButton.prototype.onTouchStart = function(event) {
        // event.stopPropagation();

        this.element.addEventListener('touchend', this, false);
        document.body.addEventListener('touchmove', this, false);

        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
    };

    FastButton.prototype.onTouchMove = function(event) {
        if (Math.abs(event.touches[0].clientX - this.startX) > 10 ||
            Math.abs(event.touches[0].clientY - this.startY) > 10) {
            this.reset();
        }
    };

    FastButton.prototype.onClick = function(event) {
        // event.stopPropagation();
        this.reset();
        this.handler(event);
        if(this._lazyTap){
            this.addUnderFrame(event);
        }
        if (event.type == 'touchend') {
            clickbuster.preventGhostClick(this.startX, this.startY);
        }
    };
    /*----------------------- PATCH START ------------------------*/
    /*
     * 问题描述： 一个弹出层元素背后有一个input类型的元素，点击弹出层元素后隐藏，这时input元素会获取焦点
     * input 元素一旦获取焦点，虚拟键盘就会出来了。即便FastButton也没解决这个问题。
     * 解决方案：点击在元素后，在该元素背后生成一个垫片，在元素隐藏后，由垫片接收焦点，从而避免input获取焦点。
     * 参考：http://www.cnblogs.com/yexiaochai/p/3391015.html
     */
    var underFrame;
    FastButton.prototype.addUnderFrame = function(event){
        if(!underFrame) { 
            underFrame = document.createElement('div');
            underFrame.style.cssText = [
                // "background: black;",
                // "color: black;",
                "opacity: 0",
                "display: none;",
                "border-radius: 60px;",
                "position: absolute;",
                "z-index: 99999;",
                "width: 60px;",
                "height: 60px"
            ].join("");
            document.body.appendChild(underFrame);
        }
        underFrame.style.top = (event.changedTouches[0].clientY - 30) + "px";
        underFrame.style.left = (event.changedTouches[0].clientX - 30) + "px";
        underFrame.style.display = "block";
        setTimeout(function(){
            underFrame.style.display = "none";
        }, 360);
    };
    /*------------------------ PATCH END ----------------------*/
    FastButton.prototype.reset = function() {
        this.element.removeEventListener('touchend', this, false);
        document.body.removeEventListener('touchmove', this, false);
    };

    clickbuster.preventGhostClick = function(x, y) {
        clickbuster.coordinates.push(x, y);
        window.setTimeout(clickbuster.pop, 2500);
    };

    clickbuster.pop = function() {
        clickbuster.coordinates.splice(0, 2);
    };
    clickbuster.onClick = function(event) {
        for (var i = 0; i < clickbuster.coordinates.length; i += 2) {
            var x = clickbuster.coordinates[i];
            var y = clickbuster.coordinates[i + 1];
            if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    };

    document.addEventListener('click', clickbuster.onClick, true);
    clickbuster.coordinates = [];

    module.exports = FastButton;
})