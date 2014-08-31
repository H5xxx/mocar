/*
 * @description: 使用div/ul实现的弹窗SELECT
 * @author: hzxiaosheng
 * @useage: new CustomSelect(inputEl, optArr)
 */
 define(function (require, exports, module) {
 	var Events = Spine.Events;
 	var Popup = require("./Popup");
 	var template = require("../lib/template");
 	var defaultOptionTmpl = [
	 	'<li class="custom-option {{if value.selected}}selected{{/if}}" data-seq="{{i}}">',
			'<span class="product-name">{{value.left}}</span>',
			'<span class="product-price fr">{{value.right}}</span>',
		'</li>'
		].join('');
 	
 	function CustomSelect(opt){
 		this.triggerEl = opt.triggerEl;
 		this.inputEl = opt.inputEl;
 		this.optArr = opt.optArr;
 		this.onchange = opt.onchange || function(){};
 		this._normalizedOptArr = this._normalizeData(opt.optArr);
 		this.bindEevent();
 		this.optionElArr = [];
 		this._currentSelectedIndex = -1;
 		this._originalSelectIndex = this.inputEl.value;

 		this._optionTmpl = opt.optionTmpl || defaultOptionTmpl;
 		this._selectTmpl = [
	 		'<div class="custom-select">',
			    '<ul class="custom-option-list">',
			    	'{{each data as value i}}',
			    		this._optionTmpl,
					'{{/each}}',
			    '</ul>',
			    '<div class="command-area">',
			        '<a href="javascript:void(0);" class="btn confirm default">确定</a>',
			        '<a href="javascript:void(0);" class="btn concel">取消</a>',
			    '</div>',
			'</div>'].join('');
 		try{
 			document.createEvent('TouchEvent');
 			this._supportTouch = true;
 		}catch(e){
 			this._supportTouch = false;
 		}
 	}
 	CustomSelect.prototype.bindEevent = function(){
 		var self = this;
 		var eventName = /*this._supportTouch ? 'touchstart' : */'click';
 		this.triggerEl.addEventListener(eventName, function(e){
 			self.render();
 		});
 	}
 	CustomSelect.prototype._normalizeData = function(optArr){
 		var retArr = [], originItem, newItem;
 		var selected;
 		for(var i = 0, ilen = optArr.length; i < ilen; i++){
 			originItem = optArr[i];
 			newItem = {};
 			if(Object.prototype.toString.call(originItem) == "[object Array]"){
 				newItem.left = originItem[0] || '';
 				newItem.right = originItem[1] || '';
 			}else if(typeof originItem == "object"){
 				newItem.left = originItem.name;
 				newItem.right = originItem.price;
 				if(newItem.selected){
 					selected = newItem;//最后一个selected的才算做selected
 				}
 			}else{
 				newItem.left = originItem;
 				newItem.right = '';
 			}
 			retArr.push(newItem);
 		}
 		if(selected){
 			selected.selected = true;
 		}else if(this._originalSelectIndex != -1 && retArr[this._originalSelectIndex]){
 			retArr[this._originalSelectIndex].selected = true;
 		}else{
 			retArr[0]&& (retArr[0].selected = true);
 		}
 		return retArr;
 	}

 	CustomSelect.prototype.change = function(selectedIndex){
 		if(selectedIndex < this.optArr.length - 1){
 			this._originalSelectIndex = this._currentSelectedIndex = selectedIndex;
 			this.inputEl.value = this._currentSelectedIndex;
 			self.onchange(self._currentSelectedIndex);
 		}
 	};

 	CustomSelect.prototype.rebuildOptArr = function(optArr){
 		if(optArr){
 			this.optArr = optArr;
 			this._originalSelectIndex = this._currentSelectedIndex = 0;
 			this.inputEl.value = this._currentSelectedIndex;
 		}
 		this._normalizedOptArr = this._normalizeData(this.optArr);
 	}

 	CustomSelect.prototype.render = function(optArr) {
 		var self = this;
 		this.rebuildOptArr(optArr);
 		var selectHtmlStr = template.render(this._selectTmpl)({data: this._normalizedOptArr});
 		Popup.open(selectHtmlStr, function(popupEl){
 			var eventName = /*self._supportTouch ? 'touchstart' : */'click';
 			var confirmEl = popupEl.querySelector('.confirm');
 			var concelEl = popupEl.querySelector('.concel');
 			var customList = popupEl.querySelectorAll('.custom-option');
 			confirmEl.addEventListener(eventName, function(){
 				Popup.close();
 				self._originalSelectIndex = self._currentSelectedIndex;
 				self.inputEl.value = self._currentSelectedIndex;
 				self.onchange(self._currentSelectedIndex);
				// self._currentValue = clickedLi.innerText;
				// self.inputEl.value = clickedLi.innerText;
 			});
			concelEl.addEventListener(eventName, function(){
 				Popup.close();
 				self._currentSelectedIndex = self._originalSelectIndex;
 				self.inputEl.value = self._originalSelectIndex;
 			});
 			var clickHandler = function(e){
 				var clickedLi = e.currentTarget;
 				var seq = clickedLi.getAttribute('data-seq');
 				if(seq){
 					if( seq == self._currentSelected){
 						return;
 					}
 					for(var i = 0, ilen = customList.length; i < ilen;i++){
						customList[i].className = customList[i].className.replace(' selected', '');
					}
 					clickedLi.className = clickedLi.className + ' selected';
 					self._currentSelectedIndex = parseInt(seq);
 				}
 			}
			for(var i = 0, ilen = customList.length; i < ilen;i++){
				customList[i].addEventListener(eventName, clickHandler)
			}
 		});
 	};
 	$.extend(CustomSelect.prototype, Events);
 	module.exports = CustomSelect;
 })