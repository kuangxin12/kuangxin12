define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./xxhllynsBS');

	var viewConfig = {
		initialize : function(id,data,taskid) {
			var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'T_XXB_XXHJCSS_NS_QUERY', 'form');

			$("#emapForm").emapForm({
				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
				data : mode,
				model : 't',
				cols : 2,
				autoColumn : true,
				readonly:true
			});
			 $("#emapForm [data-name=TJSJ]").parent().parent().css("display", "block");
			   $("#emapForm [data-name=TJSJ]").parent().parent().parent().addClass("bh-col-md-12")
      	   $("#emapForm [data-name=TJSJ]").parent().parent().parent().removeClass("bh-col-md-6")
			 $("#emapForm").emapForm("setValue", data.rows[0]);

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
	            
	            
	            
			   
			 var jcssarr = data.rows[0].WLJCSSWID.split(',');
	            for(i=0;i<jcssarr.length;i++){
	            	var zk = false
	  	               if(i==0){
	  	            	 zk = true
	  	               }
	          	  $("#collapse").append("<div id='collapse"+i+"' style='margin-bottom:10px;'></div>"  )
	           var jcssxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'nsshjcssxx', {PWID:jcssarr[i],pageNumber:1});
	          	 if(jcssxx.totalSize<=0){
 	          		  //如果没找到数据则进行下一次
 	          		continue;
 	          	  }
	              var defaultDta = {
	              	 data: [{             		 
	              		  title: jcssxx.rows[0].MC+"<span style='font-size:8px;'>(点击展开/收起)</span>",
	              	     content: [            	               
	              	          {
	              	        // title: '基础设施信息',
	              	         content: "<div id='jbxxForm"+i+"'></div>"
	              	        }
	              	        
	              	        ],
	              	      extend: zk,
	              	        attrs:{
	              	           id: 'aaa'
	              	        }
	              	    }],
	              	    // 展开节点的回调
	              	    // data.node 被展开的节点
	              	    nodeExtend: function(data) {
	              	        var $node = data.node;
	              	        var attributes = data.attrs;
	              	    },
	              	    // 收缩节点的回调
	              	    // data.node 被收缩的节点
	              	    nodeCollapse: function(data) {
	              	        var $node = data.node;
	              	    },
	              	    // 创建完成的回调
	              	    ready: function() {
	              	    }
	              	};         
	              	$("#collapse"+i).bhCollapse(defaultDta); 
	              	 var jbxxmode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'nsshjcssxx', 'form');
	                   $("#jbxxForm"+i).emapForm({
	                   	root:WIS_EMAP_SERV.getContextPath(),//附件上传时必备属性
	                       data: jbxxmode,
	                       model: 'h',
	                       cols:2,
	                       autoColumn : true,
	                       readonly:true
	                   });
	              	 $("#jbxxForm"+i).emapForm("setValue", jcssxx.rows[0]);
	              	if(jcssxx.rows[0].LX=="虚拟机"){
	              		 $("#jbxxForm"+i+" [data-name=TGFWQ_PPXH]").parent().parent()
	   	    			.css("display", "none");
	              		 $("#jbxxForm"+i+" [data-name=TGFWQ_NC]").parent().parent()
	    	    			.css("display", "none");
	              		 $("#jbxxForm"+i+" [data-name=TGFWQ_XH]").parent().parent()
	    	    			.css("display", "none");
	              		 $("#jbxxForm"+i+" [data-name=TGFWQ_CZXT]").parent().parent()
	    	    			.css("display", "none");
	              		 $("#jbxxForm"+i+" [data-name=TGFWQ_CPU]").parent().parent()
	     	    			.css("display", "none");
	              		 $("#jbxxForm"+i+" [data-name=TGFWQ_IP]").parent().parent()
		  	    			.css("display", "none");
	              	 }
	              	 if(jcssxx.rows[0].LX=="托管服务器"){
	              		 $("#jbxxForm"+i+" [data-name=XNJ_CZXT]").parent().parent()
	   	    			.css("display", "none");  
	              		 $("#jbxxForm"+i+" [data-name=XNJ_CPU]").parent().parent()
	    	    			.css("display", "none");  
	              		 $("#jbxxForm"+i+" [data-name=XNJ_NC]").parent().parent()
	 	    			.css("display", "none"); 
	              		$("#jbxxForm"+i+" [data-name=XNJ_SJYP]").parent().parent()
	 	    			.css("display", "none"); 
	              		 $("#jbxxForm"+i+" [data-name=XNJ_IP]").parent().parent()
		  	    			.css("display", "none");
	              	 }
	              	 
	            }
	            $("#collapse0").children().children().last().css('height', '264px');
			$("#shyjdiv").css('display','block');
			var flow = new Vue({
				el : '#app',
				data : function() {
					return {
						formdata : {},
						flow_comment : "",
						defkey : "xxhjcssgl.ns",
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
					//	console.log("save js---> type=" + type);
						if (type.id == "processStatus") {
							return true;
						} else {
					//		if (data!=null&&data!=undefined&&data.WID!=null) {
								if ($("#emapForm").emapValidate('validate')) {
								var formData = $("#emapForm").emapForm(
										"getValue");
								this.formdata = formData;
								if(type.id=="submit"){
									var self = this
									 this.flow_comment= $('#shyj').val();
									BH_UTILS.bhDialogWarning({
										 title:'提示',
										 content:'确定通过本次年审？',
										 buttons:[
										       {
										       text:'确定',
										      callback:function(){
													formData.SH=1;
												//	 var candidateArray=_funauth.newqueryXxhfgldCandidate(data.rows[0].SQR);
													 var candidateArray=_funauth.queryXxhfgldSimple('部门信息化分管领导',bghglyDw,'xxhllyns');
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
										 content:'确定驳回本次年审？',
										 buttons:[
										       {
										       text:'确定',
										      callback:function(){
													formData.SH=0;
													/*for(i=0;i<jcssarr.length;i++){
														 var ztparams = { 
									 					    	//PWID : jbxxdata.rows[0].WID,
																PWID:jcssarr[i],	 
									 					    	ZT : 10,//年审未通过
													    		 }; 
													    		 $.ajax({
													    			url:'../modules/xxhllyns/xgzt.do',  //修改更新
													    			type:'post',
													    			data:ztparams,
													    			async:false,
													    			cache : true,
													    			success:function(data){  				    				    								
													    			}
													    		 });
														  }*/
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
										    	  
										    	  $.ajax({
					    				    			url:'../modules/xxhllyns/T_XXB_XXHJCSS_NS_MODIFY.do',  //修改更新
					    				    			type:'post',
					    				    			data:{
					    				    				WID : id,
							    					    	ZT : 0
					    				    			},
					    				    			async:false,
					    				    			cache : true,
					    				    			success:function(data){  				    				    								
					    				    			}
					    				    		 });
										    	  
													for(i=0;i<jcssarr.length;i++){
														 var ztparams = { 
									 					    	//PWID : jbxxdata.rows[0].WID,
																PWID:jcssarr[i],	 
									 					    	ZT : 5,//年审未通过
													    		 }; 
													    		 $.ajax({
													    			url:'../modules/xxhllyns/xgzt.do',  //修改更新
													    			type:'post',
													    			data:ztparams,
													    			async:false,
													    			cache : true,
													    			success:function(data){  				    				    								
													    			}
													    		 });
														  }
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
									
								
								/* this.flow_comment= $('#shyj').val();

								return true;*/
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
		            	          close:function() {
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
		            	        });//关闭当前弹窗
							//统计数据
							  _sjtj.llynsshtj();
						}
					}
				}
			});
		},
	};
	return viewConfig;
});