define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./xxhllygbshBS');

    var viewConfig = {
        initialize: function(data,id,taskid,lx,cksq) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'gbssjbxx', 'form');
            $("#emapForm").emapForm({
                root:WIS_EMAP_SERV.getContextPath(),//附件上传时必备属性
                data: mode,
                model: 'h',
                cols:2,
                autoColumn : true,
                readonly:true       	
            });
            
            var sqrInfo = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {ZGH : data.rows[0].SQR,pageSize : 1,pageNumber : 1,});        
            
            var dwxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_ZXBZ_DW_QUERY', {//判断是否为3级单位
				pageSize : 100,
				pageNumber : 1,
				DM : sqrInfo.rows[0].SZDWDM
			});
            var bghglyDw=null
			if(dwxx.rows.length>0&&dwxx.rows[0].CC=='3'){
				 bghglyDw = dwxx.rows[0].LS;
			}else{
				 bghglyDw = sqrInfo.rows[0].SZDWDM;
			}
			console.log(bghglyDw)
            
            
            
            
            if (lx == "虚拟机"){
            	$("#emapForm [data-name=TGFWQ_PPXH]").parent().parent()
    			.parent().parent().css("display", "none");
            	if (cksq == '否' || cksq == '0'){
            		$("#emapForm [data-name=CK_IP]").parent().parent()
        			.parent().parent().css("display", "none");
            	}     
            	
            } else if (lx == "托管服务器") {
            	$("#emapForm [data-name=XNJ_NC]").parent().parent()
    			.parent().parent().css("display", "none");

            	if (cksq == '否' || cksq == '0'){
            	$("#emapForm [data-name=CK_IP]").parent().parent()
    			.parent().parent().css("display", "none");
            	}
            	
            }
            if(data.rows[0].CK_SFYSQCK=='是'){
            	data.rows[0].CK_SFYSQCK='1';
				$("#emapForm [data-name=CK_SFYSQCK]").val('1');
			}
            
            if(data.rows[0].CK_SFYSQCK=='否'){
            	data.rows[0].CK_SFYSQCK='0';
				$("#emapForm [data-name=CK_SFYSQCK]").val('0');
			}
            $("#emapForm").emapForm("setValue", data);
            
            $("#shyjdiv").css('display','block');
            $("#flow").css("display", "none");
            
            var flow = new Vue({
				el : '#app',
				data : function() {
					return {
						formdata : {},
						flow_comment : "",
						defkey : "xxhjcssgl.xxhjcssgb",
						taskid : taskid
					};
				},
				methods : {
					btnclick : function(type, result) {
				/*		console.log("save js---> type=" + type);*/
						if (type.id == "processStatus") {
							return true;
						} else {
						//	if ($("#emapForm").emapValidate('validate')) {
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
													/*var candidateArray=_funauth.newqueryXxhfgldCandidate(data.rows[0].SQR);
													if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
														$.bhTip({
															content :  _funauth.nodwfzr,
															state : 'warn',
															hideWaitTime : 5000
														});
														return false;
													}
													var bmld=_funauth.newparseCandidatesId(candidateArray);
													$.bhTip({
														content : '已提交至本单位负责人'+_funauth.newparseCandidatesName(bmld)+'，如有多位处理人，任一处理即可。',
														state : 'success',
														hideWaitTime : 5000
													});
													*/
													 var candidateArray=_funauth.queryXxhfgldSimple('部门信息化分管领导',bghglyDw,'xxhllygbsh');
														if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
															$.bhTip({
																content :  _funauth.nodwfzr,
																state : 'warn',
																hideWaitTime : 5000
															});
															return false;
														}
														 var  bmld=_funauth.parseCandidatesIdliyi(candidateArray);
														$.bhTip({
															content : '已提交至本单位负责人'+_funauth.newparseCandidatesName(bmld)+'，如有多位处理人，任一处理即可。',
															state : 'success',
															hideWaitTime : 5000
														});
													formData.bmld=bmld;
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
													formData.bhry = '申请单位信息化联络员'
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
									BH_UTILS.bhDialogWarning({
										 title:'提示',
										 content:'确定不通过本次申请？',
										 buttons:[
										       {
										       text:'确定',
										      callback:function(){
												 var ztparams = {
															WID : data.rows[0].WID,
									    					ZT : 10 
								    				     }; 
								    				     $.ajax({
								    				    	url:'../modules/xxhllygbsh/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
								    				    	type:'post',
								    				    	data:ztparams,
								    				    	async:false,
								    				    	cache : true,
								    				    	success:function(data){  				    				    								
								    				    	}
								    				   });
												
												formData.SH=2;
												formData.cllx = '未通过'
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
								
								/* this.flow_comment= $("#sh-yj").val();

								return true;*/
							/*} else {
								return false;
							}*/
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
							//统计数据
							  _sjtj.llygbshtj();
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