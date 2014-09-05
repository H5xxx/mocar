
##接口定义

###AccessToken接口

####获取AccessToken

**资源标识:** /authority/token

**方法:** GET

**请求响应示例：**

```HTTP
GET /authority/token?credential=WX31429825 HTTP/1.1
Host: api.mocar.cn
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 66

{
    "accessToken" : "126688deb863604b",
    "expiresIn" : 7200
}
```

**路径参数：**

*无*

**查询参数：**

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|credential     |string		|-	|[凭据](#struct-credential)|

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |成功获取accessToken|
|403    |[凭据](#struct-credential)无效|

**返回数据：**

|类型       |描述|
|:--        |:--|
|object     |[Token信息](#struct-token-info)对象|


####注销AccessToken

**资源标识:** /authority/token/{token}

**方法:** DELETE

**请求响应示例：**

```HTTP
DELETE /authority/token/126688deb863604b HTTP/1.1
Host: api.mocar.cn
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
```

**路径参数：**

*无*

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |AccessToken已注销|

**返回数据：**

*无*


###用户车辆接口

####获取车辆列表(*)

**资源标识:** /user/{uid}/vehicles

**方法:** GET

**请求响应示例：**

```HTTP
GET /user/me/vehicles HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 341

[
    {
        "id" : 28473,
        "modelId" : 12,
        "model" : "奥迪进口A4 1.8T",
        "plate" : "京NB110A",
        "vid" : "1G1BL52P7TR115520",
    },
    {
        "id" : 28474,
        "modelId" : 13,
        "model" : "奥迪进口A4 2.0",
        "plate" : "京NB110B",
        "vid" : "1G1BL52P7TR115521",
    }
]
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户或"everyone"表示所有用户|

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |获取车辆列表成功|
|401    |未提供access token或access token已过期|
|403    |没有权限获取该用户的车辆|
|404    |指定的用户不存在|

**返回数据：**

|类型       |描述|
|:--        |:--|
|array      |[车辆](#struct-vehicle)对象数组|

####创建车辆(*)

**资源标识:** /user/{uid}/vehicles

**方法:** POST

**请求响应示例：**

```HTTP
POST /user/me/vehicles HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Content-Type: application/json
Content-Length: 82

{
    "modelId" : 13,
    "plate" : "京NB110B",
    "vid" : "1G1BL52P7TR115521",
}
```
```HTTP
HTTP/1.1 201 Created
Location: /user/18265836/vehicles/28475
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户|

**查询参数：**

*无*

**请求数据：**

|类型       |描述|
|:--        |:--|
|object     |[车辆](#struct-vehicle)对象|

**状态码：**

|状态码	|含义|
|:--	|:--|
|201    |创建车辆成功|
|401    |未提供access token或access token已过期|
|403    |没有权限为该用户创建车辆|
|404    |指定的用户不存在|
|422    |车辆信息不完整|

**返回数据：**

*无*

####修改车辆(*)

**资源标识:** /user/{uid}/vehicles/{vid}

**方法:** PUT

**请求响应示例：**

```HTTP
PUT /user/me/vehicles/28475 HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Content-Type: application/json
Content-Length: 82

{
    "modelId" : 13,
    "plate" : "京NB110B",
    "vid" : "1G1BL52P7TR115521",
}
```
```HTTP
HTTP/1.1 200 OK
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户|
|vid            |string		|车辆ID（注：这**不是**车辆识别代码）|

**查询参数：**

*无*

**请求数据：**

|类型       |描述|
|:--        |:--|
|object     |[车辆](#struct-vehicle)对象|

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |修改车辆成功|
|401    |未提供access token或access token已过期|
|403    |没有权限修改该用户的车辆|
|404    |指定的用户不存在|
|422    |车辆信息不完整|

**返回数据：**

*无*

####删除车辆(*)

**资源标识:** /user/{uid}/vehicles/{vid}

**方法:** DELETE

**请求响应示例：**

```HTTP
DELETE /user/me/vehicles/28475 HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
```
```HTTP
HTTP/1.1 200 OK
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户|
|vid            |string		|车辆ID（注：这**不是**车辆识别代码）|

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |删除车辆成功|
|401    |未提供access token或access token已过期|
|403    |没有权限删除该用户的车辆|
|404    |指定的用户不存在|

**返回数据：**

*无*

###用户地址接口

####获取地址列表(*)

**资源标识:** /user/{uid}/contacts

**方法:** GET

**请求响应示例：**

```HTTP
GET /user/me/contacts HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 461

[
    {
        "id" : 183642,
        "name" : "张先生",
        "cityCode" : "110100",
        "city" : "北京市",
        "address" : "海淀区西二旗西路领袖新硅谷D区101",
        "phone" : "186xxxxxxxx"
    },
    {
        "id" : 183643,
        "name" : "王女士",
        "cityCode" : "110100",
        "city" : "北京市",
        "address" : "海淀区西二旗西路领袖新硅谷D区101",
        "phone" : "139xxxxxxxx"
    }
]
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户或"everyone"表示所有用户|

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |获取地址列表成功|
|401    |未提供access token或access token已过期|
|403    |没有权限获取该用户的地址|
|404    |指定的用户不存在|

**返回数据：**

|类型       |描述|
|:--        |:--|
|array      |[地址](#struct-contact)对象数组|

####创建地址(*)

**资源标识:** /user/{uid}/contacts

**方法:** POST

**请求响应示例：**

```HTTP
POST /user/me/contacts HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Content-Type: application/json
Content-Length: 151

{
    "name" : "王女士",
    "cityCode" : "110100",
    "address" : "海淀区西二旗西路领袖新硅谷D区101",
    "phone" : "139xxxxxxxx"
}
```
```HTTP
HTTP/1.1 201 Created
Location: /user/18265836/contacts/183644
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户|

**查询参数：**

*无*

**请求数据：**

|类型       |描述|
|:--        |:--|
|object     |[地址](#struct-contact)对象|

**状态码：**

|状态码	|含义|
|:--	|:--|
|201    |创建地址成功|
|401    |未提供access token或access token已过期|
|403    |没有权限为该用户创建地址|
|404    |指定的用户不存在|
|422    |地址信息不完整|

**返回数据：**

*无*

####修改地址(*)

**资源标识:** /user/{uid}/contacts/{cid}

**方法:** PUT

**请求响应示例：**

```HTTP
PUT /user/me/contacts/183644 HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Content-Type: application/json
Content-Length: 151

{
    "name" : "王女士",
    "cityCode" : "110100",
    "address" : "海淀区西二旗西路领袖新硅谷D区101",
    "phone" : "139xxxxxxxx"
}
```
```HTTP
HTTP/1.1 200 Created
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户|
|cid            |string		|地址ID|

**查询参数：**

*无*

**请求数据：**

|类型       |描述|
|:--        |:--|
|object     |[地址](#struct-contact)对象|

**状态码：**

|状态码	|含义|
|:--	|:--|
|201    |修改地址成功|
|401    |未提供access token或access token已过期|
|403    |没有权限修改该用户的地址|
|404    |指定的用户不存在|
|422    |地址信息不完整|

**返回数据：**

*无*

####删除地址(*)

**资源标识:** /user/{uid}/contacts/{cid}

**方法:** DELETE

**请求响应示例：**

```HTTP
DELETE /user/me/contacts/183644 HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
```
```HTTP
HTTP/1.1 200 OK
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户|
|cid            |string		|地址ID|

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |删除地址成功|
|401    |未提供access token或access token已过期|
|403    |没有权限删除该用户的地址|
|404    |指定的用户不存在|

**返回数据：**

*无*

###订单接口

####获取订单列表(*)

**资源标识:** /user/{uid}/orders

**方法:** GET

**请求响应示例：**

```HTTP
GET /user/me/orders HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 428

[
    {
        "id" : 243213,
        "status" : 1,
        "modified" : 1388505600000,
        "model" : "国产奥迪A4 1.8T",
        "plate" : "京NB110A",
        "title" : "常规保养",
        "date": 1388505700000
    },
    {
        "id" : 243214,
        "status" : 1,
        "modified" : 1388505600000,
        "model" : "国产奥迪A4 1.8T",
        "plate" : "京NB110A",
        "title" : "空调灭菌",
        "date": 1388505700000
    },
]
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户或"everyone"表示所有用户|

**查询参数：**

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|status         |int        |Y	|[订单状态](#enum-order-status)，多个状态之间可用","分开，查询时会执行或操作|
|plate          |string     |Y	|车牌号，多个车牌可用","分开，查询时会执行或操作|

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |获取订单列表成功|
|401    |未提供access token或access token已过期|
|403    |没有权限获取该用户的订单|
|404    |指定的用户不存在|

**返回数据：**

|类型       |描述|
|:--        |:--|
|array      |[订单摘要](#struct-order-summary)对象数组|

####获取订单(*)

**资源标识:** /user/{uid}/orders/{oid}

**方法:** GET

**请求响应示例：**

```HTTP
GET /user/me/orders/243213 HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 428

{
    "id" : 243213,
    "status" : 2,
    "technicianId" : 1,
    "created" : 1388505600000,
    "modified" : 1388505600000,
    "sum" : 150
    "modelId" : 12
    "model" : "国产奥迪A4 1.8T",
    "vid" : null,
    "plate" : null,
    "cityCode" : 100080,
    "province" : "北京市",
    "city" : "海淀区",
    "address" : "海淀区西二旗西路领袖新硅谷D区101",
    "name" : "张先生",
    "phone" : "186xxxxxxxx",
    "date": 1388505700000,
    "services" : [
        {
	        "type" : "摩卡服务",
            "name" : "常规保养",
            "price" : 150,
            "quantity" : 1,
            "parts" : [
                {
                    "type" : "发动机机油",
                    "name" : "自备",
                    "quantity" : 5,
                    "price" : 0,
                },
                {
                    "type" : "机油滤清器",
                    "name" : "马勒OC595",
                    "quantity" : 1,
                    "price" : 17,
                },
                {
                    "type" : "空气滤清器",
                    "name" : "马勒LX2115",
                    "quantity" : 1,
                    "price" : 31,
                },
                {
                    "type" : "空调滤清器",
                    "name" : "马勒LA513",
                    "quantity" : 1,
                    "price" : 34,
                },
            ],
        },
        ...
    ],
}
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户或"everyone"表示所有用户|
|oid            |string		|订单ID|

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |获取订单成功|
|401    |未提供access token或access token已过期|
|403    |没有权限获取该用户的订单|
|404    |指定的用户不存在|

**返回数据：**

|类型       |描述|
|:--        |:--|
|object     |[地址](#struct-order)对象|

####创建订单(*)

**资源标识:** /user/{uid}/orders

**方法:** POST

**请求响应示例：**

```HTTP
POST /user/me/contacts HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Content-Type: application/json
Content-Length: 151

{
    "modelId" : 12
    "cityCode" : "100080",
    "name" : "张先生",
    "address" : "海淀区西二旗西路领袖新硅谷D区101",
    "phone" : "186xxxxxxxx",
    "date": 1388505700000,
    "services" : [
        {
            "id" : 10001
            "parts" : [
                {
	                "typeId" : "1",
                    "id" : 120
                },
                {
	                "typeId" : "2",
                    "id" : 121
                },
                {
	                "typeId" : "3",
                    "id" : 122
                },
                {
	                "typeId" : "4",
                    "id" : 123
                },
            ],
        },
        ...
    ],
}
```
```HTTP
HTTP/1.1 201 Created
Location: /user/18265836/orders/203844
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|uid            |string		|用户ID，可使用“me“表示当前用户|

**查询参数：**

*无*

**请求数据：**

|类型       |描述|
|:--        |:--|
|object     |[订单](#struct-order)对象|

**状态码：**

|状态码	|含义|
|:--	|:--|
|201    |创建订单成功|
|401    |未提供access token或access token已过期|
|403    |没有权限为该用户创建订单|
|404    |指定的用户不存在|
|422    |订单信息不完整|

**返回数据：**

*无*

###服务接口

####获取服务列表(*)

**资源标识:** /models/{vid}/services

**方法:** GET

**请求响应示例：**

```HTTP
GET /models/{vid}/services HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 428

[
	{
		"id":1,
		"name":"常规保养",
		"slogan":"附赠发动机仓清洗服务",
		"description":"最专业的技师，最合理的价格。",
		"price":150.0,
		"highestPrice":300.0
	},
	{
		"id":2,
		"name":"空调灭菌",
		"slogan":"专业、严谨",
		"description":"使用德国进口药液，有效杀灭细菌。",
		"price":400.0,
		"highestPrice":600.0
	},
	...
]
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|vid            |string		|车型id，可用“generic”表示通用信息|

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |获取订单列表成功|

**返回数据：**

|类型       |描述|
|:--        |:--|
|array      |[服务信息摘要](#struct-service-info-summary)对象数组|

####获取服务详情(*)

**资源标识:** /models/{vid}/services/{sid}

**方法:** GET

**请求响应示例：**

```HTTP
GET /models/1/services/1 HTTP/1.1
Host: api.mocar.cn
Access-Token: 126688deb863604b
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 428

{
	"id":1,
	"name":"常规保养",
	"slogan":"附赠发动机仓清洗服务",
	"description":"最专业的技师，最合理的价格。",
	"price":300.0,
	"parts":[
		{
			"name":"发动机机油",
			"unit":"升",
			"quantity":5,
			"options":[
				{
					"id":101,
					"typeId":1,
					"brand":"美孚",
					"name":"0W-40",
					"extra":"",
					"price":85.0,
					"hint":""
				},
				{
					"id":2,
					"typeId":0,
					"brand":"",
					"name":"自行购买",
					"extra":"",
					"price":0.0,
					"hint":""
				}
			]
		},
		{
			"name":"机油滤清器",
			"unit":"个",
			"quantity":1,
			"options":[
				{
					"id":1,
					"typeId":0,
					"brand":"",
					"name":"原厂代购",
					"extra":"",
					"price":0.0,
					"hint":"实价"
				},
				{
					"id":2,
					"typeId":0,
					"brand":"",
					"name":"自行购买",
					"extra":"",
					"price":0.0,
					"hint":""
				}
			]
		},
		{
			"name":"空气滤清器",
			"unit":"个",
			"quantity":1,
			"options":[
				{
					"id":1,
					"typeId":0,
					"brand":"",
					"name":"原厂代购",
					"extra":"",
					"price":0.0,
					"hint":"实价"
				},
				{
					"id":2,
					"typeId":0,
					"brand":"",
					"name":"自行购买",
					"extra":"",
					"price":0.0,
					"hint":""
				},
				{
					"id":3,
					"typeId":0,
					"brand":"",
					"name":"不更换该配件",
					"extra":"",
					"price":0.0,
					"hint":""
				}
			]
		},
		{
			"name":"空调滤清器",
			"unit":"个",
			"quantity":1,
			"options":[
				{
					"id":1,
					"typeId":0,
					"brand":"",
					"name":"原厂代购",
					"extra":"",
					"price":0.0,
					"hint":"实价"
				},
				{
					"id":2,
					"typeId":0,
					"brand":"",
					"name":"自行购买",
					"extra":"",
					"price":0.0,
					"hint":""
				},
				{
					"id":3,
					"typeId":0,
					"brand":"",
					"name":"不更换该配件",
					"extra":"",
					"price":0.0,
					"hint":""
				}
			]
		}
	]
}
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|vid            |string		|车型id|
|sid            |string		|服务id|

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |获取服务信息成功|
|401    |未提供access token或access token已过期|
|403    |服务器拒绝查询|

**返回数据：**

|类型       |描述|
|:--        |:--|
|object      |[服务信息](#struct-service)对象数组|



###公共数据接口

####获取城市列表

**资源标识:** /location/cities

**方法:** GET

**请求响应示例：**

```HTTP
GET /location/cities HTTP/1.1
Host: api.mocar.cn
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 66

[
	{
		"province":"北京市",
		"cities":[
			{
				"cityCode":100010,
				"city":"东城区"
			},
			{
				"cityCode":100020,
				"city":"朝阳区"
			},
			...
		]
	},
	...
]
```

**路径参数：**

*无*

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |成功获取城市列表|

**返回数据：**

|类型       |描述|
|:--        |:--|
|array      |[省份信息](#struct-province)数组|


####获取汽车品牌列表

**资源标识:** /automobile/brands

**方法:** GET

**请求响应示例：**

```HTTP
GET /automobile/brands HTTP/1.1
Host: api.mocar.cn
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 66

[
	{
		"id" : 1,
		"latter" : "A",
		"brand" : "奥迪"
	},
	{
		"id" : 2,
		"latter" : "B",
		"brand" : "宝马"
	},
	...
]
```

**路径参数：**

*无*

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |成功获取汽车品牌列表|

**返回数据：**

|类型       |描述|
|:--        |:--|
|array      |[汽车品牌信息](#struct-brand)数组|


####获取汽车品牌列表

**资源标识:** /automobile/brands/{bid}/families

**方法:** GET

**请求响应示例：**

```HTTP
GET /automobile/brands/1/families HTTP/1.1
Host: api.mocar.cn
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 66

[
	{
		"id" : 1,
		"prefix" : "进口",
		"family" : "A1(8X)"
	},
	{
		"id" : 2,
		"prefix" : "进口",
		"family" : "A3(8L)"
	},
	...
]
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|bid            |string		|汽车品牌id|

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |成功获取汽车车系列表|
|404    |品牌不存在|

**返回数据：**

|类型       |描述|
|:--        |:--|
|array      |[汽车车系信息](#struct-family)数组|


####获取汽车车型列表

**资源标识:** /automobile/brands/{bid}/families/{fid}/models

**方法:** GET

**请求响应示例：**

```HTTP
GET /automobile/brands/1/families/1/models HTTP/1.1
Host: api.mocar.cn
Accept: application/json
```
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 66

[
	{
		"id" : 1,
		"model" : "1.2 TFSI (8X)",
		"suffix" : "2010款"
	},
	{
		"id" : 2,
		"model" : "1.4 TFSI (8X)",
		"suffix" : "2010款"
	},
	...
]
```

**路径参数：**

|名称			|类型		|描述|
|:--			|:--		|:--|
|bid            |string		|汽车品牌id|
|fid            |string		|汽车车系id|

**查询参数：**

*无*

**请求数据：**

*无*

**状态码：**

|状态码	|含义|
|:--	|:--|
|200    |成功获取汽车车系列表|
|404    |品牌或车系不存在|

**返回数据：**

|类型       |描述|
|:--        |:--|
|array      |[汽车车系信息](#struct-family)数组|


















##数据格式

<a name="struct-credential"></a>
###凭据

凭据是一个0-9A-Za-z的字符串，头部两个字节用来标识凭据类型，余下字符串为凭据内容。

####微信CODE凭据

**类型标识：**

>WX

**凭据内容：**

>微信接口“https://open.weixin.qq.com/connect/oauth2/authorize”返回的CODE值。

**示例：**

```text
WX31429825
```

<a name="struct-token-info"></a>
###Token信息

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|accessToken    |string	    |-	|用于后续访问受限接口的access token|
|expiresIn      |long       |-	|access token的有效期|

<a name="struct-vehicle"></a>
###车辆

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-	|车辆在数据库中的唯一ID|
|modelId        |int        |-	|车型ID|
|model          |string	    |-	|车型名称|
|plate          |string     |-	|车牌号|
|vid            |string     |-	|车辆识别代码|

<a name="struct-contact"></a>
###地址

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |地址在数据库中的唯一ID|
|name           |string     |-  |联系人姓名|
|cityCode       |int        |-  |城市代码|
|province       |string     |-  |省份名称|
|city           |string     |-  |城市名称|
|address        |string     |-  |详细地址|
|phone          |string     |-  |联系电话|

<a name="struct-service-info-summary"></a>
###服务信息摘要

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |服务信息在数据库中的唯一ID|
|name           |string     |-  |服务名称|
|slogan         |string     |-  |服务的标语|
|description    |string     |-  |服务的描述|
|price          |array      |-  |服务最低价格|
|highestPrice   |array      |-  |服务最高价格|

<a name="struct-service-info"></a>
###服务信息

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |服务信息在数据库中的唯一ID|
|name           |string     |-  |服务名称|
|slogan         |string     |-  |服务的宣传标语|
|description    |string     |-  |服务描述|
|price          |int        |-  |服务定价|
|extras         |array      |-  |附加服务的[服务信息](#struct-service-info)列表|
|parts          |array      |-  |所需配件的[配件类型信息](#struct-supply-type)列表|

<a name="struct-supply-type"></a>
###配件类型信息

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |配件类型信息在数据库中的唯一ID|
|name           |int        |-  |配件类型名称|
|unit           |string     |-  |单位|
|options        |array      |-  |可供选择的配件的[配件信息](#struct-supply-info)数组|
|quantity       |int        |-  |所需数量|

<a name="struct-supply-info"></a>
###配件信息

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |配件信息在数据库中的唯一ID|
|brand          |string     |-  |配件品牌|
|name           |string     |-  |配件名称|
|extra          |string     |-  |配件附加信息|
|price          |float      |-  |配件单价|
|hint           |string     |-  |价格为0时的提示信息|

<a name="struct-service"></a>
###服务

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |服务记录在数据库中的唯一ID|
|name           |string     |-  |服务名称|
|price          |float      |-  |服务价格|
|parts          |array      |-  |所用[配件](#struct-supply)的列表|
|memo           |striing    |-  |备注信息|

<a name="struct-supply"></a>
###配件

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |配件记录在数据库中的唯一ID|
|name           |string     |-  |配件名称|
|price          |float      |-  |配件单价|
|quantity       |int        |-  |配件数量|
|total          |float      |-  |总价|
|memo           |striing    |-  |备注信息|

<a name="struct-order-summary"></a>
###订单摘要

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |订单记录在数据库中的唯一ID|
|status         |int        |-  |[订单状态](#enum-order-status)|
|modified       |long       |-  |修改时间|
|model          |string	    |-	|车型名称|
|plate          |string     |-	|车牌号|
|title          |string     |-	|订单标题|
|date           |long       |-  |上门服务时间|

<a name="struct-order"></a>
###订单

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |订单记录在数据库中的唯一ID|
|status         |int        |-  |[订单状态](#enum-order-status)|
|technicianId   |int        |-  |服务技师ID|
|created        |long       |-  |创建时间|
|modified       |long       |-  |修改时间|
|sum            |float      |-  |订单总价|
|modelId        |int        |-	|车型ID|
|model          |string	    |-	|车型名称|
|vid            |string     |-	|车架号|
|plate          |string     |-	|车牌号|
|cityCode       |int        |-	|城市编码|
|province       |string     |-	|省份|
|city           |string     |-  |城市|
|address        |string     |-  |上门服务地址|
|name           |string     |-  |联系人姓名|
|phone          |string     |-  |联系电话|
|date           |long       |-  |上门服务时间|
|services       |array      |-  |预定[服务](#struct-service)的列表|

<a name="struct-brand"></a>
###汽车品牌

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |汽车品牌ID|
|letter         |string     |-  |品牌名称首字母|
|brand          |string     |-  |品牌名称|

<a name="struct-family"></a>
###汽车车系

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |汽车品牌ID|
|prefix         |string     |-  |车系名称前缀|
|family         |string     |-  |车系名称|

<a name="struct-model"></a>
###汽车车型

|名称			|类型		|可选|描述|
|:--			|:--		|:--:|:--|
|id             |int        |-  |汽车车型ID|
|model          |string     |-  |车型名称|
|suffix         |string     |-  |车型后缀|





##枚举

<a name="enum-order-status"></a>
###订单状态

