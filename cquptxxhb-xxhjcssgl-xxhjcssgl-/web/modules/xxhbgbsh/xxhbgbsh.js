define(function(require, exports, module) {

  var utils = require('utils');
  var bs = require('./xxhbgbshBS');
  var xxhbgbshSave = require('./xxhbgbshSave');
  var xxhbgbshView = require('./xxhbgbshView');
  
  
 // var taskType = "ALL_TASK"; //任务类型
  var taskType = "NOTEND"; //任务类型
  var flowStatus = ""; //流程状态
  
  var viewConfig = {
    initialize: function() {
      var view = utils.loadCompiledPage('xxhbgbsh');
      this.$rootElement.html(view.render({}), true);
      this.pushSubView([xxhbgbshSave]);
      this.initView();
  	
      this.eventMap = {
        "[data-action=detail]": this.actionDetail,
        "[data-action=audit]": this.actionAudit,
        "[data-action=export]": this.actionExport,
        "[data-action=import]": this.actionImport,
        "[data-action=query]": this.actionQuery,
        "[data-action=custom-column]": this.actionCustomColumn,
        "[data-action=handbook]": this.handbook,
        "[data-action=finishedcallback]" : this.actionBjCallback,
        
        "[data-action=lczt]" : this.actionLczt,//流程状态
		 "[data-action=getShData]" : this.actionGetShData,//获取审核数据
      };
    },

    initView: function() {
      this._initAdvanceQuery();
      this._initTable();
      
//      setTimeout(actionGetShData,20000);
    },
    
    actionGetShData:function(e){
    	//统计数据
  	  _sjtj.xxhbgbshtj();
    },

    actionAudit:function(e){
    	var id = $(e.target).attr("data-x-wid");
    	var taskid =$(e.target).attr("data-x-taskId")
    	var xxhbgbshEditTpl = utils.loadCompiledPage('xxhbgbshSave');
        var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'gbssjbxx', {WID_1:id,pageNumber:1});
        var jcssid =  data.rows[0].JCSSID
        var lx = data.rows[0].LX
        var cksq = data.rows[0].CK_SFYSQCK   
        $.bhPaperPileDialog.show({
          content: xxhbgbshEditTpl.render({}),
          title: "审核",
          ready: function($header, $body, $footer){
        	  xxhbgbshSave.initialize(data,id,taskid,lx,cksq,jcssid);       
            $("#emapForm").emapForm("setValue", data.rows[0]);    
          }
        });
    },
        
        
    actionDetail: function(e){
      var id = $(e.target).attr("data-x-wid");
      var lx = $(e.target).attr("data-x-lx");
 	 var lcxx=_util.getpromid(id,'xxhbgbsh','T_XXB_XXHJCSS_GB_QUERY');
	        if(lcxx=='error'){
	    		$.bhTip({
					content : '获取流程id失败',
					state : 'danger',
					hideWaitTime : 2000
				});
	    		return false;
	    	}
	        var taskid =lcxx[0].TASKID;
	        var proid = lcxx[0].PROCESSINSTANCEID;
      
      var xxhbgbshViewTpl = utils.loadCompiledPage('xxhbgbshSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'gbssjbxx', {WID_1:id,pageNumber:1});
      var lx = data.rows[0].LX
      var cksq = data.rows[0].CK_SFYSQCK  
      if(data.rows[0].CK_SFYSQCK=='是'){
         	data.rows[0].CK_SFYSQCK='1';
   		}    
         if(data.rows[0].CK_SFYSQCK=='否'){
         	data.rows[0].CK_SFYSQCK='0';		
   		} 
      
      $.bhPaperPileDialog.show({
        content: xxhbgbshViewTpl.render({}),
        title: "详情",
        ready: function($header, $body, $footer){
          xxhbgbshView.initialize(id,taskid,lx,cksq);
       	 $("#emapForm").emapForm("setValue", data.rows[0]);
        }
      });
    },
    
    handbook:function(e){
    	//window.location.href = '../public/word/1重庆邮电大学_信息化基础设施管理操作手册（系统管理员）.docx';    		
    	var self=this;
	     var result = '6重庆邮电大学_信息化基础设施管理操作手册（信息化办）.docx';
	     var oresult = '6重庆邮电大学_信息化基础设施管理操作手册（信息化办）.docx';	    		
	     var url = bs.api.fileDownUrl + '?name=' + encodeURI(result) + '&oName=' + oresult;
	     document.getElementById("loadFileHide").src = url;
        // self.loadiframe(document.getElementById("loadFileHide"));//判断下载是否完成
    },
    
    actionBjCallback:function(e){
  		var id = $(e.target).attr("data-x-wid");
  		var proid = $(e.target).attr("data-x-proid");
  		var sfsj = true	
  		var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'gbssjbxx', {WID_1:id,pageNumber:1}); 
  		var params = { 
  				commandType: 'finishedCallback',
  				processInstanceId:proid,
  				appName: 'xxhjcssgl',
  				sendMessage : false //是否发送邮件
  				}; 
  		$.ajax({
  			url:WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/tasks/finishedCallback.do',
  			type:'post',
  			data:params,
  			async:false,
  			cache : true,
  			success:function(response) {  			
  				var pd = $.parseJSON(response);
				if(pd.succeed){   
					var ztparams = { 
	    					WID : data.rows[0].WID,
    						ZT : 9,
    						}; 
    				$.ajax({
    					url:'../modules/xxhbgbsh/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
    					type:'post',
    					data:ztparams,
    					async:false,
    					cache : true,
    					success:function(data){
    								
    					 }
    					});
					
					
					$.bhTip({
						content : '办结取回成功',
						state : 'success',
						hideWaitTime : 2000
					});
					//统计数据
//					  _sjtj.xxhbgbshtj();
				}else{
					 sfsj = false	
					$.bhTip({
						content : '办结取回失败',
						state : 'danger',
						hideWaitTime : 2000
					});;
				}
				
  			} 		
  		});
  		if(sfsj){
  			this.actionQuery(null)	//撤回成功之后进行重载列表
  		}
  	},  
  	
    actionExport: function(){
      bs.exportData({}).done(function(data){
      });
    },

    actionImport: function(){
      $.emapImport({
        "contextPath": contextPath,
        "app": "xxhjcssgl",
        "module": "modules",
        "page": "xxhbgbsh",
        "action": "[添加或保存动作的别名]",//使用添加或保存动作
        //"tplUrl": "modules/htgl/dataModel.T_JZG_HT.xls",
        "preCallback": function() {
        },
        "closeCallback": function() {
           $('#emapdatatable').emapdatatable('reload');
        },
      });
    },
        
    actionCustomColumn: function(){
      $('#emapdatatable').emapdatatable('selectToShowColumns');
    },
        
    _initAdvanceQuery: function() {
      var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_GB_QUERY', "search");
      var $query = $('#emapAdvancedQuery').emapAdvancedQuery({
        data: searchData,
        contextPath : contextPath,
        schema: true
      });
      var now = new Date();
      //now_time = new Date().Format('yyyy-MM-dd HH:mm');
      new_time=new Date().Format('yyyy-MM-dd HH:mm:ss');
      now_time = new Date(now.getTime()).Format('yyyy-MM-dd HH:mm:ss');
      old_time = new Date(now.getTime()-30 * 24 * 3600 * 1000).Format('yyyy-MM-dd')+' 00:00:00';
    var data = JSON.stringify([{"name":"JHGBSJ","caption":"计划关闭时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"JHGBSJ","caption":"计划关闭时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]);
      $('#emapAdvancedQuery').emapAdvancedQuery("setValue",data)
	$query.on('search', this._searchCallback);
    },

    _searchCallback: function(e, data, opts) {
    	/*var searchdata = $.parseJSON(data)
    	if(searchdata.length != 0){
    	 if(searchdata[0][0]!=undefined){
    		 if(searchdata[0][0].name == 'SQR'){
    			 var cxdata = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {GLYXM: searchdata[0][0].value,pageSize : 1,pageNumber : 1,});
        		 if(cxdata.rows.length != 0){
    			  searchdata[0][0].value = cxdata.rows[0].SFRZH
        	      data = JSON.stringify(searchdata) 
        		 }
        	 }
    	 }
    }*/
    	
   	 taskType = $('[data-action=query].bh-active').attr('data');
   	 if (taskType == "") {
         $('#emapdatatable').emapdatatable('reload', {
             querySetting : data,
            // TASKSTATUSNAME:TASKSTATUSNAME
             });           
        } else{       
         $('#emapdatatable').emapdatatable('reload', {
             querySetting : data,
             taskType : taskType,
          //   TASKSTATUSNAME:TASKSTATUSNAME
             //nodeId:nodeId,
         });
     }
      },

      actionQuery : function(event) {
    	  var searchData = $('#emapAdvancedQuery').emapAdvancedQuery('getValue');
    	  if(event == null){
				 taskType = $('[data-action=query].bh-active').attr('data');
			}else {
				taskType = event.currentTarget.attributes.data.value;		       	
			}	
          
          if (taskType == "") {
              $('#emapdatatable').emapdatatable('reload', {
                  querySetting : searchData,
                 // TASKSTATUSNAME:TASKSTATUSNAME
                  });           
             } else{       
              $('#emapdatatable').emapdatatable('reload', {
                  querySetting : searchData,
                  taskType : taskType,
               //   TASKSTATUSNAME:TASKSTATUSNAME
                  //nodeId:nodeId,
              });
          }
      },
      
    //流程状态事件
		actionLczt:function(e){
	  		var id = $(e.target).attr("data-x-wid");
	    	var pid=_util.getpromid(id,'xxhbgbsh','T_XXB_XXHJCSS_GB_QUERY');
	    	
	    	if(pid=='error'){
	    		$.bhTip({
					content : '获取流程id失败',
					state : 'danger',
					hideWaitTime : 2000
				});
	    	}else{
	    		window.open(WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
		     			 +pid[0].PROCESSINSTANCEID+'&responseType=forward');
	    	}
	    	
	    },

	    _initTable: function() {
	    	
	    	var params = {
	            	  taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL           	 
	            	  nodeId : 'xxhbshgb', // 流程定义中人工环节的编号，必填
	            	  appName : 'xxhjcssgl',// 应用的名称，必填
	            	  module : 'modules', // 模块名，可以没有，默认modules
	            	  page : 'xxhbgbsh', // 回调动作的epg的编号，必填
	            	  action : 'T_XXB_XXHJCSS_GB_QUERY', // 回调的动作，必填
	            	  '*order': '-JHGBSJ',
	            	  querySetting:JSON.stringify([{"name":"JHGBSJ","caption":"计划关闭时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},
	 				                               {"name":"JHGBSJ","caption":"计划关闭时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]),
	            	  hideFlowState:true,
	  				hideTaskState:true,
	            	               
	            };
	  	  var xxsj = {}//如果没有流程状态就通过另外一个查询语句查出流程状态	
	      var tableOptions = {
	        pagePath: bs.api.pageModel,
	         url : _emapflow.getQueryTasksUrl(),
			action : _emapflow.getQueryTasksAction(),

	     //   url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
		   // action: _emapflow.getQueryTasksByNodeAction(),
		    datamodel: _emapflow.getDataModels(params),
		    params : params,	//参数
	      //  action: 'T_XXB_XXHJCSS_GB_QUERY',
	        customColumns: [{
	          colIndex: '0',
	          type: 'checkbox'
	        }, {
	          colIndex: '1',
	          type: 'tpl',
	          column: {
	            text: '操作',
	            align: 'center',
	            width:'200px',
	            cellsAlign: 'center',
	            cellsRenderer: function(row, column, value, rowData) {
	            	            					
	            	
	            	var str = ''
	            	if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
						
	            		var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
					    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
						var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
						var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
						
						
			        	
			        	 if (rowData.TASKSTATUS == "1")
						 str += ' <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID
							      + ' data-x-taskid='+ rowData.TASKID
							      + ' data-x-proid='+ rowData.PROCESSINSTANCEID
								 + '>' + '审核' + '</a> | ';
			        	 if(zzhj == 'xxhbshgb'){
				        	 if(rowData.FLOWSTATUS == "5"){
					 				str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
					 					' data-x-taskid='+ rowData.TASKID+ 
					 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '办结取回' + '</a> | ';
				        	 }
			        	 }
	            	} 

					str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX + '>详情</a> | ';
					 
		           	 
					 str += ' <a href="javascript:void(0)" data-action="lczt" data-x-wid=' + rowData.WID + '>流程状态</a>   ';
					 	
		        	 return str;
	            }
	          }
	        },
	        {
				colIndex : '2',
				type : 'tpl',
				column : {
					text : '最新环节-状态',
					align : 'center',
					cellsAlign : 'center',
					width : '220px',
					cellsRenderer : function(row, column, value,rowData) {
						var NODENAME =''
							var FLOWSTATUSNAME =''	
						if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
							
							var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
						    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
							var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
							var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
							
							var ZT = dqhj
							if(dqhj == undefined){
								ZT = zzhj
							}
		   		    	
							if (ZT == 'gbsq'){
								NODENAME = "申请人-"
							}else if(ZT == 'xxhllyshgb'){
								NODENAME = "申请单位信息化联络员审核-"
							}else if(ZT == 'bmldshgb'){
								NODENAME = "申请单位负责人审核-"
							}else if(ZT == 'xxhbshgb'){
								NODENAME = "信息化办审核-"
							}else if(ZT == undefined){
		 						NODENAME = ''
		 					}
		   		    	if (rowData.FLOWSTATUS == '1'){
							FLOWSTATUSNAME = "审核中"
						}else if(rowData.FLOWSTATUS == '2'){
							FLOWSTATUSNAME = "已驳回"
						}else if(rowData.FLOWSTATUS == '3'){
							FLOWSTATUSNAME = "申请成功"
						}else if(rowData.FLOWSTATUS == '4'){
							FLOWSTATUSNAME = "未提交"
						}else if(rowData.FLOWSTATUS == '5'){
							FLOWSTATUSNAME = "申请未通过"
						}else if(rowData.FLOWSTATUS == '6'){
							FLOWSTATUSNAME = "未提交"
						}		
						return NODENAME + FLOWSTATUSNAME;										
					}else if(rowData.PROCESSINSTANCEID == null ){//流程信息为空
						
						return '';
					}
					}
				}
			}
	        ]
	      };
	      $('#emapdatatable').emapdatatable(tableOptions);
	    }
	    
//    _initTable: function() {
//    	
//    	var params = {
//            	  taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL           	 
//            	  nodeId : 'xxhbshgb', // 流程定义中人工环节的编号，必填
//            	  appName : 'xxhjcssgl',// 应用的名称，必填
//            	  module : 'modules', // 模块名，可以没有，默认modules
//            	  page : 'xxhbgbsh', // 回调动作的epg的编号，必填
//            	  action : 'T_XXB_XXHJCSS_GB_QUERY', // 回调的动作，必填
//            	  '*order': '-JHGBSJ',
//            	  hideFlowState:true,
//  				hideTaskState:true,
//            	               
//            };
//  	  var xxsj = {}//如果没有流程状态就通过另外一个查询语句查出流程状态	
//      var tableOptions = {
//        pagePath: bs.api.pageModel,
//         url : _emapflow.getQueryTasksUrl(),
//		action : _emapflow.getQueryTasksAction(),
//
//     //   url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
//	   // action: _emapflow.getQueryTasksByNodeAction(),
//	    datamodel: _emapflow.getDataModels(params),
//	    params : params,	//参数
//      //  action: 'T_XXB_XXHJCSS_GB_QUERY',
//        customColumns: [{
//          colIndex: '0',
//          type: 'checkbox'
//        }, {
//          colIndex: '1',
//          type: 'tpl',
//          column: {
//            text: '操作',
//            align: 'center',
//            width:'200px',
//            cellsAlign: 'center',
//            cellsRenderer: function(row, column, value, rowData) {
//            	            					
//            	
//            	var str = ''
//            	if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
//					
//            		var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//				    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//					var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//					var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//					
//					
//		        	
//		        	 if (rowData.TASKSTATUS == "1")
//					 str += ' <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID
//						      + ' data-x-taskid='+ rowData.TASKID
//						      + ' data-x-proid='+ rowData.PROCESSINSTANCEID
//							 + '>' + '审核' + '</a> | ';
//		        	 if(zzhj == 'xxhbshgb'){
//			        	 if(rowData.FLOWSTATUS == "5"){
//				 				str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
//				 					' data-x-taskid='+ rowData.TASKID+ 
//				 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '办结取回' + '</a> | ';
//			        	 }
//		        	 }
//            	} 
//		        	str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID 
//						+ ' data-x-taskid='+ rowData.TASKID
//						+ ' data-x-proid='+ rowData.PROCESSINSTANCEID
//						+ '>'+ '详情' + '</a>';
//		        if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
//		        	 str += ' | <a href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='+rowData.PROCESSINSTANCEID+'&responseType=forward" target="_blank"   data-x-wid=' + rowData.WID + 
//		             ' data-x-taskid=' + rowData.TASKID+ 
//		             ' data-x-proid=' + rowData.PROCESSINSTANCEID + '>' + '查看流程' + '</a>';
//            	}
//            	 if (rowData.PROCESSINSTANCEID == null ){
//				//	 var xxsj;//如果没有流程状态就通过另外一个查询语句查出流程状态
//			  	   	$.ajax({
//			  	  	    type: "post",
//			  	  	    async: false,
//			  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
//			  	  	    data: { 
//			  	  	        taskType:'ALL',
//			  	  	        nodeId:'' , 
//			  	  	        appName: 'xxhjcssgl',
//			  	  	        module: 'modules',
//			  	  	        page: 'xxhbgbsh',
//			  	  	        action: 'T_XXB_XXHJCSS_GB_QUERY',
//			  	  	       // WID:rowData.WID,
//			  	  	        querySetting : '[  {"name": "WID", "value": "'+rowData.WID+'","builder": "equal","linkOpt": "AND"}]',
//			  	  	        pageSize: 10,
//			  	  	        pageNumber: 1,
//			  	  	       }, //发送到服务器的参数
//			  	  	    datatype: "json",
//			  	  	   success: function (result) {
//			  	  	        xxsj = result.datas.queryObserveUserTasks.rows
//			  	  	   }
//			  	  	 })
//			  	  str += ' | <a  href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
//    			 +xxsj[0].PROCESSINSTANCEID+'&responseType=forward" target="_blank">查看流程</a>'; 
//				} 	
//	        	 return str;
//            }
//          }
//        },
//        {
//			colIndex : '2',
//			type : 'tpl',
//			column : {
//				text : '最新环节-状态',
//				align : 'center',
//				cellsAlign : 'center',
//				width : '220px',
//				cellsRenderer : function(row, column, value,rowData) {
//					var NODENAME =''
//						var FLOWSTATUSNAME =''	
//					if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
//						
//						var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//					    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//						var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//						var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//						
//						var ZT = dqhj
//						if(dqhj == undefined){
//							ZT = zzhj
//						}
//	   		    	
//						if (ZT == 'gbsq'){
//							NODENAME = "申请人-"
//						}else if(ZT == 'xxhllyshgb'){
//							NODENAME = "申请单位信息化联络员审核-"
//						}else if(ZT == 'bmldshgb'){
//							NODENAME = "申请单位负责人审核-"
//						}else if(ZT == 'xxhbshgb'){
//							NODENAME = "信息化办审核-"
//						}else if(ZT == undefined){
//	 						NODENAME = ''
//	 					}
//	   		    	if (rowData.FLOWSTATUS == '1'){
//						FLOWSTATUSNAME = "审核中"
//					}else if(rowData.FLOWSTATUS == '2'){
//						FLOWSTATUSNAME = "已驳回"
//					}else if(rowData.FLOWSTATUS == '3'){
//						FLOWSTATUSNAME = "申请成功"
//					}else if(rowData.FLOWSTATUS == '4'){
//						FLOWSTATUSNAME = "未提交"
//					}else if(rowData.FLOWSTATUS == '5'){
//						FLOWSTATUSNAME = "申请未通过"
//					}else if(rowData.FLOWSTATUS == '6'){
//						FLOWSTATUSNAME = "未提交"
//					}		
//					return NODENAME + FLOWSTATUSNAME;										
//				}else if(rowData.PROCESSINSTANCEID == null ){//流程信息为空
//					/* var xxsj;//如果没有流程状态就通过另外一个查询语句查出流程状态
//				  	   	$.ajax({
//				  	  	    type: "post",
//				  	  	    async: false,
//				  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
//				  	  	    data: { 
//				  	  	        taskType:'ALL',
//				  	  	        nodeId:'' , 
//				  	  	        appName: 'xxhjcssgl',
//				  	  	        module: 'modules',
//				  	  	        page: 'xxhbgbsh',
//				  	  	        action: 'T_XXB_XXHJCSS_GB_QUERY',
//				  	  	       // WID:rowData.WID,
//				  	  	        querySetting : '[  {"name": "WID", "value": "'+rowData.WID+'","builder": "equal","linkOpt": "AND"}]',
//				  	  	        pageSize: 10,
//				  	  	        pageNumber: 1,
//				  	  	       }, //发送到服务器的参数
//				  	  	    datatype: "json",
//				  	  	   success: function (result) {
//				  	  	        xxsj = result.datas.queryObserveUserTasks.rows
//				  	  	   }
//				  	  	 })*/
//				  	  	  if(xxsj[0].PROCESSINSTANCEID != null){
//				  	  	var cccurrent = xxsj[0].TASKINFO.CURRENT_NODES   //获取重新查的当前环节									
//					    var ccdqhj = Object.getOwnPropertyNames(cccurrent)[0] //当前环节
//						var cclast = xxsj[0].TASKINFO.LAST_NODES         //获取重新查的办结后的最后的环节
//						var cczzhj = Object.getOwnPropertyNames(cclast)[0]  //最后环节
//						
//						var ZT = ccdqhj
//						if(ccdqhj == undefined){
//							ZT = cczzhj
//						}
//				  	  if (ZT == 'gbsq'){
//							NODENAME = "申请人-"
//						}else if(ZT == 'xxhllyshgb'){
//							NODENAME = "申请单位信息化联络员审核-"
//						}else if(ZT == 'bmldshgb'){
//							NODENAME = "申请单位负责人审核-"
//						}else if(ZT == 'xxhbshgb'){
//							NODENAME = "信息化办审核-"
//						}else if(ZT == undefined){
//	 						NODENAME = ''
//	 					}
//	   		    	if (xxsj[0].FLOWSTATUS == '1'){
//						FLOWSTATUSNAME = "审核中"
//					}else if(xxsj[0].FLOWSTATUS == '2'){
//						FLOWSTATUSNAME = "已驳回"
//					}else if(xxsj[0].FLOWSTATUS == '3'){
//						FLOWSTATUSNAME = "申请成功"
//					}else if(xxsj[0].FLOWSTATUS == '4'){
//						FLOWSTATUSNAME = "未提交"
//					}else if(xxsj[0].FLOWSTATUS == '5'){
//						FLOWSTATUSNAME = "申请未通过"
//					}else if(xxsj[0].FLOWSTATUS == '6'){
//						FLOWSTATUSNAME = "未提交"
//					}	
//				  }
//					return NODENAME + FLOWSTATUSNAME;
//				}
//				}
//			}
//		}
//        ]
//      };
//      $('#emapdatatable').emapdatatable(tableOptions);
//    }
  };

  return viewConfig;
});