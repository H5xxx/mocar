/*
 * 预约上门信息 页面的controller
 */
define(function(require, exports) {
    var config = require('../component/config');
    var util = require('../component/util');
    var City = require('../model/city');
    var Order = require('../model/order');
    var Contact = require('../model/contact');
    var Brand = require('../model/brand');
    var Model = require('../model/model');
    var Popup = require('../widgets/Popup');
    var CustomSelect = require('../widgets/CustomSelect');

    var CarSchedule = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-schedule'),

        title: '上门服务信息',

        template: 'template-schedule',

        doGetData: function(params, callback) {
            var self = this;
            var userInputs = params.userInputs || {};
            util.finish([
                City.fetch(),
                Contact.fetch({
                    uid: 'me'
                })
            ], function(cities, contacts) {
                var currentContact, currentProvinceIndex, currentCityIndex, currentProvince, currentCity;
                var name, address, phone, cityCode;
                var allProvinceArr = [],
                    allCityMatrix = [];
                currentProvinceIndex = currentCityIndex = 0;
                
                var previousProvinceIndex = userInputs.provinceInput;
                var previousCityIndex = userInputs.cityInput;
                //cityCode = userInputs.cityCode;
                var previousDayIndex = userInputs.dayInput;
                var previousTimeIndex = userInputs.timeInput;

                name = userInputs.nameInput;
                address = userInputs.addressInput;
                phone = userInputs.phoneInput;
                dayIndex = previousDayIndex || 0;
                timeIndex = previousTimeIndex || 0;

                if (contacts && contacts.length) {
                    currentContact = contacts[0];
                    name = name || currentContact.name;
                    address = address || currentContact.address;
                    phone = phone || currentContact.phone;
                    
                    var tempArr;
                    cities.forEach(function(c, i) {
                        tempArr = [];
                        allProvinceArr.push(c.province);
                        allCityMatrix.push(tempArr);
                        c.cities.forEach(function(d, j) {
                            tempArr.push(d.city);
                            if (d.cityCode == cityCode) {
                                currentProvinceIndex = i;
                                currentCityIndex = j;
                            }
                        })
                    });
                    if (currentProvinceIndex !== 0) {
                        //把用户的province 挪到province列表中的第一位，默认选中用户的
                        currentProvince = cities[currentProvinceIndex];
                        cities.splice(currentProvinceIndex, 1);
                        cities.unshift(currentProvince);
                        allProvinceArr.splice(currentProvinceIndex, 1);
                        allProvinceArr.unshift(currentProvince.province);
                        tempArr = allCityMatrix[currentProvinceIndex];
                        allCityMatrix.splice(currentProvinceIndex, 1);
                        allCityMatrix.unshift(tempArr);
                        currentProvinceIndex = 0;
                    }
                    if (currentCityIndex !== 0) {
                        //把用户的city 挪到city列表中的第一位，默认选中用户的
                        var currentProvinceCities = cities[currentProvinceIndex].cities;
                        var currentCityObj = currentProvinceCities[currentCityIndex];
                        currentProvinceCities.splice(currentCityIndex, 1);
                        currentProvinceCities.unshift(currentCityObj);
                        var tempArr = allCityMatrix[currentProvinceIndex];
                        currentCity = tempArr[currentCityIndex];
                        tempArr.splice(currentCityIndex, 1);
                        tempArr.unshift(currentCity);
                        currentCityIndex = 0;
                    }
                }else{
                    allCityMatrix = [];
                    allProvinceArr = cities.map(function(c){
                        allCityMatrix.push(c.cities.map(function(d){
                            return d.city;
                        }));
                        return c.province;
                    });
                }
                if(previousProvinceIndex){
                    currentProvinceIndex = previousProvinceIndex;
                }
                if(previousCityIndex){
                    currentCityIndex = previousCityIndex;
                }
                currentProvince = cities[currentProvinceIndex].province;
                currentCity = cities[currentProvinceIndex].cities[currentCityIndex].city;

                /*
                    如果是当天下午2点前，时间列表包括明天，否则从后天开始，
                    时间段仅分“上午”和“下午”，分别以9点和13点表示
                */
                var startOffset = 1;
                var d = new Date();
                if(d.getHours() >= 14){
                    startOffset = 2;
                }
                //可提前7天预订
                var allDayArr = util.getDayArr(7,startOffset);
                //可预订的时间
                var allTimeArr = [
                    '上午',
                    '下午'
                ];

                var data = {
                    currentProvinceIndex: currentProvinceIndex,
                    currentCityIndex: currentCityIndex,
                    currentProvince: currentProvince,
                    currentCity: currentCity,
                    allCities: cities,
                    allProvinceArr: allProvinceArr,
                    allCityMatrix: allCityMatrix,
                    allDayArr: allDayArr,
                    allTimeArr: allTimeArr,
                    currentDayIndex: dayIndex,
                    currentTimeIndex: timeIndex,
                    currentDay: allDayArr[dayIndex],
                    currentTime: allTimeArr[timeIndex],
                    name: name,
                    address: address,
                    phone: phone
                };
                callback(null, data);
            });
        },
        // 渲染内容
        render: function(data) {
            var self = this;
            var html = template(this.template, data);

            this.el.html(html);
            //TODO，初始化自定义select
            setTimeout(function() {
                initCustomSelect.call(self, data)
            }, 200);

            var nextStepBtn = this.el.find('.j-nextstep');
            nextStepBtn.bind('click', function(e) {
                var provinceInput = self.el.find('input[name=provinceInput]');
                var cityInput = self.el.find('input[name=cityInput]');
                var addressInput = self.el.find('input[name=addressInput]');
                var dayInput = self.el.find('input[name=dayInput]');
                var timeInput = self.el.find('input[name=timeInput]');
                var nameInput = self.el.find('input[name=nameInput]');
                var phoneInput = self.el.find('input[name=phoneInput]');

                var province = provinceInput.val();
                var city = cityInput.val();
                var address = addressInput.val();
                var day = dayInput.val();
                var time = timeInput.val();
                var name = nameInput.val();
                var phone = phoneInput.val();

                e.stopPropagation();
                e.preventDefault();
                if (!address || !name || !phone) {
                    if (!address) {
                        alert("请填写详细地址后再提交，谢谢：）");
                    } else if (!name) {
                        alert("请填写姓名后再提交，谢谢：）");
                    } else if (!phone) {
                        alert("请填写电话号码后再提交，谢谢：）");
                    }
                    return;
                }

                self.currentOrder.province = data.allProvinceArr[province];
                self.currentOrder.city = data.allCityMatrix[province][city];
                self.currentOrder.cityCode = data.allCities[province].cities[city].cityCode;
                self.currentOrder.address = address;
                self.currentOrder.day = data.allDayArr[day];
                self.currentOrder.time = ['09:00','13:00'][time];
                self.currentOrder.name = name;
                self.currentOrder.phone = phone;
                var d = util.makeDateFromStr(self.currentOrder.day + " " + self.currentOrder.time);
                self.currentOrder.date = d.valueOf();
                self.currentOrder.save();
                var url = config.API_HOST + '/users/me/orders';
                $.ajax({
                    type: 'POST',
                    url: url,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "modelId": self.currentOrder.modelId,
                        "cityCode": self.currentOrder.cityCode,
                        "name": self.currentOrder.name,
                        "address": self.currentOrder.address,
                        "phone": self.currentOrder.phone,
                        "date": self.currentOrder.date,
                        "services": self.currentOrder.services
                    }),
                    success: function(responseData, status, xhr) {
                        try{
                            delete sessionStorage.stepSchedule;
                        }catch(e){

                        }
                        self.page.navigate('/service/' + data.service_id + '/model/' + data.model_id + '/success');
                    },
                    error: function(xhr, errorType, error) {
                        alert("Error: " + errorType + error);
                    }
                });

            });
        },
        saveUserInput: function(){
            //将用户的操作/选择 存储到sessionStorage
            var self = this;
        
            var userInputs={};
            var userInputEls = self.el.find('input'), inputName;
            userInputEls.forEach(function(input, i){
                inputName = input.name;
                userInputs[inputName] = input.value || '';
            });
            sessionStorage['scheduleUserInput'] = JSON.stringify(userInputs);
        },
        // 离开到其对应的url时执行
        deactivate: function() {
            this.saveUserInput();
            this.moveout();
            this.clean();
        },
        // 回复用户之前输入/选择的内容
        restoreUserInput: function(){
            var userInputs;
            userInputs = sessionStorage['scheduleUserInput'];
            if(userInputs){
                try{
                    userInputs = JSON.parse(userInputs);
                }catch(e){
                    userInputs = {}
                }
            }
            delete sessionStorage['scheduleUserInput'];
            return userInputs;
        },
        getData: function(params, callback) {
            var self = this;
            //TODO Order.find("-1") first
            // debugger;
            delete this.currentOrder;
            try {
                this.currentOrder = Order.find("-1");
            } catch (e) {
            }
            if (!this.currentOrder  || this.currentOrder.destroyed) {
                this.page.navigate('/service/' + params.service_id + '/model/' + params.model_id + '/cart');
                return;
            }
            try{
                //标示用户来到上门信息页面
                sessionStorage.stepSchedule = 1;
            }catch(e){

            }
            userInputs = self.restoreUserInput();
            params.userInputs = userInputs;
            self.doGetData(params, function(err, data) {
                $.extend(params, data, {
                    sum: self.currentOrder.sum
                });
                callback(err, data);
            });
        }
    });

    function initCustomSelect(data) {
        var self = this;
        var optArrs = [
            data.allProvinceArr.map(function(p) {
                return [p];
            }),
            (data.allCityMatrix[data.currentProvinceIndex] || []).map(function(c) {
                return [c];
            }),
            data.allDayArr.map(function(d) {
                return [d];
            }),
            data.allTimeArr.map(function(t) {
                return [t];
            })
        ];
        var selectWrappers = document.querySelectorAll('.select-wrapper');
        var selectWrapper, selectTrigger, selectInput;
        var customSelectArr = [],
            customSelect, selectTriggerArr = [],
            selectInputArr = [];
        for (var i = 0, ilen = selectWrappers.length; i < ilen; i++) {
            selectWrapper = selectWrappers[i];
            selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
            selectInput = selectWrapper.querySelector('input');
            if(!selectInput.value){
                selectInput.value = 0; //默认第一个为selected
            }
            selectTriggerArr.push(selectTrigger);
            selectInputArr.push(selectInput);

            if (selectTrigger && selectInput) {
                (function(selectTrigger, selectInput, i) {
                    customSelect = new CustomSelect({
                        triggerEl: selectTrigger,
                        inputEl: selectInput,
                        optArr: optArrs[i],
                        onchange: function onchange(selectedIndex) {
                            function updateTriggerEl(selectTrigger, data) {
                                var productNameEl = selectTrigger.querySelector('.product-name');
                                var priceEl = selectTrigger.querySelector('.price');
                                productNameEl.innerHTML = data[0];
                                if (priceEl) {
                                    priceEl.innerHTML = data[1];
                                }
                            }
                            if (selectedIndex !== -1) {
                                updateTriggerEl(selectTrigger, optArrs[i][selectedIndex]);
                            }
                            if (i === 0 && selectedIndex !== -1 && selectedIndex !== data.currentProvinceIndex) {
                                //切换省份的select时，级联更新市区select
                                data.currentProvinceIndex = selectedIndex;
                                data.currentProvince = data.allProvinceArr[selectedIndex];
                                data.currentCity = data.allCityMatrix[selectedIndex][0];
                                data.currentCityIndex = 0;
                                var newCityArr = data.allCityMatrix[selectedIndex].map(function(c) {
                                    return [c];
                                });
                                optArrs[i + 1] = newCityArr;
                                updateTriggerEl(selectTriggerArr[i + 1], newCityArr[0]);

                                //更新市区select内部的选项数组，并弹出选择界面供用户立即选择
                                customSelectArr[i + 1].render(newCityArr);
                                //只更新市区select内部的选项数组，不弹出选择界面给用户
                                //customSelectArr[i + 1].rebuildOptArr(newCityArr);
                            }
                        }
                    });
                    customSelectArr.push(customSelect);
                })(selectTrigger, selectInput, i)
            }
        };
    }
    return CarSchedule;
});