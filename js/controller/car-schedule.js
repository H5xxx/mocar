/*
 * 预约上门信息 页面的controller
 */
define(function(require, exports) {
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

        getData: function(params, callback) {
            var self = this;
            util.finish([
                City.fetch(),
                Contact.fetch({
                    uid: 'me'
                })
            ], function(cities, contacts) {
                var currentContact, currentProvinceIndex, currentCityIndex, currentProvince, currentCity;
                var name, address, phone;
                var allProvinceArr = [],
                    allCityMatrix = [];
                currentProvinceIndex = currentCityIndex = 0;

                if (contacts && contacts.length) {
                    currentContact = contacts[0];
                    name = currentContact.name;
                    address = currentContact.address;
                    phone = currentContact.phone;
                    var tempArr;
                    cities.forEach(function(c, i) {
                        tempArr = [];
                        allProvinceArr.push(c.province);
                        allCityMatrix.push(tempArr);
                        c.cities.forEach(function(d, j) {
                            tempArr.push(d.city);
                            if (d.cityCode == currentContact.cityCode) {
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
                currentProvince = cities[currentProvinceIndex].province;
                currentCity = cities[currentProvinceIndex].cities[currentCityIndex].city;

                //可提前7天预订
                var allDayArr = util.getDayArr(7);
                //可预订的时间
                var allTimeArr = [
                    '08:00', '09:00', '10:00', '11:00', '12:00',
                    '13:00', '14:00', '15:00', '16:00', '17:00'
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
                    currentDayIndex: 0,
                    currentTimeIndex: 0,
                    currentDay: allDayArr[0],
                    currentTime: allTimeArr[0],
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

                self.currrentOrder.province = data.allProvinceArr[province];
                self.currrentOrder.city = data.allCityMatrix[province][city];
                self.currrentOrder.cityCode = data.allCities[province].cities[city].cityCode;
                self.currrentOrder.address = address;
                self.currrentOrder.day = data.allDayArr[day];
                self.currrentOrder.time = data.allTimeArr[time];
                self.currrentOrder.name = name;
                self.currrentOrder.phone = phone;
                var d = new Date(self.currrentOrder.day + " " + self.currrentOrder.time);
                self.currrentOrder.date = d.valueOf();
                self.currrentOrder.save();
                var url = 'http://api.mocar.cn/user/me/orders';
                $.ajax({
                    type: 'POST',
                    url: url,
                    contentType: 'application/json',
                    data: {
                        "modelId": self.currrentOrder.modelId,
                        "cityCode": self.currrentOrder.cityCode,
                        "name": self.currrentOrder.name,
                        "address": self.currrentOrder.address,
                        "phone": self.currrentOrder.phone,
                        "date": self.currrentOrder.date,
                        "services": self.currrentOrder.services
                    },
                    success: function(responseData, status, xhr) {
                        self.page.navigate('/service/' + data.service_id + '/model/' + data.model_id + '/success');
                    },
                    error: function(xhr, errorType, error) {
                        alert("Error: " + errorType + error);
                    }
                });

            });
        },
        activate: function(params) {
            var self = this;
            //TODO Order.find("-1") first
            try {
                this.currrentOrder = Order.find("-1");
            } catch (e) {

            }
            if (!this.currrentOrder) {
                this.page.navigate('/service/' + params.service_id + '/model/' + params.model_id + '/cart');
                return;
            }

            self.getData(params, function(err, data) {
                $.extend(params, data, {
                    sum: self.currrentOrder.sum
                });
                util.title(self.title);
                self.fadein();
                self.render(params);
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
            selectInput.value = 0; //默认第一个为selected
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