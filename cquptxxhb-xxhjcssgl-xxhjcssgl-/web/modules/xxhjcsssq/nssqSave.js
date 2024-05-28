define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./xxhjcsssqBS');

	var viewConfig = {
		initialize : function(id,data, taskid, lx, nodeid, sqck,ns,proid) {
			var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,'jcsszxnscx', 'form');
			
			$("#emapForm").emapForm({
				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
				data : mode,
				model : 't',
				cols : 2,
				autoColumn : true
			});
		
			// 显示申请类型、申请人、申请单位，不可编辑
			$("#emapForm [data-name=LX]").val(lx);
			$("#emapForm [data-name=LX]").attr("disabled", true);
			$("#emapForm [data-name=TGFWQ_NC]").attr("disabled", true);
			$("#emapForm [data-name=XNJ_CPU]").attr("disabled", true);
			$("#emapForm [data-name=TGFWQ_CPUHX]").attr("disabled", true);
			$("#emapForm [data-name=TGFWQ_CPUZP]").attr("disabled", true);
			$("#emapForm [data-name=TGFWQ_CPUSL]").attr("disabled", true);
		
			$("#emapForm [data-name=SFRZH]").val(USERID);
			$("#emapForm [data-name=SFRZH]").attr("disabled", true);
			var zgxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {
				pageSize : 1,
				pageNumber : 1,
				ZGH : USERID
			});
			if (zgxx.totalSize > 0) {
				$("#emapForm [data-name=GLYXM]").val(zgxx.rows[0].XM);
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

			$("#emapForm [data-name=GLYXM]").attr("disabled", true);
			$("#emapForm [data-name=SQDW]").jqxDropDownList({
				disabled : true
			});
			
			
			if (id == null || id == undefined) {
				if (USERID != null || USERID != "") {
					var mail = WIS_EMAP_SERV.getData(bs.api.pageModel,
							'T_MAILMAINTAIN_INFO_QUERY', {
								pageSize : 100,
								pageNumber : 1,
								USERID : USERID
							});
					if (mail.totalSize > 0) {
						$("#emapForm [data-name=EMAIL]").val(
								mail.rows[0].MAILACC);
					}
					
				}
			}
			else{
				
				$("#emapForm").emapForm("setValue", data);
				if(data.CK_SFYSQCK=='是')
					$("#emapForm [data-name=CK_SFYSQCK]").jqxSwitchButton('val', true);
				else
					$("#emapForm [data-name=CK_SFYSQCK]").jqxSwitchButton('val', false);
			}
			
			// 根据申请类型，隐藏其他类型字段，并添加该类型下的必填项
			_emapShowItem.showItemByLx(lx, nodeid);
			
			
			$("#emapForm").emapForm(
				'disableItem',
				[ 'MC','YT','XNJ_CZXT','SBFL','CK_SFYSQCK','EMAIL','CK_DKH']);
			
			$("#emapForm [data-name=CK_SFYSQCK]").on(
					'change',
					function(event) {
						if (event.args.check== true) {
							$("#emapForm [data-name=CK_DKH]").parent().parent()
									.parent().parent().parent().css("display",
											"block");
							_emapShowItem.addRequired("CK_DKH");
						}else{
							$("#emapForm [data-name=CK_DKH]").parent().parent()
							.parent().parent().parent().css("display",
									"none");
							_emapShowItem.removeRequired("CK_DKH");
						}
					});
			var slsc = true
			if(proid == 'null'){
				 slsc = false				
			}
			
			
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
					btnfilter: function(btns, that) {
						var that = this
					    btns.pop();
						return btns;
					},
					btnclick : function(type, result) {
						console.log("save js---> type=" + type);
						if (type.id == "processStatus") {
							return true;
						} else {
							if ($("#emapForm").emapValidate('validate')) {
								var formData = $("#emapForm").emapForm(
										"getValue");
							
								this.formdata = formData;
								// this.flow_comment= formData.SHYJ;
								if(type.id=='draft'){
									$.bhTip({
										content : '年审不能进行暂存',
										state : 'danger',
										hideWaitTime : 2000
									});
									return false
								}
										/*if(slsc){
												var params = { 
														isDelete:true,
														processInstanceId:proid,
														appName:'xxhjcssgl'
										  				}; 
										  		$.ajax({
										  			url:WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/tasks/deleteInstance.do',
										  			type:'post',
										  			data:params,
										  			async:false,
										  			cache : true,
										  			success:function(response) {
										  				var pd = $.parseJSON(response);
														if(pd.succeed){   
															console.log('删除流程成功')				
													}else{
														console.log('删除流程失败')														 
														}
										  			}
											})
										}*/
								
								      
								       formData.lx = '年审'
										var jbxxData=formData;
										var wid=formData.WID;
									//	jbxxData.WID=formData.WLJCSSWID;									
									//	jbxxData.YXQ=formData.NSJZRQ;
									//  BH_UTILS.doAjax('../modules/nssq/T_XXB_XXHJCSS_JBXX_SAVE.do', jbxxData);
										formData.YXQ = formData.NSJZRQ;
										formData.ZT = 4
										formData.SQLX='年审';
										formData.WID = wid
									//	formData.WID= '';
										
										var jzdateStr=data.YXQ;
										jzdateStr=jzdateStr.replace(/-/g,'/'); 
										this.formdata.YXQ=new Date(jzdateStr).getTime();
										
		
										var candidateArray= _funauth.queryXxhllyCandidate();									
										if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
											$.bhTip({
												content : _funauth.xxhbdh,
												state : 'warn',
												hideWaitTime : 5000
											});
											return false;
										}
										var xxhlly=_funauth.parseCandidatesId(candidateArray);
										$.bhTip({
											content : '已提交至'+_funauth.parseCandidatesName(candidateArray)+'，如有多位处理人，任一处理即可。',
											state : 'success',
											hideWaitTime : 5000
										});
										formData.xxhlly=xxhlly;
										//删除原来的数据
										bs.del({
											WID : id
										}).done(function(data) {});
										
								return true;
							} else {
								return false;
							}
						}
					},
					action_complete : function(type, result) {
						if (type === "processStatus") {
						} else {
							// 重新加载数据
							$.bhPaperPileDialog.hide({
								close : function() {
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
							});// 关闭当前弹窗
						}
					}
				}
			});
		},
		save : function() {
			if ($("#emapForm").emapValidate('validate')) {
				var formData = $("#emapForm").emapForm("getValue");
				// $("#emapForm").emapForm("saveUpload");//上传附件时使用
				bs.save(formData).done(function(data) {
					alert("数据保存成功");
					var searchData = $('#emapAdvancedQuery').emapAdvancedQuery(
					'getValue');
					flowStatus = $('[data-action=query].bh-active').attr('queryType');
					if (flowStatus == "") {
						$('#emapdatatable').emapdatatable('reload', {
							querySetting : searchData
						});
					} else {
						$('#emapdatatable').emapdatatable('reload', {
							querySetting : searchData,
							flowStatus : flowStatus
						});
					}
					$.bhPaperPileDialog.hide();// 关闭当前弹窗
				});
			}
		},

	};
	return viewConfig;
});