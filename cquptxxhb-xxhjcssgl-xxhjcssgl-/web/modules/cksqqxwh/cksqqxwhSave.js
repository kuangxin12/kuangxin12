define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./cksqqxwhBS');

    var viewConfig = {
        initialize: function(id,data) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'ckqxbj', 'form');
            $("#emapForm").emapForm({
                root:WIS_EMAP_SERV.getContextPath(),//附件上传时必备属性
                data: mode,
                model: 'h'
            });
        	$("#emapForm [data-name=XM").on('select', function(event) {

				var originalItem = event.args.item.originalItem;
				$("#emapForm [data-name=ZGH]").val(originalItem.ZGH);
				$("#emapForm [data-name=SZDW]").val(originalItem.DWJC);
			});
            
            
            this.eventMap = {
                '[data-action=save]': this.save
            };
        },
        save: function(){
        	if( $("#emapForm").emapValidate('validate') ){
        		var formData = $("#emapForm").emapForm("getValue");
        		//$("#emapForm").emapForm("saveUpload");//上传附件时使用
        		//判断是否已有该人员
        	
        			var sfyy = WIS_EMAP_SERV.getData(bs.api.pageModel, 'T_XXB_XXHJCSS_CKQX_QUERY', {ZGH:formData.ZGH,pageNumber:1});
               		if(sfyy.totalSize > 0){
               			 $.bhTip({
           		  				content : '已有该人员',
           		  				state : 'warning',
           		  				hideWaitTime : 2000
           		  			});
               			 return false;
               		}
        	
        		
        		bs.save(formData).done(function(data){
        			$.bhTip({
		  				content : '添加成功',
		  				state : 'success',
		  				hideWaitTime : 2000
		  			});
        			$('#emapdatatable').emapdatatable('reloadFirstPage');	
                    $.bhPaperPileDialog.hide();//关闭当前弹窗
    			});
        	}
        }

    };
    return viewConfig;
});