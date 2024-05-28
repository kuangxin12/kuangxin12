define(function(require, exports, module) {
	var utils = require('utils');
	var bs = require('./bmshrywhBS');

	var viewConfig = {
		initialize : function(id) {
			  var data = WIS_EMAP_SERV.getData(bs.api.pageModel, 'cxyhzzylb', {groupId:'936f888e-f0c5-47d4-a537-6e0cdc20619b'});
			console.log(data);
			
			if (id != undefined) {
				var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel,
						'T_XXB_XXHJCSS_BMSHRY_QUERY', 'form');
				$("#emapForm").emapForm({
					root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
					data : mode,
					model : 'h'
				});
				var data = WIS_EMAP_SERV.getData(bs.api.pageModel,
						'T_XXB_XXHJCSS_BMSHRY_QUERY', {
							pageSize : 100,
							pageNumber : 1,
							WID : id
						});

				$("#emapForm").emapForm("setValue", data.rows[0]);

			} else {
				var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'bmshryxz',
						'form');
				$("#emapForm").emapForm({
					root : WIS_EMAP_SERV.getContextPath(),// 附件上传时必备属性
					data : mode,
					model : 'h',
				});

//				$("#emapForm [data-name=JJRPCMC]").children().attr(
//						"disabled", true);
				$("#emapForm [data-name=SFRZH]").attr("disabled", true);

				$("#emapForm [data-name=XM").on(
						'select',
						function(event) {
							var originalItem = event.args.item.originalItem;
							$("#emapForm [data-name=SFRZH]").val(
									originalItem.name);
							$("#emapForm [data-name=DWDM]").val(
									originalItem.SZDWDM);

						});
			}

			this.eventMap = {
				'[data-action=save]' : this.save
			};
		},
		save : function() {
			if ($("#emapForm").emapValidate('validate')) {
				var formData = $("#emapForm").emapForm("getValue");
				formData.WID=_util.getGuidGenerator();
				// $("#emapForm").emapForm("saveUpload");//上传附件时使用
				bs.save(formData).done(function(data) {
					alert("数据保存成功");
					$('#emapdatatable').emapdatatable('reload');
					$.bhPaperPileDialog.hide();// 关闭当前弹窗
				});
			}
		}

	};
	return viewConfig;
});