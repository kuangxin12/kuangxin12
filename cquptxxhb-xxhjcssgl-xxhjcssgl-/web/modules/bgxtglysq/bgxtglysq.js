define(function(require, exports, module) {

  var utils = require('utils');
  var bs = require('./bgxtglysqBS');
  var bgxtglysqSave = require('./bgxtglysqSave');
  var bgxtglysqView = require('./bgxtglysqView');
  
  var taskType = "ALL_TASK";//任务类型
  var flowStatus = "1";//流程类型
  
  var viewConfig = {
    initialize: function() {
      var view = utils.loadCompiledPage('bgxtglysq');
      this.$rootElement.html(view.render({}), true);
      this.pushSubView([bgxtglysqSave]);
      this.initView();
  	
      this.eventMap = {
        "[data-action=add]": this.actionAdd,
        "[data-action=edit]": this.actionEdit,
        "[data-action=detail]": this.actionDetail,
        "[data-action=delete]": this.actionDelete,
        "[data-action=adelete]": this.ADelete,
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
  	  _sjtj.bgsqtj();
    },

    actionAdd: function(){
      var bgxtglysqNewTpl = utils.loadCompiledPage('bgxtglysqSave');
      var jcssxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {SFRZH : USERID,pageSize : 100,pageNumber : 1,});  
      if(jcssxx.rows.length == 0 ){  	  
   	  // alert("暂时没有可以申请的基础设施！！！")
		$.bhTip({
		    content : '暂时没有可以申请的基础设施！！！',
			state : 'warning',
			hideWaitTime : 2000
		});
   	   return false
      }
      //查询当前登录人员在说明字典中的信息
      var cxtksj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CZSM_QUERY', {SFRZH : USERID,SSYM:'bgsq',pageSize : 1000,pageNumber : 1,});  
      if(cxtksj.rows.length == 0 ){ //如果没有信息，就添加一行
    	  var addsj ={
    	     SFRZH : USERID,
    	     SSYM: 'bgsq',
    	     SFTK:'true'
    	  }
    	  BH_UTILS.doAjax('../modules/bgxtglysq/T_XXB_XXHJCSS_CZSM_ADD.do', addsj);  
    	  BH_UTILS //接着打开服务说明
			.bhWindow(
					"<div id='ampDetailIntroduction' class='amp-detail-body' tabindex='26' style='overflow-y: hidden; outline: none;'>"
					+"<div id='ampDetailIntroductionContent' class='amp-detail-content'>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;font-size: 18px;'>信息化基础设施需要变更申请人时，原申请人可选择新申请人，新申请人确认后，申请经申请单位信息化联络员、申请单位负责人、信息化办审核，审核通过后原申请人在微服务中无对应信息化基础设施管理权限。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>变更申请审核流程如下图：</span></p>"
						+"<div style='margin:0 auto;width:80%'><img src='./public/images/bgsqflow.png'"
					 	+" title='变更申请流程图' alt='bgsqflow.pn' width='600px' height='130px' style='width: 630px; height:125px;'></div>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>部分操作说明：</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp新增申请：可以申请所需要变更的信息化基础设施。<span style='color:red'>（注意：变更申请提交之后不可修改所变更的基础设施）</span></span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp删除：可以删除暂存的申请记录。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp编辑：可对当前申请信息进行修改（仅在未提交与驳回状态下可编辑）。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp导出：可以把表格内的所有记录导出成Execl文件。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp详情：可以查看当前申请的详细信息。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp查看流程：以查看当前记录的申请与审核记录以及审核意见。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp撤回：可撤回已提交但新申请人未确认的申请记录。</span></p>"
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
										 var tksj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CZSM_QUERY', {SFRZH : USERID,SSYM:'bgsq'}); 
										 var xgsj ={
												 WID: tksj.rows[0].WID,									    	    
									    	     SFTK:'false'
									    	  }
									    	  BH_UTILS.doAjax('../modules/bgxtglysq/T_XXB_XXHJCSS_CZSM_MODIFY.do', xgsj);
									}
									$.bhPaperPileDialog.show({
								        content: bgxtglysqNewTpl.render({}),
								        title: "新建变更申请",
								        ready: function($header, $body, $footer){
								          bgxtglysqSave.initialize(null,null,null,null,null,null);
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
    	//  var zccxtksj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CZSM_QUERY', {SFRZH : USERID,SSYM:'bgsq'}); 
      }else{//如果有信息就判断，是否弹框，是-true；否-false
    	  if(cxtksj.rows[0].SFTK =='true'){//如果是
    		  BH_UTILS
  			.bhWindow(
  					"<div id='ampDetailIntroduction' class='amp-detail-body' tabindex='26' style='overflow-y: hidden; outline: none;'>"
					+"<div id='ampDetailIntroductionContent' class='amp-detail-content'>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;font-size: 18px;'>信息化基础设施需要变更申请人时，原申请人可选择新申请人，新申请人确认后，申请经申请单位信息化联络员、申请单位负责人、信息化办审核，审核通过后原申请人在微服务中无对应信息化基础设施管理权限。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>变更申请审核流程如下图：</span></p>"
						+"<div style='margin:0 auto;width:80%'><img src='./public/images/bgsqflow.png'"
					 	+" title='变更申请流程图' alt='bgsqflow.pn' width='600px' height='130px' style='width: 630px; height:125px;'></div>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>部分操作说明：</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp新增申请：可以申请所需要变更的信息化基础设施。<span style='color:red'>（注意：变更申请提交之后不可修改所变更的基础设施）</span></span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp删除：可以删除暂存的申请记录。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp编辑：可对当前申请信息进行修改（仅在未提交与驳回状态下可编辑）。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp导出：可以把表格内的所有记录导出成Execl文件。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp详情：可以查看当前申请的详细信息。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp查看流程：以查看当前记录的申请与审核记录以及审核意见。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp撤回：可撤回已提交但新申请人未确认的申请记录。</span></p>"
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
  										 var tksj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CZSM_QUERY', {SFRZH : USERID,SSYM:'bgsq'}); 
  										 var xgsj ={
  												 WID: tksj.rows[0].WID,									    	    
  									    	     SFTK:'false'
  									    	  }
  									    	  BH_UTILS.doAjax('../modules/bgxtglysq/T_XXB_XXHJCSS_CZSM_MODIFY.do', xgsj);
  									}
  									$.bhPaperPileDialog.show({
  								        content: bgxtglysqNewTpl.render({}),
  								        title: "新建变更申请",
  								        ready: function($header, $body, $footer){
  								          bgxtglysqSave.initialize(null,null,null,null,null,null);
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
    		        content: bgxtglysqNewTpl.render({}),
    		        title: "新建变更申请",
    		        ready: function($header, $body, $footer){
    		          bgxtglysqSave.initialize(null,null,null,null,null,null);
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
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;font-size: 18px;'>信息化基础设施需要变更申请人时，原申请人可选择新申请人，新申请人确认后，申请经申请单位信息化联络员、申请单位负责人、信息化办审核，审核通过后原申请人在微服务中无对应信息化基础设施管理权限。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>变更申请审核流程如下图：</span></p>"
						+"<div style='margin:0 auto;width:80%'><img src='./public/images/bgsqflow.png'"
					 	+" title='变更申请流程图' alt='bgsqflow.pn' width='600px' height='130px' style='width: 630px; height:125px;'></div>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 18px;'>部分操作说明：</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp新增申请：可以申请所需要变更的信息化基础设施。<span style='color:red'>（注意：变更申请提交之后不可修改所变更的基础设施）</span></span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp删除：可以删除暂存的申请记录。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp编辑：可对当前申请信息进行修改（仅在未提交与驳回状态下可编辑）。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp导出：可以把表格内的所有记录导出成Execl文件。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp详情：可以查看当前申请的详细信息。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp查看流程：以查看当前记录的申请与审核记录以及审核意见。</span></p>"
						+"<p><span style='font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14.5px;'>&nbsp&nbsp&nbsp&nbsp撤回：可撤回已提交但新申请人未确认的申请记录。</span></p>"
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
    
    actionEdit: function(e){
      var id = $(e.target).attr("data-x-wid");
      var taskid = $(e.target).attr("data-x-taskId");
      var jcssid = $(e.target).attr("data-x-jcssId");
      var flowstatus = $(e.target).attr("data-x-flowstatus");
      var xgly =$(e.target).attr("data-x-bghgly");
      var bgxtglysqEditTpl = utils.loadCompiledPage('bgxtglysqSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', {WID:id,pageNumber:1});
          
      $.bhPaperPileDialog.show({
        content: bgxtglysqEditTpl.render({}),
        title: "编辑",
        ready: function($header, $body, $footer){
          bgxtglysqSave.initialize(id,data.rows[0],taskid,jcssid,xgly,flowstatus); 
          
          $("#emapForm").emapForm("setValue", data.rows[0]);    
        }
      });
    },
        
    actionDetail: function(e){
      var id = $(e.target).attr("data-x-wid");
      var lcxx=_util.getpromid(id,'bgxtglysq','bgsqxxlb');
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
     
      var bgxtglysqViewTpl = utils.loadCompiledPage('bgxtglysqSave');
      var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', {WID:id,pageNumber:1});
          
      $.bhPaperPileDialog.show({
        content: bgxtglysqViewTpl.render({}),
        title: "查看",
        ready: function($header, $body, $footer){
          bgxtglysqView.initialize(data,id,taskid,proid);
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
    
    ADelete : function(e) {
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
	            			$.bhTip({
	            				content : '删除成功！',
	            				state : 'success',
	            				hideWaitTime : 2000
	            			});	
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
	                	//统计数据
//	              	  _sjtj.bgsqtj();
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
	                	//统计数据
//	              	  _sjtj.bgsqtj();
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
    		//var taskid = $(e.target).attr("data-x-taskId");
    		var proid = $(e.target).attr("data-x-proid");
          var xxsj;
    	   	$.ajax({
    	  	    type: "post",
    	  	    async: false,
    	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryUserTasksByNode.do',
    	  	    data: { 
    	  	        taskType:'ENDED',
    	  	        nodeId:'xtglybgsq' , 
    	  	        appName: 'xxhjcssgl',
    	  	        module: 'modules',
    	  	        page: 'bgxtglysq',
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
//  				  _sjtj.bgsqtj();
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
        "page": "bgxtglysq",
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
    	var pid=_util.getpromid(id,'bgxtglysq','bgsqxxlb');
    	
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
    	var params = {};
    	if(flowStatus == ""){
    		params = {
    		  taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL    //任务类型 
    		  nodeId : '', // 流程定义中人工环节的编号，必填
				appName : 'xxhjcssgl',// 应用的名称，必填
				module : 'modules', // 模块名，可以没有，默认modules
				page : 'bgxtglysq', // 回调动作的epg的编号，必填
			//	action: 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', // 回调的动作，必填
				action: 'bgsqxxlb',
				 '*order' : '+BGTJSJ',
			   // SQRID : USERID	
			  hideFlowState:true,
				hideTaskState:true,
    		};
    	}else{
    		params = {
    			taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL
    			flowStatus : flowStatus,
				nodeId : '', // 流程定义中人工环节的编号，必填
				appName : 'xxhjcssgl',// 应用的名称，必填
				module : 'modules', // 模块名，可以没有，默认modules
				page : 'bgxtglysq', // 回调动作的epg的编号，必填
//				action: 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', // 回调的动作，必填
				action: 'bgsqxxlb',
				 '*order' : '-BGTJSJ',
				// SQRID : USERID
				hideFlowState:true,
				hideTaskState:true,
    		}   	
    		
    	}	
      var tableOptions = {
        pagePath: bs.api.pageModel,
        url : _emapflow.getQueryTasksUrl(),
      	action : _emapflow.getQueryTasksAction(),
  //  url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
   // action: _emapflow.getQueryTasksByNodeAction(),
   //   url : _emapflow.getObserveQueryTasksUrl(),
	//  action : _emapflow.getObserveQueryTasksAction(),
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
            align: 'center',
            width:'180px',
            cellsAlign: 'center',
            cellsRenderer: function(row, column, value, rowData) {
            	var str = ''
            	
            	if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
					
            		var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
				    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
					var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
					var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
					      
				      if (rowData.FLOWSTATUS == "6" || rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2")
				     	 //当流程状态为“草稿”，“所有”，“已驳回”时显示“编辑按钮”
				         str += ' <a href="javascript:void(0)" data-action="edit" data-x-wid=' + rowData.WID + 
				                ' data-x-taskid=' + rowData.TASKID+ 
				                ' data-x-jcssid=' + rowData.JCSSID+ 
				                ' data-x-bghgly=' + rowData.BGHGLY+
				                ' data-x-proid=' + rowData.PROCESSINSTANCEID +  ' data-x-flowstatus=' + rowData.FLOWSTATUS +'>' + '编辑' + '</a> | ';
				      if (rowData.FLOWSTATUS == "4") //当流程状态为“草稿”
						 str += ' <a href="javascript:void(0)" data-action="adelete" data-x-wid='+ rowData.WID+ 
								' data-x-taskid='+ rowData.TASKID +
								' data-x-proid='+ rowData.PROCESSINSTANCEID + '>' + '删除' + '</a> | ';
				      if (rowData.FLOWSTATUS == "1" && dqhj == "xglyqr") //当流程状态为“审核中”
							str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
								   ' data-x-taskid='+ rowData.TASKID+ 
								   ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
            	}  
            	 str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX + '>详情</a> | ';
				 
	           	 
	           	 str += ' <a href="javascript:void(0)" data-action="lczt" data-x-wid='
	  					 + rowData.WID + '>流程状态</a>   ';
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
		}
        ]
      };
      $('#emapdatatable').emapdatatable(tableOptions);
    }
    
//    _initTable: function() {
//    	var params = {};
//    	if(flowStatus == ""){
//    		params = {
//    		  taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL    //任务类型 
//    		  nodeId : '', // 流程定义中人工环节的编号，必填
//				appName : 'xxhjcssgl',// 应用的名称，必填
//				module : 'modules', // 模块名，可以没有，默认modules
//				page : 'bgxtglysq', // 回调动作的epg的编号，必填
//			//	action: 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', // 回调的动作，必填
//				action: 'bgsqxxlb',
//				 '*order' : '+BGTJSJ',
//			   // SQRID : USERID	
//			  hideFlowState:true,
//				hideTaskState:true,
//    		};
//    	}else{
//    		params = {
//    			taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL
//    			flowStatus : flowStatus,
//				nodeId : '', // 流程定义中人工环节的编号，必填
//				appName : 'xxhjcssgl',// 应用的名称，必填
//				module : 'modules', // 模块名，可以没有，默认modules
//				page : 'bgxtglysq', // 回调动作的epg的编号，必填
////				action: 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', // 回调的动作，必填
//				action: 'bgsqxxlb',
//				 '*order' : '-BGTJSJ',
//				// SQRID : USERID
//				hideFlowState:true,
//				hideTaskState:true,
//    		}   	
//    		
//    	}	
//      var tableOptions = {
//        pagePath: bs.api.pageModel,
//        url : _emapflow.getQueryTasksUrl(),
//      	action : _emapflow.getQueryTasksAction(),
//  //  url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
//   // action: _emapflow.getQueryTasksByNodeAction(),
//   //   url : _emapflow.getObserveQueryTasksUrl(),
//	//  action : _emapflow.getObserveQueryTasksAction(),
//        datamodel: _emapflow.getDataModels(params),      
// 		params : params,	//参数
//       // action: 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
//        customColumns: [{
//          colIndex: '0',
//          type: 'checkbox'
//        }, {
//          colIndex: '1',
//          type: 'tpl',
//          column: {
//            text: '操作',
//            align: 'center',
//            width:'180px',
//            cellsAlign: 'center',
//            cellsRenderer: function(row, column, value, rowData) {
//            	var str = ''
//            	
//            	if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
//					
//            		var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//				    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//					var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//					var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//					      
//				      if (rowData.FLOWSTATUS == "6" || rowData.FLOWSTATUS == ""|| rowData.FLOWSTATUS == "4"|| rowData.FLOWSTATUS == "2")
//				     	 //当流程状态为“草稿”，“所有”，“已驳回”时显示“编辑按钮”
//				         str += ' <a href="javascript:void(0)" data-action="edit" data-x-wid=' + rowData.WID + 
//				                ' data-x-taskid=' + rowData.TASKID+ 
//				                ' data-x-jcssid=' + rowData.JCSSID+ 
//				                ' data-x-bghgly=' + rowData.BGHGLY+
//				                ' data-x-proid=' + rowData.PROCESSINSTANCEID +  ' data-x-flowstatus=' + rowData.FLOWSTATUS +'>' + '编辑' + '</a> | ';
//				      if (rowData.FLOWSTATUS == "4") //当流程状态为“草稿”
//						 str += ' <a href="javascript:void(0)" data-action="adelete" data-x-wid='+ rowData.WID+ 
//								' data-x-taskid='+ rowData.TASKID +
//								' data-x-proid='+ rowData.PROCESSINSTANCEID + '>' + '删除' + '</a> | ';
//				      if (rowData.FLOWSTATUS == "1" && dqhj == "xglyqr") //当流程状态为“审核中”
//							str += ' <a href="javascript:void(0)" data-action="callback" data-x-wid='+ rowData.WID+ 
//								   ' data-x-taskid='+ rowData.TASKID+ 
//								   ' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '撤回' + '</a> | ';
//            	}  
//				       str += '<a href="javascript:void(0)" data-action="detail" data-x-wid=' + rowData.WID + 
//			            ' data-x-taskId=' + rowData.TASKID + 
//			            ' data-x-proid='+ rowData.PROCESSINSTANCEID + 
//			            '>' + '详情' + '</a>';
//				      if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空
//							   
//				      str += ' | <a href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
//		            	+rowData.PROCESSINSTANCEID+'&responseType=forward" target="_blank"   data-x-wid=' + rowData.WID + 
//			             ' data-x-taskid=' + rowData.TASKID+ 
//			             ' data-x-proid=' + rowData.PROCESSINSTANCEID + '>' + '查看流程' + '</a>';
//	            	}
//			      return str;
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
//							if (ZT == 'xtglybgsq'){
//								NODENAME = "变更申请-"
//							}else if(ZT == 'xglyqr'){
//								NODENAME = "确认变更-"
//							}else if(ZT == 'xxhllyshbg'){
//								NODENAME = "申请单位信息化联络员审核-"
//							}else if(ZT == 'bmldshbg'){
//								NODENAME = "申请单位负责人审核-"
//							}else if(ZT == 'xxhbshbg'){
//								NODENAME = "信息化办审核-"
//							}else if(ZT == undefined){
//		 						NODENAME = ''
//		 					}
//						    
//			   		    	if (rowData.FLOWSTATUS == '1'){			   		    		
//								FLOWSTATUSNAME = "审核中"
//								if(ZT == 'xglyqr'){
//					   		    	 FLOWSTATUSNAME = "确认中"
//					   		    }
//							}else if(rowData.FLOWSTATUS == '2'){
//								FLOWSTATUSNAME = "已驳回"
//							}else if(rowData.FLOWSTATUS == '3'){
//								FLOWSTATUSNAME = "申请成功"
//							}else if(rowData.FLOWSTATUS == '4'){
//								FLOWSTATUSNAME = "未提交"
//							}else if(rowData.FLOWSTATUS == '5'){
//								FLOWSTATUSNAME = "申请未通过"
//							}else if(rowData.FLOWSTATUS == '6'){
//								FLOWSTATUSNAME = "未提交"
//							}	
//							return NODENAME + FLOWSTATUSNAME;	
//						}else if(rowData.PROCESSINSTANCEID == null ){//流程信息为空
//							return '暂无无流程信息'
//						}
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