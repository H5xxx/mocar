/*
 * @description: 使用div/ul实现的弹窗SELECT
 * @author: hzxiaosheng
 * @useage: new CustomSelect(inputEl, optArr)
 */
 /*

<div class="custom-select">
    <ul class="custom-option-list">
        <li class="custom-option selected">
            <span class="product-name">嘉实多磁护SN级5w-40</span>
            <span class="product-price fr">330元</span>
        </li>
    </ul>
    <div class="command-area">
        <a href="javascript:void(0);" class="btn confirm default">确定</a>
        <a href="javascript:void(0);" class="btn concel">取消</a>
    </div>
</div>

{{each data as value i}}
    <li class="custom-option {{if value.selected}}selected{{/if}}" data-seq="{{i}}">
    	<span class="product-name">{{value.left}}</span>
        <span class="product-price fr">{{value.right}}</span>
    </li>
{{/each}}

 */
 define(function (require, exports, module) {
 	var Popup = require("./Popup");
 	var template = require("../lib/template");
 	var selectTmpl = [
 		'<div class="custom-select">',
		    '<ul class="custom-option-list">',
		    	'{{each data as value i}}',
		    		'<li class="custom-option {{if value.selected}}selected{{/if}}" data-seq="{{i}}">',
		    			'<span class="product-name">{{value.left}}</span>',
		        		'<span class="product-price fr">{{value.right}}</span>',
		    		'</li>',
				'{{/each}}',
		    '</ul>',
		    '<div class="command-area">',
		        '<a href="javascript:void(0);" class="btn confirm default">确定</a>',
		        '<a href="javascript:void(0);" class="btn concel">取消</a>',
		    '</div>',
		'</div>'].join('');

 	function CustomSelect(inputEl, optArr){
 		this.inputEl = inputEl;
 		this.optArr = optArr;
 		this._normalizedOptArr = this._normalizeData(optArr);
 		this.bindEevent();
 		this.optionElArr = [];
 		this._currentSelectedIndex = -1;
 		this._currentValue = this._originalValue = inputEl.value;
 		
 	}
 	CustomSelect.prototype.bindEevent = function(){
 		var self = this;
 		this.inputEl.addEventListener('click', function(e){
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
 		}else{
 			retArr[0]&& (retArr[0].selected = true);
 		}
 		return retArr;
 	}

 	CustomSelect.prototype.render = function(optArr) {
 		var self = this;
 		self._originalValue = self._currentValue;
 		if(optArr){
 			this.optArr = optArr;
 			this._normalizedOptArr = this._normalizeData(this.optArr);
 		}
 		var selectHtmlStr = template.render(selectTmpl)({data: this._normalizedOptArr});
 		Popup.open(selectHtmlStr, function(popupEl){
 			var confirmEl = popupEl.querySelector('.confirm');
 			var concelEl = popupEl.querySelector('.concel');
 			var customList = popupEl.querySelectorAll('.custom-option');
 			confirmEl.addEventListener('click', function(){
 				Popup.close();

				// self._currentValue = clickedLi.innerText;
				// self.inputEl.value = clickedLi.innerText;
 			});
			concelEl.addEventListener('click', function(){
 				Popup.close();
 				self.inputEl.value = self._originalValue;
 			});
 			var clickHandler = function(e){
 				var clickedLi = e.currentTarget;
 				var seq = clickedLi.getAttribute('data-seq');
 				if(seq){
 					if( seq == self._currentSelected){
 						return;
 					}
 					for(var i = 0, ilen = customList.length; i < ilen;i++){
						customList[i].className = customList[i].className.replace('selected', '');
					}
 					clickedLi.className = clickedLi.className + ' selected';
 					self._currentSelectedIndex = parseInt(seq);
 					self._currentValue = clickedLi.innerText;
 					self.inputEl.value = clickedLi.innerText;
 				}
 			}
			for(var i = 0, ilen = customList.length; i < ilen;i++){
				customList[i].addEventListener('click', clickHandler)
			}
 		});
 	};

 	module.exports = CustomSelect;
 })