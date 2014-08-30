/*
 * @description: 遮罩层
 * @author: hzxiaosheng
 * @useage: Overlay.show()/Overlay.hide();
 */
define(function(require, exports, module) {
	var tmplStr = '<div class="overlayer"></div>';
	var el;
	var Overlay = {};
	Overlay._getEl = function() {
		el = document.querySelector("body>.overlayer");
		if (!el) {
			var div = document.createElement('div');
			div.innerHTML = tmplStr;
			el = div.firstChild;
			document.body.appendChild(el);
		}
		return el;
	};
	Overlay.show = function() {
		if (!el) {
			this._getEl();
		}
		el.style.display = "block";
	};

	Overlay.hide = function() {
		if (!el) {
			this._getEl();
		}
		el.style.display = "none";
	};

	module.exports = Overlay;
})