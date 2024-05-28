define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./bgxtglysqBS');

    var viewConfig = {
        initialize: function(id,data,taskid,jcssid,xgly,flowstatus) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'bgglysq', 'form');
            $("#emapForm").emapForm({
                root:WIS_EMAP_SERV.getContextPath(),//附件上传时必备属性
                data: mode,
                model: 'h',
                cols : 2,
				autoColumn : true
            });
            
            var zgxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {ZGH : USERID,pageSize : 1,pageNumber : 1,});
            var jcssxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {SFRZH : USERID,pageNumber : 1,pageSize : 100});  
          
            var DW = zgxx.rows[0].SZDWDM 
            
           
            //var tydwry = WIS_EMAP_SERV.getData(bs.api.pageModel, 'bghglycx', {pageNumber : 1,pageSize :5000});
            
           
            
            if(id!=null){
                jcssidarr = jcssid.split(',')
                for(i=0;i<jcssidarr.length;i++){
                   var jcssdrop = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {PWID : jcssidarr[i],ZT:8,pageSize : 1,pageNumber : 1,});
                   if(jcssdrop.rows[0].ZT == 8){
                	   jcssxx.rows.push(jcssdrop.rows[0])
                   }
                }
            }        
            
//            var dataAdapter = new $.jqx.dataAdapter(tydwry.rows);         
//        	$("#emapForm [data-name=BGHXGLY]").jqxDropDownList({
//				source : dataAdapter,
//				displayMember : "XM",
//				valueMember : "ZGH",
//				
//				renderer : function(index, label, value) {					
//					var datarecord = tydwry.rows[index];					
//  				  return  datarecord.XM +'   '+ datarecord.ZGH+'   '+datarecord.DWJC;
//	
//				}
//			});
        //	$("#emapForm [data-name=BGHXGLY]").jqxDropDownList('selectIndex', 0 ); 
           
          
        	
        	var bgjcss = new $.jqx.dataAdapter(jcssxx.rows);         
        	$("#emapForm [data-name=XZJCSS]").jqxDropDownList({
        		checkboxes: true, //add
				source : bgjcss,
				displayMember : "MC",
				valueMember : "PWID",
				
				renderer : function(index, label, value) {
					var sjrecord = jcssxx.rows[index];					
					return  "名称:"+sjrecord.MC+"  类型:"+sjrecord.LX;
				}
			});
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
							"<div class='sc-panel-thingNoImg-1-subject' style = 'width: 100%;white-space: nowrap;overflow: hidden'>"+
							   " <div class='sc-panel-thingNoImg-1-subjectKey sc-width-50'>用途</div>"+
							    "<div title="+jcssxx.rows[i].YT+" class='sc-panel-thingNoImg-1-subjectValue'>"+jcssxx.rows[i].YT+"</div>"+
							"</div>"+	
							"<div class='sc-panel-thingNoImg-1-subject' style = 'width: 100%;white-space: nowrap;overflow: hidden'>"+
							   " <div class='sc-panel-thingNoImg-1-subjectKey sc-width-50' >IP地址</div>"+
							    "<div   title="+dqip+" class='sc-panel-thingNoImg-1-subjectValue'>"+dqip+"</div>"+
							"</div>"+
						"</div>"+
						"</div>"+
						"</label></div>")
			}       	
        	/*$(".checkbox").click(function(){
	              if($(this).is(":checked")){
				 $(this).parent().css({"border":"#2D8CF0 solid 4px"})
	                      }else{
					    $(this).parent().css({"border":"#D8DCF0 solid 3px"})
	                      }
	        });*/
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
        	$("#flow").css("display", "none");
        	var bghxtglyId="";
        	
        	
        	$("#emapForm [data-name=BGHXGLY").on('select', function(event) {

				var originalItem = event.args.item.originalItem;
				bghxtglyId = originalItem.ZGH;
				console.log(bghxtglyId)
			});
        	
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
	                    page: 'bgxtglysq',
	                    action: 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
	                    pageSize: 1000,
	                    pageNumber: 1 ,
	                    }, //发送到服务器的参数
	                    datatype: "json",
	                    success: function (result) {
	                    	yysj = result.datas.queryUserTasksByNode.rows
	                    }
	        		 })	
        	
       	    $("#emapForm [data-name=XSJ]").parent().parent()
			 .parent().parent().parent().css("display", "none");
       	   $("#emapForm [data-name=BGQJGLY]").val(zgxx.rows[0].XM);
            $("#emapForm [data-name=BGQJGLY]").attr("disabled", true);
            this.addRequired("BGQJGLY");
        	if( id != null ){ //编辑
        		var xglydrop = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {ZGH : xgly,pageSize : 100,pageNumber : 1,});  
        		/*$("#emapForm [data-name= BGHXGLY]").jqxDropDownList('selectItem',
        				xglydrop.rows[0].ZGH);*/
        		
        		var jcssdx = jcssid.split(',')
        		
        		for(i=0;i<jcssdx.length;i++){
        			var jcssdrop = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {PWID : jcssdx[i],ZT:8,pageSize : 100,pageNumber : 1,});              		
            		$("#emapForm [data-name= XZJCSS]").jqxDropDownList('checkItem',
        					jcssdrop.rows[0].PWID);
        		}
        	//	$("#emapForm [data-name= XZJCSS]").jqxDropDownList('selectItem',jcssdrop.rows[0].PWID);
        		$("#emapForm [data-name=BGQGLY]").jqxDropDownList("disabled", true);
        		 $("#emapForm [data-name=BGHXGLY]").val(data.BGHGLY_DISPLAY);
        		 bghxtglyId = data.BGHGLY;
        		 console.log(bghxtglyId)
        		
        	}
        	 if(id!=null){  //当编辑不为草稿状态时，暂时不能修改已选择的基础设施
   	        	if(flowstatus != 4){
   	        		$("#emapForm [data-name= XZJCSS]").jqxDropDownList({ disabled: true }); 
   	        		//禁用多选卡片
   	        		$("input[type=checkbox]").each(function () {
   	 				$(this).attr("disabled", true);
   	 			 jcssarr = jcssid.split(',')
       		      for(i=0;i<jcssarr.length;i++){      					
       				$("input:checkbox[value='"+jcssarr[i]+"']").parent().parent().parent().parent().addClass("sc-default");
       				}	
   	 			});  
   	        	}
   	        }
        	 $("#emapForm [data-name=XZJCSS]").parent().parent()
 			.parent().css("display", "none");
        	 this.removeRequired("XZJCSS");
        	   $("#tsjcss").html(" 请选择需变更的信息化基础设施（可多选）:")  	
        	
             var flow = new Vue({
           	  el : '#app',
           	  data : function() {
           	    return {
           	      formdata:{},
           	      flow_comment: "",
           	      defkey:"xxhjcssgl.xtglybg",
           	      taskid:taskid
           	    };
           	  },
           	  methods : {
           		  btnclick : function(type, result) {
           			/*  console.log("save js---> type="+type);*/
           			if(type.id == "processStatus") {
           				return true;
             	      } else {
             	    	 if( $("#emapForm").emapValidate('validate')){
             	    		 var reg = /^[0-9]{7,7}$/;
             	    		if(!reg.test(bghxtglyId)){
             	    			$.bhTip({
	              		  		    content : '统一身份认证号未查询到，请重新查询变更后申请人！',
	              		  			state : 'warning',
	              		  			hideWaitTime : 2000
	              		  		    });
	              		    		 return false
             	    		};	
             	    		var xglyid = bghxtglyId;
             	    	//	patt.test("The best things in life are free!");
             	    		
                 		    	 
              		    	// var jcsswid = $("#emapForm [data-name=XZJCSS]").val()
              		    	 //多选卡片获取值
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
							
              		    	 // $("#emapForm [data-name=JCSSID]").val(jcsswid);//保存基础设施ID 
              		    	var jcssarr = jcsswid.split(',')//add 分割新增变更基础设施
              		    	
              		    //	var xglyid = $("#emapForm [data-name=BGHXGLY]").val()
            		    	
              		    	
              		    	var sxss = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {PWID : jcssarr[0],pageNumber : 1,});   
              		    	 if(id != null){
              		    		var sxss = WIS_EMAP_SERV.getData(bs.api.pageModel, 'whsscx', {PWID : jcssarr[0],ZT:8,pageNumber : 1,});   
              		    	 }
              		    	if(jcssarr.length > 60){
              		    		$.bhTip({
              		  		    content : '申请人变更，单次选择的基础设施不能超过60个！！！',
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
                 		    		var yyjjss =  yysj[i].JCSSID.split(',')//在流程中的基础设施
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
                 		    		alert("不能申请正在流程中的设施！")
                    		    	 return false
                 		    	}
             		       }
              		    	
              		    	 $("#emapForm [data-name=BGQGLY]").val(USERID);
              	    		  var formData=$("#emapForm").emapForm("getValue");
              	    		  formData.BGHGLY = xglyid ;
              	    		formData.JCSSID = jcsswid ;
              	    		formData.YEMAIL = sxss.rows[0].EMAIL;
              	    		formData.YSJ = sxss.rows[0].SJ;
              	    		formData.YBGDH = sxss.rows[0].BGDH;
            	    		  this.formdata= formData;
            	    		//新增权限设置H
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
            	    			  for(i=0;i<jcssarr.length;i++){
										 var jbxxdata = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_JBXX_QUERY', {PWID:jcssarr[i],pageNumber:1}); 
										  
										 var ztparams = { 
			    					    	WID : jbxxdata.rows[0].WID,
			    					    	ZT : 8
		    				    		 }; 
		    				    		 $.ajax({
		    				    			url:'../modules/bgxtglysq/T_XXB_XXHJCSS_JBXX_MODIFY.do',  //修改更新
		    				    			type:'post',
		    				    			data:ztparams,
		    				    			async:false,
		    				    			cache : true,
		    				    			success:function(data){  				    				    								
		    				    			}
		    				    		 });
									  }	
            	    			  
            	    			  
									$.bhTip({
										
										content : '已提交至'+ $("#emapForm [data-name=BGHXGLY]").val() +'，待'+$("#emapForm [data-name=BGHXGLY]").val()+'确认变更。',
										state : 'success',
										hideWaitTime : 2000
									});
							
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
									//formData.tjxxgly= formData.BGHXGLY 
            	    		  
								//新增权限设置end
            	    		  
            	    		//  return true;          	    		               		    
          	    	  }else{
          	    		  return false;
          	    	  }
             	      }
             	    },
           	    action_complete : function(type, result) {
           	      if(type === "processStatus"){
           	      } else {
           	        //重新加载数据
           	        $.bhPaperPileDialog.hide({
           	          close:function() {
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
           	        });//关闭当前弹窗
           	   //统计数据
           		  _sjtj.bgsqtj();
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