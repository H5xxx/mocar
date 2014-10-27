/*
 * 选择服务类型和配件页面的controller
 */
define(function(require, exports) {
    var config = require('../component/config');
    var util = require('../component/util');
    var Vehicle = require('../model/vehicle');
    var Service = require('../model/service');
    var Order = require('../model/order');
    var Brand = require('../model/brand');
    var Series = require('../model/series');
    var Model = require('../model/model');
    var Popup = require('../widgets/Popup');
    var FastButton = require('../widgets/FastButton');
    var CustomSelect = require('../widgets/CustomSelect');
    var BUY_ELSE = "自行购买";
    var NOT_REPLACE = "不更换该配件";
    var checkNotReplace = false; //是否 检查用户 选择的 非  不更换该配件 的数量， quantityStrategy

    var userSelectBitArr = []; //用户是否选择 “不更换该配件”，true 更换配件，false不更换配件
    var CarCart = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-cart'),

        title: '预约服务',
        
        template: 'template-cart',

        doGetData: function(params, callback){
            
            var url = [config.API_HOST + '/models/',params.model_id,'/services/', params.service_id].join('');
            $.ajax({
                url:url,
                success:function(data, status, xhr){
                    function normalizeData(){

                        var parts = data.parts, options, option;
                        userSelectBitArr = new Array(parts.length);
                        for(var i = 0, ilen = parts.length; i < ilen; i++){
                            options = parts[i].options;
                            if(options){
                                for(var j = 0, jlen = options.length; j < jlen; j++){
                                    option = options[j];
                                    if(option.price == 0 && option.hint){
                                        option.price = option.hint;
                                    }
                                    if(typeof option.price == 'number'){
                                        option.price *= option.count;
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

            //var scroll = new iScroll('j-cart-container',{hScrollbar:false, vScrollbar:false});

            var showPopup = true;
            if(!params.isStandardService){
                showPopup = false;
            }else{
                //从 地址信息页面 返回到 选配件页面，不弹窗
                if(sessionStorage && sessionStorage.stepSchedule){
                    showPopup = false;
                    delete sessionStorage.stepSchedule;
                }
                //服务无配件，or 配件中无 自行购买，不弹自行购买提醒
                if(showPopup){
                    showPopup = false;
                    var parts = params.currentService.parts, part, options, option;
                    if(parts && parts.length > 0){
                        outer: for(var i = 0, ilen = parts.length; i < ilen; i++){
                            part = parts[i];
                            options = part.options;
                            if(options && options.length > 0){
                                inner: for(var j = 0, jlen = options.length; j < jlen; j++){
                                    option = options[j];
                                    if(option.name == BUY_ELSE){
                                        showPopup = true;
                                        break outer;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //弹出窗口，初始化自定义select
            setTimeout(function(){
                initPopupAndCustomSelect.call(self, params, showPopup);
            }, 500);
            //每次进入选配件页面，都删除之前未保存/刚刚提交的订单
            try{
                this.currentOrder = Order.find("-1");
                if(this.currentOrder){
                    this.currentOrder.destroy();
                }
            }catch(e){
            }
            delete this.currentOrder;
            this.currentOrder = Order.create({
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
                            typeId: p.id
                        }
                    })
                }]
            });
            checkNotReplace = params.currentService.quantityStrategy == 1;
            var nextStepBtn = this.el.find('.j-nextstep');
            //表单信息收集
            nextStepBtn.bind('tap', function(e){
                var replaceNum = userSelectBitArr.filter(function(v){
                    return !!v;
                }).length;
                //TODO 
                if(checkNotReplace && replaceNum == 0){
                    e.stopPropagation();
                    e.preventDefault();
                    alert("请至少选择一项配件");
                    return;
                }



                var accessoryInput = self.el.find('input[name=accessoryInput]');
                accessoryInput.forEach(function(input, i){
                    self.currentOrder.services[0].parts[i].id = params.currentService.parts[i].options[input.value].id;
                });
                if(!params.isStandardService){
                    self.currentOrder.message = $('#remarkInput').val();

                    if(!self.currentOrder.message){
                        e.stopPropagation();
                        e.preventDefault();
                        $('#remarkInput-error').show();
                        return;
                    }
                }
                self.currentOrder.save();

            });

            var boardInput = document.getElementById('remarkInput');
            if(boardInput){
                boardInput.setAttribute('style', 'height:75px');
                setInterval(function() {
                    if (boardInput) {
                        boardInput.setAttribute('style', 'height:' + boardInput.scrollHeight + 'px');
                    }
                }, 20);
            }
        },

        clean: function(){
            Popup.close();
            this.constructor.__super__.clean.apply(this, arguments);
        },
        saveUserInput: function(){
            //将用户的操作/选择 存储到sessionStorage
            var self = this;
            var currentOrder = self.currentOrder;
            if(!currentOrder){
                return;
            }
            var service_id = currentOrder.__currentService.id;
            var model_id = currentOrder.__currentVehicle.modelId;

            var userInputs={
                accessoryInputs:[]
            };
            var userInput = self.el.find('input'), inputName;
            userInput.forEach(function(input, i){
                inputName = input.name;
                if(inputName == 'accessoryInput'){
                    userInputs.accessoryInputs.push(input.value || '');
                }else{
                    userInputs[inputName] = input.value || '';
                }
            });
            
            var userInputObj = {};
            userInputObj[model_id] = {};
            userInputObj[model_id][service_id] = userInputs;
            
            sessionStorage['cartUserInput'] = JSON.stringify(userInputObj);
            sessionStorage['lastServiceId'] = service_id;
            sessionStorage['lastModelId'] = model_id;
        },
        // 离开到其对应的url时执行
        deactivate: function() {
            this.saveUserInput();
            this.constructor.__super__.deactivate.apply(this, arguments);
        },
        // 回复用户之前输入/选择的内容
        restoreUserInput: function(params){
            var userInputs, userInputObj;
            userInputObj = sessionStorage['cartUserInput'];
            if(userInputObj){
                try{
                    userInputObj = JSON.parse(userInputObj);
                    userInputObj = userInputObj && userInputObj[params.model_id] || {};
                    userInputs = userInputObj && userInputObj[params.service_id] || {};
                }catch(e){
                    userInputs = {
                        accessoryInputs:[]
                    }
                }
            }
            delete sessionStorage['cartUserInput'];
            return userInputs;
        },
        getData: function(params, callback){
            var self = this;
            var args = arguments;
            var userInputs;
            var lastModelId = sessionStorage['lastModelId'];
            var lastServiceId = sessionStorage['lastServiceId']
            if(lastModelId && !params.model_id){
                params.model_id = lastModelId;
            }
            if(lastServiceId && !params.service_id){
                params.service_id = lastServiceId;
            }

            params.isStandardService = params.service_id != 1;

            var lastUnsavedVehicle = {
                brand: localStorage["brand"] || "",
                family: localStorage["family"] || "",
                prefix: localStorage["prefix"] || "",
                model: localStorage["model"] || "",
                modelId: localStorage["modelId"] || ""
            };
            if(!(lastUnsavedVehicle.modelId && lastUnsavedVehicle.model &&
                lastUnsavedVehicle.brand && lastUnsavedVehicle.family)){
                lastUnsavedVehicle = null;
            }
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
                            try{
                                currentVehicle = Model.find(params.model_id);
                                var series = Series.find(currentVehicle.familyId);
                                var brand = Brand.find(series.brandId);
                                currentVehicle.prefix = series.prefix;
                                currentVehicle.family = series.family;
                                currentVehicle.brand = brand.brand;
                            }catch(e){
                            /*  本页面可能被用户直接刷新，而导致前序流程的内存数据丢失，
                                调用Brand/Series/Model的find会抛Unknown record的异常
                            */
                                currentVehicle = null;
                            }

                            if(currentVehicle){
                                currentVehicle.modelId = currentVehicle.id;
                                currentVehicle.save();
                                vehicles.unshift(currentVehicle);
                                try{
                                    //需要在本地记住上次选择的车型
                                    localStorage["model"] = currentVehicle.model;
                                    localStorage["modelId"] = currentVehicle.modelId;
                                }catch(e){

                                }
                            }else{
                                //非法路径进入
                                self.page.navigate('/service/' + params.service_id + '/brand');
                                return;
                            }
                        }else{//把用户选中的车（库中本来已经存在的），挪到用户车辆列表中的第一个
                            vehicles = [currentVehicle].concat(vehicles.filter(function(v){
                                return v.modelId != currentVehicle.modelId;
                            }));
                        }
                    }else{
                        //新选的车，加到用户车辆列表
                        try{
                            currentVehicle = Model.find(params.model_id);
                            var series = Series.find(currentVehicle.familyId);
                            var brand = Brand.find(series.brandId);
                            currentVehicle.prefix = series.prefix;
                            currentVehicle.family = series.family;
                            currentVehicle.brand = brand.brand;
                            if(currentVehicle){
                                currentVehicle.modelId = currentVehicle.id;
                                currentVehicle.save();
                                vehicles =[currentVehicle];
                                try{
                                    //需要在本地记住上次选择的车型
                                    localStorage["model"] = currentVehicle.model;
                                    localStorage["modelId"] = currentVehicle.modelId;
                                }catch(e){

                                }
                            }
                        }catch(e){
                            //使用最近一次选过的车
                            if(lastUnsavedVehicle){
                                currentVehicle = lastUnsavedVehicle;
                                vehicles = [currentVehicle];
                            }else{
                                //非法流程进入，比如直接刷新当前页面了
                                self.page.navigate('/service/' + params.service_id + '/brand');
                                return;
                            }
                        }
                    }
                }else{//当前没经过选车流程
                    if(vehicles && vehicles.length > 0){
                        //选用户uid在数据库中的第一辆车
                        currentVehicle = vehicles[0];
                        params.model_id = currentVehicle.modelId;
                    }else if(lastUnsavedVehicle){
                        //使用最近一次选过的车
                        currentVehicle = lastUnsavedVehicle;
                        vehicles = [currentVehicle];
                        params.model_id = currentVehicle.modelId;
                    }else{
                        //用户uid在数据库中没车
                        self.page.navigate('/service/' + params.service_id + '/brand');
                        return;
                    }
                }
                userInputs = self.restoreUserInput(params);
                self.doGetData(params, function(err, data){
                    // if(userInputs && userInputs.accessoryInputs && userInputs.accessoryInputs.length){
                    //     var inputs = userInputs.accessoryInputs, userSelect;
                    //     var part, options, option;
                    //     for(var i = 0, ilen = inputs.length; i < ilen; i++){
                    //         part = data.parts[i];
                    //         options = part && part.options;
                    //         if(options.length && inputs[i]){
                    //             userSelect = parseInt(inputs[i]);
                    //             if(userSelect){
                    //                 //把用户之前选择的，放到列表中的第一个位置
                    //                 userSelect = options.splice(userSelect,1);
                    //                 options.unshift(userSelect);
                    //             }
                    //         }
                    //     }
                    // }
                    $.extend(params, {
                        currentService: data,
                        currentVehicle: currentVehicle,
                        allVehicles: vehicles || [],
                        userInputs: userInputs
                    });    
                    callback(err, params);
                });
            });
        }
    });
// -----------------------------    ---------------------------//
    function initPopupAndCustomSelect(data, showPopup){
        var self = this;
        var buyelseTipHtml = document.querySelector('#template-buyelsetip').innerHTML;
        if(showPopup){
            Popup.open(buyelseTipHtml,function(popupContent){
                var mocarbtn = popupContent.querySelector('.mocarbtn');
                var buyelsebtn = popupContent.querySelector('.buyelsebtn');
                new FastButton(mocarbtn, function(){
                    Popup.close();
                    initSelect();
                    calculateTotalPrice();
                });
                new FastButton(buyelsebtn, function(){
                    Popup.close();
                    initSelect(true);
                    calculateTotalPrice();
                });
                // mocarbtn.addEventListener('click', function(){
                //     Popup.close();
                //     initSelect();
                //     calculateTotalPrice();
                // });
                // buyelsebtn.addEventListener('click', function(){
                //     Popup.close();
                //     initSelect(true);
                //     calculateTotalPrice();
                // });
            });
        }else{
            initSelect();
            calculateTotalPrice();
        }
        function calculateTotalPrice(){
            try{
                var totalPrice = 0, itemPrice;
                var priceEl = $('[data-price]');
                var totalPriceEl = $('[data-totalprice]');
                if(!priceEl.length || !totalPriceEl.length){
                    return;
                }
                var replaceNum = userSelectBitArr.filter(function(v){
                    return !!v;
                }).length;
                //TODO 
                if(checkNotReplace){
                    replaceNum = replaceNum || 1;
                    var service = self.currentOrder.__currentService
                    if(!service.__originalPrice){
                        service.__originalPrice = service.price;
                    }
                    var serviceFee = service.__originalPrice;
                    serviceFee = serviceFee * replaceNum;
                    service.price = serviceFee;
                    priceEl[0].setAttribute('data-price', serviceFee);
                    priceEl[0].innerHTML = serviceFee;
                    self.trigger("serviceFeeUpdated", serviceFee);
                }
                priceEl.each(function(i, el){
                    itemPrice = el.getAttribute('data-price');
                    if(itemPrice){
                        itemPrice = parseFloat(itemPrice);
                        if(itemPrice){
                            totalPrice += itemPrice;
                        }
                    }
                });
                self.currentOrder.sum = totalPrice;
                // totalPriceEl.html(totalPrice);
                // totalPriceEl.attr('data-totalprice', totalPrice);
                totalPriceEl[0].innerHTML = totalPrice + "";
                totalPriceEl[0].setAttribute('data-totalprice', totalPrice);
                setTimeout(function(){
                    Popup.open("");
                    setTimeout(function(){
                        Popup.close();
                    }, 0);
                },0);
            }catch(e){
                alert('计算总价出错啦');
            }
        }
        function initSelect (buyelse) {
            var optArrs = [
                    /*['奥迪 国产A4 1.8T']*/
                    data.allVehicles.map(function(v){
                        //prefix+brand+family+model+suffix
                        return [v.prefix + v.brand + " " + v.family + " " + v.model/* + v.suffix*/]
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
            var part;
            for(var i = 0, ilen = data.currentService.parts.length; i < ilen; i++){
                part = data.currentService.parts[i];
                optArrs.push([].concat(part.options.map(function(opt){
                    return [
                        opt.brand + opt.name + " " + opt.extra,
                        opt.price + ""
                    ]
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
                        if(opt[0].indexOf(BUY_ELSE) !== -1){
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
                }else if(i >= 2 && data.currentService.parts[i-2].proposal){
                    selectInput.value = data.currentService.parts[i-2].proposal;
                }else if(!selectInput.value){
                    selectInput.value = 0;
                }
                if(selectTrigger && selectInput){
                    (function(selectTrigger, selectInput, optArr, i){
                        var customSelect = new CustomSelect({
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
                                    if(optArr[selectedIndex][0].indexOf(NOT_REPLACE) !== -1){
                                        userSelectBitArr[i] = false;
                                    }else{
                                        userSelectBitArr[i] = true;
                                    }
                                    calculateTotalPrice();
                                }
                                if( i == 0){
                                    //check 是否选择 “重新选车”
                                    if(selectedIndex == optArr.length -1){
                                        self.page.navigate('/service/' + data.service_id + '/brand');
                                    }else if(selectedIndex >= 0){
                                        data.currentVehicle = data.allVehicles[selectedIndex];
                                        self.currentOrder.__currentVehicle = data.currentVehicle;
                                        data.model_id =data.currentVehicle.modelId;
                                    }
                                }
                            }
                        });
                        customSelect.change(parseInt(selectInput.value));
                        if(i == 1){
                            self.bind('serviceFeeUpdated', function(fee){
                                optArrs[1][0][1] = fee;
                                customSelect.rebuildOptArr(optArrs[1]);
                            });
                        }
                    })(selectTrigger, selectInput, optArrs[i], i)
                }
            };
        }
    }
    return CarCart;
});