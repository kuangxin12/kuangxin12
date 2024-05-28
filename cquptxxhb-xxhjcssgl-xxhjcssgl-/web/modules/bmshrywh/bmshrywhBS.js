define(function(require, exports, module) {
	var utils = require('utils');
	var bs = {
		api: {
			pageModel: 'modules/bmshrywh.do',
			resultProfile: './mock/resultProfile.json'
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
			// 将formData提交到后台动作上
			return BH_UTILS.doAjax('../modules/bmshrywh/T_XXB_XXHJCSS_BMSHRY_ADD.do', formData);
		},
		del: function(params){
			// 添加删除动作
			return BH_UTILS.doAjax('../modules/bmshrywh/T_XXB_XXHJCSS_BMSHRY_DELETE.do', {
				T_XXB_XXHJCSS_BMSHRY_DELETE:JSON.stringify(params)
			});
		},
		exportData: function(obj){
			var params = {
					root: contextPath,
					app : "xxhjcssgl",
					module : "modules",
					page : 'bmshrywh',
					action : 'T_XXB_XXHJCSS_BMSHRY_QUERY'
			};
			//选择字段导出
			$('#emapdatatable').emapdatatable('selectColumnsExport', params);	
		}
	};

	return bs;
});