define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./xxhbshsqBS');

	var viewConfig = {
		initialize : function(id, data, taskid, lx,node,sqlx) {
			
			/*var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', 'form');*/
			var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'xxhbshbd', 'form');
			$("#emapForm").emapForm({
				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
				data : mode,
				model : 't',
				cols : 2,
				autoColumn : true,
				//readonly : (lx == '托管服务器' ? false : true)
			//	readonly : (sqlx == '申请' ? false : true),
				readonly : false 
			});

			// 显示申请类型、申请人、申请单位，不可编辑
			$("#emapForm [data-name=LX]").val(lx);
		//	$("#emapForm [data-name=SFRZH]").val(USERID);
			$("#emapForm [data-name=SFRZH]").attr("disabled", true);
			/*var zgxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {
				pageSize : 1,
				pageNumber : 1,
				ZGH : data.SFRZH
			});
			if (zgxx.totalSize > 0) {
			//	$("#emapForm [data-name=GLYXM]").val(zgxx.rows[0].XM);
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
			}
       
			$("#emapForm [data-name=SQDW]").jqxDropDownList('selectItem',
					zgdwxx.rows[0].DWDM);*/

			$("#emapForm [data-name=GLYXM]").attr("disabled", true);
			$("#emapForm [data-name=SQDW]").jqxDropDownList({
				disabled : true
			});
			if (id != null && id != undefined) {
				if (data.CK_SFYSQCK == '是') {
					data.CK_SFYSQCK = '1';
					$("#emapForm [data-name=CK_SFYSQCK]").val('1');
				}

				$("#emapForm").emapForm("setValue", data);
			}
/*
			var sltj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {			
				SQDW : data.SQDW,
			});*/
			var sltj = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {			
				querySetting:'[{"name":"ZT","value":"6","linkOpt":"AND","builder":"moreEqual"},{"name":"SQDW","value":"'+data.SQDW+'","linkOpt":"AND","builder":"equal"}]',
					pageSize : 1000,
					pageNumber : 1,
			});
			var sltjsl = sltj.rows.length +1
			
			
			
			if(lx == '托管服务器'){
				$("#emapForm [data-name=XNJ_YHM]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=XNJ_MM]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=XNJ_ROOTYHM]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=XNJ_ROOTMM]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=XNJ_SYFS]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent().addClass("bh-col-md-6")
	       	    $("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent().removeClass("bh-col-md-12")
			}else if (lx == '虚拟机'){
				this.addRequired("XNJ_YHM");
				this.addRequired("XNJ_MM");
				if((data.XNJ_CZXT).toLocaleLowerCase().indexOf('linux')===-1){ //如果不是linux系统就隐藏 root用户名和账号
					$("#emapForm [data-name=XNJ_ROOTYHM]").parent().parent()
					.parent().css("display", "none");
					$("#emapForm [data-name=XNJ_ROOTMM]").parent().parent()
					.parent().css("display", "none");
				}
				 $("#emapForm [data-name=XNJ_SFPT]").parent().parent().css("display", "block");
				$("#emapForm [data-name=XNJ_SYFS]").val('通过xx登录，端口号:xx');
			}
			// 根据申请类型，隐藏其他类型字段，并添加该类型下的必填项
			_emapShowItem.showItemByLx(lx, node);

			
			/*$("#emapForm").emapForm(
					'disableItem',
					[ 'MC', 'SQDW', 'SBFL','CK_SFYSQCK', 'YT', 'QTSM', 'SFRZH',
							'GLYXM', 'EMAIL', 'BGDH', 'SJ', 'TGFWQ_PPXH','TGFWQ_CZXT', ' TGFWQ_XH ','TGFWQ_HEIGHT','TGFWQ_DEPTH',
							' TGFWQ_CPU ','TGFWQ_NC',' CK_DKH',' XNJ_CPU',' XNJ_CZXT',' XNJ_NC','XNJ_SJYP','TGFWQ_FWQLX','TGFWQ_WIDTH' ]);*/
			
			if(sqlx == '关闭出口' || sqlx == '申请出口'){
				$("#emapForm").emapForm(
						'disableItem',
						['TGFWQ_SFYZ','TGFWQ_IP','TGFWQ_JJH','TGFWQ_SFYCC','TGFWQ_YM','TGFWQ_WZ','XNJ_IP','XNJ_SFPT']);
				$("#emapForm [data-name=CK_SFYSQCK]").parent().parent().css("display","block");
				$("#emapForm [data-name=QTSM]").parent().parent().parent().addClass("bh-col-md-6")
	    	    $("#emapForm [data-name=QTSM]").parent().parent().parent().removeClass("bh-col-md-12")
	    	    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().parent().parent().css("display","block");
				$("#emapForm [data-name=CK_DKH]").parent().parent().css("display","block");
			    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().addClass("bh-col-md-12")
				$("#emapForm [data-name=CK_DKH]").parent().parent().parent().removeClass("bh-col-md-6")
				$("#emapForm [data-name=XNJ_YHM]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=XNJ_MM]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=XNJ_ROOTYHM]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=XNJ_ROOTMM]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=XNJ_SYFS]").parent().parent()
				.parent().css("display", "none");
				this.removeRequired("XNJ_YHM");
				this.removeRequired("XNJ_MM");
			}
			
			$("#shyjdiv").css('display', 'block');

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
						/*console.log("save js---> type=" + type);*/
						if (type.id == "processStatus") {
							return true;
						} else if (type.id == "turnback"){
							var formData = $("#emapForm").emapForm(
							"getValue");
					        this.formdata = formData;
					        var self = this
							 this.flow_comment= $('#sh-yj').val();
							BH_UTILS.bhDialogWarning({
								 title:'提示',
								 content:'确定驳回本次申请？',
								 buttons:[
								       {
								       text:'确定',
								      callback:function(){
										formData.bhry = '信息化办'; //驳回人员
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
							
						else if (type.id == "termination"){
							var formData = $("#emapForm").emapForm(
							"getValue");
					         this.formdata = formData;
					     	if(sqlx=="申请出口" || sqlx=="关闭出口"){
								var jzdateStr=formData.YXQ;
								jzdateStr=jzdateStr.replace(/-/g,'/'); 
								formData.YXQ=new Date(jzdateStr).getTime();
							}
							
					         var self = this
							 this.flow_comment= $('#sh-yj').val();
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
										
												formData.xnjsm =''
												formData.xnjsyfs = ''	
											/*var jzdateStr=data.YXQ;
											jzdateStr=jzdateStr.replace(/-/g,'/'); 
											this.formdata.YXQ=new Date(jzdateStr).getTime();*/
											
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
						}else {
							 if ($("#emapForm").emapValidate('validate')) {
								var formData = $("#emapForm").emapForm(
										"getValue");
								
								this.formdata = formData;
								var yhm = formData.XNJ_YHM;
								var mm = formData.XNJ_MM;
								var syfs = formData.XNJ_SYFS;
								if (type.id == "submit"){
							//		if(confirm("是否通过申请（通过申请之后不可取回）")){
								if(sqlx == '申请'){
									
									 if(formData.LX == '虚拟机'){
						            	   var fwqiptwo  = WIS_EMAP_SERV.getData(bs.api.pageModel,'pdipzf', {TGFWQ_IP :  formData.XNJ_IP,pageNumber : 1,pageSize:1000});
						                   var xnjipone  = WIS_EMAP_SERV.getData(bs.api.pageModel,'pdipzf', {XNJ_IP : formData.XNJ_IP,pageNumber : 1,pageSize:1000});
						                   var ipsl = fwqiptwo.totalSize+xnjipone.totalSize
						               }
						               if(formData.LX == '托管服务器'){
						            	   var fwqipone  = WIS_EMAP_SERV.getData(bs.api.pageModel,'pdipzf', {TGFWQ_IP : formData.TGFWQ_IP,pageNumber : 1,pageSize:1000});
						                   var xnjiptwo  = WIS_EMAP_SERV.getData(bs.api.pageModel,'pdipzf', {XNJ_IP : formData.TGFWQ_IP,pageNumber : 1,pageSize:1000});
						                   var ipsl = fwqipone.totalSize+xnjiptwo.totalSize
						               }
						        		/*var fwqipone  = WIS_EMAP_SERV.getData(bs.api.pageModel,'pdipzf', {TGFWQ_IP : formData.TGFWQ_IP,pageNumber : 1,pageSize:1000});
						                var fwqiptwo  = WIS_EMAP_SERV.getData(bs.api.pageModel,'pdipzf', {TGFWQ_IP :  formData.XNJ_IP,pageNumber : 1,pageSize:1000});
						                var xnjipone  = WIS_EMAP_SERV.getData(bs.api.pageModel,'pdipzf', {XNJ_IP : formData.XNJ_IP,pageNumber : 1,pageSize:1000});
						                var xnjiptwo  = WIS_EMAP_SERV.getData(bs.api.pageModel,'pdipzf', {XNJ_IP : formData.TGFWQ_IP,pageNumber : 1,pageSize:1000});
						                var ipsl = fwqipone.totalSize+ fwqiptwo.totalSize+xnjipone.totalSize+xnjiptwo.totalSize*/
							        if(ipsl>0){
					                	 $.bhTip({
					 						content : 'IP重复，请重新填写！',
					 						state : 'danger',
					 						hideWaitTime : 2000
					 					});
					                	 return false
					                }
								}
						      
									var self = this
									this.flow_comment= $("#sh-yj").val();
									BH_UTILS.bhDialogWarning({
										 title:'请确认',
										 content:'确定通过申请？（通过申请之后不可撤回！）',
										 buttons:[
										       {
										            text:'确定',
										            callback:function(){
										            	formData.SH = 1;
														var jbxxFormData
														if(sqlx == '申请'){
															
															if(lx == '托管服务器'){
																formData.cllx = '申请已通过审核，这是本部门申请成功的第'+sltjsl+'台信息化基础设施' 
																formData.xnjsm =''
																formData.xnjsyfs = ''
															}else if(lx=='虚拟机'){
																var rootyhm = formData.XNJ_ROOTYHM;
																var rootmm = formData.XNJ_ROOTMM;
																var rootMes =null;
																var xnjczxt = formData.XNJ_CZXT;
																var ifLinux = false;
																//判断当前虚拟机是否为linux系统
																(formData.XNJ_CZXT).toLocaleLowerCase().indexOf('linux')!=-1?ifLinux=true:null;
																
																if(rootyhm){
																	rootMes = '&#10;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;root用户名：&emsp;'+rootyhm+'&emsp;&ensp;密码：&emsp;'+rootmm
																}
																//&emsp; &ensp;&ensp; &nbsp;&nbsp;&nbsp;&nbsp;  &#10;
																formData.cllx = '申请已通过审核，这是本部门申请成功的第'+sltjsl+'台信息化基础设施'
																formData.xnjsm ='&emsp;&emsp;&ensp;&ensp;您申请虚拟机的用户名:&emsp;&ensp;'+yhm+'&emsp;&ensp;初始密码:&emsp;'+mm
																if(rootMes){
																	formData.xnjsm+=rootMes;
																}
																formData.xnjsyfs = '&emsp;&emsp;&ensp;虚拟机使用方式：'+syfs
																if(ifLinux){
																	formData.xnjsyfs+='&#10;&emsp;&emsp;&ensp;Linux操作系统虚拟机使用说明:'+
																					  '&#10;&emsp;&emsp;&ensp;1:操作系统采用SSH协议登陆，端口号为5122'+
																					  '&#10;&emsp;&emsp;&ensp;2：SSH连接用户名：cqupt'+
																					  '&#10;&emsp;&emsp;&ensp;3：使用 su - root命令切换为 root 用户, 用户名：root'+
																					  '&#10;&emsp;&emsp;&ensp;4：首次登陆cqupt账户和root账户须修改密码为符合强度的密码（例如：大小写字母、特殊字符、数字的组合）'+
																					  '&#10;&emsp;&emsp;&ensp;5：密码有效期60天，过期7天前发出警告'+
																					  '&#10;&emsp;&emsp;&ensp;6：操作系统已开启防火墙，开放icmp,http,https,5122端口';
																}
															}
															
														}	
														
														if(sqlx == '申请'){	
														   if(lx == '托管服务器'){
															  jbxxFormData = {
																WID:id,
																TGFWQ_SFYZ:formData.TGFWQ_SFYZ,
																TGFWQ_IP:formData.TGFWQ_IP,
																TGFWQ_JJH:formData.TGFWQ_JJH,
																TGFWQ_SFYCC:formData.TGFWQ_SFYCC,
																TGFWQ_YM:formData.TGFWQ_YM,
																TGFWQ_WZ:formData.TGFWQ_WZ,
																CZR:USERNAME,
																}
															  BH_UTILS.doAjax('../modules/xxhbshsq/T_XXB_XXHJCSS_JBXX_MODIFY.do', jbxxFormData);
														   }else if(lx=='虚拟机'){
															   jbxxFormData = {
																		WID:id,
																		XNJ_IP:formData.XNJ_IP,
																		XNJ_SFPT:formData.XNJ_SFPT,
																		CZR:USERNAME,
																		}
																	  BH_UTILS.doAjax('../modules/xxhbshsq/T_XXB_XXHJCSS_JBXX_MODIFY.do', jbxxFormData);
															}
															
																											
															var nsFormData={};
															nsFormData.WLJCSSWID=formData.PWID;
															var currDate = new Date();
															var yxq=new Date();
															yxq.setHours( 23, 59, 59,0);
						
															if (currDate.getMonth() < 12) {
																yxq.setFullYear(currDate.getFullYear(),11,31);
															} else {
																yxq.setFullYear(currDate.getFullYear()+1,11,31);
															}
															nsFormData.NSND=currDate.getFullYear();
															nsFormData.NSJZRQ=yxq.getTime();
														//	BH_UTILS.doAjax('../modules/xxhbshsq/T_XXB_XXHJCSS_NS_ADD.do', nsFormData);
															
															
														}		
														if(sqlx == '申请出口'){
															formData.cllx = '' 
															formData.xnjsm =''
															formData.xnjsyfs = ''
															jbxxFormData = {
																WID:id,
																ZT:10,
																CK_DKH:formData.CK_DKH,
															}									
															formData.cllx = '申请出口已通过审核'
															BH_UTILS.doAjax('../modules/xxhbshsq/T_XXB_XXHJCSS_JBXX_MODIFY.do', jbxxFormData);
														}
														if(sqlx == '关闭出口'){
															formData.cllx = '' 
																formData.xnjsm =''
																formData.xnjsyfs = ''
															jbxxFormData = {
																	WID:id,
																	ZT:10
																}
															formData.cllx = '关闭出口申请已通过审核'
															BH_UTILS.doAjax('../modules/xxhbshsq/T_XXB_XXHJCSS_JBXX_MODIFY.do', jbxxFormData);
														}
														
														
														if(sqlx == '申请'){
															formData.xxhbsh='sqtg';
														}	
														
														$.bhTip({
															content : '通过申请成功',
															state : 'success',
															hideWaitTime : 2000
														});
														//$("#emapForm").emapForm("saveUpload");//上传附件时使用
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
					        _sjtj.xxhbsqshtj();
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