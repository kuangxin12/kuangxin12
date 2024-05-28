define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./bmldnsBS');

	var viewConfig = {
		initialize : function() {
			var dwdata = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {ZGH : USERID,pageSize : 1,pageNumber : 1,});
			var dwdm = dwdata.rows[0].SZDWDM
				var params =  {
					//SFRZH : USERID,
					 '*order' : '-TJSJ',
					//SFRZH : 7800009,
					SQDW:dwdm,
					 ZT:6
				};
			var tableOptions = {
				pagePath : bs.api.pageModel,
				action : 'nsjcsscx',
				params : params,
				
				customColumns : [ 
				{
					colIndex : '0',
					type : 'tpl',
					column : {
						text : '年审状态',
						align : 'center',
						cellsAlign : 'center',
						width : '200px',
						cellsRenderer : function(row, column, value,
								rowData) {
							var currenttime = new Date().getTime();//当前时间的时间戳
							var jzdateStr=rowData.YXQ;
							jzdateStr=jzdateStr.replace(/-/g,'/'); 
							var yxq =new Date(jzdateStr).getTime();
							if(rowData.ZT == 10){
								if(currenttime <= yxq){
									return "即将到期，待提交年审申请";
								}else{
									return "已过期，未提交年审";
								}
							}else if(rowData.ZT == 6){
								return "年审未完成";
							}
						}
					}
				}  ]
			};
			$('#wnsemapdatatable').emapdatatable(tableOptions);
		},
		
	}
	return viewConfig;
});