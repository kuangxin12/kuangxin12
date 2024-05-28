define(function(require, exports, module) {

	var config = {

		/*
		 * 业务线开发模式，转测时置false
		 */
		//"DEBUG_MODE": true,
		/*
		 * 1.2版本
		 */
		"BH_VERSION": "1.2",

		/*
		 * 资源服务器地址
		 */
		"RESOURCE_SERVER": "http://res.cqupt.edu.cn",
//		"RESOURCE_SERVER": "http://res.wisedu.com",

		/*
		 * 主题 blue purple
		 */
		"THEME": "purple",

		/*
			服务器端生成配置API(API_BASE_PATH目录下)
			@example "/config.do" ./mock/serverconfig.json
		 */
//		"SERVER_CONFIG_API":WIS_CONFIG.PATH + "/sys/funauthapp/api/getAppConfig/" + WIS_CONFIG.APPNAME + "-" + WIS_CONFIG.APPID + ".do",
		"SERVER_CONFIG_API": "",
		/*
			APP默认路由
		 */
		'APP_ENTRY': "",

		/*
		 	APP标题
		 */
		"APP_TITLE": "信息基础设施管理",

		/*
			应用底部说明文本
		 */
		"FOOTER_TEXT": "",

		/*
			需要展示的模块
		 */
		"MODULES": [
		 {            title:"信息化基础设施申请",            route:"xxhjcsssq"         }         ,{            title:"信息化联络员审核申请",            route:"xxhllyshsq"         }         ,{            title:"部门领导审核申请",            route:"bmldshsq"         }         ,{
             title:"信息化办申请审核",
             route:"xxhbsqsh"
          },{            title:"信息化办处理",            route:"xxhbshsq"         },{
             title:"出口申请权限",
             route:"cksqqxwh"
          },
         {
             title:"变更系统管理员申请",
             route:"bgxtglysq"
          },
          {
              title:"变更新系统管理员确认",
              route:"bgxxtglyqr"
           },
           {
               title:"变更信息化联络员审核",
               route:"bgxxhllysh"
            },
          {
              title:"变更部门领导审核",
              route:"bgbmldsh"
           },
           {
               title:"变更信息化办审核",
               route:"bgxxhbsh"
            },         {            title:"信息化基础设施关闭申请",            route:"xxhjcssgbsq"         },         {            title:"信息化联络员关闭审核",            route:"xxhllygbsh"         }         ,{            title:"部门领导关闭审核",            route:"bmldgbsh"         }         ,{            title:"信息化办关闭审核",            route:"xxhbgbsh"         },
         //
         {
             title:"年审申请",
             route:"nssq"
          }
          ,{
             title:"信息化联络员年审",
             route:"xxhllyns"
          }
          ,{
             title:"部门领导年审",
             route:"bmldns"
          }
          ,{
             title:"信息化办年审",
             route:"xxhbns"
          },         {            title:"test",            route:"test"         }         ,{            title:"部门审核人员维护",            route:"bmshrywh"         },		 {
            title:"维护申请",
            route:"whsq"
         }
         ,{
            title:"维护审核",
            route:"whsh",
         },{
             title:"维护处理",
             route:"whcl",
          },{
             title:"科技处审核申请",
             route:"kjcshsq",
          },{
              title:"教务处审核申请",
              route:"jwcshsq",
           }
		],

		/*
			头部配置
		 */
		"HEADER": {
			"dropMenuCallback":function(item){
				isShow = true
				if (item.id == roleId){
					return false;
				}
				var url = WIS_CONFIG.PATH + "/sys/funauthapp/api/changeAppRole/" + WIS_CONFIG.APPNAME + "/" + item.id + ".do";
				$.ajax({
					url: url,
					type: 'post',
					async: false,
					error: function()  {
						$.bhDialog({title:'切换失败',iconType:'warning'});
					},
					success: function(data)  {
						if (data && data.success == true) {
							location.href = WIS_CONFIG.PATH + "/sys/"+WIS_CONFIG.APPNAME+"/*default/index.do";
						}else{
							$.bhDialog({title:'切换失败',iconType:'warning'});
						}
					}
				});
			},
			"logo": "./public/images/logo.png",
			"icons": ["icon-apps"],
			"userImage": "./public/images/user.png",
			"userInfo": {
				"image": "./public/images/user.png",
				"info": [
				         USERID,
				         "姓名: "+USERNAME					
				         ]
			}
		}
	};


	return config;

});