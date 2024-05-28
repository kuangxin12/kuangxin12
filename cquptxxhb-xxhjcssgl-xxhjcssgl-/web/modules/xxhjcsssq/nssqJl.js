define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./xxhjcsssqBS');

	var viewConfig = {
		initialize : function(id,pwid) {
			var params =  {
				taskType : "ALL", // 未完成-NOTEND，已完成-ENDED，所有-ALL
				nodeId : '', // 流程定义中人工环节的编号，必填
				appName : 'xxhjcssgl',// 应用的名称，必填
				module : 'modules', // 模块名，可以没有，默认modules
				page : 'xxhjcsssq', // 回调动作的epg的编号，必填			
				action : 'T_XXB_XXHJCSS_NS_QUERY', // 回调的动作，必填
				defKey : "xxhjcssgl.ns",
				'*order' : '-NSND ASC',
				querySetting : '[  {"name": "WLJCSSWID", "value": "'+pwid+'","builder": "equal","linkOpt": "AND"}]',
				hideFlowState : true,
				hideTaskState : true,
			};
             var ztdata = 11
			var tableOptions = {
					
				pagePath : bs.api.pageModel,
				url : _emapflow.getQueryTasksUrl(),
				action : _emapflow.getQueryTasksAction(),
				datamodel : _emapflow.getDataModels(params),
				params : params,
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
							
							 var xxsj;//作为变更管理员后，年审记录表没有对应流程信息做备用流程状态
						  	   	$.ajax({
						  	  	    type: "post",
						  	  	    async: false,
						  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
						  	  	    data: { 
						  	  	        taskType:'ALL',
						  	  	        nodeId:'' , 
						  	  	        appName: 'xxhjcssgl',
						  	  	        module: 'modules',
						  	  	        page: 'xxhjcsssq',
						  	  	        action: 'T_XXB_XXHJCSS_NS_QUERY',
						  	  	        WID:rowData.WID,
						  	  	        querySetting : '[  {"name": "WID", "value": "'+rowData.WID+'","builder": "equal","linkOpt": "AND"}]',
						  	  	        pageSize: 10,
						  	  	        pageNumber: 1,
						  	  	       }, //发送到服务器的参数
						  	  	    datatype: "json",
						  	  	   success: function (result) {
						  	  	        xxsj = result.datas.queryObserveUserTasks.rows
						  	  	   }
						  	  	 })	
							
							
							/*var currenttime = new Date().getTime();//当前时间的时间戳
													
							var jzdateStr=rowData.NSJZRQ;
							jzdateStr=jzdateStr.replace(/-/g,'/'); 
							var jzrq =new Date(jzdateStr).getTime();//有效期的时间戳
*/							
							if(rowData.FLOWSTATUS == null && xxsj[0].FLOWSTATUS != null){
								if (xxsj[0].FLOWSTATUS == '1'){
									rowData.FLOWSTATUSNAME = "年审审核中"
								}else if(xxsj[0].FLOWSTATUS == '2'){
									rowData.FLOWSTATUSNAME = "已驳回"
								}else if(xxsj[0].FLOWSTATUS == '3'){
									rowData.FLOWSTATUSNAME = "年审成功"
								}else if(xxsj[0].FLOWSTATUS == '4'){
									rowData.FLOWSTATUSNAME = "未提交"
								}else if(xxsj[0].FLOWSTATUS == '5'){
									rowData.FLOWSTATUSNAME = "年审未通过"
								}else if(xxsj[0].FLOWSTATUS == '6'){
									rowData.FLOWSTATUSNAME = "未提交"
								}
								return rowData.FLOWSTATUSNAME;
							}
							if	(rowData.FLOWSTATUS != null	)	{
								if (rowData.FLOWSTATUS == '1'){
									rowData.FLOWSTATUSNAME = "年审审核中"
								}else if(rowData.FLOWSTATUS == '2'){
									rowData.FLOWSTATUSNAME = "已驳回"
								}else if(rowData.FLOWSTATUS == '3'){
									rowData.FLOWSTATUSNAME = "年审成功"
								}else if(rowData.FLOWSTATUS == '4'){
									rowData.FLOWSTATUSNAME = "未提交"
								}else if(rowData.FLOWSTATUS == '5'){
									rowData.FLOWSTATUSNAME = "年审未通过"
								}else if(rowData.FLOWSTATUS == '6'){
									rowData.FLOWSTATUSNAME = "未提交"
								}
								return rowData.FLOWSTATUSNAME;
							}											
							if(rowData.FLOWSTATUS==null && xxsj[0].FLOWSTATUS == null){
								 var date=new Date;
								 var year=date.getFullYear(); 
								 var month =date.getMonth()+1; 
								var ND =  parseInt(rowData.NSND);	
								if(ND >= year && month < 12){
									return "未开始年审";
								}else{
									return "未进行年审";
								}
								
							}
								
//								if(rowData.FLOWSTATUS==null && ND == year)
//									return "未开始年审";
//								if(rowData.FLOWSTATUS==null && ND > year)
//									return "未开始年审";
						
						}
					}
				}  ]
			};
			$('#nsjlemapdatatable').emapdatatable(tableOptions);
		}
	}
	return viewConfig;
});