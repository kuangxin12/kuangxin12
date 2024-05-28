define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./nssqBS');

	var viewConfig = {
		initialize : function(data,id, taskid,proid) {
			var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
					'T_XXB_XXHJCSS_NS_QUERY', 'form');

			$("#emapForm").emapForm({
				root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
				data : mode,
				model : 't',
				cols : 2,
				autoColumn : true,
				readonly : true
			});
			 $("#emapForm [data-name=WLJCSSWID]").parent().parent().css("display", "block");
			 $("#emapForm [data-name=TJSJ]").parent().parent().css("display", "block");
	
			$("#tsjcss").css("display", "none");
			$("#emapForm").emapForm("setValue", data);
		
			
			this.eventMap = {};
		}
	};
	return viewConfig;
});