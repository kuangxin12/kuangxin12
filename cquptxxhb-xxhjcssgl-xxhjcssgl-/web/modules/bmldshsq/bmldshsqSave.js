define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./bmldshsqBS');

	var viewConfig = {
		initialize : function(id,data,taskid,lx,node,sqlx,sbfl) {
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
					zgdwxx.rows[0].DWDM);
*/
			$("#emapForm [data-name=GLYXM]").attr("disabled", true);
			$("#emapForm [data-name=SQDW]").jqxDropDownList({
				disabled : true
			});

			if(id!=null &&id!=undefined){
				if(data.CK_SFYSQCK=='是'){
					data.CK_SFYSQCK='1';
					$("#emapForm [data-name=CK_SFYSQCK]").val('1');
				}
				
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
			    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().addClass("bh-col-md-12");
				$("#emapForm [data-name=CK_DKH]").parent().parent().parent().removeClass("bh-col-md-6")
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
											formData.SH=1;
											if(sqlx == '申请'){									
												formData.lx = '申请'
											}
											if(sqlx == '年审'){									
												formData.lx = '年审'
											}
											
											//if(sbfl == 'GL' && sqlx == '申请'){
//											if(sbfl == 'GL'){
//												var candidateArray=_funauth.queryXxhbCandidate();
//												if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
//													$.bhTip({
//														content :  _funauth.noxxhb,
//														state : 'warn',
//														hideWaitTime : 5000
//													});
//													return false;
//												}
//												var xxhb=_funauth.parseCandidatesId(candidateArray);
//												$.bhTip({
//													content : '已提交至信息化办管理员'+_funauth.parseCandidatesName(candidateArray)+'，如有多位处理人，任一处理即可。',
//													state : 'success',
//													hideWaitTime : 5000
//												});
//												
//												formData.xxhb=xxhb;
//												formData.zxnode = 'xxhbshsq';
//												//	formData.xxhb='admin';
//											}
											if(sbfl == 'GL'){
												var candidateArray=_funauth.queryXxhbldCandidate();
												if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
													$.bhTip({
														content :  _funauth.noxxhb,
														state : 'warn',
														hideWaitTime : 5000
													});
													return false;
												}
												var xxhbld=_funauth.parseCandidatesId(candidateArray);
												$.bhTip({
													content : '已提交至信息化办领导'+_funauth.parseCandidatesName(candidateArray)+'，如有多位处理人，任一处理即可。',
													state : 'success',
													hideWaitTime : 5000
												});
												formData.xxhb = xxhb;
												//formData.xxhb=xxhb;
												formData.zxnode = 'xxhbshsq';
												//formData.zxnode = 'xxhbshsq';
												//	formData.xxhb='admin';
											}
										/*	if(sbfl == 'GL' && sqlx == '申请出口'){  //申请出口 提交至信息化办主任处审查
												
												var candidateArray=_funauth.queryXxhbCandidate();
												if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
													$.bhTip({
														content :  _funauth.noxxhb,
														state : 'warn',
														hideWaitTime : 5000
													});
													return false;
												}
												var xxhb=_funauth.parseCandidatesId(candidateArray);
												$.bhTip({
													content : '已提交至信息化办主任'+_funauth.parseCandidatesName(candidateArray)+'，如有多位处理人，任一处理即可。',
													state : 'success',
													hideWaitTime : 5000
												});
												formData.xxhbzr = xxhb
												//formData.xxhb=xxhb;
												formData.zxnode = 'xxhbzrcksh'
												//formData.zxnode = 'xxhbshsq';
											}*/
											
											if(sbfl == 'JX'){
												
												var candidateArray=_funauth.queryJwcCandidate();
												if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
													$.bhTip({
														content :  _funauth.xxhbdh,
														state : 'warn',
														hideWaitTime : 5000
													});
													return false;
												}
												var jwc =_funauth.parseCandidatesId(candidateArray);
												$.bhTip({
													content : '已提交至教务处管理员'+_funauth.parseCandidatesName(candidateArray)+'，如有多位处理人，任一处理即可。',
													state : 'success',
													hideWaitTime : 5000
												});
												
													formData.jwc= jwc;
													formData.zxnode = 'jwcsh'
//												formData.jwc= 'admin';
											}
											
											/*if(sbfl == 'KY' && sqlx =='申请'){
												formData.zxnode == 'kjcsh'
												var candidateArray=_funauth.queryKjcCandidate();
												if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
													$.bhTip({
														content :  _funauth.xxhbdh,
														state : 'warn',
														hideWaitTime : 5000
													});
													return false;
												}
												var kjc=_funauth.parseCandidatesId(candidateArray);
												$.bhTip({
													content : '已提交至科技处管理员'+_funauth.parseCandidatesName(candidateArray)+'，如有多位处理人，任一处理即可。',
													state : 'success',
													hideWaitTime : 5000
												});
												formData.zxnode = 'kjcsh'
												formData.kjc=kjc;										
											}*/
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
												formData.bhry = '申请单位负责人'	
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
									

								/*this.flow_comment= $('#shyj').val();
								return true;*/
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

								}
							});// 关闭当前弹窗
							 //重新统计数据
					        _sjtj.fzrsqshtj();
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