define(function(require, exports, module) {
    var customUtils = {};
    customUtils = {
        /**
         * tablename 必须
         * needAuth 需业务侧进行字段授权时使用
         * qxlx 需业务侧进行字段授权时使用
         * needGroup 需业务侧进行字段授权时使用
         * groupId 非必须，当前用户登陆角色
         */
        getUnionActionModel: function(pagePath, params, modelType) {
            var selfParams = $.extend({}, params, {
                "*json": "1"
            });
            var tableModel = WIS_EMAP_SERV.getPageMeta(pagePath, selfParams);
            if (tableModel && tableModel.models) {
                tableModel = WIS_EMAP_SERV.convertModel(tableModel.models[0], modelType || "form");
            }
            if (modelType == "search") {
                var controls = tableModel.controls;
                for (var i in controls) {
                    controls[i].defaultBuilder = controls[i].xtype ? "equal" : "include";
                }
            }
            return tableModel;
        },
        printReport: function(wid) {
            if (!wid) {
                wid = "getLatestOne";
            }
            window.open(basePath + "/viewReport/" + wid + ".do");
        }
    };
    return customUtils;
});
