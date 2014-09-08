define(function (require, exports, module) {
	var util = require('./util');
	var API_HOST = 'http://api.mocar.cn'
	API_HOST = 'http://182.92.185.233:8080';
	var json = util.parseURL();
	if(json && json.params && json.params['api_hostname']){
		API_HOST = 'http://'+ json.params['api_hostname'];
		if(json.params['api_port']){
			API_HOST += ":" + json.params['api_port'];
		}
	}
	module.exports = {
		API_HOST: API_HOST,
	};
})