define(function(require, exports, module) {

	var utils = require('utils');
	var bs = require('./xxhjcsssqBS');
	var xxhjcsssqSave = require('./xxhjcsssqSave');
	var xxhjcsssqView = require('./xxhjcsssqView');
	var nssq = require('./nssqSave');
	var nssqJl = require('./nssqJl');	
	var ckgbSave = require('./ckgbSave');
	var cksqSave = require('./cksqSave');
	
	var taskType = "ALL";
	var flowStatus = "1";
	var self = this
	var viewConfig = {
		initialize : function() {
			var view = utils.loadCompiledPage('xxhjcsssq');
			this.$rootElement.html(view.render({}), true);
			this.pushSubView([ xxhjcsssqSave ]);
			this.initView();
			 
			this.eventMap = {
				"[data-action=add]" : this.actionAdd,
				"[data-action=edit]" : this.actionEdit,
				"[data-action=detail]" : this.actionDetail,
				"[data-action=delete]" : this.actionDelete,
				"[data-action=adelete]": this.aDelete,
				"[data-action=export]" : this.actionExport,
				"[data-action=import]" : this.actionImport,
				"[data-action=query]" : this.actionQuery,
				"[data-action=applyck]" : this.actionApplyCk,
				"[data-action=bjsqck]" : this.actionBjsqCk,
				"[data-action=bjgbck]" : this.actionBjgbCk,
				"[data-action=guanbick]" : this.actionGuanBiCk,
				"[data-action=callback]" : this.actionCallback,
				"[data-action=applyns]" : this.actionApplyNs,
				"[data-action=nsjl]" : this.actionNsjl,
				"[data-action=custom-column]" : this.actionCustomColumn,
				"[data-action=handbook]": this.handbook,
				
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
	        _sjtj.jcsssqtj();
	    },
	    
		actionAdd : function() {
			var xxhjcsssqNewTpl = utils.loadCompiledPage('xxhjcsssqSave');
			var sqlx="虚拟机";
			$.bhPaperPileDialog.show({
				content : xxhjcsssqNewTpl
						.render({}),
				title : "申请",
				ready : function($header,
						$body, $footer) {
					xxhjcsssqSave
							.initialize(null,null,null,sqlx,'xtglysq',null);
				}
			});
//			var xxhjcsssqNewTpl = utils.loadCompiledPage('xxhjcsssqSave');
//			BH_UTILS
//					.bhWindow(
//							"<div class=\"bh-radio bh-radio-group-h\" id=\"sqlx\" >申请类型："
//									+ "<label class=\"bh-radio-label\"><input type=\"radio\" name=\"sqlx\" checked value=\"虚拟机\"><i class=\"bh-choice-helper\"></i>虚拟机</label> "
//									+ "<label class=\"bh-radio-label\"><input type=\"radio\" name=\"sqlx\" value=\"托管服务器\" ><i class=\"bh-choice-helper\"></i>托管服务器</label>"
////									+ " <label class=\"bh-radio-label\"><input type=\"radio\" name=\"sqlx\" value=\"出口\" ><i class=\"bh-choice-helper\"></i>出口</label>"
//									+"</div>",
//							"选择申请类型",
//							[
//									{
//										text : '确定',
//										className : 'bh-btn-primary',
//										callback : function() {
//											// $("mark").text("点击了确认按钮");
//											var sqlx = $(
//													"input[name='sqlx']:checked")
//													.val();
//											if (sqlx != null
//													|| sqlx != undefined) {
//												$.bhPaperPileDialog.show({
//													content : xxhjcsssqNewTpl
//															.render({}),
//													title : "申请",
//													ready : function($header,
//															$body, $footer) {
//														xxhjcsssqSave
//																.initialize(null,null,null,sqlx,'xtglysq',null);
//													}
//												});
//											}
//										}
//									}, {
//										text : '关闭',
//										className : 'bh-btn-default',
//										callback : function() {
//											// 需要定义一个空函数，以关闭弹窗
//										}
//									} ], {
//								height : 300,
//								width : 500
//							});

		},


		actionEdit : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var lx = $(e.target).attr("data-x-lx");
			var taskid = $(e.target).attr("data-x-taskId");
			var sqlx = $(e.target).attr("data-x-sqlx");
			var xxhjcsssqEditTpl = utils.loadCompiledPage('xxhjcsssqSave');
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', {
						WID : id,
						pageNumber : 1,
						LX : lx
					});

			$.bhPaperPileDialog.show({
				content : xxhjcsssqEditTpl.render({}),
				title : "编辑",
				ready : function($header, $body, $footer) {
					xxhjcsssqSave.initialize(id,data.rows[0], taskid, lx);//id,data, taskid, lx, nodeid, sqck,ns
					//$("#emapForm").emapForm("setValue", data.rows[0]);
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
		    
		actionDetail : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var lx = $(e.target).attr("data-x-lx");
			
		 	 var lcxx=_util.getpromid(id,'xxhjcsssq','sqrsqlb');
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
			        
			var xxhjcsssqViewTpl = utils.loadCompiledPage('xxhjcsssqSave');
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', {
						WID : id,
						pageNumber : 1,
						LX : lx
					});

			$.bhPaperPileDialog.show({
				content : xxhjcsssqViewTpl.render({}),
				title : "查看",
				ready : function($header, $body, $footer) {
					xxhjcsssqView.initialize(id, data.rows[0],taskid, lx);
//					$("#emapForm").emapForm("setValue", data.rows[0]);
				}
			});

		},
		//年审申请
		actionApplyNs : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var pwid = $(e.target).attr("data-x-pwid");
			var lx = $(e.target).attr("data-x-lx");
			var zt = $(e.target).attr("data-x-zt");
			var taskid = $(e.target).attr("data-x-taskId");
			if(zt >= 10){
				taskid = null
			}
			
			var proid = $(e.target).attr("data-x-proid");
			var nssqEditTpl = utils.loadCompiledPage('xxhjcsssqSave');
		
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
				//	'T_XXB_XXHJCSS_JBXX_QUERY', {
					'jcsszxnscx', {
				WLJCSSWID : pwid,
				pageNumber : 1
			});
			
			var newdata = data.rows
			function sortprice(a, b) {
				return a.NSJZRQ - b.NSJZRQ
			}
			newdata.sort(sortprice);
		    var	 datas = newdata[newdata.length - 1]
			
			$.bhPaperPileDialog.show({
				content : nssqEditTpl.render({}),
				title : "年审申请",
				ready : function($header, $body, $footer) {
					nssq.initialize(id, datas,taskid, lx,'xtglysq',null,'ns',proid);
				}
			});
		},
		//年审记录
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
		
		aDelete : function(e) {
	    	var sfsj = false	
			var id = $(e.target).attr("data-x-wid");
	    	var proId = $(e.target).attr("data-x-proid");
			BH_UTILS.bhDialogWarning({
		        title:'提示',
		        content:'是否删除。',
		        buttons:[
		            {
		                text:'确定',
		                callback:function(){
		                	bs.del({
		            			WID : id
		            		}).done(function(data) {
		            			 _funauth.publicTerFlow(proId);
		            			var searchData = $('#emapAdvancedQuery').emapAdvancedQuery('getValue');
	                			
			                	var flowStatus = $('[data-action=query].bh-active').attr('queryType');
			                	if(flowStatus == ""){
			                		$('#emapdatatable').emapdatatable('reload', {
			                		  querySetting : searchData
			                		 });
			                		 }else{
			                		   $('#emapdatatable').emapdatatable('reload', {
			                		      querySetting : searchData,
			                		        flowStatus : flowStatus
			                		    });
			                		  } 
			                	 //重新统计数据
//			        	        _sjtj.jcsssqtj();
		            			$.bhTip({
		            				content : '删除成功！',
		            				state : 'success',
		            				hideWaitTime : 2000
		            			});	
		            			
		            		});	
		                		},
		        },
		       {
		            text:'取消',
		        }
		    ]
		});	
		},
	    
		actionDelete: function(){
	        var row = $("#emapdatatable").emapdatatable("checkedRecords");
	        var sfsj = false
	        if(row.length > 0){
		      	/*var canDel = false;
		          var params = row.map(function(el){
		          	if(el.SQLX=="申请"&&(el.FLOWSTATUS ==4 ||el.FLOWSTATUS ==6)){
		          		canDel = true
		          	}
		            return {WID:el.WID};  //模型主键
		          });*/
		      	var canDel = true;
		          var params = row.map(function(el){ 
		        	  //数组中如果有申请类型为申请 并且 不是待提交状态(4,6)下 不可以删除
		          	if(el.SQLX == "申请"&&(el.FLOWSTATUS ==1 ||el.FLOWSTATUS ==2 || el.FLOWSTATUS ==3|| el.FLOWSTATUS ==5)){
		          		canDel = false
		          	}
		          	if(el.SQLX != "申请"){ //数组中如果有申请类型不为申请    不可以删除
		          		canDel = false
		          	}
		            return {WID:el.WID};  //模型主键
		          });     
		          
		           if(!canDel){           
		           $.bhTip({
						content : '只可删除草稿状态的申请！',
						state : 'warning',
						hideWaitTime : 2000
					});
		          return false;
		           }
		           BH_UTILS.bhDialogWarning({
		   	        title:'提示',
		   	        content:'是否删除。',
		   	        buttons:[
		   	            {
		   	                text:'确定',
		   	                callback:function(){
		   	                 bs.del(params).done(function(data){
		   	                	 var searchData = $('#emapAdvancedQuery').emapAdvancedQuery('getValue');
		 	          			
				                	var flowStatus = $('[data-action=query].bh-active').attr('queryType');
				                	if(flowStatus == ""){
				                		$('#emapdatatable').emapdatatable('reload', {
				                		  querySetting : searchData
				                		 });
				                		 }else{
				                		   $('#emapdatatable').emapdatatable('reload', {
				                		      querySetting : searchData,
				                		        flowStatus : flowStatus
				                		    });
				                		  } 
				                	 //重新统计数据
//				        	        _sjtj.jcsssqtj();
		   		        	  $.bhTip({
		   		  				content : '删除成功！',
		   		  				state : 'success',
		   		  				hideWaitTime : 2000
		   		  			});
		   		          
		   		          });
		   	             
		                		}	
		   	            
		   	        },
		   	       {
		   	            text:'取消',
		   	        }
		   	    ]
		   	});	         	          
	        }    		
	      },

	
		
		actionApplyCk : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var lx = $(e.target).attr("data-x-lx");			
			var xxhjcsssqEditTpl = utils.loadCompiledPage('xxhjcsssqSave');
			var zt = $(e.target).attr("data-x-zt");
			var taskid = $(e.target).attr("data-x-taskId");
			if(zt >= 10){
				taskid = null
			}
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', {
						WID : id,
						pageNumber : 1
					});
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
									text : '同意并进入申请',
									className : 'bh-btn-primary',
									callback : function() {
										$.bhPaperPileDialog.show({
											content : xxhjcsssqEditTpl.render({}),
											title : "申请出口",
											ready : function($header, $body, $footer) {
												cksqSave.initialize(id, data.rows[0],taskid, lx,'xtglysq','sqck',null);
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
			 $("#buttons").css("width","66%")
			 $("#buttons").css("bottom","40px")
			  $(".jqx-window-header").children().css("float","inherit").children().css("text-align","center")
		},
		
		actionBjsqCk : function(e) {//编辑出口申请
			var id = $(e.target).attr("data-x-wid");
			var lx = $(e.target).attr("data-x-lx");			
			var xxhjcsssqEditTpl = utils.loadCompiledPage('xxhjcsssqSave');
			var zt = $(e.target).attr("data-x-zt");
			var taskid = $(e.target).attr("data-x-taskId");
			if(zt >= 10){
				taskid = null
			}
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', {
						WID : id,
						pageNumber : 1
					});

			$.bhPaperPileDialog.show({
				content : xxhjcsssqEditTpl.render({}),
				title : "申请出口",
				ready : function($header, $body, $footer) {
					cksqSave.initialize(id, data.rows[0],taskid, lx,'xtglysq','sqck','bj');
				}
			});
		},
		
		actionBjgbCk : function(e) {//编辑关闭出口
			var id = $(e.target).attr("data-x-wid");
			var lx = $(e.target).attr("data-x-lx");			
			var xxhjcsssqEditTpl = utils.loadCompiledPage('xxhjcsssqSave');
			var zt = $(e.target).attr("data-x-zt");
			var taskid = $(e.target).attr("data-x-taskId");
			if(zt >= 10){
				taskid = null
			}
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', {
						WID : id,
						pageNumber : 1
					});

			$.bhPaperPileDialog.show({
				content : xxhjcsssqEditTpl.render({}),
				title : "关闭出口",
				ready : function($header, $body, $footer) {
					ckgbSave.initialize(id, data.rows[0],taskid, lx,'xtglysq','gbck','bj');
				}
			});
		},
		
		actionGuanBiCk : function(e) {
			var id = $(e.target).attr("data-x-wid");
			var lx = $(e.target).attr("data-x-lx");
			var xxhjcsssqEditTpl = utils.loadCompiledPage('xxhjcsssqSave');
			var data = WIS_EMAP_SERV.getData(bs.api.pageModel,'T_XXB_XXHJCSS_JBXX_QUERY', {
						WID : id,
						pageNumber : 1
					});

			$.bhPaperPileDialog.show({
				content : xxhjcsssqEditTpl.render({}),
				title : "关闭出口",
				ready : function($header, $body, $footer) {
					ckgbSave.initialize(id, data.rows[0],null, lx,'xtglysq','sqck',null);
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
		  	  	        nodeId:'xtglysq' , 
		  	  	        appName: 'xxhjcssgl',
		  	  	        module: 'modules',
		  	  	        page: 'xxhjcsssq',
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
		  				taskId: xxsj[0].TASKID,//当前流程的TASKID
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
							 //重新统计数据
//		        	        _sjtj.jcsssqtj();
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
		  			this.actionQuery(null)	
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
				"page" : "xxhjcsssq",
				"action" : "T_XXB_XXHJCSS_JBXX_QUERY",// 使用添加或保存动作
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
			 flowStatus = $('[data-action=query].bh-active').attr('queryType');
			  if(flowStatus == ""){
	               $('#emapdatatable').emapdatatable('reload', {
	                    querySetting : data
	                });
	           }else{
	                $('#emapdatatable').emapdatatable('reload', {
	                    querySetting : data,
	                    flowStatus : flowStatus
	                });
	            }       
		},

		actionQuery : function(event) {		
			var searchData = $('#emapAdvancedQuery').emapAdvancedQuery('getValue');
			if(event == null){
			     flowStatus = $('[data-action=query].bh-active').attr('queryType');
			}else {
				var data = event.currentTarget.attributes.queryType.value;
		       	 flowStatus = data;
			}		       
		            if(flowStatus == ""){
		               $('#emapdatatable').emapdatatable('reload', {
		                    querySetting : searchData
		                });
		           }else{
		                $('#emapdatatable').emapdatatable('reload', {
		                    querySetting : searchData,
		                    flowStatus : flowStatus
		                });
		            }          
		},
		
		//流程状态事件
		actionLczt:function(e){
	  		var id = $(e.target).attr("data-x-wid");
	    	var pid=_util.getpromid(id,'xxhjcsssq','sqrsqlb');
	    	
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
//					"querySetting":'[{"name":"TJSJ","caption":"提交时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"TJSJ","caption":"提交时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]',
					querySetting:JSON.stringify([{"name":"TJSJ","caption":"提交时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},
			  		                             {"name":"TJSJ","caption":"提交时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}])
			};

			if (flowStatus == "") {
				params = {
					taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有数据-ALL，所有任务-ALL_TASK
					nodeId : '', // 流程定义中人工环节的编号，
					appName : 'xxhjcssgl',// 应用的名称，必填
					module : 'modules', // 模块名，可以没有，默认modules
					page : 'xxhjcsssq', // 回调动作的epg的编号，必填
					//action : 'T_XXB_XXHJCSS_JBXX_QUERY', // 回调的动作，必填
					action : 'sqrsqlb',
					SFRZH:USERID,
					 '*order' : '-TJSJ',
						querySetting:JSON.stringify([{"name":"TJSJ","caption":"提交时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},
				  		                             {"name":"TJSJ","caption":"提交时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]),

					hideFlowState:true,//是否隐藏流程状态
					hideTaskState:true,//是否隐藏任务状态
				};
			} else {
				params = {
					taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL
					flowStatus : flowStatus,
					nodeId : 'xtglysq', // 流程定义中人工环节的编号，必填
					appName : 'xxhjcssgl',// 应用的名称，必填
					module : 'modules', // 模块名，可以没有，默认modules
					page : 'xxhjcsssq', // 回调动作的epg 的编号，必填
					//action : 'T_XXB_XXHJCSS_JBXX_QUERY', // 回调的动作，必填
					action : 'sqrsqlb',
					SFRZH:USERID,
				   '*order' : '-TJSJ',
					querySetting:JSON.stringify([{"name":"TJSJ","caption":"提交时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},
			  		                             {"name":"TJSJ","caption":"提交时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]),

				   
					hideFlowState:true,
					hideTaskState:true,
				};
			}

			var tableOptions = {
				pagePath : bs.api.pageModel,
				url : _emapflow.getQueryTasksUrl(),
				action : _emapflow.getQueryTasksAction(),
		//		url : _emapflow.getObserveQueryTasksUrl(),
			//	action : _emapflow.getObserveQueryTasksAction(),
				datamodel : _emapflow.getDataModels(params),
				params : params,
			//	height:'500px',
			//	sortable:true,
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
								width : '200px',
								cellsAlign : 'center',
								cellsRenderer : function(row, column, value,
										rowData) {
									var currenttime = new Date().getTime();//当前时间的时间戳
									var youxiaoqi = null
									if(rowData.YXQ != ''){
										var jzdateStr=rowData.YXQ;
										jzdateStr=jzdateStr.replace(/-/g,'/'); 
										youxiaoqi =new Date(jzdateStr).getTime();//有效期的时间戳
									}
									var qxdata = WIS_EMAP_SERV.getData(bs.api.pageModel,'T_XXB_XXHJCSS_CKQX_QUERY', {ZGH : USERID,pageNumber : 1,});
																	
									 var str = "";
									//if(rowData.ZT == 10)
									//if(rowData.ZT>=10&&(rowData.NODEID=='nssq'||rowData.NODEID==null)&& (rowData.YXQ!=null && _util.ableNs(rowData.YXQ)) )
									/*str += ' | <a href="javascript:void(0)" data-action="applyns" data-x-wid=' + rowData.WID+ 
									' data-x-taskid=' + rowData.TASKID+ ' data-x-pwid=' + rowData.PWID+ ' data-x-lx='+ rowData.LX+ ' data-x-zt='+ rowData.ZT+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>'+ '年审申请</a>';*/
									if(qxdata.totalSize > 0){
										if (rowData.ZT!=null&&(rowData.CK_SFYSQCK == '否'|| rowData.CK_SFYSQCK == '0')&& rowData.ZT >= 10){
											if(currenttime < youxiaoqi){
												str += ' <a href="javascript:void(0)" data-action="applyck" data-x-wid='+ rowData.WID+
												' data-x-taskid=' + rowData.TASKID+ ' data-x-zt='+ rowData.ZT+ ' data-x-lx='+ rowData.LX+  '>'+ '申请出口</a> | ';	
											}										
										}	
									}
										if (rowData.ZT!=null&&(rowData.CK_SFYSQCK == '是'|| rowData.CK_SFYSQCK == '1')&& rowData.ZT >= 10){
											if(currenttime < youxiaoqi){
												str += ' <a href="javascript:void(0)" data-action="guanbick" data-x-wid='
													+ rowData.WID+ ' data-x-lx='+ rowData.LX+ '>'+ '关闭出口</a> | ';	
											}
										}
									
										
									if (rowData.PROCESSINSTANCEID != null ){//流程信息是否为空
										var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
									    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
										var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
										var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
										
										if ((rowData.FLOWSTATUS == "6"|| rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2")){
											if(rowData.SQLX == '申请'){
												str += ' <a href="javascript:void(0)" data-action="edit" data-x-wid='
													+ rowData.WID+ ' data-x-lx='+ rowData.LX+ ' data-x-sqlx=' + rowData.SQLX+ ' data-x-taskid='
													+ rowData.TASKID+ ' data-x-zt='+ rowData.ZT+ '>编辑</a> | ';
											}		
										}
											
										if ((rowData.FLOWSTATUS == "6"|| rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2"))
											if(rowData.SQLX == '申请出口'){//申请出口的编辑
												str += ' <a href="javascript:void(0)" data-action="bjsqck" data-x-wid='
													+ rowData.WID+ ' data-x-lx='+ rowData.LX+ ' data-x-sqlx=' + rowData.SQLX+ ' data-x-taskid='
													+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>编辑</a>  | ';
											}	
										
										if ((rowData.FLOWSTATUS == "6"|| rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2"))
											if(rowData.SQLX == '关闭出口'){//申请出口的编辑
												str += ' <a href="javascript:void(0)" data-action="bjgbck" data-x-wid='
													+ rowData.WID+ ' data-x-lx='+ rowData.LX+ ' data-x-sqlx=' + rowData.SQLX+ ' data-x-taskid='
													+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>编辑</a> | ';
											}	
										
										   if (rowData.SQLX == "申请" && (rowData.FLOWSTATUS == "4"||rowData.FLOWSTATUS == "6"))
											str += ' <a href="javascript:void(0)" data-action="adelete" data-x-wid='
													+ rowData.WID +' data-x-proid='+ rowData.PROCESSINSTANCEID
													+ '>' + '删除' + '</a> | ';																
										
										if (rowData.FLOWSTATUS == "1" && dqhj == "xxhllyshsq") //当流程状态为“审核中”
											    	str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
													   ' data-x-taskid='+ rowData.TASKID+ ' data-x-sqlx=' + rowData.SQLX +
													   ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
										
										
										
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
												return ''
											}
									}
								}
							}
						} ]
			};
			$('#emapdatatable').emapdatatable(tableOptions);
		}
	    
//		_initTable : function() {
//			var params = {};
//
//			if (flowStatus == "") {
//				params = {
//					taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有数据-ALL，所有任务-ALL_TASK
//					nodeId : '', // 流程定义中人工环节的编号，
//					appName : 'xxhjcssgl',// 应用的名称，必填
//					module : 'modules', // 模块名，可以没有，默认modules
//					page : 'xxhjcsssq', // 回调动作的epg的编号，必填
//					//action : 'T_XXB_XXHJCSS_JBXX_QUERY', // 回调的动作，必填
//					action : 'sqrsqlb',
//					SFRZH:USERID,
//					 '*order' : '-TJSJ',
//					hideFlowState:true,//是否隐藏流程状态
//					hideTaskState:true,//是否隐藏任务状态
//				};
//			} else {
//				params = {
//					taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL
//					flowStatus : flowStatus,
//					nodeId : 'xtglysq', // 流程定义中人工环节的编号，必填
//					appName : 'xxhjcssgl',// 应用的名称，必填
//					module : 'modules', // 模块名，可以没有，默认modules
//					page : 'xxhjcsssq', // 回调动作的epg 的编号，必填
//					//action : 'T_XXB_XXHJCSS_JBXX_QUERY', // 回调的动作，必填
//					action : 'sqrsqlb',
//					SFRZH:USERID,
//				   '*order' : '-TJSJ',
//					hideFlowState:true,
//					hideTaskState:true,
//				};
//			}
//
//			var tableOptions = {
//				pagePath : bs.api.pageModel,
//				url : _emapflow.getQueryTasksUrl(),
//				action : _emapflow.getQueryTasksAction(),
//		//		url : _emapflow.getObserveQueryTasksUrl(),
//			//	action : _emapflow.getObserveQueryTasksAction(),
//				datamodel : _emapflow.getDataModels(params),
//				params : params,
//			//	height:'500px',
//			//	sortable:true,
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
//								width : '200px',
//								cellsAlign : 'center',
//								cellsRenderer : function(row, column, value,
//										rowData) {
//									var currenttime = new Date().getTime();//当前时间的时间戳
//									var youxiaoqi = null
//									if(rowData.YXQ != ''){
//										var jzdateStr=rowData.YXQ;
//										jzdateStr=jzdateStr.replace(/-/g,'/'); 
//										youxiaoqi =new Date(jzdateStr).getTime();//有效期的时间戳
//									}
//									var qxdata = WIS_EMAP_SERV.getData(bs.api.pageModel,'T_XXB_XXHJCSS_CKQX_QUERY', {ZGH : USERID,pageNumber : 1,});
//																	
//									 var str = "";
//									//if(rowData.ZT == 10)
//									//if(rowData.ZT>=10&&(rowData.NODEID=='nssq'||rowData.NODEID==null)&& (rowData.YXQ!=null && _util.ableNs(rowData.YXQ)) )
//									/*str += ' | <a href="javascript:void(0)" data-action="applyns" data-x-wid=' + rowData.WID+ 
//									' data-x-taskid=' + rowData.TASKID+ ' data-x-pwid=' + rowData.PWID+ ' data-x-lx='+ rowData.LX+ ' data-x-zt='+ rowData.ZT+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>'+ '年审申请</a>';*/
//									if(qxdata.totalSize > 0){
//										if (rowData.ZT!=null&&(rowData.CK_SFYSQCK == '否'|| rowData.CK_SFYSQCK == '0')&& rowData.ZT >= 10){
//											if(currenttime < youxiaoqi){
//												str += ' <a href="javascript:void(0)" data-action="applyck" data-x-wid='+ rowData.WID+
//												' data-x-taskid=' + rowData.TASKID+ ' data-x-zt='+ rowData.ZT+ ' data-x-lx='+ rowData.LX+  '>'+ '申请出口</a> | ';	
//											}										
//										}	
//									}
//										if (rowData.ZT!=null&&(rowData.CK_SFYSQCK == '是'|| rowData.CK_SFYSQCK == '1')&& rowData.ZT >= 10){
//											if(currenttime < youxiaoqi){
//												str += ' <a href="javascript:void(0)" data-action="guanbick" data-x-wid='
//													+ rowData.WID+ ' data-x-lx='+ rowData.LX+ '>'+ '关闭出口</a> | ';	
//											}
//										}
//									
//										
//									if (rowData.PROCESSINSTANCEID != null ){//流程信息是否为空
//										var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//									    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//										var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//										var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//										
//										if ((rowData.FLOWSTATUS == "6"|| rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2")){
//											if(rowData.SQLX == '申请'){
//												str += ' <a href="javascript:void(0)" data-action="edit" data-x-wid='
//													+ rowData.WID+ ' data-x-lx='+ rowData.LX+ ' data-x-sqlx=' + rowData.SQLX+ ' data-x-taskid='
//													+ rowData.TASKID+ ' data-x-zt='+ rowData.ZT+ '>编辑</a> | ';
//											}		
//										}
//											
//										if ((rowData.FLOWSTATUS == "6"|| rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2"))
//											if(rowData.SQLX == '申请出口'){//申请出口的编辑
//												str += ' <a href="javascript:void(0)" data-action="bjsqck" data-x-wid='
//													+ rowData.WID+ ' data-x-lx='+ rowData.LX+ ' data-x-sqlx=' + rowData.SQLX+ ' data-x-taskid='
//													+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>编辑</a>  | ';
//											}	
//										
//										if ((rowData.FLOWSTATUS == "6"|| rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2"))
//											if(rowData.SQLX == '关闭出口'){//申请出口的编辑
//												str += ' <a href="javascript:void(0)" data-action="bjgbck" data-x-wid='
//													+ rowData.WID+ ' data-x-lx='+ rowData.LX+ ' data-x-sqlx=' + rowData.SQLX+ ' data-x-taskid='
//													+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>编辑</a> | ';
//											}	
//										
//										   if (rowData.SQLX == "申请" && (rowData.FLOWSTATUS == "4"||rowData.FLOWSTATUS == "6"))
//											str += ' <a href="javascript:void(0)" data-action="adelete" data-x-wid='
//													+ rowData.WID +' data-x-proid='+ rowData.PROCESSINSTANCEID
//													+ '>' + '删除' + '</a> | ';																
//										
//										if (rowData.FLOWSTATUS == "1" && dqhj == "xxhllyshsq") //当流程状态为“审核中”
//											    	str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
//													   ' data-x-taskid='+ rowData.TASKID+ ' data-x-sqlx=' + rowData.SQLX +
//													   ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
//										
//										str += ' <a href="javascript:void(0)" data-action="detail" data-x-wid='
//											+ rowData.WID+ ' data-x-lx='+ rowData.LX+ ' data-x-taskid='
//											+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>详情</a> | ';
//												
//											
//										str += ' <a  href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
//										+rowData.PROCESSINSTANCEID+'&responseType=forward" target="_blank">流程状态</a>';
//										
//									}else{
//										str += ' <a href="javascript:void(0)" data-action="detail" data-x-wid='
//											+ rowData.WID+ ' data-x-lx='+ rowData.LX+ ' data-x-taskid='
//											+ rowData.TASKID+ ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>详情</a>';
//									}
//									/*if(rowData.SQLX != '申请')
//										str += ' | <a href="javascript:void(0)" data-action="nsjl" data-x-wid='+ rowData.WID +  ' data-x-pwid=' + rowData.PWID+ '>年审记录</a>';										*/
//									return str;
//								}
//							}
//						},
//						{
//							colIndex : '2',
//							type : 'tpl',
//							column : {
//								text : '最新环节-状态',
//								align : 'center',
//								cellsAlign : 'center',
//								width : '220px',
//								cellsRenderer : function(row, column, value,
//										rowData) {
//									
//									var NODENAME
//									var currenttime = new Date().getTime();//当前时间的时间戳
//									
//									var youxiaoqi = null
//									if(rowData.YXQ != null){
//										var jzdateStr=rowData.YXQ;
//										jzdateStr=jzdateStr.replace(/-/g,'/'); 
//										youxiaoqi =new Date(jzdateStr).getTime();//有效期的时间戳
//									}
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
//										return "关闭出口审核中";*/
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
//											var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//										    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//											var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//											var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//											
//											var ZT = dqhj
//											if(dqhj == undefined){
//												ZT = zzhj
//											}																						
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
//										    return NODENAME + rowData.FLOWSTATUSNAME;
//											}else if(rowData.PROCESSINSTANCEID == null ){//流程信息为空
//												return '设施申请中'
//											}
//									}
//								}
//							}
//						} ]
//			};
//			$('#emapdatatable').emapdatatable(tableOptions);
//		}
	};

	return viewConfig;
});