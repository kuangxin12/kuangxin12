define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./bmldshsqBS');
	var bmldshsqSave = require('./bmldshsqSave');
	var bmldshsqView = require('./bmldshsqView');
	var nssqJl = require('./nssqJl');
	// var taskType = "ALL_TASK"; //任务类型
	 var taskType = "NOTEND"; //任务类型
	  var flowStatus = ""; //流程状态
setTimeout(window.tabTodoUpdate)
	var viewConfig = {
		initialize : function() {
			var view = utils.loadCompiledPage('bmldshsq');
			this.$rootElement.html(view.render({}), true);
			this.pushSubView([ bmldshsqSave ]);
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
		        "[data-action=nsjl]" : this.actionNsjl,
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
	        _sjtj.fzrsqshtj();
	    },

		actionAudit : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var lx = $(e.target).attr("data-x-lx");
			var taskid = $(e.target).attr("data-x-taskId");
			var sqlx = $(e.target).attr("data-x-sqlx");
			var sbfl = $(e.target).attr("data-x-sbfl");
			var bmldshsqEditTpl = utils.loadCompiledPage('bmldshsqSave');
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', {
						WID : id,
						pageNumber : 1,
						LX : lx
					});
			  if(sqlx == '申请出口'){
	        	   BH_UTILS //接着打开服务说明
					.bhWindow(
							"<div id='ampDetailIntroduction' class='amp-detail-body' tabindex='26' style='overflow-y: hidden; outline: none;'>"
							+"<div id='ampDetailIntroductionContent' class='amp-detail-content'>"
								+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp申请单位需郑重承诺遵守本承诺书的所列事项，对所列事项负责，如有违反，由申请单位承担由此带来的相应责任。</span></p>"
								+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp一、申请单位需承诺遵守《网络安全法》《中华人民共和国计算机信息系统安全保护条例》《计算机信息网络国际互联安全保护管理办法》和《信息安全等级保护管理办法》及其他国家信息技术安全的有关法律、法规和行政规章制度和教育部信息技术安全有关工作的文件规定。</span></p>"
								+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp二、保证不利用网络危害国家安全、泄露国家秘密，不侵犯国家的、社会的、集体的利益和第三方的合法权益，不从事违法犯罪活动。</span></p>"
								+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp三、承诺完善本单位的信息技术安全管理，建立健全信息技术安全责任制和相关规章制度、操作规程。</span></p>"
								+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp四、严格按照国家相关法律法规做好本单位信息系统（网站）的信息安全管理工作，设立网络与信息安全责任人，信息化联络员，落实本单位信息系统（网站）的责任人。</span></p>"
								+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp五、承诺加强信息系统安全，落实信息系统安全等级保护制度，提高信息系统安全防护能力，提高管理人员的安全意识和技术人员的防护能力。</span></p>"
								+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp六、承诺对所属的信息系统进行安全监测，并对监测发现和通报的安全问题进行限时整改。</span></p>"
								+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp七、承诺不在申请出口的服务器主机上提供互联网接入服务、商业广告和有偿信息服务，不开设论坛、留言板等交互性栏目。</span></p>"
								+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp八、承诺当信息系统发生信息技术安全事件时，迅速进行报告与处置，将损害和影响降到最小范围，并按照要求及时进行整改。</span></p>"
							+"</div>"				 
						+"</div>",
							"信息系统（网站）安全承诺书",
							[
									{
										text : '同意并进入审核',
										className : 'bh-btn-primary',
										callback : function() {
											$.bhPaperPileDialog.show({
												content : bmldshsqEditTpl.render({}),
												title : sqlx + "审核",
												ready : function($header, $body, $footer) {
													bmldshsqSave.initialize(id, data.rows[0],taskid, lx,'bmldshsq',sqlx,sbfl);
//													$("#emapForm").emapForm("setValue", data.rows[0]);
												}
											});
										}
									}, {
										text : '取消',
										className : 'bh-btn-default',
										callback : function() {
											
										}
									} ], {
								height : 550,
								width : 700,
							});
				
	           }else{
			$.bhPaperPileDialog.show({
				content : bmldshsqEditTpl.render({}),
				title : sqlx + "审核",
				ready : function($header, $body, $footer) {
					bmldshsqSave.initialize(id, data.rows[0],taskid, lx,'bmldshsq',sqlx,sbfl);
//					$("#emapForm").emapForm("setValue", data.rows[0]);
				}
			});
	           }
			  $("#buttons").css("width","66%")
				 $("#buttons").css("bottom","40px")
				  $(".jqx-window-header").children().css("float","inherit").children().css("text-align","center")
		},

		actionDetail : function(e) {
			var id = $(e.target).attr("data-x-wid");
	    	 var lx = $(e.target).attr("data-x-lx");
	    	 var lcxx=_util.getpromid(id,'bmldshsq','T_XXB_XXHJCSS_JBXX_QUERY');
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
	         var xxhjcsssqViewTpl = utils.loadCompiledPage('bmldshsqSave');
	         var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {
	        	  WID : id,
	              pageNumber:1,
	              LX:lx
	         });

	         $.bhPaperPileDialog.show({
	             content : xxhjcsssqViewTpl.render({}),
	             title : "查看",
	             ready : function($header, $body, $footer) {
	            	 bmldshsqView.initialize(id, data.rows[0], taskid,lx,'bmldshsq');
//	             	 $("#emapForm").emapForm("setValue", data.rows[0],lx);
	             }
	         });
		},
		
		 handbook:function(e){
		    	//window.location.href = '../public/word/1重庆邮电大学_信息化基础设施管理操作手册（系统管理员）.docx';    		
		    	var self=this;
			     var result = '3重庆邮电大学_信息化基础设施管理操作手册（申请单位负责人）.docx';
			     var oresult = '3重庆邮电大学_信息化基础设施管理操作手册（申请单位负责人）.docx';	    		
			     var url = bs.api.fileDownUrl + '?name=' + encodeURI(result) + '&oName=' + oresult;
			     document.getElementById("loadFileHide").src = url;
		        // self.loadiframe(document.getElementById("loadFileHide"));//判断下载是否完成
		    },
		
		actionNsjl : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var nsjlEditTpl = utils.loadCompiledPage('nssqjl');
			
			var pwid = $(e.target).attr("data-x-pwid");
			
			$.bhPaperPileDialog.show({
				content : nsjlEditTpl.render({}),
				title : "年审记录",
				ready : function($header, $body, $footer) {
					nssqJl.initialize(id,pwid);
				}
			});
		},
		actionCallback : function(e) {
	  		var id = $(e.target).attr("data-x-wid");
	  		//var taskid = $(e.target).attr("data-x-taskId");
	  		var proid = $(e.target).attr("data-x-proid");
	  		var sqlx = $(e.target).attr("data-x-sqlx");
	        var xxsj;
	  	   	$.ajax({
	  	  	    type: "post",
	  	  	    async: false,
	  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryUserTasksByNode.do',
	  	  	    data: { 
	  	  	        taskType:'ENDED',
	  	  	        nodeId:'bmldshsq' , 
	  	  	        appName: 'xxhjcssgl',
	  	  	        module: 'modules',
	  	  	        page: 'bmldshsq',
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
	  		var sqlxcs = {"SQLX":sqlx}
	  		sqlxcs =  JSON.stringify(sqlxcs)
	  		var params = { 
	  				commandType: 'callback',
	  				taskId: xxsj[0].TASKID,
	  				appName: 'xxhjcssgl',
	  				sendMessage : false, //是否发送邮件
	  				formData: sqlxcs
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
//				        _sjtj.fzrsqshtj();
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
	  		var ckzt
	  		if(sqlx == '申请'){
	  			xgzt = null
	  		}
	  		if(sqlx == '申请出口'){
	  			xgzt = 3
	  			ckzt = 1
	  		}
	  		if(sqlx == '关闭出口'){
	  			xgzt = 4
	  			ckzt = 0
	  		}
	  		var sfsj = true	
	  		
	  		var sqlxcs = {"SQLX":sqlx}
	  		sqlxcs =  JSON.stringify(sqlxcs)
	  		
	  		var params = { 
	  				commandType: 'finishedCallback',
	  				processInstanceId:proid,
	  				appName: 'xxhjcssgl',
	  				sendMessage : false, //是否发送邮件
	  				formData: sqlxcs
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
						
						var ztparams
						//取回之后 状态恢复到原来
						if(sqlx == '申请' || sqlx == '年审'){
							 ztparams = { 
			    					WID : id,
		    						ZT : xgzt,		    						
		    						}; 
						}
						if(sqlx == '申请出口' || sqlx == '关闭出口'){
							 ztparams = { 
			    					WID : id,
		    						ZT : xgzt,
		    						CK_SFYSQCK :ckzt,	
		    						}; 
						}
	    				$.ajax({
	    					url:'../modules/bmldshsq/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
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
//				        _sjtj.fzrsqshtj();
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
				"page" : "bmldshsq",
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
		    var data = JSON.stringify([{"name":"TJSJ","caption":"提交时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"TJSJ","caption":"提交时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]);
		      $('#emapAdvancedQuery').emapAdvancedQuery("setValue",data);
		      $query.on('search', this._searchCallback);
		},

		_searchCallback : function(e, data, opts) {
			 taskType = $('[data-action=query].bh-active').attr('data');
			 if (taskType == "") {
		           $('#emapdatatable').emapdatatable('reload', {
		               querySetting : data,
		          
		               });           
		          } else if(taskType == "ALL"){
		        	  $('#emapdatatable').emapdatatable('reload', {
			               querySetting :data,
			               taskType : taskType,			           
			           });
	          }  else{       
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
			 var cgsj = [{"name":"ZT","value":"10","linkOpt":"AND","builder":"moreEqual"}]		        
		      cgsj =  JSON.stringify(cgsj)	 
		       if (taskType == "") {
		           $('#emapdatatable').emapdatatable('reload', {
		               querySetting : searchData,
		          
		               });           
		          } else if(taskType == "ALL"){
		        	  $('#emapdatatable').emapdatatable('reload', {
			               querySetting :searchData,
			               taskType : taskType,			           
			           });
	          }  else{       
		           $('#emapdatatable').emapdatatable('reload', {
		               querySetting : searchData,
		               taskType : taskType,		         
		           });
		       }
			
		},
		
		//流程状态事件
		actionLczt:function(e){
	  		var id = $(e.target).attr("data-x-wid");
	    	var pid=_util.getpromid(id,'bmldshsq','T_XXB_XXHJCSS_JBXX_QUERY');
	    	
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
					nodeId : 'bmldshsq',	//流程定义中人工环节的编号，必填
					appName : 'xxhjcssgl',//应用的名称，必填
					module : 'modules', //模块名，可以没有，默认modules
					page: 'bmldshsq',	//回调动作的epg的编号，必填
					action : 'T_XXB_XXHJCSS_JBXX_QUERY',	//回调的动作，必填
					hideFlowState:true,
			  		hideTaskState:true, 
			  		 '*order' : '-TJSJ',
			  		querySetting:JSON.stringify([{"name":"TJSJ","caption":"提交时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},
			  		                             {"name":"TJSJ","caption":"提交时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]),
			};
			 var xxsj = {}//如果没有流程状态就通过另外一个查询语句查出流程状态
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
								width: '250px',
								cellsRenderer : function(row, column, value,
										rowData) {
									
									
									
									/*var str = '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX 
									+ ' data-x-taskid='+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>详情</a>';	*/													
									var str = ''
									if (rowData.PROCESSINSTANCEID != null ){//流程信息是否为空
										var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
									    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
										var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
										var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
										
										var chkz = 'xxhbsh' //区分不同教学/管理/科研 的撤回
										if( rowData.SBFL == 'JX'){
											var chkz = 'jwcsh'
										}
										if( rowData.SBFL == 'KY'){
											var chkz = 'kjcsh'
										}	
										
		             					if (rowData.TASKSTATUS == "1")//待办
										str += ' <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID+' data-x-lx=' + rowData.LX 
										+ ' data-x-sqlx=' + rowData.SQLX + ' data-x-sbfl=' + rowData.SBFL + ' data-x-taskid='+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>审核</a> | ';
									
										if(dqhj == chkz){ 
			         						if (rowData.TASKSTATUS == "0" && rowData.FLOWSTATUS == "1"){ //已办并且为“在审核中”
			         							str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
			         								' data-x-taskid='+ rowData.TASKID+ ' data-x-sqlx=' + rowData.SQLX +
			         								' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
			         						}
			         		        	}
			         	        	 if(zzhj == 'bmldshsq' && rowData.FLOWSTATUS == "5"){
			         			 				str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
			         			 					' data-x-taskid='+ rowData.TASKID+  ' data-x-sqlx=' + rowData.SQLX +
			         			 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '取回' + '</a> | ';
			         		        	 
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
								width : '250px',
								cellsRenderer : function(row, column, value,
										rowData) {
									var NODENAME
									var currenttime = new Date().getTime();//当前时间的时间戳
									var youxiaoqi = null
									if(rowData.YXQ != null){
										var jzdateStr=rowData.YXQ;
										jzdateStr=jzdateStr.replace(/-/g,'/'); 
										youxiaoqi =new Date(jzdateStr).getTime();//有效期的时间戳
									}
									
									
									if(rowData.ZT ==10)//申请成功
									{
										if(currenttime > youxiaoqi && youxiaoqi != null){
											return "已到期，未年审";
										}else{
											return "申请成功";
											/*if(rowData.SQLX=='申请')
											return "申请成功";
											if(rowData.SQLX=='年审')
												return "年审成功";
											if(rowData.SQLX=='申请出口')
												return "申请出口成功";
											if(rowData.SQLX=='关闭出口')
											return "关闭出口成功";*/
										}
									}	
									else if(rowData.ZT==0)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "申请未通过";
									else if(rowData.ZT==1)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "未年审";
									else if(rowData.ZT==2)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "已关闭";
									/*else if(rowData.ZT==3)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "出口申请审核中";
									else if(rowData.ZT==4)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
                                        return "关闭出口审核中";*/
														
									else if(rowData.ZT==5)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "年审未通过";
									else if(rowData.ZT==6)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "年审审核中";	
									else if(rowData.ZT==7)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "维护申请中";
									else if(rowData.ZT==8)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "变更申请中";
									else if(rowData.ZT==9)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
										return "关闭申请中";
									else if(rowData.ZT==11){
										return "申请出口未通过";
									}	
									else if(rowData.ZT==12){
										return "关闭出口未通过";
									}
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
											 																						
											if(rowData.ZT== null){
												if(ZT == "xxhllyshsq"){
							 						NODENAME = '单位信息化联络员审核-'
							 					}else if(ZT == "xtglysq"){
							 						NODENAME = '申请人申请-'
							 					}else if(ZT == "bmldshsq"){
							 						NODENAME = '单位负责人审核-'
							 					}else if(ZT == "jwcsh"){
							 						NODENAME = '教务处管理员审核-'
							 					}else if(ZT == "kjcsh"){
							 						NODENAME = '科技处管理员审核-'
							 					}else if(ZT == "xxhbsh"){
							 						NODENAME = '信息化办审核-'
							 					}else if(ZT == "xxhbshsq"){
							 						NODENAME = '信息化办处理-'
							 					}else if(ZT == undefined){
							 						NODENAME = ''
							 					}
											}
											if(rowData.ZT== 3){
												if(ZT == "xxhllyshsq"){
							 						NODENAME = '信息化联络员申请出口审核-'
							 					}else if(ZT == "xtglysq"){
							 						NODENAME = '申请人申请出口-'
							 					}else if(ZT == "bmldshsq"){
							 						NODENAME = '单位负责人申请出口审核-'
							 					}else if(ZT == "jwcsh"){
							 						NODENAME = '教务处管理员申请出口审核-'
							 					}else if(ZT == "kjcsh"){
							 						NODENAME = '科技处管理员申请出口审核-'
							 					}else if(ZT == "xxhbsh"){
							 						NODENAME = '信息化办申请出口审核-'
							 					}else if(ZT == "xxhbshsq"){
							 						NODENAME = '信息化办申请出口处理-'
							 					}else if(ZT == undefined){
							 						NODENAME = ''
							 					}
											}
											if(rowData.ZT== 4){
												if(ZT == "xxhllyshsq"){
							 						NODENAME = '信息化联络员关闭出口审核-'
							 					}else if(ZT == "xtglysq"){
							 						NODENAME = '申请人关闭出口-'
							 					}else if(ZT == "bmldshsq"){
							 						NODENAME = '单位负责人关闭出口审核-'
							 					}else if(ZT == "jwcsh"){
							 						NODENAME = '教务处管理员关闭出口审核-'
							 					}else if(ZT == "kjcsh"){
							 						NODENAME = '科技处管理员关闭出口审核-'
							 					}else if(ZT == "xxhbsh"){
							 						NODENAME = '信息化办关闭出口审核-'
							 					}else if(ZT == "xxhbshsq"){
							 						NODENAME = '信息化办关闭出口处理-'
							 					}else if(ZT == undefined){
							 						NODENAME = ''
							 					}
											}
										    
										    if (rowData.FLOWSTATUS == '1'){
												rowData.FLOWSTATUSNAME = "审核中"
												if(ZT=="xxhbshsq"){
													rowData.FLOWSTATUSNAME = "处理中"
												}
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
												
				 								    return '';
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
//					nodeId : 'bmldshsq',	//流程定义中人工环节的编号，必填
//					appName : 'xxhjcssgl',//应用的名称，必填
//					module : 'modules', //模块名，可以没有，默认modules
//					page: 'bmldshsq',	//回调动作的epg的编号，必填
//					action : 'T_XXB_XXHJCSS_JBXX_QUERY',	//回调的动作，必填
//					hideFlowState:true,
//			  		hideTaskState:true, 
//			  		 '*order' : '-TJSJ',
//			};
//			 var xxsj = {}//如果没有流程状态就通过另外一个查询语句查出流程状态
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
//								width: '250px',
//								cellsRenderer : function(row, column, value,
//										rowData) {
//									
//									
//									
//									/*var str = '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX 
//									+ ' data-x-taskid='+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>详情</a>';	*/													
//									var str = ''
//									if (rowData.PROCESSINSTANCEID != null ){//流程信息是否为空
//										var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//									    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//										var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//										var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//										
//										var chkz = 'xxhbsh' //区分不同教学/管理/科研 的撤回
//										if( rowData.SBFL == 'JX'){
//											var chkz = 'jwcsh'
//										}
//										if( rowData.SBFL == 'KY'){
//											var chkz = 'kjcsh'
//										}	
//										
//		             					if (rowData.TASKSTATUS == "1")//待办
//										str += ' <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID+' data-x-lx=' + rowData.LX 
//										+ ' data-x-sqlx=' + rowData.SQLX + ' data-x-sbfl=' + rowData.SBFL + ' data-x-taskid='+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>审核</a> | ';
//									
//										if(dqhj == chkz){ 
//			         						if (rowData.TASKSTATUS == "0" && rowData.FLOWSTATUS == "1"){ //已办并且为“在审核中”
//			         							str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
//			         								' data-x-taskid='+ rowData.TASKID+ ' data-x-sqlx=' + rowData.SQLX +
//			         								' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
//			         						}
//			         		        	}
//			         	        	 if(zzhj == 'bmldshsq' && rowData.FLOWSTATUS == "5"){
//			         			 				str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
//			         			 					' data-x-taskid='+ rowData.TASKID+  ' data-x-sqlx=' + rowData.SQLX +
//			         			 					' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '取回' + '</a> | ';
//			         		        	 
//			         	        	 }
//									} 
//			         	        	str += ' <a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX 
//									+ ' data-x-taskid='+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>详情</a> ';
//			         	        	if (rowData.PROCESSINSTANCEID != null ){//流程信息是否为空
//				         	        	str += ' | <a  href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
//			                			 +rowData.PROCESSINSTANCEID+'&responseType=forward" target="_blank">流程状态</a>';
//									}
//									/*if(rowData.SQLX != '申请')
//										str += ' | <a href="javascript:void(0)" data-action="nsjl" data-x-wid='+ rowData.WID +  ' data-x-pwid=' + rowData.PWID+ '>年审记录</a>';
//											*/
//									if (rowData.PROCESSINSTANCEID == null ){
//		             					// var xxsj;//如果没有流程状态就通过另外一个查询语句查出流程状态
//		 						  	   	$.ajax({
//		 						  	  	    type: "post",
//		 						  	  	    async: false,
//		 						  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
//		 						  	  	    data: { 
//		 						  	  	        taskType:'ALL',
//		 						  	  	        nodeId:'' , 
//		 						  	  	        appName: 'xxhjcssgl',
//		 						  	  	        module: 'modules',
//		 						  	  	        page: 'bmldshsq',
//		 						  	  	        action: 'T_XXB_XXHJCSS_JBXX_QUERY',
//		 						  	  	       // WID:rowData.WID,
//		 						  	  	        querySetting : '[  {"name": "WID", "value": "'+rowData.WID+'","builder": "equal","linkOpt": "AND"}]',
//		 						  	  	        pageSize: 10,
//		 						  	  	        pageNumber: 1,
//		 						  	  	       }, //发送到服务器的参数
//		 						  	  	    datatype: "json",
//		 						  	  	   success: function (result) {
//		 						  	  	        xxsj = result.datas.queryObserveUserTasks.rows
//		 						  	  	   }
//		 						  	  	 })
//		 						  	  	  if(xxsj[0].PROCESSINSTANCEID != null){
//		 						  	  str += ' | <a  href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
//			                			 +xxsj[0].PROCESSINSTANCEID+'&responseType=forward" target="_blank">流程状态</a>'; 
//		 						  	  	  }
//		 						  	  	  } 	
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
//								width : '250px',
//								cellsRenderer : function(row, column, value,
//										rowData) {
//									var NODENAME
//									var currenttime = new Date().getTime();//当前时间的时间戳
//									var youxiaoqi = null
//									if(rowData.YXQ != null){
//										var jzdateStr=rowData.YXQ;
//										jzdateStr=jzdateStr.replace(/-/g,'/'); 
//										youxiaoqi =new Date(jzdateStr).getTime();//有效期的时间戳
//									}
//									
//									
//									if(rowData.ZT ==10)//申请成功
//									{
//										if(currenttime > youxiaoqi && youxiaoqi != null){
//											return "已到期，未年审";
//										}else{
//											return "申请成功";
//											/*if(rowData.SQLX=='申请')
//											return "申请成功";
//											if(rowData.SQLX=='年审')
//												return "年审成功";
//											if(rowData.SQLX=='申请出口')
//												return "申请出口成功";
//											if(rowData.SQLX=='关闭出口')
//											return "关闭出口成功";*/
//										}
//									}	
//									else if(rowData.ZT==0)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "申请未通过";
//									else if(rowData.ZT==1)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "未年审";
//									else if(rowData.ZT==2)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "已关闭";
//									/*else if(rowData.ZT==3)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "出口申请审核中";
//									else if(rowData.ZT==4)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//                                        return "关闭出口审核中";*/
//														
//									else if(rowData.ZT==5)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "年审未通过";
//									else if(rowData.ZT==6)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "年审审核中";	
//									else if(rowData.ZT==7)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "维护申请中";
//									else if(rowData.ZT==8)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "变更申请中";
//									else if(rowData.ZT==9)//已终止 0：申请未通过；1：未年审；2：已关闭；3:年审申请中；4：年审审核中；5:年审未通过
//										return "关闭申请中";
//									else if(rowData.ZT==11){
//										return "申请出口未通过";
//									}	
//									else if(rowData.ZT==12){
//										return "关闭出口未通过";
//									}
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
//											if(rowData.ZT== null){
//												if(ZT == "xxhllyshsq"){
//							 						NODENAME = '单位信息化联络员审核-'
//							 					}else if(ZT == "xtglysq"){
//							 						NODENAME = '申请人申请-'
//							 					}else if(ZT == "bmldshsq"){
//							 						NODENAME = '单位负责人审核-'
//							 					}else if(ZT == "jwcsh"){
//							 						NODENAME = '教务处管理员审核-'
//							 					}else if(ZT == "kjcsh"){
//							 						NODENAME = '科技处管理员审核-'
//							 					}else if(ZT == "xxhbsh"){
//							 						NODENAME = '信息化办审核-'
//							 					}else if(ZT == "xxhbshsq"){
//							 						NODENAME = '信息化办处理-'
//							 					}else if(ZT == undefined){
//							 						NODENAME = ''
//							 					}
//											}
//											if(rowData.ZT== 3){
//												if(ZT == "xxhllyshsq"){
//							 						NODENAME = '信息化联络员申请出口审核-'
//							 					}else if(ZT == "xtglysq"){
//							 						NODENAME = '申请人申请出口-'
//							 					}else if(ZT == "bmldshsq"){
//							 						NODENAME = '单位负责人申请出口审核-'
//							 					}else if(ZT == "jwcsh"){
//							 						NODENAME = '教务处管理员申请出口审核-'
//							 					}else if(ZT == "kjcsh"){
//							 						NODENAME = '科技处管理员申请出口审核-'
//							 					}else if(ZT == "xxhbsh"){
//							 						NODENAME = '信息化办申请出口审核-'
//							 					}else if(ZT == "xxhbshsq"){
//							 						NODENAME = '信息化办申请出口处理-'
//							 					}else if(ZT == undefined){
//							 						NODENAME = ''
//							 					}
//											}
//											if(rowData.ZT== 4){
//												if(ZT == "xxhllyshsq"){
//							 						NODENAME = '信息化联络员关闭出口审核-'
//							 					}else if(ZT == "xtglysq"){
//							 						NODENAME = '申请人关闭出口-'
//							 					}else if(ZT == "bmldshsq"){
//							 						NODENAME = '单位负责人关闭出口审核-'
//							 					}else if(ZT == "jwcsh"){
//							 						NODENAME = '教务处管理员关闭出口审核-'
//							 					}else if(ZT == "kjcsh"){
//							 						NODENAME = '科技处管理员关闭出口审核-'
//							 					}else if(ZT == "xxhbsh"){
//							 						NODENAME = '信息化办关闭出口审核-'
//							 					}else if(ZT == "xxhbshsq"){
//							 						NODENAME = '信息化办关闭出口处理-'
//							 					}else if(ZT == undefined){
//							 						NODENAME = ''
//							 					}
//											}
//										    
//										    if (rowData.FLOWSTATUS == '1'){
//												rowData.FLOWSTATUSNAME = "审核中"
//												if(ZT=="xxhbshsq"){
//													rowData.FLOWSTATUSNAME = "处理中"
//												}
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
//												var FLOWSTATUSNAME
//												/*var xxsj;//如果没有流程状态就通过另外一个查询语句查出流程状态
//				 						  	   	$.ajax({
//				 						  	  	    type: "post",
//				 						  	  	    async: false,
//				 						  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
//				 						  	  	    data: { 
//				 						  	  	        taskType:'ALL',
//				 						  	  	        nodeId:'' , 
//				 						  	  	        appName: 'xxhjcssgl',
//				 						  	  	        module: 'modules',
//				 						  	  	        page: 'bmldshsq',
//				 						  	  	        action: 'T_XXB_XXHJCSS_JBXX_QUERY',
//				 						  	  	       // WID:rowData.WID,
//				 						  	  	        querySetting : '[  {"name": "WID", "value": "'+rowData.WID+'","builder": "equal","linkOpt": "AND"}]',
//				 						  	  	        pageSize: 10,
//				 						  	  	        pageNumber: 1,
//				 						  	  	       }, //发送到服务器的参数
//				 						  	  	    datatype: "json",
//				 						  	  	   success: function (result) {
//				 						  	  	        xxsj = result.datas.queryObserveUserTasks.rows
//				 						  	  	   }
//				 						  	  	 })*/
//				 						  	  if(xxsj[0].TASKINFO!=null){
//				 	 						  	  	var cccurrent = xxsj[0].TASKINFO.CURRENT_NODES   //获取重新查的当前环节									
//				 	 							    var ccdqhj = Object.getOwnPropertyNames(cccurrent)[0] //当前环节
//				 	 								var cclast = xxsj[0].TASKINFO.LAST_NODES         //获取重新查的办结后的最后的环节
//				 	 								var cczzhj = Object.getOwnPropertyNames(cclast)[0]  //最后环节
//				 							  	  	  }
//				 	 								var ZT = ccdqhj
//				 	 								if(ccdqhj == undefined){
//				 	 									ZT = cczzhj
//				 	 								}
//				 	 								if(rowData.ZT== null){
//														if(ZT == "xxhllyshsq"){
//									 						NODENAME = '单位信息化联络员审核-'
//									 					}else if(ZT == "xtglysq"){
//									 						NODENAME = '申请人申请-'
//									 					}else if(ZT == "bmldshsq"){
//									 						NODENAME = '单位负责人审核-'
//									 					}else if(ZT == "jwcsh"){
//									 						NODENAME = '教务处管理员审核-'
//									 					}else if(ZT == "kjcsh"){
//									 						NODENAME = '科技处管理员审核-'
//									 					}else if(ZT == "xxhbsh"){
//									 						NODENAME = '信息化办审核-'
//									 					}else if(ZT == "xxhbshsq"){
//									 						NODENAME = '信息化办处理-'
//									 					}else if(ZT == undefined){
//									 						NODENAME = ''
//									 					}
//													}
//													if(rowData.ZT== 3){
//														if(ZT == "xxhllyshsq"){
//									 						NODENAME = '信息化联络员申请出口审核-'
//									 					}else if(ZT == "xtglysq"){
//									 						NODENAME = '申请人申请出口-'
//									 					}else if(ZT == "bmldshsq"){
//									 						NODENAME = '单位负责人申请出口审核-'
//									 					}else if(ZT == "jwcsh"){
//									 						NODENAME = '教务处管理员申请出口审核-'
//									 					}else if(ZT == "kjcsh"){
//									 						NODENAME = '科技处管理员申请出口审核-'
//									 					}else if(ZT == "xxhbsh"){
//									 						NODENAME = '信息化办申请出口审核-'
//									 					}else if(ZT == "xxhbshsq"){
//									 						NODENAME = '信息化办申请出口处理-'
//									 					}else if(ZT == undefined){
//									 						NODENAME = ''
//									 					}
//													}
//													if(rowData.ZT== 4){
//														if(ZT == "xxhllyshsq"){
//									 						NODENAME = '信息化联络员关闭出口审核-'
//									 					}else if(ZT == "xtglysq"){
//									 						NODENAME = '申请人关闭出口-'
//									 					}else if(ZT == "bmldshsq"){
//									 						NODENAME = '单位负责人关闭出口审核-'
//									 					}else if(ZT == "jwcsh"){
//									 						NODENAME = '教务处管理员关闭出口审核-'
//									 					}else if(ZT == "kjcsh"){
//									 						NODENAME = '科技处管理员关闭出口审核-'
//									 					}else if(ZT == "xxhbsh"){
//									 						NODENAME = '信息化办关闭出口审核-'
//									 					}else if(ZT == "xxhbshsq"){
//									 						NODENAME = '信息化办关闭出口处理-'
//									 					}else if(ZT == undefined){
//									 						NODENAME = ''
//									 					}
//													}
//				 								    
//				 								    if (xxsj[0].FLOWSTATUS == '1'){
//				 										FLOWSTATUSNAME = "审核中"
//				 											if(ZT=="xxhbshsq"){
//				 												FLOWSTATUSNAME = "处理中"
//				 											}
//				 									}else if(xxsj[0].FLOWSTATUS == '2'){
//				 										FLOWSTATUSNAME = "已驳回"
//				 									}else if(xxsj[0].FLOWSTATUS == '3'){
//				 										FLOWSTATUSNAME = "申请成功"
//				 									}else if(xxsj[0].FLOWSTATUS == '4'){
//				 										FLOWSTATUSNAME = "待提交"
//				 									}else if(xxsj[0].FLOWSTATUS == '5'){
//				 										FLOWSTATUSNAME = "申请未通过"
//				 									}else if(xxsj[0].FLOWSTATUS == '6'){
//				 										FLOWSTATUSNAME = "待提交"
//				 									}
//				 								    return NODENAME + FLOWSTATUSNAME;
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