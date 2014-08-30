/*
 * 预约上门信息 页面的controller
 */
define(function(require, exports) {
    var Brand = require('../model/brand');
    var Model = require('../model/model');
    var CustomSelect = require('../widgets/CustomSelect');

    var CarSchedule = require('./common').sub({
        // 该controller要渲染&控制的区域
        el: $('#car-schedule'),

        title: '上门服务信息',

        template: 'template-schedule',

        getData: function(params, callback){
            var data = {
                // brand_name: Brand.findByAttribute('brand_id', params.brand_id).brand_name,
                // list: Brand.getSeriesByBrandId(params.brand_id)
            };

            callback(null, data);
        },
        // 渲染内容
        render: function(params){

            var html = template(this.template, params);

            this.el.html(html);
            //TODO，初始化自定义select
            setTimeout(initCustomSelect, 200)
        },
    });
    function initCustomSelect(){
        initSelect();
        function initSelect () {
            var optArrs = [
                [
                    ['北京市'],
                    ['上海市'],
                    ['广州市'],
                    ['天津市']
                ],
                [
                    ['东城区'],
                    ['朝阳区'],
                    ['海淀区'],
                    ['西城区']
                ],
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

            for(var i = 0, ilen = selectWrappers.length; i < ilen; i++){
                selectWrapper = selectWrappers[i];
                selectTrigger = selectWrapper.querySelector('.custom-select-trigger');
                selectInput = selectWrapper.querySelector('input');
                
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
    return CarSchedule;
});