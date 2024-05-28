define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./bmldnsBS');

	var viewConfig = {
		initialize : function(id,nodeid) {
			var params =  {
				taskType : "ALL", // 未完成-NOTEND，已完成-ENDED，所有-ALL
				nodeId : nodeid, // 流程定义中人工环节的编号，必填
				appName : 'xxhjcssgl',// 应用的名称，必填
				module : 'modules', // 模块名，可以没有，默认modules
				page : 'bmldns', // 回调动作的epg的编号，必填
				// action : 'T_XXB_XXHJCSS_JBXX_QUERY', // 回调的动作，必填
				action : 'T_XXB_XXHJCSS_NS_QUERY', // 回调的动作，必填
				defKey : "xxhjcssgl.ns",
				'*order' : '-NSND ASC',
				querySetting : '[  {"name": "WLJCSSWID", "value": "'+id+'","builder": "equal","linkOpt": "AND"}]',
				hideFlowState : true,
				hideTaskState : true,
			};

			var tableOptions = {
					
				pagePath : bs.api.pageModel,
				url : _emapflow.getQueryTasksUrl(),
				action : _emapflow.getQueryTasksAction(),
				datamodel : _emapflow.getDataModels(params),
				params : params,
				// pageable:false,
				height : null,
				customColumns : [ 
				{
					colIndex : '0',
					type : 'tpl',
					column : {
						text : '年审状态',
						align : 'center',
						cellsAlign : 'center',
						width : '100px',
						cellsRenderer : function(row, column, value,
								rowData) {
							
							if(rowData.FLOWSTATUS==null){
								return "年审未开始";
							}							
							else {
								if (rowData.FLOWSTATUS == '1'){
									rowData.FLOWSTATUSNAME = "审核中"
								}else if(rowData.FLOWSTATUS == '2'){
									rowData.FLOWSTATUSNAME = "已驳回"
								}else if(rowData.FLOWSTATUS == '3'){
									rowData.FLOWSTATUSNAME = "申请成功"
								}else if(rowData.FLOWSTATUS == '4'){
									rowData.FLOWSTATUSNAME = "未提交"
								}else if(rowData.FLOWSTATUS == '5'){
									rowData.FLOWSTATUSNAME = "申请未通过"
								}else if(rowData.FLOWSTATUS == '6'){
									rowData.FLOWSTATUSNAME = "未提交"
								}
								return rowData.FLOWSTATUSNAME;
							}
								
								
						
						}
					}
				}  ]
			};
			$('#nsjlemapdatatable').emapdatatable(tableOptions);
		}
	}
	return viewConfig;
});