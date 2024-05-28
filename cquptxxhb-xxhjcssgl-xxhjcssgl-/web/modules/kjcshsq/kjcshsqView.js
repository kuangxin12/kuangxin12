define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./kjcshsqBS');

    var viewConfig = {
    		initialize : function(id,data, taskid, lx,node) {
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
    			$("#emapForm").emapForm("setValue", data);

    			// 根据申请类型，隐藏其他类型字段，并添加该类型下的必填项
    			_emapShowItem.showItemByLx(lx,node);
    			this.eventMap = {};
    		}
    	};
    	return viewConfig;
});