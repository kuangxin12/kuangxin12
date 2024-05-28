define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./xxhbnsBS');

	var viewConfig = {
		initialize : function(id, data, taskid) {
			var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'T_XXB_XXHJCSS_NS_QUERY', 'form');

			$("#emapForm").emapForm({
				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
				data : mode,
				model : 't',
				cols : 2,
				autoColumn : true,
				readonly:true
			//	readonly : (lx == '托管服务器' ? false : true)
			});
				$("#emapForm").emapForm("setValue", data.rows[0]);
				 $("#emapForm [data-name=TJSJ]").parent().parent().css("display", "block");
  			   $("#emapForm [data-name=TJSJ]").parent().parent().parent().addClass("bh-col-md-12")
	        	   $("#emapForm [data-name=TJSJ]").parent().parent().parent().removeClass("bh-col-md-6")

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
							 if ($("#emapForm").emapValidate('validate')) {
//							if (data != null && data != undefined&& data.WID != null) {
								var formData = $("#emapForm").emapForm(
										"getValue");
								this.formdata = formData;
								if (type.id == "submit"){
									var self = this
									 this.flow_comment= $('#shyj').val();
									BH_UTILS.bhDialogWarning({
										title:'通过确认',
										content:'确认年审通过？通过后不可撤回！',
							            buttons:[
				    						{
				    						 text:'确定',
				    						 callback:function(){
												formData.cllx = '已通过'  //处理类型
											
													 $.ajax({
											    			url:'../modules/xxhbns/T_XXB_XXHJCSS_NS_MODIFY.do',  //修改更新
											    			type:'post',
											    			data:{
											    				WID : id,
									    					    ZT : 10
											    			},
											    			async:false,
											    			cache : true,
											    			success:function(data){  				    				    								
											    			}
											    		 });	
													
													
											   for(i=0;i<jcssarr.length;i++){
												 var jbxxdata = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {PWID:jcssarr[i],pageNumber:1}); 
												 var currDate = new Date();
													var yxq=new Date();
													yxq.setHours( 23, 59, 59,0);

													if (currDate.getMonth() < 11) {
														yxq.setFullYear(currDate.getFullYear(),11,31);
													} else {
														yxq.setFullYear(currDate.getFullYear()+1,11,31);
													}
												//	var xgyxq =yxq.getTime();//修改有效期
													Date.prototype.Format = function (fmt) {
													    var o = {
													            "M+": this.getMonth() + 1, // 月份
													            "d+": this.getDate(), // 日
													            "h+": this.getHours(), // 小时
													            "m+": this.getMinutes(), // 分
													            "s+": this.getSeconds(), // 秒
													            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
													            "S": this.getMilliseconds() // 毫秒
													    };
													    if (/(y+)/.test(fmt))
													        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
													    for (var k in o)
													        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
													    return fmt;
													}
													
													var gsyxq = new Date(yxq).Format('yy-MM-dd hh:mm:ss');	
													gsyxq = gsyxq.replace(/-/g,'/'); 
													 var xgyxq =new Date(gsyxq).getTime();
													
													
												 var ztparams = { 
					    					    	WID : jbxxdata.rows[0].WID,
					    					    	YXQ : xgyxq,
													ZT:10
				    				    		 }; 
				    				    		 $.ajax({
				    				    			url:'../modules/xxhbns/yxqxg.do',  //修改更新
				    				    			type:'post',
				    				    			data:ztparams,
				    				    			async:false,
				    				    			cache : true,
				    				    			success:function(data){  				    				    								
				    				    			}
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
									
								else if (type.id == "turnback"){
									var self = this
									 this.flow_comment= $('#shyj').val();
									BH_UTILS.bhDialogWarning({
										 title:'提示',
										 content:'确定驳回本次年审？',
										 buttons:[
										       {
										       text:'确定',
										      callback:function(){
													formData.bhry = '信息化办'; //驳回人员
													formData.SH = 0;
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
											    			url:'../modules/xxhbns/T_XXB_XXHJCSS_NS_MODIFY.do',  //修改更新
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
													    			url:'../modules/xxhbns/xgzt.do',  //修改更新
													    			type:'post',
													    			data:ztparams,
													    			async:false,
													    			cache : true,
													    			success:function(data){  				    				    								
													    			}
													    		 });
														  }
													formData.SH = 2;
													formData.cllx = '未通过'  //处理类型
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
										//统计数据
										  _sjtj.xxhbnsshtj();
		            	          }
		            	        });//关闭当前弹窗
						}
					}
				}
			});
		},
	};
	return viewConfig;
});