/*
 * 预约上门信息 页面的controller
 */
define(function(require, exports) {
    var util = require('../component/util');
    var City = require('../model/city');
    var Contact = require('../model/contact');
    var Brand = require('../model/brand');
    var Model = require('../model/model');
    var CustomSelect = require('../widgets/CustomSelect');

    var CarSchedule = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-schedule'),

        title: '上门服务信息',

        template: 'template-schedule',

        getData: function(params, callback){
            var self = this;
            util.finish([
                City.fetch(),
                Contact.fetch({uid:'me'})
            ], function(cities, contacts){
                var currentContact, currentProvinceIndex, currentCityIndex,currentProvince, currentCity;
                var name, address, phone;
                var allProvinceArr = [], allCityMatrix = [];
                currentProvinceIndex = currentCityIndex = 0;

                if(contacts && contacts.length){
                    currentContact = contacts[0];
                    name = currentContact.name;
                    address = currentContact.address;
                    phone = currentContact.phone;
                    cities.forEach(function(c, i){
                        var tempArr = [];
                        allProvinceArr.push(c.province);
                        allCityMatrix.push(tempArr);
                        c.cities.forEach(function(d,j){
                            tempArr.push(d.city);
                            if(d.cityCode == currentContact.cityCode){
                                currentProvinceIndex = i;
                                currentCityIndex = j;
                            }
                        })
                    });
                    if(currentProvinceIndex !== 0){
                        //TODO 把用户的province 挪到province列表中的第一位，默认选中用户的
                    }
                    if(currentCityIndex !== 0){
                        //TODO 把用户的city 挪到city列表中的第一位，默认选中用户的
                    }
                }
                currentProvince = cities[currentProvinceIndex].province;
                currentCity = cities[currentProvinceIndex].cities[currentCityIndex].city;

                var data = $.extend(params, {
                    currentProvinceIndex: currentProvinceIndex,
                    currentCityIndex: currentCityIndex,
                    currentProvince: currentProvince,
                    currentCity: currentCity,
                    allCities: cities,
                    allProvinceArr: allProvinceArr,
                    allCityMatrix: allCityMatrix,
                    name: name,
                    address: address,
                    phone: phone
                });
                callback(null, data);
            });
        },
        // 渲染内容
        render: function(data){
            var self = this;
            var html = template(this.template, data);

            this.el.html(html);
            //TODO，初始化自定义select
            setTimeout(function(){
                initCustomSelect.call(self, data)
            }, 200)
        }
    });
    function initCustomSelect(data){
        var self = this;
        var optArrs = [
            data.allProvinceArr.map(function(p){
                return [p];
            }),
            data.allCityMatrix[data.currentProvinceIndex].map(function(c){
                return [c];
            })
            ,
            [
                ['2014-07-22'],
                ['2014-07-23'],
                ['2014-07-24'],
                ['2014-07-25'],
                ['2014-07-26'],
                ['2014-07-27'],
                ['2014-07-28']
            ],
            [
                ['08:00'],
                ['09:00'],
                ['10:00'],
                ['11:00'],
                ['12:00'],
                ['13:00'],
                ['14:00'],
                ['15:00'],
                ['16:00'],
                ['17:00']
            ]
        ];
        var selectWrappers = document.querySelectorAll('.select-wrapper');
        var selectWrapper, selectTrigger, selectInput;
        var customSelectArr = [], customSelect, selectTriggerArr = [], selectInputArr = [];
        for(var i = 0, ilen = selectWrappers.length; i < ilen; i++){
            selectWrapper = selectWrappers[i];
            selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
            selectInput = selectWrapper.querySelector('input');
            selectTriggerArr.push(selectTrigger);
            selectInputArr.push(selectInput);

            if(selectTrigger && selectInput){
                (function(selectTrigger, selectInput, i){
                    customSelect = new CustomSelect({
                        triggerEl: selectTrigger,
                        inputEl: selectInput,
                        optArr: optArrs[i], 
                        onchange: function onchange(selectedIndex){
                            function updateTriggerEl(selectTrigger, data){
                                var productNameEl = selectTrigger.querySelector('.product-name');
                                var priceEl = selectTrigger.querySelector('.price');
                                productNameEl.innerHTML = data[0];
                                if(priceEl){
                                    priceEl.innerHTML = data[1];
                                } 
                            }
                            if(selectedIndex !== -1){
                               updateTriggerEl(selectTrigger, optArrs[i][selectedIndex]);
                            }
                            if( i === 0 && selectedIndex !== -1 && selectedIndex !== data.currentProvinceIndex){
                                //切换省份的select时，级联更新市区select
                                data.currentProvinceIndex = selectedIndex;
                                data.currentProvince = data.allProvinceArr[selectedIndex];
                                data.currentCity = data.allCityMatrix[selectedIndex][0];
                                data.currentCityIndex = 0;
                                var newCityArr = data.allCityMatrix[selectedIndex].map(function(c){
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