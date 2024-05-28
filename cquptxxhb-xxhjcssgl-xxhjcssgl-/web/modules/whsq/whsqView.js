define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./whsqBS');
    
    var viewConfig = {
        initialize: function(data,id, taskid,processid) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_WH_QUERY', 'form');
            $("#emapForm").emapForm({
                root:WIS_EMAP_SERV.getContextPath(),
                data: mode,
                model: 'h',
                cols:2,//列数为2
                autoColumn : true,//自动列宽
                readonly:true
            });
             
          /*  var diz =  WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='+processid+'&responseType=forward'
            document.getElementById('flow').src = diz;
            
            $("#flow").css("display", "none");*/
            $("#tsjcss").css("display", "none");
            $("#emapForm").emapForm("setValue", data);
            
           $("[data-action=save]").hide();
            this.eventMap = {
            };
        }
    };
    return viewConfig;
});