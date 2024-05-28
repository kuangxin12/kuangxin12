define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./bmshrywhBS');

    var viewConfig = {
        initialize: function(data) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_BMSHRY_QUERY', 'form');
            $("#emapForm").emapForm({
                root:WIS_EMAP_SERV.getContextPath(),
                data: mode,
                model: 'h',
                readonly:true
            });
            $("#emapForm").emapForm("setValue", data);
            
            $("[data-action=save]").hide();
            this.eventMap = {
            };
        }
    };
    return viewConfig;
});