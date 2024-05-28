define(function(require, exports, module) {
    var __constants = {
        // 请假详情表
        QJXQ: "T_RS_QJGL_QJXQ",
        // 请假类型字典表
        QJLX: "T_RS_QJGL_QJLX",
        approving: "A"
    };
    var constants = {
        getValue: function() {
            var args = arguments;
            var value = __constants[args[0]];
            var length = args.length;
            for (var i = 1; i < length; i++) {
                if (value) {
                    value = value[args[i]];
                } else {
                    break;
                }
            }
            return value;
        }
    };
    return constants;
});
