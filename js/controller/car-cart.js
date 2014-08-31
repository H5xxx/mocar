/*
 * 选择服务类型和配件页面的controller
 */
define(function(require, exports) {
    var util = require('../component/util');
    var Vehicle = require('../model/vehicle');
    var Service = require('../model/service');
    var Order = require('../model/order');
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
                                    if(option.price == 0 && option.hint){
                                        option.price = option.hint;
                                    }
                                }
                            }
                        }
                    }
                    normalizeData(data);
                    //debugger;
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

            var scroll = new iScroll('j-cart-container',{hScrollbar:false, vScrollbar:false});
            
            //TODO 弹出窗口，初始化自定义select
            setTimeout(function(){
                initPopupAndCustomSelect.call(self, params);
            }, 500);
            //TODO Order.find("-1") first
            try{
                this.currrentOrder = Order.find("-1");
            }catch(e){

            }
            if(!this.currrentOrder){
                this.currrentOrder = Order.create({
                    "id": '-1',
                    "sum" : 0,
                    "modelId" : params.currentVehicle.modelId,
                    "model" : params.currentVehicle.model,
                    "vid" : params.currentVehicle.vid,
                    "plate" : params.currentVehicle.plate,
                    "cityCode" : '',
                    "province" : '',
                    "city" : '',
                    "address" : "",
                    "name" : "",
                    "phone" : "",
                    "date": 0,
                    "__currentService": params.currentService,
                    "__currentVehicle": params.currentVehicle,
                    "services" : [{
                        'id': params.service_id,
                        'parts': params.currentService.parts.map(function(p){
                            return {
                                typeId: p.options[0].typeId
                            }
                        })
                    }]
                });
            }
            
            var nextStepBtn = this.el.find('.j-nextstep');
            //表单信息收集
            nextStepBtn.bind('click', function(e){
                var accessoryInput = self.el.find('input[name=accessoryInput]');
                accessoryInput.forEach(function(input, i){
                    self.currrentOrder.services[0].parts[i].id = params.currentService.parts[i].options[input.value].id;
                });
                self.currrentOrder.save();
            });
        },

        clean: function(){
            Popup.close();
            this.constructor.__super__.clean.apply(this, arguments);
        },

        activate: function(params){
            var self = this;
            var args = arguments;
            //TODO 现在先一次性把车辆给取出来
            util.finish([
                Vehicle.fetch({uid:'me'})
            ], function(vehicles){
                var currentVehicle;
                if(params.model_id){
                    //经过选车流程到达本页
                    if(vehicles && vehicles.length > 0){
                        currentVehicle = vehicles.filter(function(v){
                            return v.modelId == params.model_id;
                        })[0];
                        if(!currentVehicle){//新选的车，加入用户车辆列表
                            currentVehicle = Model.find(params.model_id);
                            if(currentVehicle){
                                vehicles.unshift(currentVehicle);
                            }else{
                                //非法路径进入
                                self.page.navigate('/service/' + params.service_id + '/brand');
                                return;
                            }
                        }else{//把用户选中的车，挪到用户车辆列表中的第一个
                            vehicles = [currentVehicle].concat(vehicles.filter(function(v){
                                return v.modelId != currentVehicle.modelId;
                            }));
                        }
                    }else{
                        //新选的车，加到用户车辆列表
                        currentVehicle = Model.find(params.model_id);
                        if(currentVehicle){
                            vehicles =[currentVehicle];
                        } 
                    }
                }else{//当前没经过选车流程
                    if(vehicles && vehicles.length > 0){
                        //选用户uid在数据库中的第一辆车
                        currentVehicle = vehicles[0];
                        params.model_id = currentVehicle.modelId;
                    }else{
                        //用户uid在数据库中没车
                        self.page.navigate('/service/' + params.service_id + '/brand');
                        return;
                    }
                }
                
                self.getData(params, function(err, data){
                    $.extend(params, {
                        currentService: data,
                        currentVehicle: currentVehicle,
                        allVehicles: vehicles || []
                    });    
                    util.title(self.title);
                    self.fadein();
                    self.render(params);
                });
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
            self.currrentOrder.sum = totalPrice;
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
                    [data.currentService.name, data.currentService.price]
                ],
                // [   ['嘉实多磁护SN级5w-40','330元'],
                //     ['嘉实多极护SN级0w-40','450元'],
                //     ['自行购买','0元']
                // ],
            ];
            for(var i = 0, ilen = data.currentService.parts.length; i < ilen; i++){
                optArrs.push([].concat(data.currentService.parts[i].options.map(function(opt){
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
                                        self.currrentOrder.__currentVehicle = data.currentVehicle;
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