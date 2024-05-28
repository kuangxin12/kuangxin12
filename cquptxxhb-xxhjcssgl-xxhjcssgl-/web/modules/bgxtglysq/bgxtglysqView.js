define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./bgxtglysqBS');

    var viewConfig = {
        initialize: function(data,id, taskid,proid) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', 'form');
            $("#emapForm").emapForm({
                root:WIS_EMAP_SERV.getContextPath(),
                data: mode,
                model: 'h',
                cols:2,//列数为2
                autoColumn : true,//自动列宽
                readonly:true
            });
        /*   var diz =  WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='+proid+'&responseType=forward'
         //   var diz =  WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?taskId='+taskid+'&defKey=xxhjcssgl.xtglybg'
            document.getElementById('flow').src = diz;
           $("#flow").css("display", "none");*/
            $("#tsjcss").css("display", "none");
            $("#ti").css("display", "none");
            $("#emapForm").emapForm("setValue", data);
            
            $("[data-action=save]").hide();
            this.eventMap = {
            };
        }
    };
    return viewConfig;
});