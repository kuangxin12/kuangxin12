define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./nssqBS');

	var viewConfig = {
		initialize : function(data,id,taskid,jcssid,flowstatus) {
			/*var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'T_XXB_XXHJCSS_NS_QUERY', 'form');*/
			var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'nssqbd', 'form');

			$("#emapForm").emapForm({
				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
				data : mode,
				model : 't',
				cols : 2,
				autoColumn : true
			});
		/*	var jzdateStr= 1577807999000 ;
			jzdateStr=jzdateStr.replace(/-/g,'/'); 
			var NSJZRQ=new Date(jzdateStr).getTime();*/

			var myDate = new Date;
			var year = myDate.getFullYear(); //获取当前年
			var mon = myDate.getMonth() + 1; //获取当前月
			var date = myDate.getDate(); //获取当前日
			
			var sqrInfo = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {ZGH : USERID,pageSize : 1,pageNumber : 1,});            
            
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
		//	console.log(bghglyDw)
			
			
			// 设置申请人并不可编辑
			$("#emapForm [data-name=SQRY]").val(USERNAME);
			$("#emapForm [data-name=SQRY]").attr("disabled", true);		
			// 设置年审年度并不可编辑
			$("#emapForm [data-name=NSND]").val(year);
			$("#emapForm [data-name=NSND]").attr("disabled", true);	
			// 设置年审截止日期并不可编辑
			//var nsFormData={};
			var currDate = new Date();
			var yxq=new Date();
			yxq.setHours( 23, 59, 59,0);

			if (currDate.getMonth() < 12) {
				yxq.setFullYear(currDate.getFullYear(),11,31);
			} else {
				yxq.setFullYear(currDate.getFullYear()+1,11,31);
			}
		//	nsFormData.NSND=currDate.getFullYear();
		//	nsFormData.NSJZRQ=yxq.getTime();
			var jzrqsjc = yxq.getTime();
			//时间戳转换指定时间格式
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
			
			var jzrq = new Date(jzrqsjc).Format('yy-MM-dd hh:mm:ss');
			
			$("#emapForm [data-name=NSJZRQ]").val(jzrq);
			$("#emapForm [data-name=NSJZRQ]").attr("disabled", true);
			
		var jcssxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'nsjcsscx', {SFRZH : USERID,pageSize : 1000,pageNumber : 1,}); 
		
		
		
			if (id != null || id != undefined) {
				 jcssidarr = jcssid.split(',')
	                for(i=0;i<jcssidarr.length;i++){
	                   var jcssdrop = WIS_EMAP_SERV.getData(bs.api.pageModel, 'nsjcsscx', {PWID : jcssidarr[i],ZT:6,pageSize : 1,pageNumber : 1,});
	                   if(jcssdrop.rows[0].ZT == 6){
	                	   jcssxx.rows.push(jcssdrop.rows[0])
	                   }
	                }
			}
			//多选卡片---star
        	for(i=0;i<jcssxx.rows.length;i++){
        		
        		var dqip
            	if(jcssxx.rows[i].LX == "虚拟机"){
            		dqip = jcssxx.rows[i].XNJ_IP
            	}else if(jcssxx.rows[i].LX == "托管服务器"){
            		dqip = jcssxx.rows[i].TGFWQ_IP
            	}
        		//选中 sc-active
        		$("#test").append("<div class='sc-panel-thingNoImg-1  sc-default bh-mh-8'  style='margin-bottom:10px'><label>"+
						"<div class='sc-panel-thingNoImg-1-container bh-animate-all bh-animate-fast'>"+
						 " <div class='sc-panel-thingNoImg-1-description'>"+
							"<input type='checkbox'name='checkbox' class='checkbox'  value='"+jcssxx.rows[i].PWID+"' style = 'float:left;display: none;' >"+
							 "<div class='sc-panel-thingNoImg-1-header'>"+
							 "<div title="+jcssxx.rows[i].MC+" class='sc-panel-thingNoImg-1-title' style = ' width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>"+jcssxx.rows[i].MC+"</div>"+
							"</div>"+
							"<div class='sc-panel-thingNoImg-1-subject'>"+
							   " <div class='sc-panel-thingNoImg-1-subjectKey sc-width-50'>类型</div>"+
							    "<div class='sc-panel-thingNoImg-1-subjectValue'>"+jcssxx.rows[i].LX+"</div>"+
							"</div>"+
							"<div class='sc-panel-thingNoImg-1-subject'>"+
							   " <div class='sc-panel-thingNoImg-1-subjectKey sc-width-50'>有效期</div>"+
							    "<div class='sc-panel-thingNoImg-1-subjectValue'>"+jcssxx.rows[i].YXQ+"</div>"+
							"</div>"+	
							"<div class='sc-panel-thingNoImg-1-subject' style = 'width: 100%;white-space: nowrap;overflow: hidden'>"+
							   " <div class='sc-panel-thingNoImg-1-subjectKey sc-width-50' >IP地址</div>"+
							    "<div   title="+dqip+" class='sc-panel-thingNoImg-1-subjectValue'>"+dqip+"</div>"+
							"</div>"+
						"</div>"+
						"</div>"+
						"</label></div>")
			}       	        	
        	$(".checkbox").click(function(){
	              if($(this).is(":checked")){
				 $(this).parent().parent().parent().parent().addClass("sc-active");
				 $(this).parent().parent().parent().parent().removeClass("sc-default");
	                      }else{
					    $(this).parent().parent().parent().parent().addClass("sc-default")
					    $(this).parent().parent().parent().parent().removeClass("sc-active");
	                      }
	        });
        	if(id != null){
        		  jcssarr = jcssid.split(',')
        		  for(i=0;i<jcssarr.length;i++){
        				//	$("input:checkbox[value='"+json2[i].PWID+"']").attr('checked','true');
        				$("input:checkbox[value='"+jcssarr[i]+"']").prop('checked','true');
        				//$("input:checkbox[value='"+jcssarr[i]+"']").parent().css({"border":"#2D8CF0 solid 4px"})
        				$("input:checkbox[value='"+jcssarr[i]+"']").parent().parent().parent().parent().addClass("sc-active");
        				$("input:checkbox[value='"+jcssarr[i]+"']").parent().parent().parent().parent().removeClass("sc-default");
        				}	
        	}
        	//多选卡片---end		
        	 if(id!=null){  //当编辑不为草稿状态时，暂时不能修改已选择的基础设施
    	        	if(flowstatus != 4){
    	        	//	$("#emapForm [data-name= XZJCSS]").jqxDropDownList({ disabled: true }); 
    	        		//禁用多选卡片
    	        	/*$("input[type=checkbox]").each(function () {
    	 				$(this).attr("disabled", true);
    	 			 jcssarr = jcssid.split(',')
        		      for(i=0;i<jcssarr.length;i++){      					
        				$("input:checkbox[value='"+jcssarr[i]+"']").parent().parent().parent().parent().addClass("sc-default");
        				}	
    	 			});*/  
    	        	}
    	        }
         	 $("#emapForm [data-name=WLJCSSWID]").parent().parent()
  			.parent().css("display", "none");
         	 
         	 $("#tsjcss").html(" 请选择需年审的信息化基础设施（可多选）:")  
         	 
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
	                    page: 'nssq',
	                    action: 'T_XXB_XXHJCSS_NS_QUERY',
	                    pageSize: 1000,
	                    pageNumber: 1 ,
	                    }, //发送到服务器的参数
	                    datatype: "json",
	                    success: function (result) {
	                    	yysj = result.datas.queryUserTasksByNode.rows
	                    }
	        		 })
         	 
         	 
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
					btnclick : function(type, result) {
						if (type.id == "processStatus") {
							return true;
						} else {
							if ($("#emapForm").emapValidate('validate')) {
								
								var jcsswid= "";
								$("input:checkbox[name='checkbox']:checked").each(function () {
									jcsswid+= $(this).val() + ",";
								});
								if(jcsswid == ""){
									$.bhTip({
		              		  		    content : '请选择基础设施！！！',
		              		  			state : 'warning',
		              		  			hideWaitTime : 2000
		              		  		    });
		              		    		 return false
								}
								jcsswid = jcsswid.substring(0, jcsswid.lastIndexOf(','));
								
	              		    	
	              		    	var jcssarr = jcsswid.split(',')//add 分割新增年审基础设施成数组
	              	 	
	              		    	var sxss = WIS_EMAP_SERV.getData(bs.api.pageModel, 'nsjcsscx', {PWID : jcssarr[0],pageNumber : 1,});   
	              		    	 if(id != null){
	              		    		var sxss = WIS_EMAP_SERV.getData(bs.api.pageModel, 'nsjcsscx', {PWID : jcssarr[0],ZT:6,pageNumber : 1,});   
	              		    	 }
	              		    	if(jcssarr.length > 60){
	              		    		$.bhTip({
	              		  		    content : '年审申请，单次选择的基础设施不能超过60个！！！',
	              		  			state : 'warning',
	              		  			hideWaitTime : 2000
	              		  		    });
	              		    		 return false
	              		    	}
								
	              		  	if(id == null){//新建
	               		    	 var pdsq = true;
	                 		    	for(i=0;i<yysj.length;i++){
	                 		    		if(pdsq == false){
	            		    				 break
	            		    			}
	                 		    		var yyjjss =  yysj[i].WLJCSSWID.split(',')//在流程中的基础设施
	                 		    		for(j=0;j<jcssarr.length;j++){
	                 		    			if(pdsq == false){
	                 		    				 break
	                 		    			}
	                 		    			for(k=0;k<yyjjss.length;k++){        		    				
	                 		    				if( jcssarr[j] == yyjjss[k]){ 
	                         		    			if(yysj[i].FLOWSTATUS == 1 || yysj[i].FLOWSTATUS == 6|| yysj[i].FLOWSTATUS == 4){                 		    			
	        	                  		    			 pdsq = false 
	        	                  		    			 break
	        	                  		    			 }
	                         		    			else{
	        	                  		    				pdsq = true
	        	                  		    			 }           		    			
	                         		    		}else{   
	                         		    			pdsq = true
	                         		    		}
	                     		    		}
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
	              		       $("#emapForm [data-name=SQR]").val(USERID);
								var formData = $("#emapForm").emapForm("getValue");
							//	formData.ns='ns';
								formData.WLJCSSWID = jcsswid ;
								formData.NSJZRQ = jzrqsjc ;
								formData.SQR = USERID;
								formData.ZT = null;
								this.formdata = formData;
							
								if(flowstatus != 4 &&id != null){
									if (jcssid != jcsswid){ //之前选的基础设施与现在选的基础设施不同
										var yjcssarr = jcssid.split(',')//分割新增年审基础设施成数组
										for(i=0;i<yjcssarr.length;i++){
											 var yjcssdata = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {PWID:yjcssarr[i],pageNumber:1}); 										  
											 var ztparams = { 
				    					    	WID : yjcssdata.rows[0].WID,
				    					    	ZT : 10
			    				    		 }; 
			    				    		 $.ajax({
			    				    			url:'../modules/nssq/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
			    				    			type:'post',
			    				    			data:ztparams,
			    				    			async:false,
			    				    			cache : true,
			    				    			success:function(data){  				    				    								
			    				    			}
			    				    		 });
										  }	
										
										if(type.id == 'draft'){
											 for(i=0;i<jcssarr.length;i++){
												 var jbxxdata = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {PWID:jcssarr[i],pageNumber:1}); 
												  
												 var ztparams = { 
					    					    	WID : jbxxdata.rows[0].WID,
					    					    	ZT : 6
				    				    		 }; 
				    				    		 $.ajax({
				    				    			url:'../modules/nssq/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
				    				    			type:'post',
				    				    			data:ztparams,
				    				    			async:false,
				    				    			cache : true,
				    				    			success:function(data){  				    				    								
				    				    			}
				    				    		 });
											  }	
											 return true;
										}
									}
								}
								if(type.id == 'draft'){
									return true;
								}
								  if(type.id == 'start' || type.id == 'submit'){
									  var self = this
										BH_UTILS.bhDialogWarning({
											 title:'提示',
											 content:'确定提交当前申请？',
											 buttons:[
											       {
											       text:'确定',
											      callback:function(){
											    	 // var candidateArray= _funauth.newqueryXxhllyCandidate();	
											    	  var candidateArray=_funauth.queryXxhfgldSimple('信息化联络员',bghglyDw,'nssq');
						  								if(candidateArray=='NoCandidate'||candidateArray==undefined||candidateArray==''){
						  									$.bhTip({
						  										content : _funauth.noxxhlly,
						  										state : 'warn',
						  										hideWaitTime : 5000
						  									});
						  									return false;
						  								}
						  								 var  xxhlly=_funauth.parseCandidatesIdliyi(candidateArray);
						  								$.bhTip({
						  									content : '已提交至本单位信息化联络员'+_funauth.newparseCandidatesName(xxhlly)+'，如有多位处理人，任一处理即可。',
						  									state : 'success',
						  									hideWaitTime : 5000
						  								});
											    	  
					            	    			  for(i=0;i<jcssarr.length;i++){
															 var jbxxdata = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {PWID:jcssarr[i],pageNumber:1}); 
															  
															 var ztparams = { 
								    					    	WID : jbxxdata.rows[0].WID,
								    					    	ZT : 6
							    				    		 }; 
							    				    		 $.ajax({
							    				    			url:'../modules/nssq/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
							    				    			type:'post',
							    				    			data:ztparams,
							    				    			async:false,
							    				    			cache : true,
							    				    			success:function(data){  				    				    								
							    				    			}
							    				    		 });
														  }	
					            	    			
					  								formData.xxhlly=xxhlly;
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
						          //统计数据
									  _sjtj.nssqtj();
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