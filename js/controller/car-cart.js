/*
 * 选择服务类型和配件页面的controller
 */
define(function(require, exports) {
    var Popup = require('../widgets/Popup');
    var CustomSelect = require('../widgets/CustomSelect');

    var CarCart = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-cart'),
        
        title: '选择配件',
        
        template: 'template-cart',

        getData: function(params, callback){
            var data = {
            };

            callback(null, data);
        },

        render: function(params){

            var html = template(this.template, params);

            this.el.html(html);
            //TODO 弹出窗口，初始化自定义select
            setTimeout(initPopupAndCustomSelect, 500);
            //initPopupAndCustomSelect();
        },

        clean: function(){
            Popup.close();
            this.constructor.__super__.clean.apply(this, arguments);
        },

        activate: function(params){

            if(!params.model_id){
                //TODO $.ajax();
                this.page.navigate('/service/' + params.service_id + '/brand');
            }else{
                this.constructor.__super__.activate.apply(this, arguments);
            }

        }
    });

    function initPopupAndCustomSelect(){
        var buyelseTipHtml = [
            '<div class="buyelse-popup mocar-tip-popup">',
                '<div class="title">选择配件</div>',
                '<div class="popup-content">',
                    '<p>摩卡提供和使用的所有配件，均可<br/>在京东自营商店买到。</p>',
                    '<br>',
                    '<p>如果你选择自行购买配件，下单后</br>我们会将对应的配件信息发送给您。</p>',
                '</div>',
                '<div class="command-area">',
                    '<a href="javascript:void(0);" class="mocarbtn">选择摩卡配件</a>',
                    '<a href="javascript:void(0);" class="buyelsebtn">自行购买</a>',
                '</div>',
            '</div>'].join('');
        Popup.open(buyelseTipHtml,function(popupContent){
            var mocarbtn = popupContent.querySelector('.mocarbtn');
            var buyelsebtn = popupContent.querySelector('.buyelsebtn');
            mocarbtn.addEventListener('click', function(){
                initSelect();
                Popup.close();
            });
            buyelsebtn.addEventListener('click', function(){
                initSelect(true);
                Popup.close();
            });
        });
        function initSelect (buyelse) {
            var optArrs = [
                [
                    ['奥迪 国产A4 1.8T']
                ],
                [
                    ['摩卡汽车保养服务', '160元'],
                    ['摩卡汽车保养服务（豪华版）', '300元']
                ],
                [   ['嘉实多磁护SN级5w-40','330元'],
                    ['嘉实多极护SN级0w-40','450元'],
                    ['自行购买','0元']
                ],
                [
                    ['曼牌 W 940/25', '200元'],
                    ['自行购买','0元']
                ],
                [
                    ['曼牌 C27 192/1', '300元'],
                    ['自行购买','0元']
                ]
            ];
            var selectWrappers = document.querySelectorAll('.select-wrapper');
            var selectWrapper, selectTrigger, selectInput;

            for(var i = 0, ilen = selectWrappers.length; i < ilen; i++){
                selectWrapper = selectWrappers[i];
                selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
                selectInput = selectWrapper.querySelector('input');
                if( i >= 2 && buyelse){
                    var initialSelectedIndex = optArrs[i].length - 1;
                    selectInput.value = initialSelectedIndex;
                    selectTrigger.querySelector('.product-name').innerHTML = optArrs[i][initialSelectedIndex][0];
                    selectTrigger.querySelector('.price').innerHTML = optArrs[i][initialSelectedIndex][1];
                }else{
                    selectInput.value = 0;
                }
                if(selectTrigger && selectInput){
                    (function(selectTrigger, selectInput, optArr){
                        new CustomSelect(selectTrigger, selectInput, optArr,  function onchange(selectedIndex){
                            if(selectedIndex !== -1){
                                var productNameEl = selectTrigger.querySelector('.product-name');
                                var priceEl = selectTrigger.querySelector('.price');
                                productNameEl.innerHTML = optArr[selectedIndex][0];
                                if(priceEl){
                                    priceEl.innerHTML = optArr[selectedIndex][1];
                                }
                            }
                        });
                    })(selectTrigger, selectInput, optArrs[i])
                }
            };
        }
    }
    return CarCart;
});