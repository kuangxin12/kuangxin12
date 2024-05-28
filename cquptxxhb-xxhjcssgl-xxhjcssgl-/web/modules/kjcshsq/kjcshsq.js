define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./kjcshsqBS');
	var kjcshsqSave = require('./kjcshsqSave');
	var kjcshsqView = require('./kjcshsqView');
	
	 var taskType = "NOTEND"; //任务类型
	  var flowStatus = ""; //流程状态

	var viewConfig = {
		initialize : function() {
			var view = utils.loadCompiledPage('kjcshsq');
			this.$rootElement.html(view.render({}), true);
			this.pushSubView([ kjcshsqSave ]);
			this.initView();
			
			this.eventMap = {
				"[data-action=audit]" : this.actionAudit,
				"[data-action=detail]" : this.actionDetail,
				"[data-action=export]" : this.actionExport,
				"[data-action=import]" : this.actionImport,
				"[data-action=query]" : this.actionQuery,
				"[data-action=callback]" : this.actionCallback,
				"[data-action=custom-column]" : this.actionCustomColumn,
		        "[data-action=callback]" : this.actionCallback,	
		        "[data-action=handbook]": this.handbook,
		        "[data-action=finishedcallback]" : this.actionBjCallback,
		        
		        "[data-action=lczt]" : this.actionLczt,//流程状态
				 "[data-action=getShData]" : this.actionGetShData,//获取审核数据
			};
		},

		initView : function() {
			this._initAdvanceQuery();
			this._initTable();
			
//			setTimeout(actionGetShData,20000);
		},
		
		actionGetShData:function(e){
			//重新统计数据
	        _sjtj.kjcsqshtj();
	    },

		actionAudit : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var lx = $(e.target).attr("data-x-lx");
			var taskid = $(e.target).attr("data-x-taskId");
			var sqlx = $(e.target).attr("data-x-sqlx");
			var kjcshsqEditTpl = utils.loadCompiledPage('kjcshsqSave');
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', {
						WID : id,
						pageNumber : 1,
						LX : lx
					});

			$.bhPaperPileDialog.show({
				content : kjcshsqEditTpl.render({}),
				title : "审核",
				ready : function($header, $body, $footer) {
					kjcshsqSave.initialize(id, data.rows[0],taskid, lx,'kjcshsq',sqlx);
//					$("#emapForm").emapForm("setValue", data.rows[0]);
				}
			});
		},

		actionDetail : function(e) {
			var id = $(e.target).attr("data-x-wid");
	    	 var lx = $(e.target).attr("data-x-lx");
	    	 var lcxx=_util.getpromid(id,'kjcshsq','T_XXB_XXHJCSS_JBXX_QUERY');
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
	         var xxhjcsssqViewTpl = utils.loadCompiledPage('kjcshsqSave');
	         var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {
	        	  WID : id,
	              pageNumber:1,
	              LX:lx
	         });

	         $.bhPaperPileDialog.show({
	             content : xxhjcsssqViewTpl.render({}),
	             title : "查看",
	             ready : function($header, $body, $footer) {
	            	 kjcshsqView.initialize(id, data.rows[0], taskid,lx,'kjcshsq');
//	             	 $("#emapForm").emapForm("setValue", data.rows[0],lx);
	             }
	         });
		},
		
		 handbook:function(e){
		    	//window.location.href = '../public/word/1重庆邮电大学_信息化基础设施管理操作手册（系统管理员）.docx';    		
		    	var self=this;
			     var result = '4重庆邮电大学_信息化基础设施管理操作手册（科技处）.docx';
			     var oresult = '4重庆邮电大学_信息化基础设施管理操作手册（科技处）.docx';	    		
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
	  	  	        nodeId:'kjcsh' , 
	  	  	        appName: 'xxhjcssgl',
	  	  	        module: 'modules',
	  	  	        page: 'kjcshsq',
	  	  	        action: 'T_XXB_XXHJCSS_JBXX_QUERY',
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
	  				sendMessage : false //是否发送邮件
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
						var searchData = $('#emapAdvancedQuery').emapAdvancedQuery(
						'getValue');
						var taskType = $('[data-action=query].bh-active').attr('data');
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
						//重新统计数据
//				        _sjtj.kjcsqshtj();
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
	  		var proid = $(e.target).attr("data-x-proid");
	  		var sqlx = $(e.target).attr("data-x-sqlx");
	  		var xgzt
	  		if(sqlx == '申请'){
	  			xgzt = null
	  		}
	  		if(sqlx == '年审'){
	  			xgzt = 4
	  		}
	  		var sfsj = true	
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
						
						//取回之后 状态恢复到原来
						var ztparams = { 
		    					WID : id,
	    						ZT : xgzt,
	    						}; 
	    				$.ajax({
	    					url:'../modules/kjcshsq/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
	    					type:'post',
	    					data:ztparams,
	    					async:false,
	    					cache : true,
	    					success:function(data){
	    								
	    					 }
	    					});
	    				
						$.bhTip({
							content : '取回成功',
							state : 'success',
							hideWaitTime : 2000
						});
						 
						var searchData = $('#emapAdvancedQuery').emapAdvancedQuery(
						'getValue');
						var taskType = $('[data-action=query].bh-active').attr('data');
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
						//重新统计数据
//				        _sjtj.kjcsqshtj();
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

		actionExport : function() {
			bs.exportData({});
		},

		actionImport : function() {
			$.emapImport({
				"contextPath" : contextPath,
				"app" : "xxhjcssgl",
				"module" : "modules",
				"page" : "kjcshsq",
				"action" : "[添加或保存动作的别名]",// 使用添加或保存动作
				// "tplUrl": "modules/htgl/dataModel.T_JZG_HT.xls",
				"preCallback" : function() {
				},
				"closeCallback" : function() {
					$('#emapdatatable').emapdatatable('reload');
				},
			});
		},

		actionCustomColumn : function() {
			$('#emapdatatable').emapdatatable('selectToShowColumns');
		},

		_initAdvanceQuery : function() {
			var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', "search");
			var $query = $('#emapAdvancedQuery').emapAdvancedQuery({
				data : searchData,
				contextPath : contextPath,
				schema : true
			});
			 var now = new Date();
		      //now_time = new Date().Format('yyyy-MM-dd HH:mm');
		      new_time=new Date().Format('yyyy-MM-dd HH:mm:ss');
		      now_time = new Date(now.getTime()).Format('yyyy-MM-dd HH:mm:ss');
		      old_time = new Date(now.getTime()-30 * 24 * 3600 * 1000).Format('yyyy-MM-dd')+' 00:00:00';
		    var data = JSON.stringify([{"name":"JHWHSJ","caption":"计划维护时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"JHWHSJ","caption":"计划维护时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]);
		      $('#emapAdvancedQuery').emapAdvancedQuery("setValue",data);
		      $query.on('search', this._searchCallback);
		},

		_searchCallback : function(e, data, opts) {
			$('#emapdatatable').emapdatatable('reload', {
		        querySetting: data
		  });
		},

		actionQuery : function(event) {		
			 var searchData = $('#emapAdvancedQuery').emapAdvancedQuery('getValue');
			 if(event == null){
				 taskType = $('[data-action=query].bh-active').attr('data');
			}else {
				taskType = event.currentTarget.attributes.data.value;		       	
			}	
		     	       
		       var cgsj = [
		                   {"name":"ZT","value":"7","linkOpt":"AND","builder":"moreEqual"},
		                   {"name":"SBFL","value":"KY","linkOpt":"AND","builder":"equal"}
		                   ]		        
		       cgsj =  JSON.stringify(cgsj)		       
		       if (taskType == "") {
		           $('#emapdatatable').emapdatatable('reload', {
		               querySetting : searchData,
		             
		               });           
		          } 
		       else if(taskType == "ALL"){
		        	  $('#emapdatatable').emapdatatable('reload', { 
			               querySetting :cgsj,
			               taskType : taskType,			           
			           });
		          } 
		          else {       
		           $('#emapdatatable').emapdatatable('reload', {
		               querySetting : searchData,
		               taskType : taskType,
		            
		           });
		       }
			
		},
		
		//流程状态事件
		actionLczt:function(e){
	  		var id = $(e.target).attr("data-x-wid");
	    	var pid=_util.getpromid(id,'kjcshsq','T_XXB_XXHJCSS_JBXX_QUERY');
	    	
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
		
	    _initTable : function() {
			var params = {
					taskType : taskType,	//未完成-NOTEND，已完成-ENDED，所有-ALL
					nodeId : 'kjcsh',	//流程定义中人工环节的编号，必填
					appName : 'xxhjcssgl',//应用的名称，必填
					module : 'modules', //模块名，可以没有，默认modules
					page: 'kjcshsq',	//回调动作的epg的编号，必填
					action : 'T_XXB_XXHJCSS_JBXX_QUERY',	//回调的动作，必填
					'*order' : '-TJSJ',
					hideFlowState:true,
			  		hideTaskState:true, 
			  		querySetting:JSON.stringify([{"name":"TJSJ","caption":"提交时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},
					                             {"name":"TJSJ","caption":"提交时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}])
			};

			var tableOptions = {
				pagePath : bs.api.pageModel,
				url : _emapflow.getQueryTasksUrl(),
				action : _emapflow.getQueryTasksAction(),
//				url:_emapflow.getQueryTasksByNodeUrl(),
//				action:_emapflow.getQueryTasksByNodeAction(),
				datamodel : _emapflow.getDataModels(params),
				params : params,
				
				customColumns : [
						{
							colIndex : '0',
							type : 'checkbox'
						},
						{
							colIndex : '1',
							type : 'tpl',
							column : {
								text : '操作',
								align : 'center',
								cellsAlign : 'center',
								width: '170px',
								cellsRenderer : function(row, column, value,
										rowData) {
									
									
									
									var str = '';
																		
											
									
									if (rowData.PROCESSINSTANCEID != null ){//流程信息是否为空
										var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
									    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
										var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
										var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
										
		             					if (rowData.TASKSTATUS == "1")//待办
										str += ' | <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID+' data-x-lx=' + rowData.LX 
										+ ' data-x-sqlx=' + rowData.SQLX + ' data-x-taskid='+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>审核</a>';
									
										
										if(dqhj == 'xxhbshsq'){ 
			         						if (rowData.TASKSTATUS == "0" && rowData.FLOWSTATUS == "1"){ //已办并且为“在审核中”
			         							str += ' | <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
			         								' data-x-taskid='+ rowData.TASKID+ 
			         								' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a>';
			         						}
			         		        	}
			         	        	 if(zzhj == 'kjcsh' && rowData.FLOWSTATUS == "5"){
			         			 				str += ' | <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
			         			 					' data-x-taskid='+ rowData.TASKID+  ' data-x-sqlx=' + rowData.SQLX +
			         			 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '取回' + '</a>';
			         		        	 
			         	        	 }
			         	        	
									}
									
									str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX + '>详情</a> | ';
									 
						           	 
									 str += ' <a href="javascript:void(0)" data-action="lczt" data-x-wid=' + rowData.WID + '>流程状态</a>   ';
									 	
									return str;
								  
								}
							}
						} , {
							colIndex : '2',
							type : 'tpl',
							column : {
								text : '最新环节-状态',
								align : 'center',
								cellsAlign : 'center',
								width : '180px',
								cellsRenderer : function(row, column, value,
										rowData) {
									var NODENAME
									
									var currenttime = new Date().getTime();//当前时间的时间戳
									var youxiaoqi = null
									if(rowData != null){
										var jzdateStr=rowData.YXQ;
										jzdateStr=jzdateStr.replace(/-/g,'/'); 
										youxiaoqi =new Date(jzdateStr).getTime();//有效期的时间戳
									}
									
									if(rowData.ZT==10){
										if(rowData.SQLX=='申请')
											return "申请成功";
										if(rowData.SQLX=='年审')
											return "年审成功";
										if(rowData.SQLX=='申请出口')
											return "申请出口成功";
										if(rowData.SQLX=='关闭出口')
											return "关闭出口成功";	
										if(currenttime > youxiaoqi && youxiaoqi != null)
											return "已到期，未年审";
									}//申请成功
										
									else if(rowData.ZT==0)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "申请未通过";
									else if(rowData.ZT==1)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "未年审";
									else if(rowData.ZT==2)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "已关闭";
									else if(rowData.ZT==3)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "年审申请中";
									else if(rowData.ZT==4)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "年审审核中";
									else if(rowData.ZT==5)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "年审未通过";
									else if(rowData.ZT==11)
										 return "申请出口未通过";	
									else if(rowData.ZT==12)
										 return "关闭出口未通过";
									else{ //在流程申请中
										if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
											
											var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
										    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
											var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
											var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
											
											var ZT = dqhj
											if(dqhj == undefined){
												ZT = zzhj
											}
											 																						
										    if(ZT == "xxhllyshsq"){
						 						NODENAME = '信息化联络员审核-'
						 					}else if(ZT == "xtglysq"){
						 						NODENAME = '系统管理员申请-'
						 					}else if(ZT == "bmldshsq"){
						 						NODENAME = '部门领导审核-'
						 					}else if(ZT == "jwcsh"){
						 						NODENAME = '教务处审核-'
						 					}else if(ZT == "kjcsh"){
						 						NODENAME = '科技处审核-'
						 					}else if(ZT == "xxhbshsq"){
						 						NODENAME = '信息化办审核-'
						 					}else if(ZT == undefined){
						 						NODENAME = ''
						 					}
										    
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
										    
										    return NODENAME + rowData.FLOWSTATUSNAME;
											}else if(rowData.PROCESSINSTANCEID == null ){//流程信息为空
												return ''
											}
									}
								}
							}
						}
						]
			};
			$('#emapdatatable').emapdatatable(tableOptions);
		}
	    
//		_initTable : function() {
//			var params = {
//					taskType : taskType,	//未完成-NOTEND，已完成-ENDED，所有-ALL
//					nodeId : 'kjcsh',	//流程定义中人工环节的编号，必填
//					appName : 'xxhjcssgl',//应用的名称，必填
//					module : 'modules', //模块名，可以没有，默认modules
//					page: 'kjcshsq',	//回调动作的epg的编号，必填
//					action : 'T_XXB_XXHJCSS_JBXX_QUERY',	//回调的动作，必填
//					'*order' : '-TJSJ',
//					hideFlowState:true,
//			  		hideTaskState:true, 
//			};
//
//			var tableOptions = {
//				pagePath : bs.api.pageModel,
//				url : _emapflow.getQueryTasksUrl(),
//				action : _emapflow.getQueryTasksAction(),
////				url:_emapflow.getQueryTasksByNodeUrl(),
////				action:_emapflow.getQueryTasksByNodeAction(),
//				datamodel : _emapflow.getDataModels(params),
//				params : params,
//				customColumns : [
//						{
//							colIndex : '0',
//							type : 'checkbox'
//						},
//						{
//							colIndex : '1',
//							type : 'tpl',
//							column : {
//								text : '操作',
//								align : 'center',
//								cellsAlign : 'center',
//								width: '170px',
//								cellsRenderer : function(row, column, value,
//										rowData) {
//									
//									
//									
//									var str = '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX 
//									+ ' data-x-taskid='+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>详情</a>';
//																		
//											
//									
//									if (rowData.PROCESSINSTANCEID != null ){//流程信息是否为空
//										var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//									    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//										var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//										var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//										
//		             					if (rowData.TASKSTATUS == "1")//待办
//										str += ' | <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID+' data-x-lx=' + rowData.LX 
//										+ ' data-x-sqlx=' + rowData.SQLX + ' data-x-taskid='+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>审核</a>';
//									
//										
//										if(dqhj == 'xxhbshsq'){ 
//			         						if (rowData.TASKSTATUS == "0" && rowData.FLOWSTATUS == "1"){ //已办并且为“在审核中”
//			         							str += ' | <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
//			         								' data-x-taskid='+ rowData.TASKID+ 
//			         								' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a>';
//			         						}
//			         		        	}
//			         	        	 if(zzhj == 'kjcsh' && rowData.FLOWSTATUS == "5"){
//			         			 				str += ' | <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
//			         			 					' data-x-taskid='+ rowData.TASKID+  ' data-x-sqlx=' + rowData.SQLX +
//			         			 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '取回' + '</a>';
//			         		        	 
//			         	        	 }
//			         	        	str += ' | <a  href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
//		                			 +rowData.PROCESSINSTANCEID+'&responseType=forward" target="_blank">流程状态</a>';
//									}
//									return str;
//								  
//								}
//							}
//						} , {
//							colIndex : '2',
//							type : 'tpl',
//							column : {
//								text : '最新环节-状态',
//								align : 'center',
//								cellsAlign : 'center',
//								width : '180px',
//								cellsRenderer : function(row, column, value,
//										rowData) {
//									var NODENAME
//									
//									var currenttime = new Date().getTime();//当前时间的时间戳
//									var youxiaoqi = null
//									if(rowData != null){
//										var jzdateStr=rowData.YXQ;
//										jzdateStr=jzdateStr.replace(/-/g,'/'); 
//										youxiaoqi =new Date(jzdateStr).getTime();//有效期的时间戳
//									}
//									
//									if(rowData.ZT==10){
//										if(rowData.SQLX=='申请')
//											return "申请成功";
//										if(rowData.SQLX=='年审')
//											return "年审成功";
//										if(rowData.SQLX=='申请出口')
//											return "申请出口成功";
//										if(rowData.SQLX=='关闭出口')
//											return "关闭出口成功";	
//										if(currenttime > youxiaoqi && youxiaoqi != null)
//											return "已到期，未年审";
//									}//申请成功
//										
//									else if(rowData.ZT==0)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "申请未通过";
//									else if(rowData.ZT==1)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "未年审";
//									else if(rowData.ZT==2)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "已关闭";
//									else if(rowData.ZT==3)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "年审申请中";
//									else if(rowData.ZT==4)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "年审审核中";
//									else if(rowData.ZT==5)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "年审未通过";
//									else if(rowData.ZT==11)
//										 return "申请出口未通过";	
//									else if(rowData.ZT==12)
//										 return "关闭出口未通过";
//									else{ //在流程申请中
//										if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
//											
//											var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//										    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//											var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//											var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//											
//											var ZT = dqhj
//											if(dqhj == undefined){
//												ZT = zzhj
//											}
//											 																						
//										    if(ZT == "xxhllyshsq"){
//						 						NODENAME = '信息化联络员审核-'
//						 					}else if(ZT == "xtglysq"){
//						 						NODENAME = '系统管理员申请-'
//						 					}else if(ZT == "bmldshsq"){
//						 						NODENAME = '部门领导审核-'
//						 					}else if(ZT == "jwcsh"){
//						 						NODENAME = '教务处审核-'
//						 					}else if(ZT == "kjcsh"){
//						 						NODENAME = '科技处审核-'
//						 					}else if(ZT == "xxhbshsq"){
//						 						NODENAME = '信息化办审核-'
//						 					}else if(ZT == undefined){
//						 						NODENAME = ''
//						 					}
//										    
//										    if (rowData.FLOWSTATUS == '1'){
//												rowData.FLOWSTATUSNAME = "审核中"
//											}else if(rowData.FLOWSTATUS == '2'){
//												rowData.FLOWSTATUSNAME = "已驳回"
//											}else if(rowData.FLOWSTATUS == '3'){
//												rowData.FLOWSTATUSNAME = "申请成功"
//											}else if(rowData.FLOWSTATUS == '4'){
//												rowData.FLOWSTATUSNAME = "未提交"
//											}else if(rowData.FLOWSTATUS == '5'){
//												rowData.FLOWSTATUSNAME = "申请未通过"
//											}else if(rowData.FLOWSTATUS == '6'){
//												rowData.FLOWSTATUSNAME = "未提交"
//											}
//										    
//										    return NODENAME + rowData.FLOWSTATUSNAME;
//											}else if(rowData.PROCESSINSTANCEID == null ){//流程信息为空
//												return '暂无无流程信息'
//											}
//									}
//								}
//							}
//						}
//						]
//			};
//			$('#emapdatatable').emapdatatable(tableOptions);
//		}
	};

	return viewConfig;
});