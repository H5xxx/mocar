/*
 * FastButton要解决的问题：移动端流量器click事件300ms的延迟问题，ghost click/点击穿透的问题
 * 优点：完美兼容不支持touch事件/pc端的浏览器。
 * 缺点：Google出品，没有缺点。
 * 原理：Creating Fast Buttons for Mobile Web Applications https://developers.google.com/mobile/articles/fast_buttons?hl=de-DE.
 * 使用方法： new FastButtom(elem, clickHandler) 
 *  翻滚吧，少年！
 */
define(function(require, exports, module) {
    var clickbuster = {};

    function FastButton(element, handler) {
        this.element = element;
        this.handler = handler;

        element.addEventListener('touchstart', this, false);
        element.addEventListener('click', this, false);
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
        event.stopPropagation();

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
        event.stopPropagation();
        this.reset();
        this.handler(event);

        if (event.type == 'touchend') {
            clickbuster.preventGhostClick(this.startX, this.startY);
        }
    };

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