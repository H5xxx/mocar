/*
 * @description: 弹出窗
 * @author: hzxiaosheng
 * @useage: Popup.open();
 */
define(function(require, exports, module) {
	var Overlay = require('./Overlay');
	var popupWrapperTmplStr = '<div class="popup-wrapper" style="display:none;"></div>';
	var popupTmplStr = [
		'<div class="popup">',
        	'<div class="title"></div>',
        	'<div class="popup-content">',
        	'</div>',
		'</div>'].join('');

	var wrapperEl;
	var popupContentEl;

	var Popup = {};
	Popup._getWrapperEl = function() {
		wrapperEl = document.querySelector("body>.popup-wrapper");
		if (!wrapperEl) {
			var div = document.createElement('div');
			div.innerHTML = popupWrapperTmplStr;
			wrapperEl = div.firstChild;
			document.body.appendChild(wrapperEl);
		}
		return wrapperEl;
	};
	Popup._getPopupContentEl = function(){
		if(!wrapperEl){
			this._getWrapperEl();
		}
		wrapperEl.innerHTML = popupTmplStr;
		popupContentEl = wrapperEl.querySelector('.popup-content');
		return popupContentEl;
	};
	Popup.open = function(elemOrHtml, cb) {
		Overlay.show();
		if(!popupContentEl){
			this._getPopupContentEl();
		}
		if(typeof elemOrHtml == "string"){
			popupContentEl.innerHTML = elemOrHtml;
		}else{
			popupContentEl.innerHTML = "";
			popupContentEl.appendChild(elemOrHtml);
		}
		wrapperEl.style.display = "block";
		if(cb){
			cb(popupContentEl);
		}
	};

	Popup.close = function() {
		Overlay.hide();
		if(!wrapperEl || ! popupContentEl){
			return;
		}
		wrapperEl.innerHTML = "";
		popupContentEl = null;
		wrapperEl.style.display = "none";
	};

	module.exports = Popup;
})