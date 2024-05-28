define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./xxhbsqshBS');

    var viewConfig = {
        initialize: function(id,data,taskid, lx,node,sqlx,sbfl) {
        	
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', 'form');

			$("#emapForm").emapForm({
				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
				data : mode,
				model : 't',
				cols : 2,
				autoColumn : true,
				readonly:true
			});

			// 显示申请类型、申请人、申请单位，不可编辑
			$("#emapForm [data-name=LX]").val(lx);
			//$("#emapForm [data-name=SFRZH]").val(USERID);
			$("#emapForm [data-name=SFRZH]").attr("disabled", true);
			/*var zgxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {
				pageSize : 1,
				pageNumber : 1,
				ZGH : data.SFRZH
			});
			if (zgxx.totalSize > 0) {
			
				var zgdwxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'bmcx', {
					pageSize : 100,
					pageNumber : 1,
					DWDM : zgxx.rows[0].SZDWDM
				});

				var dataAdapter = new $.jqx.dataAdapter(zgdwxx.rows);
				if (zgdwxx.rows.length > 0) {
					$("#emapForm [data-name=SQDW]").jqxDropDownList({
						source : dataAdapter,
						displayMember : "DWJC",
						valueMember : "DWDM",
						renderer : function(index, label, value) {
							var datarecord = zgdwxx.rows[index];
							return datarecord.DWDM;
						}
					});
				}
			}*/

		/*	$("#emapForm [data-name=SQDW]").jqxDropDownList('selectItem',
					zgdwxx.rows[0].DWDM);
*/
			$("#emapForm [data-name=GLYXM]").attr("disabled", true);
			$("#emapForm [data-name=SQDW]").jqxDropDownList({
				disabled : true
			});

			if(id!=null &&id!=undefined){
				/*if(data.CK_SFYSQCK=='是'){
					data.CK_SFYSQCK='1';
					$("#emapForm [data-name=CK_SFYSQCK]").val('1');
				}*/
				
				$("#emapForm").emapForm("setValue", data);
			}
			
			// 根据申请类型，隐藏其他类型字段，并添加该类型下的必填项
			_emapShowItem.showItemByLx(lx, node);

			if(sqlx=='关闭出口' || sqlx=='申请出口'){
				$("#emapForm [data-name=CK_SFYSQCK]").parent().parent().css("display","block");
				$("#emapForm [data-name=QTSM]").parent().parent().parent().addClass("bh-col-md-6")
	    	    $("#emapForm [data-name=QTSM]").parent().parent().parent().removeClass("bh-col-md-12")
	    	    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().parent().parent().css("display","block");
				$("#emapForm [data-name=CK_DKH]").parent().parent().css("display","block");
			    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().addClass("bh-col-md-12")
				$("#emapForm [data-name=CK_DKH]").parent().parent().parent().removeClass("bh-col-md-6")
				$("#emapForm [data-name=XNJ_IP]").parent().parent().parent().parent().parent().css("display","block");
			    if(lx=='虚拟机'){
			    	 $("#emapForm [data-name=XNJ_IP]").parent().parent().parent().addClass("bh-col-md-12")
						$("#emapForm [data-name=XNJ_IP]").parent().parent().parent().removeClass("bh-col-md-6")
			    	$("#emapForm [data-name=TGFWQ_SFYZ]").parent().parent().parent().css("display", "none");
					$("#emapForm [data-name=TGFWQ_SFYCC]").parent().parent().parent().css("display", "none");
					$("#emapForm [data-name=TGFWQ_YM]").parent().parent().parent().css("display", "none");
					$("#emapForm [data-name=TGFWQ_IP]").parent().parent().parent().css("display", "none");
					$("#emapForm [data-name=TGFWQ_JJH]").parent().parent().parent().css("display", "none");
					$("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent().css("display", "none");
			    }else if(lx=='托管服务器'){
			    	$("#emapForm [data-name=XNJ_IP]").parent().parent().parent().css("display","none");
			    }
				
			}
			
			$("#shyjdiv").css('display','block');
			var flow = new Vue({
				el : '#app',
				data : function() {
					return {
						formdata : {},
						flow_comment : "",
						defkey : "xxhjcssgl.xxhjcsssq",
						taskid : taskid
					};
				},
				methods : {
					btnclick : function(type, result) {
					/*	console.log("save js---> type=" + type);*/
						if (type.id == "processStatus") {
							return true;
						} else {
							if (data!=null&&data!=undefined&&data.WID!=null) {
								var formData = $("#emapForm").emapForm(
										"getValue");
								this.formdata = formData;
								
								if(type.id=="submit"){
									var self = this
									 this.flow_comment= $('#shyj').val();
									BH_UTILS.bhDialogWarning({
										 title:'提示',
										 content:'确定通过本次申请？',
										 buttons:[
										       {
										       text:'确定',
										      callback:function(){
										    	if( sqlx=== "申请"){
												 var candidateArray=_funauth.queryXxhbClrCandidate();
														if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
															$.bhTip({
																content :  _funauth.xxhbdh,
																state : 'warn',
																hideWaitTime : 5000
															});
															return false;
														}
														var xxhb=_funauth.parseCandidatesId(candidateArray);
														$.bhTip({
															content : '已提交至信息化办处理人'+_funauth.parseCandidatesName(candidateArray)+'，如有多位处理人，任一处理即可。',
															state : 'success',
															hideWaitTime : 5000
														});
														formData.xxhb=xxhb;
														//	formData.xxhb='admin'
										    	 }else if(sqlx == '申请出口'){
															formData.cllx = '' 
															formData.xnjsm =''
															formData.xnjsyfs = ''
															jbxxFormData = {
																WID:id,
																ZT:10,
																CK_DKH:formData.CK_DKH,
															}									
															formData.cllx = '申请出口已通过审核'
															BH_UTILS.doAjax('../modules/xxhbsqsh/T_XXB_XXHJCSS_JBXX_MODIFY.do', jbxxFormData);
															
															$.bhTip({
																content : '通过申请成功',
																state : 'success',
																hideWaitTime : 2000
															});
															
										    	 }else if(sqlx == '关闭出口'){
															formData.cllx = '' 
																formData.xnjsm =''
																formData.xnjsyfs = ''
															jbxxFormData = {
																	WID:id,
																	ZT:10
																}
															formData.cllx = '关闭出口申请已通过审核'
															BH_UTILS.doAjax('../modules/xxhbsqsh/T_XXB_XXHJCSS_JBXX_MODIFY.do', jbxxFormData);
													
															$.bhTip({
																content : '通过申请成功',
																state : 'success',
																hideWaitTime : 2000
															});
										    	 }
										    	 
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
								else if(type.id=="turnback"){
									var self = this
									 this.flow_comment= $('#shyj').val();
									BH_UTILS.bhDialogWarning({
										 title:'提示',
										 content:'确定驳回本次申请？',
										 buttons:[
										       {
										       text:'确定',
										      callback:function(){
													formData.SH=0;
													formData.bhry = '信息化办'

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
									
								else if(type.id=="termination"){
									var self = this
									 this.flow_comment= $('#shyj').val();
									if(sqlx=="申请出口" || sqlx=="关闭出口"){
										var jzdateStr=formData.YXQ;
										jzdateStr=jzdateStr.replace(/-/g,'/'); 
										formData.YXQ=new Date(jzdateStr).getTime();
									}
									
									BH_UTILS.bhDialogWarning({
										 title:'提示',
										 content:'确定不通过本次申请？',
										 buttons:[
										       {
										       text:'确定',
										      callback:function(){
										    	  if( sqlx== "申请"){
										        	 	formData.ZT=0
												 		formData.cllx = '申请未通过'
										          }
										    	  if(sqlx == "申请出口"){
										        	 	formData.ZT=11
												 		formData.cllx = '出口申请未通过'
												 		formData.CK_SFYSQCK = 0
										          }
										          if(sqlx == "关闭出口"){
										        	 	formData.ZT=12
												 		formData.cllx = '关闭出口申请未通过'
												 		formData.CK_SFYSQCK = 1
										          }
										/*	formData.ZT=0
											formData.cllx = '申请未通过'*/
											formData.xnjsm =''
											formData.xnjsyfs = ''
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
								
								
								 
								//return true;
							} else {
								return false;
							}
						}
					},
					action_complete : function(type, result) {
						if (type === "processStatus") {
						} else {
							$.bhPaperPileDialog.hide({
								close : function() {
									var searchData = $('#emapAdvancedQuery').emapAdvancedQuery(
									'getValue');
									var taskType = $('[data-action=query].bh-active').attr('data');
									 var cgsj = [{"name":"ZT","value":"6","linkOpt":"AND","builder":"moreEqual"}]		        
								      cgsj =  JSON.stringify(cgsj)	  
								     var sqz = [{"name":"ZT","value":"","linkOpt":"AND","builder":"equal"}]		        
								      sqz =  JSON.stringify(sqz)	
								        var cksqz = [{"name":"ZT","value":"3","linkOpt":"AND","builder":"equal"}]		        
								      cksqz =  JSON.stringify(cksqz)
								       var ckgbz = [{"name":"ZT","value":"4","linkOpt":"AND","builder":"equal"}]		        
								      ckgbz =  JSON.stringify(ckgbz)
								       if (taskType == "") {
								           $('#emapdatatable').emapdatatable('reload', {
								               querySetting : searchData,
								              // TASKSTATUSNAME:TASKSTATUSNAME
								               });           
								          } else if(taskType == "ALL"){
								        	  $('#emapdatatable').emapdatatable('reload', {
									               querySetting :searchData,
									               taskType : taskType,			           
									           });
							          }else if(taskType == "ALL_CG"){
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
							          } else if(taskType == "SQZ"){
							        	  var cxtj
							        	  if(searchData.length>3){
							        		  searchData = searchData.substr(0,searchData.length-1)
											  sqz =  sqz.substr(1,sqz.length)	
											  var cxtj = searchData+','+sqz
							        	  }else{
							        		  var cxtj = sqz
							        	  }
							        	  $('#emapdatatable').emapdatatable('reload', {
									               querySetting :cxtj,
									               taskType : 'ALL',			           
									           });
							          }else if(taskType == "CKSQZ"){
							        	  var cxtj
							        	  if(searchData.length>3){
							        		  searchData = searchData.substr(0,searchData.length-1)
											  cksqz =  cksqz.substr(1,cksqz.length)	
											  var cxtj = searchData+','+cksqz
							        	  }else{
							        		  var cxtj = cksqz
							        	  }
							        	  $('#emapdatatable').emapdatatable('reload', {
									               querySetting :cxtj,
									               taskType : 'ALL',			           
									           });
							          } else if(taskType == "CKGBZ"){
							        	  var cxtj
							        	  if(searchData.length>3){
							        		  searchData = searchData.substr(0,searchData.length-1)
											  ckgbz =  ckgbz.substr(1,ckgbz.length)	
											  var cxtj = searchData+','+ckgbz
							        	  }else{
							        		  var cxtj = ckgbz
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
								}
							});// 关闭当前弹窗
							//重新统计数据
						      _sjtj.xxhbshtj();
						      
						}
					}
				}
			});
		},
	};
	return viewConfig;
});