define(function(require, exports, module) {

  var utils = require('utils');
  var bs = require('./whclBS');
  var whclSave = require('./whclSave');
  var whclView = require('./whclView');

  // var taskType = "ALL_TASK"; //任务类型
  var taskType = "NOTEND"; //任务类型
  var flowStatus = ""; //流程状态
  
  var viewConfig = {
    initialize: function() {
      var view = utils.loadCompiledPage('whcl');
      this.$rootElement.html(view.render({}), true);
      this.pushSubView([whclSave]);
      this.initView();
      
      this.eventMap = {
    		 "[data-action=audit]" : this.actionAudit,
    	     "[data-action=detail]": this.actionDetail,
    	     "[data-action=export]": this.actionExport,
    	     "[data-action=import]": this.actionImport,
    	     "[data-action=query]": this.actionQuery,
    	     "[data-action=custom-column]": this.actionCustomColumn,
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
    	_sjtj.whcltj();
    },

    actionAudit:function(e){
    	var id = $(e.target).attr("data-x-wid");
    	var taskid =$(e.target).attr("data-x-taskId")
    	  var whclEditTpl = utils.loadCompiledPage('whclSave');
        var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whssjbxx', {WID_1:id,pageNumber:1});
        var lx = data.rows[0].LX
        var cksq = data.rows[0].CK_SFYSQCK   
        $.bhPaperPileDialog.show({
          content: whclEditTpl.render({}),
          title: "审核",
          ready: function($header, $body, $footer){
        	  whclSave.initialize(data,id,taskid,lx,cksq);       
            $("#emapForm").emapForm("setValue", data.rows[0]);    
          }
        });
    },
    
    actionDetail: function(e){
	    var id = $(e.target).attr("data-x-wid");
	    var lx = $(e.target).attr("data-x-lx");
   	 var lcxx=_util.getpromid(id,'whcl','xxhbwhlb');
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
    	      
      var whclViewTpl = utils.loadCompiledPage('whclSave');
	    var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whssjbxx', {WID_1:id,pageNumber:1});
	      var lx = data.rows[0].LX
	      var cksq = data.rows[0].CK_SFYSQCK
	      
	      if(data.rows[0].CK_SFYSQCK=='是'){
	       	data.rows[0].CK_SFYSQCK='1';
	 		}    
	       if(data.rows[0].CK_SFYSQCK=='否'){
	       	data.rows[0].CK_SFYSQCK='0';		
	 		} 
	       
      $.bhPaperPileDialog.show({
        content: whclViewTpl.render({}),
        title: "申请详情",
        ready: function($header, $body, $footer){
          whclView.initialize(id,taskid,lx,cksq);
       	 $("#emapForm").emapForm("setValue", data.rows[0]);
        }
      });
    },
	actionBjCallback:function(e){
  		
  		var id = $(e.target).attr("data-x-wid");
  		 var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whssjbxx', {WID_1:id,pageNumber:1});
  		//var xgzt = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {PWID:data.rows[0].JCSSID,pageNumber:1}); 
  		var proid = $(e.target).attr("data-x-proid");
  		var sfsj = true	
  		var params = { 
  				commandType: 'finishedCallback',
  				processInstanceId:proid,//当前流程的processInstanceId
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
 					    	ZT : 7
				    		 }; 
				    		 $.ajax({
				    			url:'../modules/whcl/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
				    			type:'post',
				    			data:ztparams,
				    			async:false,
				    			cache : true,
				    			success:function(data){  				    				    								
				    			}
				    		 });
				    		 $.ajax({
 				    			url:'../modules/whcl/T_XXB_XXHJCSS_WH_MODIFY.do',  //修改更新
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
				    		 
					$.bhTip({
						content : '办结取回成功',
						state : 'success',
						hideWaitTime : 2000
					});
					//统计数据
//					  _sjtj.whcltj();
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
        "page": "whcl",
        "action": "[添加或保存动作的别名]",//使用添加或保存动作
        //"tplUrl": "modules/htgl/dataModel.T_JZG_HT.xls",
        "preCallback": function() {
        },
        "closeCallback": function() {
           $('#emapdatatable').emapdatatable('reloadFirstPage');
        },
      });
    },
        
    actionCustomColumn: function(){
      $('#emapdatatable').emapdatatable('selectToShowColumns');
    },
        
    _initAdvanceQuery: function() {
      var searchData = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'xxhbwhlb', "search");
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
   	 taskType = $('[data-action=query].bh-active').attr('data');
   	/* $('#emapdatatable').emapdatatable('reload', {
		        querySetting: data
		  });*/
   	 var cgsj = [{"name":"ZT","value":"10","linkOpt":"AND","builder":"equal"}]		        
	      cgsj =  JSON.stringify(cgsj)
   	 if (taskType == "") {
            $('#emapdatatable').emapdatatable('reload', {
                querySetting : data,
              
                });           
           }else if(taskType == "ywc"){
	        	  var cxtj
	        	  if(data.length>3){
	        		  data = data.substr(0,data.length-1)
					  cgsj =  cgsj.substr(1,cgsj.length)	
					  var cxtj = data+','+cgsj
	        	  }else{
	        		  var cxtj = cgsj
	        	  }
	        	  $('#emapdatatable').emapdatatable('reload', {
			               querySetting :cxtj,
			               taskType : 'ALL',			           
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
       
       var cgsj = [{"name":"ZT","value":"10","linkOpt":"AND","builder":"equal"}]		        
	      cgsj =  JSON.stringify(cgsj)	
	      
       if (taskType == "") {
           $('#emapdatatable').emapdatatable('reload', {
               querySetting : searchData,
             
               });           
          }else if(taskType == "ywc"){
	        	  var cxtj
	        	  if(searchData.length>3){
	        		  searchData = searchData.substr(0,searchData.length-1)
					  cgsj =  cgsj.substr(1,cgsj.length)	
					  var cxtj = searchData+','+cgsj
	        	  }else{
	        		  var cxtj = cgsj
	        	  }
	        	  $('#emapdatatable').emapdatatable('reload', {
			               querySetting :cxtj,
			               taskType : 'ALL',			           
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
   	var pid=_util.getpromid(id,'whcl','xxhbwhlb');
   	
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
               nodeId : 'whcl', // 流程定义中人工环节的编号，必填
               appName : 'xxhjcssgl',// 应用的名称，必填
               module : 'modules', // 模块名，可以没有，默认modules
               page : 'whcl', // 回调动作的epg的编号，必填
               action : 'xxhbwhlb', // 回调的动作，必填
               hideFlowState:true,
   			hideTaskState:true,
   			'*order': '-JHWHSJ',
   			querySetting:JSON.stringify([{"name":"JHWHSJ","caption":"计划维护时间","builder":"lessEqual","linkOpt":"AND","builderList":"cbl_Other","value":now_time},{"name":"JHWHSJ","caption":"计划维护时间","linkOpt":"AND","builderList":"cbl_String","builder":"moreEqual","value":old_time}]),
           };
   	 var xxsj = {}//如果没有流程状态就通过另外一个查询语句查出流程状态
   	   var tableOptions = {
   	    		  pagePath : bs.api.pageModel,
   	    			url : _emapflow.getQueryTasksUrl(),
   	    		action : _emapflow.getQueryTasksAction(),
   	    	//	sortable:true,
//   	    			datamodel : _emapflow.getDataModels(params),
   	    		//	url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
   	    	     //  action: _emapflow.getQueryTasksByNodeAction(),
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
   	            width:'200px',
   	            align: 'center',
   	            cellsAlign: 'center',
   	            cellsRenderer: function(row, column, value, rowData) {
   	            	var str = ''
   	            if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空 	            	
   					if (rowData.FLOWSTATUS == "1")
   						str += ' <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID
   							      + ' data-x-taskid='+ rowData.TASKID
   							      + ' data-x-proid='+ rowData.PROCESSINSTANCEID
   								 + '>' + '审核' + '</a> | ';
   					if(rowData.FLOWSTATUS == "5")
   						str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
   							' data-x-taskid='+ rowData.TASKID+ 
   							' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '办结取回' + '</a> | ';
   	            }
   					
   	            	str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX + '>详情</a> | ';
					 
		           	 
					 str += ' <a href="javascript:void(0)" data-action="lczt" data-x-wid=' + rowData.WID + '>流程状态</a>   ';
					 	
   				 
   				return str;
   	            }
   	          }
   	        },{
   				colIndex:'2',
   				type:'tpl',
   				column : {
   					text : '最新环节-状态',
   					align : 'center',
   					cellsAlign : 'center',
   					width: '180px',
   					cellsRenderer : function(row, column, value,rowData) {
   						var NODENAME =''
   						var FLOWSTATUSNAME =''	
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
   							
   							return '';
   						}
   					
   					}
   				}
   			}]
   	      };
   	      $('#emapdatatable').emapdatatable(tableOptions);
   	    }
   
//    _initTable: function() {
//    	
//    	var params = {
//                taskType : taskType, // 未完成-NOTEND，已完成-ENDED，所有-ALL
//                nodeId : 'whcl', // 流程定义中人工环节的编号，必填
//                appName : 'xxhjcssgl',// 应用的名称，必填
//                module : 'modules', // 模块名，可以没有，默认modules
//                page : 'whcl', // 回调动作的epg的编号，必填
//                action : 'xxhbwhlb', // 回调的动作，必填
//                hideFlowState:true,
//    			hideTaskState:true,
//    			'*order': '-JHWHSJ',
//            };
//    	 var xxsj = {}//如果没有流程状态就通过另外一个查询语句查出流程状态
//    	   var tableOptions = {
//    	    		  pagePath : bs.api.pageModel,
//    	    			url : _emapflow.getQueryTasksUrl(),
//    	    		action : _emapflow.getQueryTasksAction(),
//    	    	//	sortable:true,
////    	    			datamodel : _emapflow.getDataModels(params),
//    	    		//	url: _emapflow.getQueryTasksByNodeUrl(),//引擎调用
//    	    	     //  action: _emapflow.getQueryTasksByNodeAction(),
//    	    	        datamodel: _emapflow.getDataModels(params),
//    	    			params : params,	//参数
//    	        customColumns: [{
//    	          colIndex: '0',
//    	          type: 'checkbox'
//    	        }, {
//    	          colIndex: '1',
//    	          type: 'tpl',
//    	          column: {
//    	            text: '操作',
//    	            width:'200px',
//    	            align: 'center',
//    	            cellsAlign: 'center',
//    	            cellsRenderer: function(row, column, value, rowData) {
//    	            	var str = ''
//    	            if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空 	            	
//    					if (rowData.FLOWSTATUS == "1")
//    						str += ' <a href="javascript:void(0)" data-action="audit" data-x-wid='+ rowData.WID
//    							      + ' data-x-taskid='+ rowData.TASKID
//    							      + ' data-x-proid='+ rowData.PROCESSINSTANCEID
//    								 + '>' + '审核' + '</a> | ';
//    					if(rowData.FLOWSTATUS == "5")
//    						str += ' <a href="javascript:void(0)" data-action="finishedcallback" data-x-wid='+ rowData.WID+ 
//    							' data-x-taskid='+ rowData.TASKID+ 
//    							' data-x-proid='+ rowData.PROCESSINSTANCEID+ '>' + '办结取回' + '</a> | ';
//    	            }
//    					str += '<a href="javascript:void(0)" data-action="detail" data-x-wid='+ rowData.WID 
//						+ ' data-x-taskid='+ rowData.TASKID
//						+ ' data-x-proid='+ rowData.PROCESSINSTANCEID
//						+ '>'+ '详情' + '</a>';	
//    				if (rowData.PROCESSINSTANCEID != null ){  //流程信息是否为空 	  	
//    					 str += ' | <a href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='+rowData.PROCESSINSTANCEID+'&responseType=forward" target="_blank"   data-x-wid=' + rowData.WID + 
//    		             ' data-x-taskid=' + rowData.TASKID+ 
//    		             ' data-x-proid=' + rowData.PROCESSINSTANCEID + '>' + '查看流程' + '</a>';
//    	            }
//    				 if (rowData.PROCESSINSTANCEID == null ){
//    					// var xxsj;//如果没有流程状态就通过另外一个查询语句查出流程状态
//    				  	   	$.ajax({
//    				  	  	    type: "post",
//    				  	  	    async: false,
//    				  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
//    				  	  	    data: { 
//    				  	  	        taskType:'ALL',
//    				  	  	        nodeId:'' , 
//    				  	  	        appName: 'xxhjcssgl',
//    				  	  	        module: 'modules',
//    				  	  	        page: 'whcl',
//    				  	  	        action: 'xxhbwhlb',
//    				  	  	       // WID:rowData.WID,
//    				  	  	        querySetting : '[  {"name": "WID", "value": "'+rowData.WID+'","builder": "equal","linkOpt": "AND"}]',
//    				  	  	        pageSize: 10,
//    				  	  	        pageNumber: 1,
//    				  	  	       }, //发送到服务器的参数
//    				  	  	    datatype: "json",
//    				  	  	   success: function (result) {
//    				  	  	        xxsj = result.datas.queryObserveUserTasks.rows
//    				  	  	   }
//    				  	  	 })
//    				  	  str += ' | <a  href="'+WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='
//    	    			 +xxsj[0].PROCESSINSTANCEID+'&responseType=forward" target="_blank">查看流程</a>'; 
//    					} 	
//    				 
//    				return str;
//    	            }
//    	          }
//    	        },{
//    				colIndex:'2',
//    				type:'tpl',
//    				column : {
//    					text : '最新环节-状态',
//    					align : 'center',
//    					cellsAlign : 'center',
//    					width: '180px',
//    					cellsRenderer : function(row, column, value,rowData) {
//    						var NODENAME =''
//    						var FLOWSTATUSNAME =''	
//    						if (rowData.PROCESSINSTANCEID != null ){  //流程信息不为空
//    									
//    							var current = rowData.TASKINFO.CURRENT_NODES   //获取当前环节									
//    						    var dqhj = Object.getOwnPropertyNames(current)[0] //当前环节
//    							var last = rowData.TASKINFO.LAST_NODES         //获取办结后的最后的环节
//    							var zzhj = Object.getOwnPropertyNames(last)[0]  //最后环节
//    							
//    							var ZT = dqhj
//    							if(dqhj == undefined){
//    								ZT = zzhj
//    							}
//    								if (ZT == 'whsq'){
//    									NODENAME = "维护申请-"
//    								}else if(ZT == 'whsh'){
//    									NODENAME = "信息化办审核-"
//    								}else if(ZT == 'whcl'){
//    									NODENAME = "信息化办处理-"
//    								}else if(ZT == undefined){
//    			 						NODENAME = ''
//    			 					}
//    							
//    							
//    							if (rowData.FLOWSTATUS == '1'){
//    								FLOWSTATUSNAME = "审核中"
//    								if(ZT=="whcl"){
//    									FLOWSTATUSNAME = "处理中"
//    								}
//    							}else if(rowData.FLOWSTATUS == '2'){
//    								FLOWSTATUSNAME = "已驳回"
//    							}else if(rowData.FLOWSTATUS == '3'){
//    								FLOWSTATUSNAME = "申请成功"
//    							}else if(rowData.FLOWSTATUS == '4'){
//    								FLOWSTATUSNAME = "未提交"
//    							}else if(rowData.FLOWSTATUS == '5'){
//    								FLOWSTATUSNAME = "申请未通过"
//    							}else if(rowData.FLOWSTATUS == '6'){
//    								FLOWSTATUSNAME = "未提交"
//    							}
//    							return NODENAME + FLOWSTATUSNAME;
//    						}else if(rowData.PROCESSINSTANCEID == null ){//流程信息为空
//    							/* var xxsj;//如果没有流程状态就通过另外一个查询语句查出流程状态
//    						  	   	$.ajax({
//    						  	  	    type: "post",
//    						  	  	    async: false,
//    						  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
//    						  	  	    data: { 
//    						  	  	        taskType:'ALL',
//    						  	  	        nodeId:'' , 
//    						  	  	        appName: 'xxhjcssgl',
//    						  	  	        module: 'modules',
//    						  	  	        page: 'whcl',
//    						  	  	        action: 'T_XXB_XXHJCSS_WH_QUERY',
//    						  	  	       // WID:rowData.WID,
//    						  	  	        querySetting : '[  {"name": "WID", "value": "'+rowData.WID+'","builder": "equal","linkOpt": "AND"}]',
//    						  	  	        pageSize: 10,
//    						  	  	        pageNumber: 1,
//    						  	  	       }, //发送到服务器的参数
//    						  	  	    datatype: "json",
//    						  	  	   success: function (result) {
//    						  	  	        xxsj = result.datas.queryObserveUserTasks.rows
//    						  	  	   }
//    						  	  	 })*/
//    						  	 if(xxsj[0].PROCESSINSTANCEID != null){
//    						  	  	var cccurrent = xxsj[0].TASKINFO.CURRENT_NODES   //获取重新查的当前环节									
//    							    var ccdqhj = Object.getOwnPropertyNames(cccurrent)[0] //当前环节
//    								var cclast = xxsj[0].TASKINFO.LAST_NODES         //获取重新查的办结后的最后的环节
//    								var cczzhj = Object.getOwnPropertyNames(cclast)[0]  //最后环节
//    								
//    								var ZT = ccdqhj
//    								if(ccdqhj == undefined){
//    									ZT = cczzhj
//    								}
//    						  	  if (ZT == 'whsq'){
//    									NODENAME = "维护申请-"
//    								}else if(ZT == 'whsh'){
//    									NODENAME = "信息化办审核-"
//    								}else if(ZT == 'whcl'){
//    									NODENAME = "信息化办处理-"
//    								}else if(ZT == undefined){
//    			 						NODENAME = ''
//    			 					}
//    								
//    								
//    								if (xxsj[0].FLOWSTATUS == '1'){
//    									FLOWSTATUSNAME = "审核中"
//    									if(ZT=="whcl"){
//    										FLOWSTATUSNAME = "处理中"
//    									}
//    								}else if(xxsj[0].FLOWSTATUS == '2'){
//    									FLOWSTATUSNAME = "已驳回"
//    								}else if(xxsj[0].FLOWSTATUS == '3'){
//    									FLOWSTATUSNAME = "申请成功"
//    								}else if(xxsj[0].FLOWSTATUS == '4'){
//    									FLOWSTATUSNAME = "未提交"
//    								}else if(xxsj[0].FLOWSTATUS == '5'){
//    									FLOWSTATUSNAME = "申请未通过"
//    								}else if(xxsj[0].FLOWSTATUS == '6'){
//    									FLOWSTATUSNAME = "未提交"
//    								}
//    						  	 }
//    							return NODENAME + FLOWSTATUSNAME;
//    						}
//    					
//    					}
//    				}
//    			}]
//    	      };
//    	      $('#emapdatatable').emapdatatable(tableOptions);
//    	    }
    	  };

    	  return viewConfig;
    	});