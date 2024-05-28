define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./xxhjcsssqBS');

	var viewConfig = {
		initialize : function(id,data, taskid, lx,nodeid,sqck,sfbj) {
			var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', 'form');

			$("#emapForm").emapForm({
				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
				data : mode,
				model : 't',
				cols : 2,
				autoColumn : true
			});
			
			// 显示申请类型、申请人、申请单位，不可编辑
			$("#emapForm [data-name=LX]").val(lx);
			$("#emapForm [data-name=SFRZH]").val(USERID);
			$("#emapForm [data-name=SFRZH]").attr("disabled", true);
		/*	var zgxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {
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
					$("#emapForm [data-name=SQDW]").jqxDropDownList('selectItem',
							zgdwxx.rows[0].DWDM);
				}
			}*/

			if(id!=null){
				if(lx=="托管服务器"){
					//CPU核心选择 
					var cpucx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'XNJCPU', SFSY:'1',pageNumber : 1,}); 
					var dataAdapter = new $.jqx.dataAdapter(cpucx.rows);
			        $('#emapForm [data-name=TGFWQ_CPU]').jqxComboBox({
			        	placeHolder: "请输入或选择CPU", 
			        	source: dataAdapter,
			        	displayMember: "ZDMC",
			        	valueMember: "ZDZ", 
			        	//itemHeight: 70,
			        	//height: 30, 
			        	//width: 270,
			            renderer: function (index, label, value) {
			                var datarecord = cpucx.rows[index];
			                return datarecord.ZDMC;
			            }
			        });
			        $("#emapForm [data-name=TGFWQ_CPU]").jqxComboBox('val', data.TGFWQ_CPU);
			      //内存选择 
					var nccx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'NC', SFSY:'1',pageNumber : 1,}); 
					var dataAdapter = new $.jqx.dataAdapter(nccx.rows);
			        $('#emapForm [data-name=TGFWQ_NC]').jqxComboBox({
			        	placeHolder: "请输入或选择内存", 
			        	source: dataAdapter,
			        	displayMember: "ZDMC",
			        	valueMember: "ZDZ", 
			        //	itemHeight: 70,
			        //	height: 30, 
			        //	width: 270,
			            renderer: function (index, label, value) {
			                var datarecord = nccx.rows[index];
			                return datarecord.ZDMC;
			            }
			        });
			        $("#emapForm [data-name=TGFWQ_NC]").jqxComboBox('val', data.TGFWQ_NC);
			        //品牌选择 
					var ppcx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'FWQPP', SFSY:'1',pageNumber : 1,}); 
					var dataAdapter = new $.jqx.dataAdapter(ppcx.rows);
			        $('#emapForm [data-name=TGFWQ_PPXH]').jqxComboBox({
			        	placeHolder: "请输入或选择品牌", 
			        	source: dataAdapter,
			        	displayMember: "ZDMC",
			        	valueMember: "ZDZ", 
			        //	itemHeight: 70,
			        //	height: 30, 
			        //	width: 270,
			            renderer: function (index, label, value) {
			                var datarecord = ppcx.rows[index];
			                return datarecord.ZDMC;
			            }
			        });
			        $("#emapForm [data-name=TGFWQ_PPXH]").jqxComboBox('val', data.TGFWQ_PPXH);
			      //操作系统选择 
					var czxtcx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'FWQCZXT', SFSY:'1',pageNumber : 1,}); 
					var dataAdapter = new $.jqx.dataAdapter(czxtcx.rows);
			        $('#emapForm [data-name=TGFWQ_CZXT]').jqxComboBox({
			        	placeHolder: "请输入或选择操作系统", 
			        	source: dataAdapter,
			        	displayMember: "ZDMC",
			        	valueMember: "ZDZ", 
			        //	itemHeight: 70,
			        //	height: 30, 
			        //	width: 270,
			            renderer: function (index, label, value) {
			                var datarecord = czxtcx.rows[index];
			                return datarecord.ZDMC;
			            }
			        });
			        $("#emapForm [data-name=TGFWQ_CZXT]").jqxComboBox('val', data.TGFWQ_CZXT);
				}
				if(lx == '虚拟机'){
					//cpu选择 
					var cpucx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'XNJCPU', SFSY:'1',pageNumber : 1,}); 
					var dataAdapter = new $.jqx.dataAdapter(cpucx.rows);
			        $('#emapForm [data-name=XNJ_CPU]').jqxComboBox({
			        	placeHolder: "请输入或选择cpu", 
			        	source: dataAdapter,
			        	displayMember: "ZDMC",
			        	valueMember: "ZDZ", 
			       // 	itemHeight: 70,
			       // 	height: 30, 
			       // 	width: 270,
			            renderer: function (index, label, value) {
			                var datarecord = cpucx.rows[index];
			                return datarecord.ZDMC;
			            }
			        });
			        
			     //   $("#emapForm [data-name=XNJ_CPU]").jqxDropDownList('selectItem',data.XNJ_CPU);
			        $("#emapForm [data-name=XNJ_CPU]").jqxComboBox('val', data.XNJ_CPU);
			        
			        
			      //内存选择 
					var nccx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'NC', SFSY:'1',pageNumber : 1,}); 
					var dataAdapter = new $.jqx.dataAdapter(nccx.rows);
			        $('#emapForm [data-name=XNJ_NC]').jqxComboBox({
			        	placeHolder: "请输入或选择内存", 
			        	source: dataAdapter,
			        	displayMember: "ZDMC",
			        	valueMember: "ZDZ", 
			       // 	itemHeight: 70,
			        //	height: 30, 
			        //	width: 270,
			            renderer: function (index, label, value) {
			                var datarecord = nccx.rows[index];
			                return datarecord.ZDMC;
			            }
			        });
			        $("#emapForm [data-name=XNJ_NC]").jqxComboBox('val', data.XNJ_NC);
			        //操作系统选择 
					var czxtcx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'XNJCZXT', SFSY:'1',pageNumber : 1,}); 
					var dataAdapter = new $.jqx.dataAdapter(czxtcx.rows);
			        $('#emapForm [data-name=XNJ_CZXT]').jqxComboBox({
			        	placeHolder: "请输入或选择操作系统", 
			        	source: dataAdapter,
			        	displayMember: "ZDMC",
			        	valueMember: "ZDZ", 
			       // 	itemHeight: 70,
			       // 	height: 30, 
			        //	width: 270,
			            renderer: function (index, label, value) {
			                var datarecord = czxtcx.rows[index];
			                return datarecord.ZDMC;
			            }
			        });
			        $("#emapForm [data-name=XNJ_CZXT]").jqxComboBox('val', data.XNJ_CZXT);
			      //数据硬盘选择 
					var sjypcx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'XNJSJYP', SFSY:'1',pageNumber : 1,}); 
					var dataAdapter = new $.jqx.dataAdapter(sjypcx.rows);
			        $('#emapForm [data-name=XNJ_SJYP]').jqxComboBox({
			        	placeHolder: "请输入或选择数据硬盘", 
			        	source: dataAdapter,
			        	displayMember: "ZDMC",
			        	valueMember: "ZDZ", 
			      //  	itemHeight: 70,
			       // 	height: 30, 
			       // 	width: 270,
			            renderer: function (index, label, value) {
			                var datarecord = sjypcx.rows[index];
			                return datarecord.ZDMC;
			            }
			        });
			        $("#emapForm [data-name=XNJ_SJYP]").jqxComboBox('val', data.XNJ_SJYP);
				}
			}

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
						$("#emapForm [data-name=EMAIL]").attr("disabled", true);
					}
					
				}
			}else{
				if (sqck == 'sqck') {
					data.CK_SFYSQCK='1';
					$("#emapForm [data-name=CK_SFYSQCK]").jqxSwitchButton({ disabled:true });
				}
				
				$("#emapForm").emapForm("setValue", data);
				if(data.CK_SFYSQCK=='是')
					$("#emapForm [data-name=CK_SFYSQCK]").jqxSwitchButton('val', false);
			}
			
			
			// 根据申请类型，隐藏其他类型字段，并添加该类型下的必填项
			_emapShowItem.showItemByLx(lx, nodeid);
			
			
			if(lx == '虚拟机'){
				$("#emapForm").emapForm(
						'disableItem',
						[ 'MC','YT',  'EMAIL']);
			}
			if(lx == '托管服务器'){
				$("#emapForm").emapForm(
						'disableItem',
						[ 'MC','YT','EMAIL']);
				 $(".bh-file-img-info").text('请上传服务器正面照片，以识别服务器品牌及样式, 支持JPG,JPEG,PNG类型。')
			}
			if(sfbj != 'bj'){
				$("#emapForm [data-name=CK_DKH]").val(null)//把出口端口号置空
			}
			
			$("#emapForm [data-name=CK_SFYSQCK]").parent().parent().css("display","block");
			$("#emapForm [data-name=QTSM]").parent().parent().parent().addClass("bh-col-md-6")
    	    $("#emapForm [data-name=QTSM]").parent().parent().parent().removeClass("bh-col-md-12")
			$("#emapForm [data-name=CK_SFYSQCK]").on(
					'change',
					function(event) {
						if (event.args.check== true) {
							$("#emapForm [data-name=CK_DKH]").parent().parent()
									.parent().parent().parent().css("display",
											"block");
							$("#emapForm [data-name=CK_DKH]").parent().parent()
							.css("display",
									"block");
							$("#emapForm [data-name=CK_DKH]").parent().parent().parent().addClass("bh-col-md-12")
				    	    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().removeClass("bh-col-md-6")
							_emapShowItem.addRequired("CK_DKH");
						}else{
							$("#emapForm [data-name=CK_DKH]").parent().parent()
							.parent().parent().parent().css("display",
									"none");
							_emapShowItem.removeRequired("CK_DKH");
						}
					});
			
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
						if (type.id == "processStatus") {
							return true;
						} 
						else {
							if ($("#emapForm").emapValidate('validate')) {
								var formData = $("#emapForm").emapForm(
										"getValue");
								this.formdata = formData;
								if(type.id=='draft'){
									$.bhTip({
										content : '申请出口不能进行暂存',
										state : 'danger',
										hideWaitTime : 2000
									});
									return false
								}else{
									var self = this
									BH_UTILS.bhDialogWarning({
										 title:'提示',
										 content:'确定提交当前申请？',
										 buttons:[
										       {
										       text:'确定',
										      callback:function(){
								
										if(sfbj != 'bj'){																																				
												formData.ZT = 3
												formData.SQLX='申请出口';										
												formData.WID= '';	
										}	
									
										var jzdateStr=formData.YXQ;
										jzdateStr=jzdateStr.replace(/-/g,'/'); 
										formData.YXQ=new Date(jzdateStr).getTime();

										
										 var candidateArray=_funauth.queryXxhfgldSimple('信息化联络员',data.SQDW,'xxhjcsssq');
										if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
											$.bhTip({
												content : _funauth.noxxhlly,
												state : 'warn',
												hideWaitTime : 5000
											});
											return false;
										}
									//	var xxhlly=_funauth.newparseCandidatesId(candidateArray);
										 var  xxhlly=_funauth.parseCandidatesIdliyi(candidateArray);
										
										$.bhTip({
											content : '已提交至本单位信息化联络员'+_funauth.newparseCandidatesName(xxhlly)+'，如有多位处理人，任一处理即可。',
											state : 'success',
											hideWaitTime : 5000
										});
										$("#emapForm").emapForm("saveUpload");//上传附件时使用
										formData.xxhlly=xxhlly;
										//formData.xxhlly='admin'
										  this.flow_comment="出口申请";
										//删除原来的数据
										if(sfbj != 'bj'){
											bs.del({
												WID : id
											}).done(function(data) {});
										}
										$("#emapForm").emapForm("saveUpload");//上传附件时使用
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
												
											}  else {
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
							//重新统计数据
		        	        _sjtj.jcsssqtj();
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
					flowStatus =  $('[data-action=query].bh-active').attr('queryType');
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