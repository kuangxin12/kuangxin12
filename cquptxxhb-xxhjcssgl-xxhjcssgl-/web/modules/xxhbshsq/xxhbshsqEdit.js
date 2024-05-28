define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./xxhbshsqBS');

	var viewConfig = {
		initialize : function(id, data, taskid, lx,node,sqlx) {
			
			/*var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'T_XXB_XXHJCSS_JBXX_QUERY', 'form');*/
			
			var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'xxhbbjbd', 'form');
			$("#emapForm").emapForm({
				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
				data : mode,
				model : 't',
				cols : 2,
				autoColumn : true,
				//readonly : (lx == '托管服务器' ? false : true)
				readonly : false 
			});
			$("#save").css('display', 'table');
			
			 this.eventMap = {
		         "[data-action=save]": this.save
		     };
				if(id!=null){
					if(lx=="托管服务器"){
						//CPU核心选择 
						var cpucx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'XNJCPU', SFSY:'1',pageSize : 1000,pageNumber : 1,}); 
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
						var nccx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'NC', SFSY:'1',pageSize : 1000,pageNumber : 1,}); 
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
						var ppcx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'FWQPP', SFSY:'1',pageSize : 1000,pageNumber : 1,}); 
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
						var czxtcx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'FWQCZXT', SFSY:'1',pageSize : 1000,pageNumber : 1,}); 
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
				        
				      //房间号选择 
						/*var cpucx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'FJH', SFSY:'1',pageNumber : 1}); 
						var dataAdapter = new $.jqx.dataAdapter(cpucx.rows);
				        $('#emapForm [data-name=TGFWQ_YM]').jqxComboBox({
				        	placeHolder: "请输入或选择房间号", 
				        	source: dataAdapter,
				        	displayMember: "ZDMC",
				        	valueMember: "ZDZ", 
				        	//selectedIndex: 0,
				            renderer: function (index, label, value) {
				                var datarecord = cpucx.rows[index];
				                return datarecord.ZDMC;
				            }
				        });
				        $("#emapForm [data-name=TGFWQ_YM]").jqxComboBox('val', data.TGFWQ_YM);*/
				        
					}
					
					if(lx == '虚拟机'){
						//cpu选择 
						var cpucx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'XNJCPU', SFSY:'1',pageSize : 1000,pageNumber : 1,}); 
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
						var nccx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'NC', SFSY:'1',pageSize : 1000,pageNumber : 1,}); 
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
						var czxtcx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'XNJCZXT', SFSY:'1',pageSize : 1000,pageNumber : 1,}); 
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
						var sjypcx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_XLZD_QUERY', {LB:'XNJSJYP', SFSY:'1',pageSize : 1000,pageNumber : 1,}); 
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
				
				
				
			/*$("#app").append("<div class='bh-btn bh-btn-primary' id='save' data-action='save'>保存</div>")*/
			// 显示申请类型、申请人、申请单位，不可编辑
			$("#emapForm [data-name=LX]").val(lx);
			var zgxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_JZG_QUERY', {
				pageSize : 1,
				pageNumber : 1,
				ZGH : data.SFRZH
			});
			if (zgxx.totalSize > 0) {
				//$("#emapForm [data-name=GLYXM]").val(zgxx.rows[0].XM);
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
           if(lx == '虚拟机'){
        	 /*  $("#emapForm [data-name=XNJ_IP]").parent().parent().parent().addClass("bh-col-md-12")
        	    $("#emapForm [data-name=XNJ_IP]").parent().parent().parent().removeClass("bh-col-md-6")*/
        	   $("#emapForm [data-name=XNJ_SFPT]").parent().parent().css("display", "block");
           }
           if(lx == '托管服务器'){
				$("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent().addClass("bh-col-md-6")
       	    $("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent().removeClass("bh-col-md-12")
	           }
			$("#emapForm [data-name=SQDW]").jqxDropDownList('selectItem',
					data.SQDW);

			$("#emapForm [data-name=GLYXM]").attr("disabled", true);
			$("#emapForm [data-name=EMAIL]").attr("disabled", true);
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
			
		
			
			
			this.removeRequired("TGFWQ_NC");
			this.removeRequired("TGFWQ_CPU");
			this.removeRequired("TGFWQ_PPXH");
			this.removeRequired("TGFWQ_CZXT");
			this.removeRequired("TGFWQ_XH");
			
			$("#emapForm [data-name=GLYXM").on('select', function(event) {

				var originalItem = event.args.item.originalItem;
				$("#emapForm [data-name=SFRZH]").val(originalItem.USERID);
			//	$("#emapForm [data-name=GLYXM]").val(originalItem.USERNAME);
				$("#emapForm [data-name=SJ]").val(originalItem.SJ);
				$("#emapForm [data-name=EMAIL]").val(originalItem.MAILACC);
				$("#emapForm [data-name=BGDH]").val(originalItem.BGDH);
			});
			
			// 根据申请类型，隐藏其他类型字段，并添加该类型下的必填项
			_emapShowItem.showItemByLx(lx, node,'edit');

			/*$("#emapForm").emapForm(
					'disableItem',
					[ 'MC', 'SQDW', 'SBFL','CK_SFYSQCK', 'YT', 'QTSM', 'SFRZH',
							'GLYXM', 'EMAIL', 'BGDH', 'SJ', 'TGFWQ_PPXH','TGFWQ_CZXT', ' TGFWQ_XH ', 
							' TGFWQ_CPU ','TGFWQ_NC',' CK_DKH',' XNJ_CPU',' XNJ_CZXT',' XNJ_NC','XNJ_SJYP', ]);*/
		/*	
			if(sqlx == '关闭出口' || sqlx == '申请出口'){
				$("#emapForm").emapForm(
						'disableItem',
						['TGFWQ_SFYZ','TGFWQ_IP','TGFWQ_JJH','TGFWQ_SFYCC','TGFWQ_YM','TGFWQ_WZ',"CK_SFYSQCK"]);
			}*/
			this.removeRequired("BGDH");
			if(data.CK_SFYSQCK=='1'){
				//$("#emapForm").emapForm('disableItem',["CK_SFYSQCK"]);
				$("#emapForm [data-name=CK_SFYSQCK]").parent().parent().css("display","block");
				$("#emapForm [data-name=QTSM]").parent().parent().parent().addClass("bh-col-md-6")
	    	    $("#emapForm [data-name=QTSM]").parent().parent().parent().removeClass("bh-col-md-12")
	    	    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().parent().parent().css("display","block");
				$("#emapForm [data-name=CK_DKH]").parent().parent().css("display","block");
			    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().addClass("bh-col-md-12")
				$("#emapForm [data-name=CK_DKH]").parent().parent().parent().removeClass("bh-col-md-6")
			}
			
			$("#emapForm [data-name=CK_SFYSQCK]").on(
					'change',
					function(event) {
						if (event.args.check== true) {
							  $("#emapForm [data-name=CK_DKH]").parent().parent().parent().parent().parent().css("display","block");
								$("#emapForm [data-name=CK_DKH]").parent().parent().css("display","block");
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
		},
		
		 save: function(){
			 /*    console.log('执行了保存')*/
	        	if( $("#emapForm").emapValidate('validate') ){
	        		var formData = $("#emapForm").emapForm("getValue");
	        		$("#emapForm").emapForm("saveUpload");//上传附件时使用
	        		bs.save(formData).done(function(data){
	                    $.bhTip({
							content : '数据修改成功',
							state : 'success',
							hideWaitTime : 2000
						});
	                  /*  $('#emapdatatable').emapdatatable('reload');*/
	                 /*   $.bhPaperPileDialog.hide();//关闭当前弹窗
*/	                    $.bhPaperPileDialog.hide({
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
	    			});
	        	}
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