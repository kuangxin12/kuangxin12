define(function(require, exports, module) {
    var utils = require('utils');
    var bs = {
        api: {
            commonPageUrl: "modelPage/commonManagePage.do",
            commonPagePath: "modelPage/commonManagePage/",
            commonPageAction: "COMMON_PAGE_ACTION",
            commonPageActionUrl: "modelPage/commonManagePage/COMMON_PAGE_ACTION.do",
            indexPageUrl: "modelPage/index.do",
            indexPagePath: "modelPage/index/",
            sqjlQueryAction: "sqjlcx",
            sqjlQueryActionUrl: "modelPage/index/sqjlcx.do",
            tasksQueryAction: "rwzxrwcxdzl",
            tasksQueryActionUrl: "modelPage/index/rwzxrwcxdzl.do",
            tasksModelAction: "rwcx",
            tasksModelActionUrl: "modelPage/index/rwcx.do",
            checkQjlbSFSYUrl: "qjgl/checkQjlbSFSY.do",
            qjlbSfsyByWidUrl: "qjgl/qjlbSfsyByWid.do",
            //代码或名称做唯一性校验
            checkDmOrMcExistUrl: "qjgl/checkDmOrMcExist.do",
            /**
             * 请假历史、请假审核、请假统计模块
             */
            //获取审核流程信息
           // leaveResultUrl: basePath + '/qjgl/getShProcessInfo.do'
        },
        //获取流程信息
        getleaveResult: function(params) {
            var def = $.Deferred();
            utils.doAjax(bs.api.leaveResultUrl, params).done(function(resp) {
                def.resolve(resp);
            }).fail(function(resp) {
                def.reject(resp);
            });
            return def.promise();
        }
    };
    return bs;
});
