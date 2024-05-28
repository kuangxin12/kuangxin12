define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./xxhbgbshBS');

    var viewConfig = {
    		initialize: function(id,taskid,lx,cksq) {
            	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'gbssjbxx', 'form');
                $("#emapForm").emapForm({
                    root:WIS_EMAP_SERV.getContextPath(),//附件上传时必备属性
                    data: mode,
                    model: 'h',
                    cols:2,
                    autoColumn : true,
                    readonly:true
                });
                if (lx == "虚拟机"){
                	$("#emapForm [data-name=TGFWQ_PPXH]").parent().parent()
        			.parent().parent().css("display", "none");
                	if (cksq == '否' || cksq == '0'){
                		$("#emapForm [data-name=CK_IP]").parent().parent()
            			.parent().parent().css("display", "none");
                	}     
                	
                } else if (lx == "托管服务器") {
                	$("#emapForm [data-name=XNJ_NC]").parent().parent()
        			.parent().parent().css("display", "none");

                	if (cksq == '否' || cksq == '0'){
                	$("#emapForm [data-name=CK_IP]").parent().parent()
        			.parent().parent().css("display", "none");
                	}
                	
                }
               /* var diz =  WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?taskId='+taskid+'&defKey=xxhjcssgl.xxhjcssgb'
                document.getElementById('flow').src = diz;
                $("#flow").css("display", "none");*/
            $("[data-action=save]").hide();
            this.eventMap = {
            };
        }
    };
    return viewConfig;
});