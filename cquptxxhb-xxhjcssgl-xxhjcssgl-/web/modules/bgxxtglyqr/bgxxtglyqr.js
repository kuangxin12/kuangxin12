define(function(require, exports, module) {

  var utils = require('utils');
  var bs = require('./bgxxtglyqrBS');
  var bgxxtglyqrSave = require('./bgxxtglyqrSave');
  var bgxxtglyqrView = require('./bgxxtglyqrView');
   
  var taskType = "NOTEND"; //任务类型
  var flowStatus = ""; //流程状态
  
  var viewConfig = {
    initialize: function() {
      var view = utils.loadCompiledPage('bgxxtglyqr');
      this.$rootElement.html(view.render({}), true);
      this.pushSubView([bgxxtglyqrSave]);
      this.initView();
    
      this.eventMap = {
        "[data-action=audit]": this.actionAudit,
        "[data-action=edit]": this.actionEdit,
        "[data-action=detail]": this.actionDetail,
        "[data-action=export]": this.actionExport,
        "[data-action=import]": this.actionImport,
        "[data-action=query]": this.actionQuery,
        "[data-action=custom-column]": this.actionCustomColumn,
        "[data-action=callback]" : this.actionCallback,
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
		//重新统计数据
        _sjtj.xxhbsqshtj();
    },

    actionAudit: function(e){
    var id = $(e.target).attr("data-x-wid");
    var taskid =$(e.target).attr("data-x-taskId")
    var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', {WID:id,pageNumber:1});
      var bgxxtglyqrNewTpl = utils.loadCompiledPage('bgxxtglyqrSave');
      $.bhPaperPileDialog.show({
        content: bgxxtglyqrNewTpl.render({}),
        title: "确认变更",
        ready: function($header, $body, $footer){
          bgxxtglyqrSave.initialize(data,id,taskid);       
          $("#emapForm").emapForm("setValue", data.rows[0]); 
        }
      });
    },
        
    actionEdit: function(e){
      var id = $(e.target).attr("data-x-wid");
      var bgxxtglyqrEditTpl = utils.loadCompiledPage('bgxxtglyqrSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', {WID:id,pageNumber:1});
          
      $.bhPaperPileDialog.show({
        content: bgxxtglyqrEditTpl.render({}),
        title: "编辑",
        ready: function($header, $body, $footer){
          bgxxtglyqrSave.initialize();       
          $("#emapForm").emapForm("setValue", data.rows[0]);    
        }
      });
    },
        
    actionDetail: function(e){
      var id = $(e.target).attr("data-x-wid");
      var lcxx=_util.getpromid(id,'bgxxtglyqr','bgqrxxlb');
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
      
      var bgxxtglyqrViewTpl = utils.loadCompiledPage('bgxxtglyqrSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', {WID:id,pageNumber:1});
          
      $.bhPaperPileDialog.show({
        content: bgxxtglyqrViewTpl.render({}),
        title: "查看",
        ready: function($header, $body, $footer){
          bgxxtglyqrView.initialize(id,data,taskid);
        	 $("#emapForm").emapForm("setValue", data.rows[0]);
        }
      });
    },
    
    handbook:function(e){
    	//window.location.href = '../public/word/1重庆邮电大学_信息化基础设施管理操作手册（系统管理员）.docx';    		
    	var self=this;
	     var result = '1重庆邮电大学_信息化基础设施管理操作手册（申请人）.docx';
	     var oresult = '1重庆邮电大学_信息化基础设施管理操作手册（申请人）.docx';	    		
	     var url = bs.api.fileDownUrl + '?name=' + encodeURI(result) + '&oName=' + oresult;
	     document.getElementById("loadFileHide").src = url;
        // self.loadiframe(document.getElementById("loadFileHide"));//判断下载是否完成
    },
    
    actionCallback : function(e) {
  		var id = $(e.target).attr("data-x-wid");
  		//var taskid = $(e.target).attr("data-x-taskId");
  		var proid = $(e.target).attr("data-x-proid");
        var xxsj;
  	   	$.ajax({
  	  	    type: "post",
  	  	    async: false,
  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryUserTasksByNode.do',
  	  	    data: { 
  	  	        taskType:'ENDED',
  	  	        nodeId:'xglyqr' , 
  	  	        appName: 'xxhjcssgl',
  	  	        module: 'modules',
  	  	        page: 'bgxxtglyqr',
  	  	        action: 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
  	  	        WID:id,
  	  	        pageSize: 10,
  	  	        pageNumber: 1,
  	  	       }, //发送到服务器的参数
  	  	    datatype: "json",
  	  	   success: function (result) {
  	  	        xxsj = result.datas.queryUserTasksByNode.rows
  	  	   }
  	  	 })		
  		var sfsj = true			
  		var params = { 
  				commandType: 'callback',
  				taskId: xxsj[0].TASKID,
  				appName: 'xxhjcssgl',
  				}; 
  		$.ajax({
  			url:WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/tasks/callback.do',
  			type:'post',
  			data:params,
  			async:false,
  			cache : true,
  			success:function(response) {
  				var pd = $.parseJSON(response);
				if(pd.succeed){   
					$.bhTip({
						content : '撤回成功',
						state : 'success',
						hideWaitTime : 2000
					});
					  //统计数据
					  _sjtj.bgqrtj();
			}else{
				 sfsj = false	
				 $.bhTip({
						content : '撤回失败',
						state : 'danger',
						hideWaitTime : 2000
					});
				}
  			}
  		
  		});
  		if(sfsj){
  			this.actionQuery(null)	//撤回成功之后进行重载列表
  		}
  	},
    
  	actionBjCallback:function(e){
  		var id = $(e.target).attr("data-x-wid");
  		 var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', {WID:id,pageNumber:1});
  		 var jcssarr = data.rows[0].JCSSID.split(',');
  		var proid = $(e.target).attr("data-x-proid");
  		var sfsj = true	
  		var params = { 
  				commandType: 'finishedCallback',
  				processInstanceId:proid,
  				appName: 'xxhjcssgl',
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
					  for(i=0;i<jcssarr.length;i++){
					 var ztparams = { 
 					    	//PWID : jbxxdata.rows[0].WID,
							PWID:jcssarr[i],	 
 					    	ZT : 8,
				    		 }; 
				    		 $.ajax({
				    			url:'../modules/bgxxtglyqr/xgzt.do',  //修改更新
				    			type:'post',
				    			data:ztparams,
				    			async:false,
				    			cache : true,
				    			success:function(data){  				    				    								
				    			}
				    		 });
					  }
					$.bhTip({
						content : '取回成功',
						state : 'success',
						hideWaitTime : 2000
					});
					  //统计数据
					  _sjtj.bgqrtj();
				}else{
					 sfsj = false
					$.bhTip({
						content : '取回失败',
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
        "page": "bgxxtglyqr",
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
      var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', "search");
      var $query = $('#emapAdvancedQuery').emapAdvancedQuery({
        data: searchData,
        contextPath : contextPath,
        schema: true
      });
      $query.on('search', this._searchCallback);
    },

    _searchCallback: function(e, data, opts) {
    	 taskType = $('[data-action=query].bh-active').attr('data');
    	 if (taskType == "") {
             $('#emapdatatable').emapdatatable('reload', {
                 querySetting : data,
             
                 });           
            } else{       
             $('#emapdatatable').emapdatatable('reload', {
                 querySetting : data,
                 taskType : taskType,            
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
              
                  });           
             } else{       
              $('#emapdatatable').emapdatatable('reload', {
                  querySetting : searchData,
                  taskType : taskType,            
              });
          }
      },
      
    //流程状态事件
		actionLczt:function(e){
	  		var id = $(e.target).attr("data-x-wid");
	    	var pid=_util.getpromid(id,'bgxxtglyqr','bgqrxxlb');
	    	
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
	            	  nodeId : 'xglyqr', // 流程定义中人工环节的编号，必填
	            	  appName : 'xxhjcssgl',// 应用的名称，必填
	            	  module : 'modules', // 模块名，可以没有，默认modules
	            	  page : 'bgxxtglyqr', // 回调动作的epg的编号，必填
	            	//  action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', // 回调的动作，必填
	            	  action : 'bgqrxxlb',
	            	  hideFlowState: true,
	                  hideTaskState: true,
	                  '*order' : '-BGTJSJ'
	            	               
	            };		
	    	
	    	
	      var tableOptions = {
	        pagePath: bs.api.pageModel,
	      url : _emapflow.getQueryTasksUrl(),
			action : _emapflow.getQueryTasksAction(),
	   // url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
	   // action: _emapflow.getQueryTasksByNodeAction(),
//	    url : _emapflow.getObserveQueryTasksUrl(),
//		  action : _emapflow.getObserveQueryTasksAction(),
		    datamodel: _emapflow.getDataModels(params),
		    params : params,	//参数
	       // action: 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
	        customColumns: [{
	          colIndex: '0',
	          type: 'checkbox'
	        }, {
	          colIndex: '1',
	          type: 'tpl',
	          column: {
	            text: '操作',
	            width:'180px',
	            align: 'center',
	            cellsAlign: 'center',
	            cellsRenderer: function(row, column, value, rowData) {
	            	
	            	var str = '';
	            	
	            	
	            	if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
						
	            		var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
					    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
						var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
						var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
						
			        	
			        	 if (rowData.TASKSTATUS == "1")
						 str += '<a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID
							      + ' data-x-taskid='+ rowData.TASKID
							      + ' data-x-proid='+ rowData.PROCESSINSTANCEID
								 + '>' + '确认' + '</a> | ';
			        	 if(dqhj == 'xxhllyshbg'){ 
								if (rowData.TASKSTATUS == "0" && rowData.FLOWSTATUS == "1"){ //已办并且为“在审核中”
									str += '<a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
										' data-x-taskid='+ rowData.TASKID+ 
										' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
								}
				        	}
			        	 if(zzhj == 'xglyqr'&& rowData.FLOWSTATUS == "5"){
					 				str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
					 					' data-x-taskid='+ rowData.TASKID+ 
					 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '取回' + '</a> | ';
				        	 }
	            	}
	            	str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX + '>详情</a> | ';
					 
		           	 
					 str += ' <a href="javascript:void(0)" data-action="lczt" data-x-wid=' + rowData.WID + '>流程状态</a>   ';
					 	
	            	
			        	 return str;
	            }
	          }
	        }
	        ,
	        {
				colIndex : '2',
				type : 'tpl',
				column : {
					text : '最新环节-状态',
					align : 'center',
					cellsAlign : 'center',
					width : '220px',
					cellsRenderer : function(row, column, value,rowData) {
						var NODENAME;
						var FLOWSTATUSNAME
						if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
							
							var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
						    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
							var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
							var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
							
							var ZT = dqhj
							if(dqhj == undefined){
								ZT = zzhj
							}
							if (ZT == 'xtglybgsq'){
								NODENAME = "变更申请-"
							}else if(ZT == 'xglyqr'){
								NODENAME = "确认变更-"
							}else if(ZT == 'xxhllyshbg'){
								NODENAME = "申请单位信息化联络员审核-"
							}else if(ZT == 'bmldshbg'){
								NODENAME = "申请单位负责人审核-"
							}else if(ZT == 'xxhbshbg'){
								NODENAME = "信息化办审核-"
							}else if(ZT == undefined){
		 						NODENAME = ''
		 					}
			   		    	if (rowData.FLOWSTATUS == '1'){			   		    		
								FLOWSTATUSNAME = "审核中"
								if(ZT == 'xglyqr'){
					   		    	 FLOWSTATUSNAME = "确认中"
					   		    }
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
								return ''
							}
					}
				}
			}]
	      };
	      $('#emapdatatable').emapdatatable(tableOptions);
	    }
	    
//    _initTable: function() {
//    	var params = {
//            	  taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL
//            	  nodeId : 'xglyqr', // 流程定义中人工环节的编号，必填
//            	  appName : 'xxhjcssgl',// 应用的名称，必填
//            	  module : 'modules', // 模块名，可以没有，默认modules
//            	  page : 'bgxxtglyqr', // 回调动作的epg的编号，必填
//            	//  action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', // 回调的动作，必填
//            	  action : 'bgqrxxlb',
//            	  hideFlowState: true,
//                  hideTaskState: true,
//                  '*order' : '-BGTJSJ'
//            	               
//            };		
//    	
//    	
//      var tableOptions = {
//        pagePath: bs.api.pageModel,
//      url : _emapflow.getQueryTasksUrl(),
//		action : _emapflow.getQueryTasksAction(),
//   // url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
//   // action: _emapflow.getQueryTasksByNodeAction(),
////    url : _emapflow.getObserveQueryTasksUrl(),
////	  action : _emapflow.getObserveQueryTasksAction(),
//	    datamodel: _emapflow.getDataModels(params),
//	    params : params,	//参数
//       // action: 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
//        customColumns: [{
//          colIndex: '0',
//          type: 'checkbox'
//        }, {
//          colIndex: '1',
//          type: 'tpl',
//          column: {
//            text: '操作',
//            width:'180px',
//            align: 'center',
//            cellsAlign: 'center',
//            cellsRenderer: function(row, column, value, rowData) {
//            	
//            	var str = '';
//            	
//            	
//            	if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
//					
//            		var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//				    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//					var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//					var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//					
//		        	
//		        	 if (rowData.TASKSTATUS == "1")
//					 str += '<a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID
//						      + ' data-x-taskid='+ rowData.TASKID
//						      + ' data-x-proid='+ rowData.PROCESSINSTANCEID
//							 + '>' + '确认' + '</a> | ';
//		        	 if(dqhj == 'xxhllyshbg'){ 
//							if (rowData.TASKSTATUS == "0" && rowData.FLOWSTATUS == "1"){ //已办并且为“在审核中”
//								str += '<a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
//									' data-x-taskid='+ rowData.TASKID+ 
//									' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
//							}
//			        	}
//		        	 if(zzhj == 'xglyqr'&& rowData.FLOWSTATUS == "5"){
//				 				str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
//				 					' data-x-taskid='+ rowData.TASKID+ 
//				 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '取回' + '</a> | ';
//			        	 }
//            	}
//		        	 str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID 
//						+ ' data-x-taskid='+ rowData.TASKID
//						+ ' data-x-proid='+ rowData.PROCESSINSTANCEID
//						+ '>'+ '详情' + '</a>';
//		        	 if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
//		        	 str += ' | <a href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?taskId='+rowData.TASKID+'&defKey=xxhjcssgl.xtglybg" target="_blank"   data-x-wid=' + rowData.WID + 
//		             ' data-x-taskid=' + rowData.TASKID+ 
//		             ' data-x-proid=' + rowData.PROCESSINSTANCEID + '>' + '查看流程' + '</a>';	 
//		        	 }
//            	
//		        	 return str;
//            }
//          }
//        }
//        ,
//        {
//			colIndex : '2',
//			type : 'tpl',
//			column : {
//				text : '最新环节-状态',
//				align : 'center',
//				cellsAlign : 'center',
//				width : '220px',
//				cellsRenderer : function(row, column, value,rowData) {
//					var NODENAME;
//					var FLOWSTATUSNAME
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
//						if (ZT == 'xtglybgsq'){
//							NODENAME = "变更申请-"
//						}else if(ZT == 'xglyqr'){
//							NODENAME = "确认变更-"
//						}else if(ZT == 'xxhllyshbg'){
//							NODENAME = "申请单位信息化联络员审核-"
//						}else if(ZT == 'bmldshbg'){
//							NODENAME = "申请单位负责人审核-"
//						}else if(ZT == 'xxhbshbg'){
//							NODENAME = "信息化办审核-"
//						}else if(ZT == undefined){
//	 						NODENAME = ''
//	 					}
//		   		    	if (rowData.FLOWSTATUS == '1'){			   		    		
//							FLOWSTATUSNAME = "审核中"
//							if(ZT == 'xglyqr'){
//				   		    	 FLOWSTATUSNAME = "确认中"
//				   		    }
//						}else if(rowData.FLOWSTATUS == '2'){
//							FLOWSTATUSNAME = "已驳回"
//						}else if(rowData.FLOWSTATUS == '3'){
//							FLOWSTATUSNAME = "申请成功"
//						}else if(rowData.FLOWSTATUS == '4'){
//							FLOWSTATUSNAME = "未提交"
//						}else if(rowData.FLOWSTATUS == '5'){
//							FLOWSTATUSNAME = "申请未通过"
//						}else if(rowData.FLOWSTATUS == '6'){
//							FLOWSTATUSNAME = "未提交"
//						}	
//						return NODENAME + FLOWSTATUSNAME;		
//						}else if(rowData.PROCESSINSTANCEID == null ){//流程信息为空
//							return '暂无无流程信息'
//						}
//				}
//			}
//		}]
//      };
//      $('#emapdatatable').emapdatatable(tableOptions);
//    }
  };

  return viewConfig;
});