define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./xxhjcssgbsqBS');

    var viewConfig = {
        initialize: function(data,id,taskid,processid) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_GB_QUERY', 'form');
            $("#emapForm").emapForm({
                root:WIS_EMAP_SERV.getContextPath(),
                data: mode,
                model: 'h',
                cols:2,//列数为2
                autoColumn : true,//自动列宽
                readonly:true
            });
           
         /*   var diz =  WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?processInstanceId='+processid+'&responseType=forward'
            document.getElementById('flow').src = diz;*/
            	
//            $("#lczt").click(function(){             	 
//               	window.open(WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?taskId='+taskid+'&defKey=xxhjcssgl.xxhjcssgb')
//               });
            $("#emapForm").emapForm("setValue", data);
         //   $("#flow").css("display", "none");
            $("#tsjcss").css("display", "none");
            $("[data-action=save]").hide();
            this.eventMap = {
            };
        }
    };
    return viewConfig;
});