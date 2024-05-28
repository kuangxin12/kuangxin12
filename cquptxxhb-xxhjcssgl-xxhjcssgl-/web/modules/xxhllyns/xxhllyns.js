define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./xxhllynsBS');
	var xxhllynsSave = require('./xxhllynsSave');
	//var nssqJl = require('../nssq/nssqJl');
	var nssqJl = require('./nssqJl');
	var nssqwns = require('./nssqwns');
	var xxhllynsView = require('./xxhllynsView');


	var taskType = "NOTEND";//任务类型
	  var flowStatus = "";//流程类型
	  
	var viewConfig = {
		initialize : function() {
			self = this;	
			var view = utils.loadCompiledPage('xxhllyns');
			this.$rootElement.html(view.render({}), true);
			this.pushSubView([ xxhllynsSave ]);
			this.initView();
			
			this.eventMap = {
				"[data-action=audit]" : this.actionAudit,
				"[data-action=detail]" : this.actionDetail,
				"[data-action=export]" : this.actionExport,
				"[data-action=import]" : this.actionImport,
				"[data-action=query]" : this.actionQuery,
				"[data-action=nsjl]" : this.actionNsjl,
				"[data-action=custom-column]" : this.actionCustomColumn,
		        "[data-action=callback]" : this.actionCallback,
		        "[data-action=handbook]": this.handbook,
		        "[data-action=finishedcallback]" : this.actionBjCallback,
		        "[data-action=wnscx]": this.wnscx,
		        "[data-action=batchExecute]": this.batchExecute,
		        
		        "[data-action=lczt]" : this.actionLczt,//流程状态
				 "[data-action=getShData]" : this.actionGetShData,//获取审核数据
			};
		},

		initView : function() {
			this._initAdvanceQuery();
		//	this._initTable(taskType);
			this._initTable();
			
//			setTimeout(actionGetShData,20000);
		},
		
		actionGetShData:function(e){
			//统计数据
			  _sjtj.llynsshtj();
	    },

		actionAudit : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var taskid = $(e.target).attr("data-x-taskId");
			var xxhllynsEditTpl = utils.loadCompiledPage('xxhllynsSave');
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
					'T_XXB_XXHJCSS_NS_QUERY', {
				WID : id,
				pageNumber : 1,
			});

			$.bhPaperPileDialog.show({
				content : xxhllynsEditTpl.render({}),
				title : "审核",
				ready : function($header, $body, $footer) {
					xxhllynsSave.initialize(id, data,taskid);
//					$("#emapForm").emapForm("setValue", data.rows[0]);
				}
			});
		},

		actionDetail : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var lcxx=_util.getpromid(id,'xxhllyns','T_XXB_XXHJCSS_NS_QUERY');
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
	        
	         var xxhllynsViewTpl = utils.loadCompiledPage('xxhllynsSave');
	         var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_NS_QUERY', {
	        	  WID : id,
	              pageNumber:1,
	         });

	         $.bhPaperPileDialog.show({
	             content : xxhllynsViewTpl.render({}),
	             title : "查看",
	             ready : function($header, $body, $footer) {
	            	 xxhllynsView.initialize(id,data,taskid);
//	             	 $("#emapForm").emapForm("setValue", data.rows[0],lx);
	             }
	         });
		},
		handbook:function(e){
	    	//window.location.href = '../public/word/1重庆邮电大学_信息化基础设施管理操作手册（系统管理员）.docx';    		
	    	var self=this;
		     var result = '2重庆邮电大学_信息化基础设施管理操作手册（信息化联络员）.docx';
		     var oresult = '2重庆邮电大学_信息化基础设施管理操作手册（信息化联络员）.docx';	    		
		     var url = bs.api.fileDownUrl + '?name=' + encodeURI(result) + '&oName=' + oresult;
		     document.getElementById("loadFileHide").src = url;
	        // self.loadiframe(document.getElementById("loadFileHide"));//判断下载是否完成
	    },
		actionNsjl : function(e) {
			var id = $(e.target).attr("data-x-wid");
		//	var nsjlEditTpl = utils.loadCompiledPage('../nssq/nssqJl');
			var nsjlEditTpl = utils.loadCompiledPage('nssqjl');	
			
			$.bhPaperPileDialog.show({
				content : nsjlEditTpl.render({}),
				title : "年审记录",
				ready : function($header, $body, $footer) {
					nssqJl.initialize(id,'xxhllyns');
				}
			});
		},
		
		
	    batchExecute:function(e){//批量年审    	
	    	 var row = $("#emapdatatable").emapdatatable("checkedRecords");
	    	 if(row.length > 10){
	    		 $.bhTip({
						content : '批量年审一次选择的数据不能超过10条！',
						state : 'warning',
						hideWaitTime : 2000
					});
	    		 return false
	    	 }
	    	 var self = this;
	    	 var jcssIdStr ='';
	    	 var jcssIdArr =[];
	    	 var nsIdStr ='';
	    	 var nsIdArr =[];
	    	 var batchFlowData =[];
	    	 var pd = true;
	    	 if(row.length > 0){
	    			var sqrInfo = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {ZGH :row[0].SQR ,pageSize : 1,pageNumber : 1,});
	    	        var bghglyDw = sqrInfo.rows[0].SZDWDM;
	    			 var candidateArray=_funauth.queryXxhfgldSimple('部门信息化分管领导',bghglyDw,'bgxxhllysh');
					 
						if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
							$.bhTip({
								content :  _funauth.nodwfzr,
								state : 'warn',
								hideWaitTime : 5000
							});
							return false;
						}
						 var  bmld=_funauth.parseCandidatesIdliyi(candidateArray);
						 
	    		 row.forEach(function(item, index){		
	    			 if(item.TASKSTATUS!="1"){
	    				 pd = false;
	    			 }
	    			 item.bmld= bmld;
	    			 item.SH=1;
	    		//	 item.bhry = '申请单位信息化联络员';
	    			 jcssIdStr+= item.WLJCSSWID+','; //获取所有选中数据的基础设施ID
	    			 nsIdStr+= item.WID+','; //获取所有选中数据的年审ID
	    			 batchFlowData.push({ //构造批量审核传递的data
	    				 taskId:item.TASKID,
	    				 formData:item,
	    			 }) 
	    		 });
	    		 if(!pd){ 
	    			 $.bhTip({
	 						content : '您勾选的数据中有不是待审的数据，请重新选择！',
	 						state : 'warning',
	 						hideWaitTime : 3000
	 					});
	    			 return false;
	    			}
	    		 
	    		 jcssIdArr = jcssIdStr.substring(0,jcssIdStr.lastIndexOf(',')).split(',');
	    		 nsIdArr = nsIdStr.substring(0,nsIdStr.lastIndexOf(',')).split(',');
	    		 batchFlowData = JSON.stringify(batchFlowData);
	    		// console.log(batchFlowData)
	    		 BH_UTILS.bhWindow(
							"<div id='ampDetailIntroduction'>"
							 +"审核意见：<textarea id='Messages' rows='10' cols='30' class='bh-form-control'></textarea>"				 
							+"</div>",			
							"年审批量审核",
							[
								{
									text : '通过',
									className : 'bh-btn-primary',
									callback : function(e) {
									  
						
										var butBox = e[0].children[1].children[1].children[2];
										butBox.innerText ='提交中...';
										butBox.setAttribute('disabled','disabled'); //放置响应时间过长继续点击通过按钮
										
										
										var shyj = $("#Messages").val();	
										$.ajax({
								  	  	    type: "post",
								  	  	    async: false,
								  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/tasks/batchExecute.do',
								  	  	    data:{
								  	  	      commandType:'submit',
								  	  	      execute:'do_submit',
								  	  	      defkey : "xxhjcssgl.ns",
								  	  	      flowComment:shyj,
								  	  	      datas:batchFlowData,
								  	  	    },
								  	  	    
								  	  	   success: function (response) {
								  	  		
								  	  		var pdcg = $.parseJSON(response);
											if(pdcg.succeed){   
												$.bhTip({
													content : '提交成功',
													state : 'success',
													hideWaitTime : 2000
												});
										  	  	butBox.removeAttribute('disabled');
									  	  		butBox.innerText ='已提交。'
//									  	  		_sjtj.llynsshtj();
										  	  		self.actionQuery(null)
										}else{
											
											 $.bhTip({
													content : '提交失败',
													state : 'danger',
													hideWaitTime : 2000
												});
											} 
								  	  	   }
								  	  	 })	
								  	  	 
									}
								}, 
								{
									text : '取消',
									className : 'bh-btn-default',
									callback : function() {
										
									}
								} ], {
								height : 350,
								width : 500
							});
	    		 
	    			
	    		 
	    		 
	    	 }else{
	    		 $.bhTip({
						content : '请勾选要审核的数据！',
						state : 'warning',
						hideWaitTime : 2000
					});
	    	 }
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
		  	  	        nodeId:'xxhllyns' , 
		  	  	        appName: 'xxhjcssgl',
		  	  	        module: 'modules',
		  	  	        page: 'xxhllyns',
		  	  	        action: 'T_XXB_XXHJCSS_NS_QUERY',
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
							//统计数据
//							  _sjtj.llynsshtj();
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
		  		 var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_NS_QUERY', {WID:id,pageNumber:1});
		  		 var jcssarr = data.rows[0].WLJCSSWID.split(',');
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
							
							 $.ajax({
 				    			url:'../modules/xxhllyns/T_XXB_XXHJCSS_NS_MODIFY.do',  //修改更新
 				    			type:'post',
 				    			data:{
 				    				WID : id,
		    					    ZT : null
 				    			},
 				    			async:false,
 				    			cache : true,
 				    			success:function(data){  				    				    								
 				    			}
 				    		 });
							
							for(i=0;i<jcssarr.length;i++){
								 var ztparams = { 
								    	//PWID : jbxxdata.rws[0].WID,
										PWID:jcssarr[i],	 
								    	ZT : 6,
							    		 }; 
							    		 $.ajax({
							    			url:'../modules/xxhllyns/xgzt.do',  //修改更新
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
//							  _sjtj.llynsshtj();
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
				"page" : "xxhllyns",
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
					'T_XXB_XXHJCSS_NS_QUERY', "search");
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
		    var data = JSON.stringify([{"name":"TJSJ","caption":"提交时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"TJSJ","caption":"提交时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]);
		      $('#emapAdvancedQuery').emapAdvancedQuery("setValue",data);
		      $query.on('search', this._searchCallback);
		},

		_searchCallback : function(e, data, opts) {
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
		
		wnscx : function(e) {
			//var id = $(e.target).attr("data-x-wid");
			var wnsEditTpl = utils.loadCompiledPage('nssqwns');
			
			$.bhPaperPileDialog.show({
				content : wnsEditTpl.render({}),
				title : "部门未年审设施查询",
				ready : function($header, $body, $footer) {
					nssqwns.initialize();
				}
			});
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
	    	var pid=_util.getpromid(id,'xxhllyns','T_XXB_XXHJCSS_NS_QUERY');
	    	
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
					nodeId : 'xxhllyns',	//流程定义中人工环节的编号，必填
					appName : 'xxhjcssgl',//应用的名称，必填
					module : 'modules', //模块名，可以没有，默认modules
					page: 'xxhllyns',	//回调动作的epg的编号，必填
					action : 'T_XXB_XXHJCSS_NS_QUERY',	//回调的动作，必填
//					action : 'jcsszxnscx',	//回调的动作，必填
					hideFlowState:true,
					hideTaskState:true,
					'*order' : '-TJSJ' ,
					querySetting:JSON.stringify([{"name":"TJSJ","caption":"提交时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},
	 				                              {"name":"TJSJ","caption":"提交时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]),
			};
			 var xxsj = {}//如果没有流程状态就通过另外一个查询语句查出流程状态
			var tableOptions = {
					pagePath : bs.api.pageModel,
					url : _emapflow.getQueryTasksUrl(),
					action : _emapflow.getQueryTasksAction(),
//					url : _emapflow.getQueryTasksByNodeUrl(),
//					action : _emapflow.getQueryTasksByNodeAction(),
//					url : _emapflow.getObserveQueryTasksUrl(),
//					action : _emapflow.getObserveQueryTasksAction(),
					datamodel : _emapflow.getDataModels(params),
					params : params,
					sortable:true,
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
					                		 width: '180px',
					                		 cellsRenderer : function(row, column, value,
					                				 rowData) {
					                			 
					                			 
					                			
					                			 var str =''
					                		/*	 str += ' | <a href="javascript:void(0)" data-action="nsjl" data-x-wid='+ rowData.WLJCSSWID+ '>年审记录</a>';*/
					                			 if (rowData.PROCESSINSTANCEID != null ){
					                				 var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
													    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
														var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
														var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
														
														
					             					if (rowData.TASKSTATUS == "1")//待办
					             						str += ' <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID
					      						      + ' data-x-taskid='+ rowData.TASKID
					      						      + ' data-x-proid='+ rowData.PROCESSINSTANCEID
					      							 + '>' + '审核' + '</a> | ';

						                			 if(dqhj == 'bmldns'){ 
							         						if (rowData.TASKSTATUS == "0" && rowData.FLOWSTATUS == "1"){ //已办并且为“在审核中”
							         							str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
							         								' data-x-taskid='+ rowData.TASKID+ 
							         								' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
							         						}
							         		        	}
							         	        	 if(zzhj == 'xxhllyns'&& rowData.FLOWSTATUS == "5"){
							         			 				str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
							         			 					' data-x-taskid='+ rowData.TASKID+ ' data-x-jcss='+ rowData.WLJCSSWID+ 
							         			 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '取回' + '</a> | ';
							         		        	   }
					                			 }
							         	         str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID 
							             				+ ' data-x-taskid='+ rowData.TASKID
							             				+ ' data-x-proid='+ rowData.PROCESSINSTANCEID
							             				+ '>'+ '详情' + '</a>';
							         	        if (rowData.PROCESSINSTANCEID != null ){	 
							         	        	 str += ' | <a  href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
					                				 +rowData.PROCESSINSTANCEID+'&responseType=forward" target="_blank">流程状态</a>';
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
												width : '220px',
												cellsRenderer : function(row, column, value,
														rowData) {
													var NODENAME
													var FLOWSTATUSNAME
														if (rowData.PROCESSINSTANCEID != null ){										
															
															var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
														    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
															var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
															var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
															
															var ZT = dqhj
															if(dqhj == undefined){
																ZT = zzhj
															}
															
															if(ZT == "xxhllyns"){
										 						NODENAME = '申请单位信息化联络员年审-'
										 					}else if(ZT == "nssq"){
										 						NODENAME = '年审申请-'
										 					}else if(ZT == "bmldns"){
										 						NODENAME = '申请单位负责人年审-'
										 					}else if(ZT == "xxhbns"){
										 						NODENAME = '信息化办年审-'
										 					}else if(ZT == undefined){
										 						NODENAME = ''
										 					}
															
															if (rowData.FLOWSTATUS == '1'){			   		    		
																FLOWSTATUSNAME = "审核中"												
															}else if(rowData.FLOWSTATUS == '2'){
																FLOWSTATUSNAME = "已驳回"
															}else if(rowData.FLOWSTATUS == '3'){
																FLOWSTATUSNAME = "年审成功"
															}else if(rowData.FLOWSTATUS == '4'){
																FLOWSTATUSNAME = "未提交"
															}else if(rowData.FLOWSTATUS == '5'){
																FLOWSTATUSNAME = "年审未通过"
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
			/* $('#parent').html("<div id='emapdatatable'></div>");
		      $('#emapdatatable').emapdatatable(_emapflow.convertGridOption(params, tableOptions));*/
			 if(USERID ==='7800007'){
				 $("#plns").css("display", "inline-block");
			 }
		}
		
//		_initTable : function() {
//			var params = {
//					taskType : taskType,	//未完成-NOTEND，已完成-ENDED，所有-ALL
//					nodeId : 'xxhllyns',	//流程定义中人工环节的编号，必填
//					appName : 'xxhjcssgl',//应用的名称，必填
//					module : 'modules', //模块名，可以没有，默认modules
//					page: 'xxhllyns',	//回调动作的epg的编号，必填
//					action : 'T_XXB_XXHJCSS_NS_QUERY',	//回调的动作，必填
////					action : 'jcsszxnscx',	//回调的动作，必填
//					hideFlowState:true,
//					hideTaskState:true,
//					'*order' : '-TJSJ' 
//			};
//			 var xxsj = {}//如果没有流程状态就通过另外一个查询语句查出流程状态
//			var tableOptions = {
//					pagePath : bs.api.pageModel,
//					url : _emapflow.getQueryTasksUrl(),
//					action : _emapflow.getQueryTasksAction(),
////					url : _emapflow.getQueryTasksByNodeUrl(),
////					action : _emapflow.getQueryTasksByNodeAction(),
////					url : _emapflow.getObserveQueryTasksUrl(),
////					action : _emapflow.getObserveQueryTasksAction(),
//					datamodel : _emapflow.getDataModels(params),
//					params : params,
//					sortable:true,
//					customColumns : [
//					                 {
//					                	 colIndex : '0',
//					                	 type : 'checkbox'
//					                 },
//					                 {
//					                	 colIndex : '1',
//					                	 type : 'tpl',
//					                	 column : {
//					                		 text : '操作',
//					                		 align : 'center',
//					                		 cellsAlign : 'center',
//					                		 width: '180px',
//					                		 cellsRenderer : function(row, column, value,
//					                				 rowData) {
//					                			 
//					                			 
//					                			
//					                			 var str =''
//					                		/*	 str += ' | <a href="javascript:void(0)" data-action="nsjl" data-x-wid='+ rowData.WLJCSSWID+ '>年审记录</a>';*/
//					                			 if (rowData.PROCESSINSTANCEID != null ){
//					                				 var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//													    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//														var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//														var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//														
//														
//					             					if (rowData.TASKSTATUS == "1")//待办
//					             						str += ' <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID
//					      						      + ' data-x-taskid='+ rowData.TASKID
//					      						      + ' data-x-proid='+ rowData.PROCESSINSTANCEID
//					      							 + '>' + '审核' + '</a> | ';
//
//						                			 if(dqhj == 'bmldns'){ 
//							         						if (rowData.TASKSTATUS == "0" && rowData.FLOWSTATUS == "1"){ //已办并且为“在审核中”
//							         							str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
//							         								' data-x-taskid='+ rowData.TASKID+ 
//							         								' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
//							         						}
//							         		        	}
//							         	        	 if(zzhj == 'xxhllyns'&& rowData.FLOWSTATUS == "5"){
//							         			 				str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
//							         			 					' data-x-taskid='+ rowData.TASKID+ ' data-x-jcss='+ rowData.WLJCSSWID+ 
//							         			 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '取回' + '</a> | ';
//							         		        	   }
//					                			 }
//							         	         str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID 
//							             				+ ' data-x-taskid='+ rowData.TASKID
//							             				+ ' data-x-proid='+ rowData.PROCESSINSTANCEID
//							             				+ '>'+ '详情' + '</a>';
//							         	        if (rowData.PROCESSINSTANCEID != null ){	 
//							         	        	 str += ' | <a  href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
//					                				 +rowData.PROCESSINSTANCEID+'&responseType=forward" target="_blank">流程状态</a>';
//						                		}
//					                			 if (rowData.PROCESSINSTANCEID == null ){
//					            					// var xxsj;//如果没有流程状态就通过另外一个查询语句查出流程状态
//					            			  	   	$.ajax({
//					            			  	  	    type: "post",
//					            			  	  	    async: false,
//					            			  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
//					            			  	  	    data: { 
//					            			  	  	        taskType:'ALL',
//					            			  	  	        nodeId:'' , 
//					            			  	  	        appName: 'xxhjcssgl',
//					            			  	  	        module: 'modules',
//					            			  	  	        page: 'xxhllyns',
//					            			  	  	        action: 'T_XXB_XXHJCSS_NS_QUERY',
//					            			  	  	       // WID:rowData.WID,
//					            			  	  	        querySetting : '[  {"name": "WID", "value": "'+rowData.WID+'","builder": "equal","linkOpt": "AND"}]',
//					            			  	  	        pageSize: 10,
//					            			  	  	        pageNumber: 1,
//					            			  	  	       }, //发送到服务器的参数
//					            			  	  	    datatype: "json",
//					            			  	  	   success: function (result) {
//					            			  	  	        xxsj = result.datas.queryObserveUserTasks.rows
//					            			  	  	   }
//					            			  	  	 })
//					            			  	  str += ' | <a  href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
//					               			 +xxsj[0].PROCESSINSTANCEID+'&responseType=forward" target="_blank">流程状态</a>'; 
//					            				} 	
//					                			 return str;
//					                		 }
//					                	 }
//					                 } , {
//											colIndex : '2',
//											type : 'tpl',
//											column : {
//												text : '最新环节-状态',
//												align : 'center',
//												cellsAlign : 'center',
//												width : '220px',
//												cellsRenderer : function(row, column, value,
//														rowData) {
//													var NODENAME
//													var FLOWSTATUSNAME
//														if (rowData.PROCESSINSTANCEID != null ){										
//															
//															var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//														    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//															var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//															var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//															
//															var ZT = dqhj
//															if(dqhj == undefined){
//																ZT = zzhj
//															}
//															
//															if(ZT == "xxhllyns"){
//										 						NODENAME = '申请单位信息化联络员年审-'
//										 					}else if(ZT == "nssq"){
//										 						NODENAME = '年审申请-'
//										 					}else if(ZT == "bmldns"){
//										 						NODENAME = '申请单位负责人年审-'
//										 					}else if(ZT == "xxhbns"){
//										 						NODENAME = '信息化办年审-'
//										 					}else if(ZT == undefined){
//										 						NODENAME = ''
//										 					}
//															
//															if (rowData.FLOWSTATUS == '1'){			   		    		
//																FLOWSTATUSNAME = "审核中"												
//															}else if(rowData.FLOWSTATUS == '2'){
//																FLOWSTATUSNAME = "已驳回"
//															}else if(rowData.FLOWSTATUS == '3'){
//																FLOWSTATUSNAME = "年审成功"
//															}else if(rowData.FLOWSTATUS == '4'){
//																FLOWSTATUSNAME = "未提交"
//															}else if(rowData.FLOWSTATUS == '5'){
//																FLOWSTATUSNAME = "年审未通过"
//															}else if(rowData.FLOWSTATUS == '6'){
//																FLOWSTATUSNAME = "未提交"
//															}	
//															return NODENAME + FLOWSTATUSNAME;
//														}else if(rowData.PROCESSINSTANCEID == null ){//流程信息为空
//															/*var xxsj;//如果没有流程状态就通过另外一个查询语句查出流程状态
//													  	   	$.ajax({
//													  	  	    type: "post",
//													  	  	    async: false,
//													  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
//													  	  	    data: { 
//													  	  	        taskType:'ALL',
//													  	  	        nodeId:'' , 
//													  	  	        appName: 'xxhjcssgl',
//													  	  	        module: 'modules',
//													  	  	        page: 'xxhllyns',
//													  	  	        action: 'T_XXB_XXHJCSS_NS_QUERY',
//													  	  	       // WID:rowData.WID,
//													  	  	        querySetting : '[  {"name": "WID", "value": "'+rowData.WID+'","builder": "equal","linkOpt": "AND"}]',
//													  	  	        pageSize: 10,
//													  	  	        pageNumber: 1,
//													  	  	       }, //发送到服务器的参数
//													  	  	    datatype: "json",
//													  	  	   success: function (result) {
//													  	  	        xxsj = result.datas.queryObserveUserTasks.rows
//													  	  	   }
//													  	  	 })*/
//													  	  	  if(xxsj[0].TASKINFO!=null){
//														  		var cccurrent = xxsj[0].TASKINFO.CURRENT_NODES   //获取重新查的当前环节									
//															    var ccdqhj = Object.getOwnPropertyNames(cccurrent)[0] //当前环节
//																var cclast = xxsj[0].TASKINFO.LAST_NODES         //获取重新查的办结后的最后的环节
//																var cczzhj = Object.getOwnPropertyNames(cclast)[0]  //最后环节
//													  	  	  }
//													  	  var ZT = ccdqhj
//															if(ccdqhj == undefined){
//																ZT = cczzhj
//															}
//															
//													  	if(ZT == "xxhllyns"){
//									 						NODENAME = '申请单位信息化联络员年审-'
//									 					}else if(ZT == "nssq"){
//									 						NODENAME = '年审申请-'
//									 					}else if(ZT == "bmldns"){
//									 						NODENAME = '申请单位负责人年审-'
//									 					}else if(ZT == "xxhbns"){
//									 						NODENAME = '信息化办年审-'
//									 					}else if(ZT == undefined){
//									 						NODENAME = ''
//									 					}
//															
//													  	if (xxsj[0].FLOWSTATUS == '1'){			   		    		
//															FLOWSTATUSNAME = "审核中"
//														}else if(xxsj[0].FLOWSTATUS == '2'){
//															FLOWSTATUSNAME = "已驳回"
//														}else if(xxsj[0].FLOWSTATUS == '3'){
//															FLOWSTATUSNAME = "申请成功"
//														}else if(xxsj[0].FLOWSTATUS == '4'){
//															FLOWSTATUSNAME = "未提交"
//														}else if(xxsj[0].FLOWSTATUS == '5'){
//															FLOWSTATUSNAME = "申请未通过"
//														}else if(xxsj[0].FLOWSTATUS == '6'){
//															FLOWSTATUSNAME = "未提交"
//														}	
//															return NODENAME + FLOWSTATUSNAME;
//															
//													}		
//												
//												}
//											}
//										}
//					                 ]
//			};
//			 $('#emapdatatable').emapdatatable(tableOptions);
//			/* $('#parent').html("<div id='emapdatatable'></div>");
//		      $('#emapdatatable').emapdatatable(_emapflow.convertGridOption(params, tableOptions));*/
//			 if(USERID ==='7800007'){
//				 $("#plns").css("display", "inline-block");
//			 }
//		}
	};

	return viewConfig;
});