define(function(require, exports) {
    var config = require('../component/config');
    var Order = require('./common').sub();
    var util = require('../component/util');

    Order.configure(
        'Order',
        'id',
        'status',
        'technicianId',
        'created',
        'modified',
        'sum',
        'modelId',
        'model',
        'vid',
        'plate',
        'cityCode',
        'province',
        'city',
        'address',
        'name',
        'phone',
        'date',
        'services'
    );

    Order.extend({
        url: {
            list: config.API_HOST + '/users/${uid}/orders',
            detail: config.API_HOST + '/users/${uid}/orders/${order_id}'
        },

        process: function(order){
            var date = new Date(order.date),
                periodMap = ['凌晨', '上午', '下午', '晚上'],
                statusInfoMap = {
                    0: {
                        desc: '等待中',
                        name: 'waiting'
                    },
                    1: {
                        desc: '已排期',
                        name: 'scheduled'
                    },
                    2: {
                        desc: '已完成',
                        name: 'finished'
                    },
                    3: {
                        desc: '已取消',
                        name: 'canceled'
                    }
                };

            return $.extend(order, {
                year: util.formatNum(date.getFullYear(), 4),
                month: util.formatNum(date.getMonth(), 2),
                day: util.formatNum(date.getDate(), 2),
                period: periodMap[Math.floor(date.getHours() / 6)],
                statusInfo: statusInfoMap[order.status],
                fullAddress: [order.province, order.city, order.address].join('')
            });
        },

        fetch: function(url, params, save, callback){
            var Model = this;

            params.uid = params.uid || 'me';
            url = util.format(url, params);

            var fetch = function(cb){
                var fetched = Model.fetched = Model.fetched || {};

                // with cache
                if(fetched[url]){
                    cb(null, fetched[url]);

                // without cache
                }else{
                    $.getJSON(url, function(data){

                        save(data);

                        // cache result
                        fetched[url] = data;

                        cb(null, data);
                    });
                }

            };

            return callback ? fetch(callback) : fetch;
        },

        fetchList: function(params, callback){
            var Model = this;

            return this.fetch(Model.url.list, params, function(list){
                list.forEach(function(item){
                    item = Model.process(item);
                    Model.create(item);
                });
            }, callback);
        },

        fetchDetail: function(params, callback){
            var Model = this;

            return this.fetch(Model.url.detail, params, function(detail){
                detail = Model.process(detail);
                Model.create(detail);
            }, callback);
        }
    });

    return Order;
});