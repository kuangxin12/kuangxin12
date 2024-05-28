define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./whsqBS');

    var viewConfig = {
        initialize: function(id,taskid,jcssid,whsj,flowstatus) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'whjcsssq', 'form');
            $("#emapForm").emapForm({
                root:WIS_EMAP_SERV.getContextPath(),//附件上传时必备属性
                data: mode,
                model : 'h',
				cols : 2,
				autoColumn : true
            });
            var zgxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {ZGH : USERID,pageSize : 1,pageNumber : 1,});
            var jcssxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {SFRZH : USERID,pageSize : 100,pageNumber : 1,});  
            
            var jcssdrop = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {PWID : jcssid,ZT:7,pageSize : 100,pageNumber : 1,});  
 
           /* var zgdwxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'bmcx', {pageSize : 100,pageNumber : 1,DWDM : zgxx.rows[0].SZDWDM })                       
            var DW = zgdwxx.rows[0].DWJC*/
            if(id!=null){
            	if(jcssdrop.rows[0].ZT == 7){
             	   jcssxx.rows.push(jcssdrop.rows[0])
                }
            }
            var dataAdapter = new $.jqx.dataAdapter(jcssxx.rows);         
            	$("#emapForm [data-name=WHJCSS]").jqxDropDownList({
					source : dataAdapter,
					displayMember : "MC",
					valueMember : "PWID",
					renderer : function(index, label, value) {
						var datarecord = jcssxx.rows[index];					
						return  "名称:"+datarecord.MC+"  类型:"+datarecord.LX;
						//return  datarecord.MC
					}
				});
           	
            	if( id != null ){//编辑 
            		
            		$("#emapForm [data-name= WHJCSS]").jqxDropDownList('selectItem',
        					jcssdrop.rows[0].PWID);		
            		$('#emapForm [data-name=WHSJ]').jqxDateTimeInput({ value: whsj });
            		
            	}
            	//单选卡片
            	for(i=0;i<jcssxx.rows.length;i++){
            	var dqip
            	if(jcssxx.rows[i].LX == "虚拟机"){
            		dqip = jcssxx.rows[i].XNJ_IP
            	}else if(jcssxx.rows[i].LX == "托管服务器"){
            		dqip = jcssxx.rows[i].TGFWQ_IP
            	}
            	$("#radiobox").append("<div class='sc-panel-thingNoImg-1 sc-default bh-mh-8' style='margin-bottom:10px'><label>"+
						"<div class='sc-panel-thingNoImg-1-container bh-animate-all bh-animate-fast'>"+
						 " <div class='sc-panel-thingNoImg-1-description'>"+
							"<input type='radio'name='radio' class='radio'  value='"+jcssxx.rows[i].PWID+"' style = 'float:left;display: none;' >"+
							 "<div class='sc-panel-thingNoImg-1-header'>"+
								"<div title="+jcssxx.rows[i].MC+" class='sc-panel-thingNoImg-1-title' style = ' width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>"+jcssxx.rows[i].MC+"</div>"+
							"</div>"+
							"<div class='sc-panel-thingNoImg-1-subject'>"+
							   " <div class='sc-panel-thingNoImg-1-subjectKey sc-width-50'>类型</div>"+
							    "<div class='sc-panel-thingNoImg-1-subjectValue'>"+jcssxx.rows[i].LX+"</div>"+
							"</div>"+
							"<div class='sc-panel-thingNoImg-1-subject' style = 'width: 100%;white-space: nowrap;overflow: hidden'>"+
							   " <div class='sc-panel-thingNoImg-1-subjectKey sc-width-50'>用途</div>"+
							    "<div title="+jcssxx.rows[i].YT+" class='sc-panel-thingNoImg-1-subjectValue'>"+jcssxx.rows[i].YT+"</div>"+
							"</div>"+	
							"<div class='sc-panel-thingNoImg-1-subject' style = 'width: 100%;white-space: nowrap;overflow: hidden'>"+
							   " <div class='sc-panel-thingNoImg-1-subjectKey sc-width-50' >IP地址</div>"+
							    "<div   title="+dqip+" class='sc-panel-thingNoImg-1-subjectValue'>"+dqip+"</div>"+
							"</div>"+
						"</div>"+
						"</div>"+
						"</label></div>")
            	}
            	$(".radio").change(function(){
					$(":checked").parent().parent().parent().parent().addClass("sc-active").siblings().removeClass("sc-active");
					$(":checked").parent().parent().parent().parent().removeClass("sc-default").siblings().addClass("sc-default");
				});
          	if(id != null){
          				$("input:radio[value='"+jcssid+"']").prop('checked','true');
          				//$("input:checkbox[value='"+jcssarr[i]+"']").parent().css({"border":"#2D8CF0 solid 4px"})
          				$("input:radio[value='"+jcssid+"']").parent().parent().parent().parent().addClass("sc-active");
          				$("input:radio[value='"+jcssid+"']").parent().parent().parent().parent().removeClass("sc-default");
          					
          	}
          	//单选卡片---end
            	//$("#flow").css("display", "none");
            	
            	var yysj;
   		    	$.ajax({
  	                 type: "post",
  	                 async: false,
  	                url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryUserTasksByNode.do',
  	                
  	                data: { 
  	                    taskType: "ALL_TASK",
  	                    nodeId:'' ,
  	                    appName: 'xxhjcssgl',
  	                    module: 'modules',
  	                    page: 'whsq',
  	                    action: 'T_XXB_XXHJCSS_WH_QUERY',
  	                    pageSize: 10,
  	                    pageNumber: 1 ,
  	                    }, //发送到服务器的参数
  	                    datatype: "json",
  	                    success: function (result) {
  	                    	yysj = result.datas.queryUserTasksByNode.rows
  	                    }
  	        		 })	
  	        //时间设置	
  	        if(id == null){
  	        	$('#emapForm [data-name=WHSJ]').jqxDateTimeInput({ value: null });
  	        }		 
  	        var myDate = new Date;
		     var year = myDate.getFullYear(); //获取当前年
		      var mon = myDate.getMonth() + 1; //获取当前月
		      var date = myDate.getDate()-1; //获取当前日
		     var dqdate = year + '-' + mon + '-' + date;//当前日期	 
		                   		 
  	        $("#emapForm [data-name=WHSJ]").jqxDateTimeInput({ 
  	        	min: dqdate,
  	        	culture: 'zh-CN',
  	        	formatString: "yyyy-MM-dd",
  	        	allowNullDate: true,
  	        	
  	        });
  	      
  	        if(id!=null){  //当编辑不为草稿状态时，暂时不能修改已选择的基础设施
  	        	if(flowstatus != 4){
  	        		$("#emapForm [data-name= WHJCSS]").jqxDropDownList({ disabled: true }); 
  	        		$("input[type=radio]").each(function () {
  	        			$(this).attr("disabled", true); 	        			
  	        		});
  	        		$("input:radio[value='"+jcssid+"']").parent().parent().parent().parent().addClass("sc-default");
  	        	}
  	        }
  	       $("#tsjcss").html("请选择需维护的信息化基础设施:")  		    	

  	    	 $(".bh-txt-input__foot").hide();
                                            
            $("#emapForm [data-name=SQRY]").val(zgxx.rows[0].XM);
            $("#emapForm [data-name=SQRY]").attr("disabled", true);
            this.addRequired("SQRY");
            $("#emapForm [data-name=WHJCSS]").parent().parent()
 			.parent().css("display", "none");
            this.removeRequired("WHJCSS");
           // this.addRequired("WHSJ");
            var flow = new Vue({
            	  el : '#app',
            	  data : function() {
            	    return {
            	      formdata:{},
            	      flow_comment: "",
            	      defkey:"xxhjcssgl.whsqq",
            	      taskid:taskid
            	    };
            	  },
            	  methods : {
            		  btnclick : function(type, result) {
            		/*	  console.log("save js---> type="+type);*/
            			if(type.id == "processStatus") {
            				return true;
              	      } else {
              	    	  if( $("#emapForm").emapValidate('validate')){
              	    		  
              	    		  if($("#emapForm [data-name=WHSJ]").jqxDateTimeInput('value') == null){
              	    			 $.bhTip({
										content : '请选择维护时间！',
										state : 'warning',
										hideWaitTime : 2000
									});
              	    			return false;
              	    		  }
	                  		     var  xzdate = $("#emapForm [data-name=WHSJ]").jqxDateTimeInput('value');//选择日期
	                  		     var xzyear = xzdate.getFullYear(); //获取选择年
		                   		 var xzmon = xzdate.getMonth() + 1; //获取选择月
		                   		 var xzdate = xzdate.getDate(); //获取选择日
		                   		var whrq = xzyear + '-' + xzmon + '-' + xzdate;//选择日期	
	                  		     	                  		                 			                  		 
                  		                     		    	 
                  		    	// var jcsswid = $("#emapForm [data-name=WHJCSS]").val()
                  		    	 // $("#emapForm [data-name=JCSSID]").val(jcsswid);//保存基础设施ID 
		                   		var jcsswid= "";
		            			$("input:radio[name='radio']:checked").each(function () {
		            				jcsswid+= $(this).val();
		            			});
		            			if(jcsswid == ""){
									$.bhTip({
		              		  		    content : '请选择基础设施！！！',
		              		  			state : 'warning',
		              		  			hideWaitTime : 2000
		              		  		    });
		              		    		 return false
								}
                  		    	if(id == null){//新建
	                		    	 var pdsq = true;
	                  		    	for(i=0;i<yysj.length;i++){
	                  		    		if( jcsswid == yysj[i].JCSSID){ 
	                  		    			if(yysj[i].FLOWSTATUS == 1 || yysj[i].FLOWSTATUS == 6|| yysj[i].FLOWSTATUS == 4){                 		    			
	                  		    			 pdsq = false 
	                  		    			 break
	                  		    			 } else{
	                  		    				pdsq = true
	                  		    			 }            		    			
	                  		    		}else{   
	                  		    			pdsq = true
	                  		    		}
	                  		    	} 
	                  		    	if(!pdsq){
	                  		    	
	                  		    		 $.bhTip({
												content : '不能申请正在流程中的设施！',
												state : 'warning',
												hideWaitTime : 2000
											});
	                     		    	 return false
	                  		    	}
                 		       }
                  		   var ymsqdata = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_YMSQ_QUERY', {
                  			  // JCSSID:jcsswid,
                  			   querySetting:'[{"name":"JCSSID","value":"'+jcsswid+'","linkOpt":"AND","builder":"equal"},{"name":"ZT","value":"","linkOpt":"AND","builder":"equal"}]',
                  			   pageNumber:1
                  			   }); 
                  		    //检查当前所选设施是否在域名申请中。	
                  		   if(ymsqdata.totalSize>0){
                  			 $.bhTip({
									content : '您所选的设施正在进行域名申请中！',
									state : 'warning',
									hideWaitTime : 3000
								});
                  			 	return false
                  		   }
                  		   		$("#emapForm [data-name=SQR]").val(USERID);
	              	    		 var formData=$("#emapForm").emapForm("getValue");
	              	    		 formData.JCSSID = jcsswid;
	              	    		formData.SQR = USERID;
	              	    		formData.ZT= null;
	            	    		 this.formdata= formData; 
	            	    		 formData.JHWHSJ = whrq;
	            	    		 var jbxxdata = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {PWID:jcsswid,pageNumber:1}); 
	            	    		  //新增权限设置H
	            	    		 if(type.id=='draft'){
	            	    			 return true;
	            	    			 }
	            	    		 
	            	    		 if (type.id == 'start' || type.id == 'submit'){
	            	    			 var self = this
										BH_UTILS.bhDialogWarning({
											 title:'提示',
											 content:'确定提交当前申请？',
											 buttons:[
											       {
											       text:'确定',
											      callback:function(){
														
						    				    		 
						            	    			  var candidateArray=_funauth.queryXxhbCandidate();
						            	    			//  var candidateArray=_funauth.queryXxhllyCandidate();
															if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
																$.bhTip({
																	content : _funauth.xxhbdh,
																	state : 'warn',
																	hideWaitTime : 5000
																});
																return false;
															}
															var xxhb=_funauth.parseCandidatesId(candidateArray);
															$.bhTip({
																content : '已提交至信息化办管理员'+_funauth.parseCandidatesName(candidateArray)+'，如有多位处理人，任一处理即可。',
																state : 'success',
																hideWaitTime : 5000
															});
															formData.xxhb=xxhb;
						            	    			 // formData.xxhb='admin'
															//	formData.sqrdw = DW
															 var ztparams = {
									    					    	WID : jbxxdata.rows[0].WID,
									    					    	ZT : 7 
								    				    		 }; 
								    				    		 $.ajax({
								    				    			url:'../modules/whsq/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
								    				    			type:'post',
								    				    			data:ztparams,
								    				    			async:false,
								    				    			cache : true,
								    				    			success:function(data){  				    				    								
								    				    			}
								    				    		 });
															
															var yourVM = self.$refs["myflow"]
															yourVM[type.execute](type)//执行原来return true后的组件代码														
															return true;
									                     }
									                },
											        {
											            text:'取消',
											            callback:function(){
											            		            
											            }
											        }
												    ]
												})
	            	    		  }

	            	    		//  return true;
	            	    		  
                  		     
              	    	  }else{
              	    		  return false;
              	    	  }
              	      }
              	    },
            	    action_complete : function(type, result) {
            	      if(type === "processStatus"){
            	      } else {
            	        //重新加载数据
            	        $.bhPaperPileDialog.hide({
            	          close:function() {
            	        	  var searchData = $('#emapAdvancedQuery').emapAdvancedQuery(
								'getValue');
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
            	        });//关闭当前弹窗     
            	        //重新统计数据
            	        _sjtj.whsjtj();
            	      }
            	    }
            	  }
            	});    
        },
    addRequired : function(dataName) {
		var self = $("#emapForm");
		$formGroup = $("#emapForm  [data-name=" + dataName + "]").parent()
				.parent();
		if (!$formGroup.hasClass('bh-required')) {
			$formGroup.addClass('bh-required');
			// 针对1.1， 1.2不同校验组件做兼容
			if (self.data('bhvalidate')) {
				// 1.2
				self.bhValidate('requireItem', dataName);
			} else {
				// 1.1
				self.emapForm('reloadValidate');
			}
		}
	},
	removeRequired : function(dataName) {
		var self = $("#emapForm");
		$formGroup = $("#emapForm  [data-name=" + dataName + "]").parent()
				.parent();
		if ($formGroup.hasClass('bh-required')) {
			$formGroup.removeClass('bh-required');
			// 针对1.1， 1.2不同校验组件做兼容
			if (self.data('bhvalidate')) {
				// 1.2
				self.bhValidate('unRequireItem', dataName);
			} else {
				// 1.1
				self.emapForm('reloadValidate');
			}
		}
	},
    };
    return viewConfig;
});