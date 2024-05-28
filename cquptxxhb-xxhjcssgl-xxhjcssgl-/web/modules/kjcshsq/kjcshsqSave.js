define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./kjcshsqBS');

	var viewConfig = {
		initialize : function(id,data,  taskid, lx,node,sqlx) {
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

			if(id!=null &&id!=undefined){
				if(data.CK_SFYSQCK=='是'){
					data.CK_SFYSQCK='1';
					$("#emapForm [data-name=CK_SFYSQCK]").val('1');
				}
				
				$("#emapForm").emapForm("setValue", data);
			}
			
			// 根据申请类型，隐藏其他类型字段，并添加该类型下的必填项
			_emapShowItem.showItemByLx(lx, node);

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
						/*console.log("save js---> type=" + type);*/
						if (type.id == "processStatus") {
							return true;
						} else {
							if (data!=null&&data!=undefined&&data.WID!=null) {
								var formData = $("#emapForm").emapForm(
								"getValue");
								this.formdata = formData;
								if(type.id=="submit"){
									formData.SH=1;
									if(sqlx == '申请'){									
										formData.lx = '申请'
									}
									if(sqlx == '年审'){									
										formData.lx = '年审'
									}
									
									var candidateArray=_funauth.queryXxhbCandidate();
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
										content : '已提交至信息化办管理员'+_funauth.parseCandidatesName(candidateArray)+'，如有多位处理人，任一处理即可。',
										state : 'success',
										hideWaitTime : 5000
									});
									formData.xxhb=xxhb;
									
									
								}
								else if(type.id=="turnback"){
									formData.SH=0;
									formData.bhry = '科技处'										
								}
									
								else if(type.id=="termination"){
									if(sqlx == '申请'){									
										formData.ZT=0
										formData.cllx = '申请未通过' 
									}
									if(sqlx == '年审'){									
										formData.ZT=5
										formData.cllx = '年审未通过'  
									}
								}
									

								this.flow_comment= $('#shyj').val();
								return true;
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
					        _sjtj.kjcsqshtj();
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