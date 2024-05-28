define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./xxhbshsqBS');

	var viewConfig = {
		initialize : function(id,lx) {
			var params =  {
				JCSSWID :id,
				pageNumber : 1,
				 '*order' : '-CZSJ',
			};
			var tableOptions = {
				pagePath : bs.api.pageModel,
				action : 'T_XXB_XXHJCSS_BJRZ_QUERY',
				//sortable : true,
			//	pageable : false,
				params : params,
				customColumns : [ 
				{
					colIndex : '0',
					type : 'tpl',
					column : {
						text : '操作',
						align : 'center',
						cellsAlign : 'center',
						width : '100px',
						cellsRenderer : function(row, column, value,
								rowData) {
							var str = '<a href="javascript:void(0)" data-action="czdetail" data-x-wid='+ rowData.WID +' data-x-lx=' + rowData.LX 
							+ '>详情</a>';
							return str
						}
					}
				}  ]
			};
			$('#czjlemapdatatable').emapdatatable(tableOptions);
		}
	}
	return viewConfig;
});