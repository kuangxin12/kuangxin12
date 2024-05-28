define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./xxhbshsqBS');

    var viewConfig = {
    		initialize : function(id, data,taskid, lx,node) {
    			$("#shyjdiv").css('display','none');
    			var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
    					'T_XXB_XXHJCSS_JBXX_QUERY', 'form');

    			$("#emapForm").emapForm({
    				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
    				data : mode,
    				model : 't',
    				cols : 2,
    				autoColumn : true,
    				readonly : true
    			});
    			
    			if(data.CK_SFYSQCK=='是'){
    				data.CK_SFYSQCK='1';
    				$("#emapForm [data-name=CK_SFYSQCK]").val('1');
    			}
    			if(lx == '虚拟机'){
    				 $("#emapForm [data-name=XNJ_SFPT]").parent().parent().css("display", "block");
    	           }
    			if(lx == '托管服务器'){
    				$("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent().addClass("bh-col-md-6")
            	    $("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent().removeClass("bh-col-md-12")
   	           }
    			
    			$("#emapForm").emapForm("setValue", data);
    			// 根据申请类型，隐藏其他类型字段，并添加该类型下的必填项
    			_emapShowItem.showItemByLx(lx,node);
    			
    			if(data.CK_SFYSQCK=='1'){
    				$("#emapForm [data-name=CK_SFYSQCK]").parent().parent().css("display","block");
    				$("#emapForm [data-name=QTSM]").parent().parent().parent().addClass("bh-col-md-6")
    	    	    $("#emapForm [data-name=QTSM]").parent().parent().parent().removeClass("bh-col-md-12")
    	    	    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().parent().parent().css("display","block");
    				$("#emapForm [data-name=CK_DKH]").parent().parent().css("display","block");
    			    $("#emapForm [data-name=CK_DKH]").parent().parent().parent().addClass("bh-col-md-12")
    				$("#emapForm [data-name=CK_DKH]").parent().parent().parent().removeClass("bh-col-md-6")
    			}
    			
    			this.eventMap = {};
    		}
    	};
    	return viewConfig;
});