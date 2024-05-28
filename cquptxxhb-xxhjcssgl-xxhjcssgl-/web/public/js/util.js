var _util = {
	/*
	 * 
	 * 判断是否开始年审：1.在同一个月;2.有效期已过
	 * 
	 * date:时间字符串
	 * 
	 * return:true/false
	 * 
	 */
	ableNs : function(date) {
		var yxq = new Date(date);
		var curr = new Date;
		var year = curr.getFullYear();
		var month = curr.getMonth() + 1;
		if (curr >= yxq)
			return true;
		else if (year < yxq.getFullYear())
			return false;
		else
			return (yxq.getMonth() + 1) == month;
	},
	// 生成随机guid数
	 getGuidGenerator:function() {
		var S4 = function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4()
				+ S4() + S4());
	},
	
	//根据wid获取流程id
	getpromid:function(WID,page,action){
    	var jg='error';
     	$.ajax({
  	  	    type: "post",
  	  	    async: false,
  	  	    url: WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/*default/index/queryObserveUserTasks.do',
  	  	    data: { 
  	  	        taskType:'ALL',
  	  	        nodeId:'' , 
  	  	    appName : 'xxhjcssgl',// 应用的名称，必填
			module : 'modules', // 模块名，可以没有，默认modules
			page : page, // 回调动作的epg的编号，必填
			action : action,		
  	  	       // WID:rowData.WID,
  	  	        querySetting : '[  {"name": "WID", "value": "'+WID+'","builder": "equal","linkOpt": "AND"}]',
  	  	        pageSize: 10,
  	  	        pageNumber: 1,
  	  	       }, //发送到服务器的参数
  	  	    datatype: "json",
  	  	   success: function (result) {
  	  	        var xxsj = result.datas.queryObserveUserTasks.rows;
  	  	      
  	  	        if(xxsj.length>0){
  	  	        	jg= xxsj;
  	  	        }
  	  	   }
  	  	 })
  	  	 return jg;
    },
	
	
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}