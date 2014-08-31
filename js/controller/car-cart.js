/*
 * 选择服务类型和配件页面的controller
 */
define(function(require, exports) {
    var util = require('../component/util');
    var Vehicle = require('../model/vehicle');
    var Contact = require('../model/contact');
    var Brand = require('../model/brand');
    var Series = require('../model/series');
    var Model = require('../model/model');
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
            var url = ['http://api.mocar.cn/models/',params.model_id,'/services/', params.service_id].join('');
            $.ajax({
                url:url,
                success:function(data, status, xhr){
                    function normalizeData(){
                        var parts = data.parts, options, option;
                        for(var i = 0, ilen = parts.length; i < ilen; i++){
                            options = parts[i].options;
                            if(options){
                                for(var j = 0, jlen = options.length; j < jlen; j++){
                                    option = options[j];
                                    if(option.price == 0 && options.hint){
                                        options.price = options.hint;
                                    }
                                }
                            }
                        }
                    }
                    normalizeData(data);
                    callback(null, data)
                },
                error: function(xhr, errorType, error){
                    Popup.open('Error: ' + errorType + error);
                }
            });
            //callback(null, data);
        },

        render: function(params){
            var self = this;
            var html = template(this.template, params);

            this.el.html(html);
            //TODO 弹出窗口，初始化自定义select
            setTimeout(function(){
                initPopupAndCustomSelect.call(self, params);
            }, 500);
            //initPopupAndCustomSelect();
        },

        clean: function(){
            Popup.close();
            this.constructor.__super__.clean.apply(this, arguments);
        },

        activate: function(params){
            var self = this;
            //TODO 现在先一次性把车辆和用户地址一次都给取出来，等后端接口可以联调后，再按需请求
            util.finish([
                Vehicle.fetch({uid:'me'}),
                Contact.fetch({uid:'me'})
            ], function(vehicles, contacts){
                if(!params.model_id){
                    //TODO $.ajax(); 调用接口获取用户的车辆列表，如果 有，传入model_id；如果没有跳到选车页面

                    // util.f([
                    //     Model.fetch(params),
                    //     Series.fetch(params),
                    //     Brand.fetch(params)
                    // ], function(list){
                    //     data = $.extend(
                    //         {
                    //             list: list
                    //         },
                    //         Brand.find(params.brand_id),
                    //         Series.find(params.series_id)
                    //     );

                    //     callback(null, data);
                    // });
                    if(vehicles.length == 0){//去选车
                        self.page.navigate('/service/' + params.service_id + '/brand');
                    }else{
                        params.model_id = vehicles[0].modelId;
                        self.getData(params, function(err, data){
                            $.extend(params, data, {
                                currentVehicle: vehicles[0],
                                allVehicles: vehicles
                            });
                            util.title(self.title);
                            self.fadein();
                            self.render(params);

                        });
                    }
                }else{
                    self.constructor.__super__.activate.apply(self, arguments);
                }
            });
        }
    });

    function initPopupAndCustomSelect(data){
        var self = this;
        var buyelseTipHtml = document.querySelector('#template-buyelsetip').innerHTML;
        Popup.open(buyelseTipHtml,function(popupContent){
            var mocarbtn = popupContent.querySelector('.mocarbtn');
            var buyelsebtn = popupContent.querySelector('.buyelsebtn');
            mocarbtn.addEventListener('click', function(){
                initSelect();
                calculateTotalPrice();
                Popup.close();
            });
            buyelsebtn.addEventListener('click', function(){
                initSelect(true);
                calculateTotalPrice();
                Popup.close();
            });
        });
        function calculateTotalPrice(){
            var totalPrice = 0, itemPrice;
            var priceEl = $('[data-price]');
            var totalPriceEl = $('[data-totalprice]');
            priceEl.each(function(i, el){
                itemPrice = el.getAttribute('data-price');
                if(itemPrice){
                    itemPrice = parseFloat(itemPrice);
                    if(itemPrice){
                        totalPrice += itemPrice;
                    }
                }
            });
            totalPriceEl.html(totalPrice);
            totalPriceEl.attr('data-totalprice', totalPrice);
        }
        function initSelect (buyelse) {
            var optArrs = [
                    /*['奥迪 国产A4 1.8T']*/
                    data.allVehicles.map(function(v){
                        return [v.model]
                    }).concat([['重新选车']])
                ,
                [
                    // ['摩卡汽车保养服务', '160元'],
                    // ['摩卡汽车保养服务（豪华版）', '300元']
                    [data.name, data.price]
                ],
                // [   ['嘉实多磁护SN级5w-40','330元'],
                //     ['嘉实多极护SN级0w-40','450元'],
                //     ['自行购买','0元']
                // ],
            ];
            for(var i = 0, ilen = data.parts.length; i < ilen; i++){
                optArrs.push([].concat(data.parts[i].options.map(function(opt){
                    return [opt.brand + opt.name + " " + opt.extra, opt.price + '元']
                })));
            }
            var selectWrappers = document.querySelectorAll('.select-wrapper');
            var selectWrapper, selectTrigger, selectInput;

            for(var i = 0, ilen = selectWrappers.length; i < ilen; i++){
                selectWrapper = selectWrappers[i];
                selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
                selectInput = selectWrapper.querySelector('input');
                if( i >= 2 && buyelse){
                    var initialSelectedIndex;

                    var filtered = optArrs[i].filter(function(opt, i){
                        if(opt[0].indexOf('自行购买') !== -1){
                            initialSelectedIndex = i;
                            return true;
                        }
                    });
                    if(!initialSelectedIndex){
                        initialSelectedIndex = 0;
                    }
                    selectInput.value = initialSelectedIndex;
                    var optionNameEl = selectTrigger.querySelector('.product-name');
                    var priceEl = selectTrigger.querySelector('.price');
                    
                    optionNameEl.innerHTML = optArrs[i][initialSelectedIndex][0];
                    priceEl.innerHTML = optArrs[i][initialSelectedIndex][1];
                    priceEl.setAttribute('data-price', optArrs[i][initialSelectedIndex][1]);
                }else{
                    selectInput.value = 0;
                }
                if(selectTrigger && selectInput){
                    (function(selectTrigger, selectInput, optArr, i){
                        new CustomSelect({
                            triggerEl: selectTrigger, 
                            inputEl: selectInput, 
                            optArr: optArr,
                            onchange: function onchange(selectedIndex){
                                if(selectedIndex !== -1){
                                    var productNameEl = selectTrigger.querySelector('.product-name');
                                    var priceEl = selectTrigger.querySelector('.price');
                                    productNameEl.innerHTML = optArr[selectedIndex][0];
                                    if(priceEl){
                                        priceEl.innerHTML = optArr[selectedIndex][1];
                                        priceEl.setAttribute('data-price', optArr[selectedIndex][1]);
                                    }
                                }
                                if(i >= 2){
                                    calculateTotalPrice();
                                }
                                if( i == 0){
                                    //check 是否选择 “重新选车”
                                    if(selectedIndex == optArr.length -1){
                                        self.page.navigate('/service/' + data.service_id + '/brand');
                                    }else if(selectedIndex >= 0){
                                        data.currentVehicle = data.allVehicles[selectedIndex];
                                        data.model_id =data.currentVehicle.modelId;
                                    }
                                }
                            }
                        });
                    })(selectTrigger, selectInput, optArrs[i], i)
                }
            };
        }
    }
    return CarCart;
});