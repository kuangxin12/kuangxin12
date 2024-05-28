define(function(require, exports, module) {

  var utils = require('utils');
  var bs = require('./whsqBS');
  var whsqSave = require('./whsqSave');
  var whsqView = require('./whsqView');
  
  var taskType = "ALL_TASK";//任务类型       
  var flowStatus = "1";//流程类型
 
 
  //$("#dome1").html("Hello world!");
  var viewConfig = {
    initialize: function() {
      var view = utils.loadCompiledPage('whsq');
      this.$rootElement.html(view.render({}), true);
      this.pushSubView([whsqSave]);
      this.initView();
      
      this.eventMap = {
        "[data-action=add]": this.actionAdd,
        "[data-action=edit]": this.actionEdit,
        "[data-action=detail]": this.actionDetail,
        "[data-action=delete]": this.actionDelete,
        "[data-action=adelete]": this.aDelete,
        "[data-action=export]": this.actionExport,
        "[data-action=import]": this.actionImport,
        "[data-action=query]" : this.actionQuery,
        "[data-action=callback]" : this.actionCallback,        
        "[data-action=custom-column]": this.actionCustomColumn,
        "[data-action=handbook]": this.handbook, 
        "[data-action=czsm]": this.czsm, 
        
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
        _sjtj.whsjtj();
    },
    
    
    
    actionAdd: function(){
      var whsqNewTpl = utils.loadCompiledPage('whsqSave');
      var jcssxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {SFRZH : USERID,pageSize : 100,pageNumber : 1,});  
      if(jcssxx.rows.length == 0 ){  	  
   	
   	   $.bhTip({
                content: '暂时没有可以申请的基础设施！！',
                state: 'warning',
                hideWaitTime: 2000
            });
   	   return false
      }
      //查询当前登录人员在说明字典中的信息
      var cxtksj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CZSM_QUERY', {SFRZH : USERID,SSYM:'whsq',pageNumber : 1,});  
      if(cxtksj.rows.length == 0 ){ //如果没有信息，就添加一行
    	  var addsj ={
    	     SFRZH : USERID,
    	     SSYM: 'whsq',//所属页面
    	     SFTK:'true' ,//是否弹框
    	  }
    	  BH_UTILS.doAjax('../modules/whsq/T_XXB_XXHJCSS_CZSM_ADD.do', addsj);  
    	  BH_UTILS //接着打开服务说明
			.bhWindow(
					"<div id='ampDetailIntroduction' class='amp-detail-body' tabindex='26' style='overflow-y: hidden; outline: none;'>"
					+"<div id='ampDetailIntroductionContent' class='amp-detail-content'>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;font-size: 18px;'>当信息化基础设施需要维护时，申请人可提交维护申请，申请经信息化办审核，审核通过后申请人员可通知维护人员维护。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>维护申请审核流程如下图：</span></p>"
						+"<div style='margin:0 auto;width:80%'><img src='./public/images/whsqflow0331.png'"
					 	+" title='维护申请流程图' alt='whsqflow.pn' width='556' height='175' style='width: 588px; height:109px;'></div>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>部分操作说明：</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp新增申请：可以申请所需要维护的信息化基础设施。<span style='color:red'>（注意：维护申请提交之后不可修改所维护的基础设施）</span></span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp删除：可以删除暂存的申请记录。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp编辑：可对当前申请信息进行修改（仅在未提交与驳回状态下可编辑）。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp导出：可以把表格内的所有记录导出成Execl文件。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp详情：可以查看当前申请的详细信息。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp查看流程：以查看当前记录的申请与审核记录以及审核意见。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp撤回：可撤回已提交但信息化办未审核的申请记录。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>如需更多操作说明可点击【操作手册下载】查看操作手册。</span></p>"
					+"</div>"				 
				+"</div>"
				+"<div class=\"bh-checkbox bh-checkbox-group-h\" id=\"bzsm\" style='position:absolute;right:190px;bottom:32px'>"
						+ "<label class=\"bh-checkbox-label\"><input type=\"checkbox\" name=\"xctx\" value=\"true\"><i class=\"bh-choice-helper\"></i>下次不再提醒</label> "
						+"</div>",
					"服务说明",
					[
							{
								text : '开始申请',
								className : 'bh-btn-primary',
								callback : function() {
									var sftx = $("input[name='xctx']:checked").val();
									if(sftx == undefined){
										sftx = false
									}
									if(sftx){//如果勾选了不再弹出，就把SFTK字段改为false
										 var tksj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CZSM_QUERY', {SFRZH : USERID,SSYM:'whsq'}); 
										 var xgsj ={
												 WID: tksj.rows[0].WID,									    	    
									    	     SFTK:'false'
									    	  }
									    	  BH_UTILS.doAjax('../modules/whsq/T_XXB_XXHJCSS_CZSM_MODIFY.do', xgsj);
									}
									  $.bhPaperPileDialog.show({
						    		        content: whsqNewTpl.render({}),
						    		        title: "新建申请",
						    		        ready: function($header, $body, $footer){
						    		          whsqSave.initialize(null,null,null,null,null);
						    		        }
						    		      });
								}
							}, {
								text : '取消',
								className : 'bh-btn-default',
								callback : function() {
									
								}
							} ], {
						height : 600,
						width : 800
					});
    	//  var zccxtksj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CZSM_QUERY', {SFRZH : USERID,SSYM:'whsq'}); 
      }else{//如果有信息就判断，是否弹框，是-true；否-false
    	  if(cxtksj.rows[0].SFTK =='true'){//如果是
    		  BH_UTILS
  			.bhWindow(
  					"<div id='ampDetailIntroduction' class='amp-detail-body' tabindex='26' style='overflow-y: hidden; outline: none;'>"
					+"<div id='ampDetailIntroductionContent' class='amp-detail-content'>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;font-size: 18px;'>当信息化基础设施需要维护时，申请人可提交维护申请，申请经信息化办审核，审核通过后申请人员可通知维护人员维护。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>维护申请审核流程如下图：</span></p>"
						+"<div style='margin:0 auto;width:80%'><img src='./public/images/whsqflow0331.png'"
					 	+" title='维护申请流程图' alt='whsqflow.pn' width='556' height='175'  style='width: 588px; height:109px;'></div>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>部分操作说明：</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp新增申请：可以申请所需要维护的信息化基础设施。<span style='color:red'>（注意：维护申请提交之后不可修改所维护的基础设施）</span></span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp删除：可以删除暂存的申请记录。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp编辑：可对当前申请信息进行修改（仅在未提交与驳回状态下可编辑）。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp导出：可以把表格内的所有记录导出成Execl文件。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp详情：可以查看当前申请的详细信息。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp查看流程：以查看当前记录的申请与审核记录以及审核意见。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp撤回：可撤回已提交但信息化办未审核的申请记录。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>如需更多操作说明可点击【操作手册下载】查看操作手册。</span></p>"
					+"</div>"				 
				+"</div>"
				+"<div class=\"bh-checkbox bh-checkbox-group-h\" id=\"bzsm\" style='position:absolute;right:190px;bottom:32px'>"
						+ "<label class=\"bh-checkbox-label\"><input type=\"checkbox\" name=\"xctx\" value=\"true\"><i class=\"bh-choice-helper\"></i>下次不再提醒</label> "
						+"</div>",
  					"服务说明",
  					[
  							{
  								text : '开始申请',
  								className : 'bh-btn-primary',
  								callback : function() {
  									var sftx = $("input[name='xctx']:checked").val();
  									if(sftx == undefined){
  										sftx = false
  									}
  									if(sftx){//如果勾选了不再弹出，就把SFTK字段改为false
  										 var tksj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CZSM_QUERY', {SFRZH : USERID,SSYM:'whsq'}); 
  										 var xgsj ={
  												 WID: tksj.rows[0].WID,									    	    
  									    	     SFTK:'false'
  									    	  }
  									    	  BH_UTILS.doAjax('../modules/whsq/T_XXB_XXHJCSS_CZSM_MODIFY.do', xgsj);
  									}
  									  $.bhPaperPileDialog.show({
  						    		        content: whsqNewTpl.render({}),
  						    		        title: "新建申请",
  						    		        ready: function($header, $body, $footer){
  						    		          whsqSave.initialize(null,null,null,null,null);
  						    		        }
  						    		      });
  								}
  							}, {
  								text : '取消',
  								className : 'bh-btn-default',
  								callback : function() {
  									
  								}
  							} ], {
  						height : 600,
  						width : 800
  					});

    	  }else if(cxtksj.rows[0].SFTK =='false'){//如果不是就直接进入申请页面
    		  
    		  $.bhPaperPileDialog.show({
    		        content: whsqNewTpl.render({}),
    		        title: "新建申请",
    		        ready: function($header, $body, $footer){
    		          whsqSave.initialize(null,null,null,null,null);
    		        }
    		      });
    	  }
      }
      $("#buttons").css("width","63%")
    },   	 
    czsm:function(e){//服务说明
    	BH_UTILS
		.bhWindow(

				"<div id='ampDetailIntroduction' class='amp-detail-body' tabindex='26' style='overflow-y: hidden; outline: none;'>"
					+"<div id='ampDetailIntroductionContent' class='amp-detail-content'>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;font-size: 18px;'>当信息化基础设施需要维护时，申请人可提交维护申请，申请经信息化办审核，审核通过后申请人员可通知维护人员维护。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>维护申请审核流程如下图：</span></p>"
						+"<div style='margin:0 auto;width:80%'><img src='./public/images/whsqflow0331.png'"
					 	+" title='维护申请流程图' alt='whsqflow.pn' width='556' height='175' style='width: 588px; height:109px;'></div>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>部分操作说明：</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp新增申请：可以申请所需要维护的信息化基础设施。<span style='color:red'>（注意：维护申请提交之后不可修改所维护的基础设施）</span></span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp删除：可以删除暂存的申请记录。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp编辑：可对当前申请信息进行修改（仅在未提交与驳回状态下可编辑）。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp导出：可以把表格内的所有记录导出成Execl文件。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp详情：可以查看当前申请的详细信息。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp查看流程：以查看当前记录的申请与审核记录以及审核意见。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp撤回：可撤回已提交但信息化办未审核的申请记录。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>如需更多操作说明可点击【操作手册下载】查看操作手册。</span></p>"
					+"</div>"				 
				+"</div>",			
				"服务说明",
				[
						{
							text : '关闭',
							align: 'center',
							className : 'bh-btn-default',
							callback : function() {
								// 需要定义一个空函数，以关闭弹窗
							}
						} ], {
					height : 600,
					width : 800
				});
    	$("#buttons").css("width","63%")
    },
    
   
    
    
    
    
    handbook:function(e){//操作手册下载
    	//window.location.href = '../public/word/1重庆邮电大学_信息化基础设施管理操作手册（系统管理员）.docx';    		
    	var self=this;
	     var result = '1重庆邮电大学_信息化基础设施管理操作手册（申请人）.docx';
	     var oresult = '1重庆邮电大学_信息化基础设施管理操作手册（申请人）.docx';	    		
	     var url = bs.api.fileDownUrl + '?name=' + encodeURI(result) + '&oName=' + oresult;
	     document.getElementById("loadFileHide").src = url;
        // self.loadiframe(document.getElementById("loadFileHide"));//判断下载是否完成
    },
      
    actionEdit: function(e){//编辑
      var id = $(e.target).attr("data-x-wid");
      var taskid = $(e.target).attr("data-x-taskId");
      var jcssid = $(e.target).attr("data-x-jcssId");
      var whsj = $(e.target).attr("data-x-whsj");
      var flowstatus = $(e.target).attr("data-x-flowstatus");
      var whsqEditTpl = utils.loadCompiledPage('whsqSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_WH_QUERY',
    		  {WID:id,pageNumber:1});
          
      $.bhPaperPileDialog.show({
        content: whsqEditTpl.render({}),
        title: "编辑",
        ready: function($header, $body, $footer){
          whsqSave.initialize(id,taskid,jcssid,whsj,flowstatus);       
          $("#emapForm").emapForm("setValue", data.rows[0]);    
        }
      });
    },
     
   
    
    actionDetail: function(e){//详情
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
	        
      var whsqViewTpl = utils.loadCompiledPage('whsqSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_WH_QUERY', 
    		  {WID:id,pageNumber:1});                  
      $.bhPaperPileDialog.show({
        content: whsqViewTpl.render({}),
        title: "查看",
        ready : function($header, $body, $footer) {
        	whsqView.initialize(data,id,taskid,proid);
        
			$("#emapForm").emapForm("setValue", data.rows[0]);
		}
      });
    },
    aDelete : function(e) {
    	var sfsj = false	
		var id = $(e.target).attr("data-x-wid");
    	var proId = $(e.target).attr("data-x-proid");
    	var jcssId = $(e.target).attr("data-x-jcssid");
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
	            			 
	            			 var ztparams = {
										PWID : jcssId,
				    					ZT : 10 
			    				     }; 
			    				     $.ajax({
			    				    	url:'../modules/whsq/xgzt.do',  //修改更新
			    				    	type:'post',
			    				    	data:ztparams,
			    				    	async:false,
			    				    	cache : true,
			    				    	success:function(data){  				    				    								
			    				    	}
			    				   });
	            			 
	            			$.bhTip({
	            				content : '删除成功！',
	            				state : 'success',
	            				hideWaitTime : 2000
	            			});	
	            			//重新统计数据
//	                        _sjtj.whsjtj();
	            		});	
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
	      	var canDel = true;
	          var params = row.map(function(el){
	          	if(el.FLOWSTATUS !=4){
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
	   		        	  $.bhTip({
	   		  				content : '删除成功！',
	   		  				state : 'success',
	   		  				hideWaitTime : 2000
	   		  			});
	   		        	 //重新统计数据
//	                        _sjtj.whsjtj();
	   		          });
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
	                		
	                		}	
	   	            
	   	        },
	   	       {
	   	            text:'取消',
	   	        }
	   	    ]
	   	});	         	          
        }    		
      },
    
    actionCallback : function(e) {
		var id = $(e.target).attr("data-x-wid");

		var proid = $(e.target).attr("data-x-proid");
      		 	var xxsj;
	   		    	$.ajax({
	  	                 type: "post",
	  	                 async: false,
	  	                url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryUserTasksByNode.do',
	  	                data: { 
	  	                    taskType:'ENDED',
	  	                    nodeId:'whsq' , 
	  	                    appName: 'xxhjcssgl',
	  	                    module: 'modules',
	  	                    page: 'whsq',
	  	                    action: 'T_XXB_XXHJCSS_WH_QUERY',
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
//				      _sjtj.whsjtj();			            
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
    
    
    actionExport: function(){
      bs.exportData({}).done(function(data){
      });
    },

    actionImport: function(){
      $.emapImport({
        "contextPath": contextPath,
        "app": "xxhjcssgl",
        "module": "modules",
        "page": "whsq",
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
      var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_WH_QUERY', "search");
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
    var data = JSON.stringify([{"name":"JHWHSJ","caption":"计划维护时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"JHWHSJ","caption":"计划维护时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]);
      $('#emapAdvancedQuery').emapAdvancedQuery("setValue",data)
	$query.on('search', this._searchCallback);
    },

    _searchCallback: function(e, data, opts) {
    	var flowStatus = $('[data-action=query].bh-active').attr('queryType');
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
			var flowStatus = $('[data-action=query].bh-active').attr('queryType');
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
    	var pid=_util.getpromid(id,'whsq','T_XXB_XXHJCSS_WH_QUERY');
    	
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
    			querySetting:JSON.stringify([{"name":"JHWHSJ","caption":"计划维护时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"JHWHSJ","caption":"计划维护时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]),
    	};
    	
    	
    	if(flowStatus == ""){
    		params = {
    		  taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL    //任务类型 
			  nodeId : '', // 流程定义中人工环节的编号，必填
			  appName : 'xxhjcssgl',// 应用的名称，必填
			  module : 'modules', // 模块名，可以没有，默认modules
			  page : 'whsq', // 回调动作的epg的编号，必填
			  action: 'T_XXB_XXHJCSS_WH_QUERY', // 回调的动作，必填			 	
			  hideFlowState:true,
			  hideTaskState:true,
			  '*order': '-JHWHSJ',
			  querySetting:JSON.stringify([{"name":"JHWHSJ","caption":"计划维护时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"JHWHSJ","caption":"计划维护时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]),
    		};
    	}else{
    		params = {
    			taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL
				flowStatus : flowStatus,
				nodeId : 'whsq', // 流程定义中人工环节的编号，必填
				appName : 'xxhjcssgl',// 应用的名称，必填
				module : 'modules', // 模块名，可以没有，默认modules
				page : 'whsq', // 回调动作的epg的编号，必填
				action: 'T_XXB_XXHJCSS_WH_QUERY', // 回调的动作，必填
				hideFlowState:true,
				hideTaskState:true,
				'*order': '-JHWHSJ',
				querySetting:JSON.stringify([{"name":"JHWHSJ","caption":"计划维护时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"JHWHSJ","caption":"计划维护时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]),
    		}
    	}
      var tableOptions = {
    	pagePath : bs.api.pageModel,
		url : _emapflow.getQueryTasksUrl(),
		action : _emapflow.getQueryTasksAction(),
      //url : _emapflow.getObserveQueryTasksUrl(),
   	 // action : _emapflow.getObserveQueryTasksAction(),
	//	url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
      // action: _emapflow.getQueryTasksByNodeAction(),
        datamodel: _emapflow.getDataModels(params),
		params : params,	//参数
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
		          if (rowData.FLOWSTATUS == "6" || rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2")
		         	 //当流程状态为“草稿”，“所有”，“已驳回”时显示“编辑按钮”
		             str += ' <a href="javascript:void(0)" data-action="edit" data-x-wid=' + rowData.WID + 
		                    ' data-x-taskid=' + rowData.TASKID+ 
		                    ' data-x-jcssid=' + rowData.JCSSID+ 
		                    ' data-x-proid=' + rowData.PROCESSINSTANCEID + 
		                    ' data-x-whsj=' + rowData.JHWHSJ + ' data-x-flowstatus=' + rowData.FLOWSTATUS + '>' + '编辑' + '</a> | ';
		          if (rowData.FLOWSTATUS == "4") //当流程状态为“草稿”
					 str += ' <a href="javascript:void(0)" data-action="adelete" data-x-wid='+ rowData.WID+ 
							' data-x-taskid='+ rowData.TASKID + ' data-x-jcssid='+ rowData.JCSSID +
							' data-x-proid='+ rowData.PROCESSINSTANCEID + '>' + '删除' + '</a> | ';
					if (rowData.FLOWSTATUS == "1") //当流程状态为“审核中”
						str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
							   ' data-x-taskid='+ rowData.TASKID+ 
							   ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
					
					str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX + '>详情</a> | ';
					 
		           	 
					 str += ' <a href="javascript:void(0)" data-action="lczt" data-x-wid=' + rowData.WID + '>流程状态</a>   ';
					 	
		          return str;
            }
          }
        }
        ,{
			colIndex : '2',
			type : 'tpl',
			column : {
				text : '最新环节-状态',
				//text : '状态',
				align : 'center',
				cellsAlign : 'center',
				width : '180px',
				cellsRenderer : function(row, column, value,rowData) {
						var NODENAME
						var FLOWSTATUSNAME	
				if (rowData.PROCESSINSTANCEID != null ){  //流程信息不为空
							
					var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
				    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
					var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
					var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
					
					var ZT = dqhj
					if(dqhj == undefined){
						ZT = zzhj
					}
					if (ZT == 'whsq'){
						NODENAME = "维护申请-"
					}else if(ZT == 'whsh'){
						NODENAME = "信息化办审核-"
					}else if(ZT == 'whcl'){
						NODENAME = "信息化办处理-"
					}else if(ZT == undefined){
 						NODENAME = ''
 					}
					
					
					if (rowData.FLOWSTATUS == '1'){
						FLOWSTATUSNAME = "审核中"
							if(ZT=="whcl"){
								FLOWSTATUSNAME = "处理中"
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
		}
        ]
      };
      $('#emapdatatable').emapdatatable(tableOptions);
    }
	
//    _initTable: function() {
//    	var params = {};
//    	
//    	
//    	if(flowStatus == ""){
//    		params = {
//    		  taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL    //任务类型 
//			  nodeId : '', // 流程定义中人工环节的编号，必填
//			  appName : 'xxhjcssgl',// 应用的名称，必填
//			  module : 'modules', // 模块名，可以没有，默认modules
//			  page : 'whsq', // 回调动作的epg的编号，必填
//			  action: 'T_XXB_XXHJCSS_WH_QUERY', // 回调的动作，必填			 	
//			  hideFlowState:true,
//			  hideTaskState:true,
//			  '*order': '-JHWHSJ',
//    		};
//    	}else{
//    		params = {
//    			taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL
//				flowStatus : flowStatus,
//				nodeId : 'whsq', // 流程定义中人工环节的编号，必填
//				appName : 'xxhjcssgl',// 应用的名称，必填
//				module : 'modules', // 模块名，可以没有，默认modules
//				page : 'whsq', // 回调动作的epg的编号，必填
//				action: 'T_XXB_XXHJCSS_WH_QUERY', // 回调的动作，必填
//				hideFlowState:true,
//				hideTaskState:true,
//				'*order': '-JHWHSJ',
//    		}
//    	}
//      var tableOptions = {
//    	pagePath : bs.api.pageModel,
//		url : _emapflow.getQueryTasksUrl(),
//		action : _emapflow.getQueryTasksAction(),
//      //url : _emapflow.getObserveQueryTasksUrl(),
//   	 // action : _emapflow.getObserveQueryTasksAction(),
//	//	url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
//      // action: _emapflow.getQueryTasksByNodeAction(),
//        datamodel: _emapflow.getDataModels(params),
//		params : params,	//参数
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
//            	 	var str = ''
//		          if (rowData.FLOWSTATUS == "6" || rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2")
//		         	 //当流程状态为“草稿”，“所有”，“已驳回”时显示“编辑按钮”
//		             str += ' <a href="javascript:void(0)" data-action="edit" data-x-wid=' + rowData.WID + 
//		                    ' data-x-taskid=' + rowData.TASKID+ 
//		                    ' data-x-jcssid=' + rowData.JCSSID+ 
//		                    ' data-x-proid=' + rowData.PROCESSINSTANCEID + 
//		                    ' data-x-whsj=' + rowData.JHWHSJ + ' data-x-flowstatus=' + rowData.FLOWSTATUS + '>' + '编辑' + '</a> | ';
//		          if (rowData.FLOWSTATUS == "4") //当流程状态为“草稿”
//					 str += ' <a href="javascript:void(0)" data-action="adelete" data-x-wid='+ rowData.WID+ 
//							' data-x-taskid='+ rowData.TASKID + ' data-x-jcssid='+ rowData.JCSSID +
//							' data-x-proid='+ rowData.PROCESSINSTANCEID + '>' + '删除' + '</a> | ';
//					if (rowData.FLOWSTATUS == "1") //当流程状态为“审核中”
//						str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
//							   ' data-x-taskid='+ rowData.TASKID+ 
//							   ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
//					str +='<a href="javascript:void(0)" data-action="detail" data-x-wid=' + rowData.WID + 
//    	            ' data-x-taskId=' + rowData.TASKID + 
//    	            ' data-x-proid='+ rowData.PROCESSINSTANCEID + 
//    	            '>' + '详情' + '</a> | ';
//					
//					str += ' <a href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='+rowData.PROCESSINSTANCEID+'&responseType=forward" target="_blank"   data-x-wid=' + rowData.WID + 
//	                 ' data-x-taskid=' + rowData.TASKID+ 
//	                 ' data-x-proid=' + rowData.PROCESSINSTANCEID + '>' + '查看流程' + '</a>';
//		          return str;
//            }
//          }
//        }
//        ,{
//			colIndex : '2',
//			type : 'tpl',
//			column : {
//				text : '最新环节-状态',
//				//text : '状态',
//				align : 'center',
//				cellsAlign : 'center',
//				width : '180px',
//				cellsRenderer : function(row, column, value,rowData) {
//						var NODENAME
//						var FLOWSTATUSNAME	
//				if (rowData.PROCESSINSTANCEID != null ){  //流程信息不为空
//							
//					var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//				    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//					var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//					var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//					
//					var ZT = dqhj
//					if(dqhj == undefined){
//						ZT = zzhj
//					}
//					if (ZT == 'whsq'){
//						NODENAME = "维护申请-"
//					}else if(ZT == 'whsh'){
//						NODENAME = "信息化办审核-"
//					}else if(ZT == 'whcl'){
//						NODENAME = "信息化办处理-"
//					}else if(ZT == undefined){
// 						NODENAME = ''
// 					}
//					
//					
//					if (rowData.FLOWSTATUS == '1'){
//						FLOWSTATUSNAME = "审核中"
//							if(ZT=="whcl"){
//								FLOWSTATUSNAME = "处理中"
//							}
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
//					return '暂无无流程信息'
//				}
//					
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


