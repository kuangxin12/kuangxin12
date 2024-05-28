define(function(require, exports, module) {
	var utils = require('utils');
	var bs = {
		api: {
			pageModel: 'modules/xxhbshsq.do',
			resultProfile: './mock/resultProfile.json',
			fileDownUrl: WIS_CONFIG.ROOT_PATH + '/fileDownLoad.do',
		},
		getDemoMainModel: function() {
			var def = $.Deferred();
			utils.doAjax(bs.api.resultProfile, null, 'get').done(function(data) {
				data.length = data.list.length;
				def.resolve(data);
			}).fail(function(res) {
				def.reject(res);
			});
			return def.promise();
		},
		save: function(formData){
			//TODO 将formData提交到后台动作上
			return BH_UTILS.doAjax('../modules/xxhbshsq/T_XXB_XXHJCSS_JBXX_MODIFY.do', formData);
		},
		del: function(params){
			//TODO 添加删除动作
//			return BH_UTILS.doAjax('../modules/xxhbshsq/T_PXXX_XSJBXX_DELETE.do', {
//				T_PXXX_XSJBXX_DELETE:JSON.stringify(params)
//			});
		},
		exportData: function(obj,searchParam){
			var params = {
					root: contextPath,
					app : "xxhjcssgl",
					module : "modules",
					page : 'xxhbshsq',
					//action : 'T_XXB_XXHJCSS_JBXX_QUERY',
					action : 'xxhblbcx',
					
			};
			if(searchParam){
				params['querySetting']=searchParam;
			}
			
			//选择字段导出
			$('#emapdatatable').emapdatatable('selectColumnsExport', params);	
		}
	};

	return bs;
});