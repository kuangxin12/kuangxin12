;(function (commonJsUtil, undefined) {
	commonJsUtil.getRouterParams = function (){
    	var url = window.location.href;
    	var params = [];
    	if(url.indexOf("#")>0){
    		var str = url.split("#/")[1];
    		params = str.split("/");
    	}
    	return params;
    };
    
    /**
	 * 提示框
	 * type:弹框类型(默认为success)：warning danger success confirm
	 * title:弹框标题
	 * content：弹框内容
	 * func:回调函数
	 * okText:执行回调函数的按钮名称
	 */
    commonJsUtil.showDialog = function(type,title,content,func,okText){
    	var utils = require('utils');
			utils.dialog({
			    type: type, 
			    title: title,
			    content: content,
			    okCallback: func,
			    okText: okText
			});
    };
    
    /**
     * 加载模板
     */
    commonJsUtil.loadCss = function(themesName){
		    var head = document.getElementsByTagName('head').item(0);
		    css = document.createElement('link');
		    css.href = "./modules/app/themes/"+themesName+"/appCustom.css";
		    css.rel = 'stylesheet';
		    css.type = 'text/css';
		    css.id = 'loadCss';
		    head.appendChild(css);
	};
    
	commonJsUtil.showBhTip = function(action,content){
			switch (action) {
	        //信息提示
	        case "primary":
	            $.bhTip({
	                content: content,
	                state: 'primary'
	            });
	            break;
	            //成功提示
	        case "success":
	            $.bhTip({
	                content: content,
	                state: 'success'
	            });
	            break;
	            //警告提示
	        case "warning":
	            $.bhTip({
	                content: content,
	                state: 'warning'
	            });
	            break;
	            //错误提示
	        case "danger":
	            $.bhTip({
	                content: content,
	                state: 'danger'
	            });
	            break;
	            //加载
	        case "loading":
	            $.bhTip({
	                content: content,
	                state: 'loading'
	            });
	            break;
	            //自定义停留时间
	        case "hideTime":
	            $.bhTip({
	                content: content,
	                state: 'success',
	                hideWaitTime: 3000
	            });
	            break;
	            //自定义图标提示
	        case "customIcon":
	            $.bhTip({
	                content: content,
	                state: 'success',
	                iconClass: 'icon-star'
	            });
	            break;
	            //提示关闭的回调
	        case "onClose":
	            $.bhTip({
	                content: content,
	                state: 'success',
	                onClosed: function() {
	                    $('mark').html('提示已关闭');
	                }
	            });
	            break;
	            //自定义操作提示
	        case "customOption":
	            $.bhTip({
	                content: content,
	                state: 'success',
	                options: [{
	                    text: '查看',
	                    callback: function() {
	                        $('mark').html('查看详细信息');
	                    }
	                }]
	            });
	            break;
	    }
	};
    
    /**
     * 去除文本中所有html标签
     */
    
    commonJsUtil.delHtmlTag = function(str){
    	if(str){
    		return str.replace(/<\/?.+?>/g,"").replace(/&nbsp;/g,""); 
    	}
    },
    
    /**
     * 初始化分页
     */
    commonJsUtil.initPaginator = function(_this,data){
    	// 构建分页栏
        var pageTotalSize  = Math.ceil(data.totalSize / _this.params.pageSize);
        if (isNaN(pageTotalSize)) return;
        _this.params.pageTotalSize = pageTotalSize;

        var totalPageItems = [];
        var startIndex = Math.floor((_this.params.pageIndex-1)/_this.params.pageItems)*_this.params.pageItems;
        for (var i=1; i<=_this.params.pageItems; i++) {
            var index = startIndex++ +1;
            if (index <= pageTotalSize) { totalPageItems.push(index); }
        }
        var paginatorHtml = "";
        paginatorHtml += "<div class=\"wrapper\">";
        paginatorHtml += "<div class=\"paginator\">";
        if(_this.params.pageIndex != "1"){
       	 paginatorHtml += "<a class=\"paginator-pre\" href=\"javascript:;\">上一页<span class=\"paginator-arrow-left\"></span></a>";
        }
        for (var i = 0; i < totalPageItems.length; i ++) {
         	var t = totalPageItems[i];
         	paginatorHtml += '<a href="javascript:;" class="'+ (t == _this.params.pageIndex ? 'paginator-curr' : '') +'" ';
         	paginatorHtml += 'role="goPageIndex" pageindex="'+ t +'" title="第'+ t +'页">' + t + '</a>';
         }
        paginatorHtml += "<a class=\"paginator-next\" href=\"javascript:;\">下一页<span class=\"paginator-arrow-right\"></span></a>";
        paginatorHtml += "<span class=\"paginator-count\">共"+_this.params.pageTotalSize+"页</span>";
        paginatorHtml += "</div>";
        
        return paginatorHtml;
    };
    
    /**
     * 初始化分页按钮事件
     */
    commonJsUtil.bindEvent = function(_this,dom,entityType){
    	// 最前页事件
    	dom.find("a[role='goFirstPage']").click(function() {
    		_this.params.pageIndex = 1;
    		_this.initListView(entityType);
    	});
    	
    	//上一页事件
    	dom.find("a.paginator-pre").click(function() {
    		var previousPageIndex = _this.params.pageIndex - 1;
    		if (previousPageIndex <= 0) previousPageIndex = 1;
    		_this.params.pageIndex = previousPageIndex;
    		_this.initListView(entityType);
    	});

    	// 下一页事件
    	dom.find("a.paginator-next").click(function() {
    		var nextPageIndex = _this.params.pageIndex + 1;
    		if (nextPageIndex > _this.params.pageTotalSize) nextPageIndex = _this.params.pageTotalSize;
    		_this.params.pageIndex = nextPageIndex;
    		_this.initListView(entityType);
    	});

    	// 最后页事件
    	dom.find("a[role='goLastPage']").click(function() {
    		_this.params.pageIndex = _this.params.pageTotalSize;
    		_this.initListView(entityType);
    	});
    	
    	// 指定跳转到第几页事件
    	dom.find("a[role='goPageIndex']").click(function() {
    		_this.params.pageIndex = parseInt($(this).attr("pageindex"));
    		_this.initListView(entityType);
    	});
    	
    	// 指定每页显示的条数
    	dom.find("select[role='goPageSize']").change(function() {
    		_this.params.pageSize = parseInt(this.value);
    		_this.params.pageIndex = 1;
    		_this.initListView(entityType);
    	});
    };
 // 生成随机guid数
    commonJsUtil.getGuidGenerator =  function getGuidGenerator() {
    	var S4 = function() {
    		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    	};
    	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4()
    			+ S4() + S4());

    };
 // 给日期类对象添加日期差方法，返回日期与diff参数日期的时间差，单位为天
    commonJsUtil.diffDate = function(date2,date1){
    	var diffTime = (new Date(date2).getTime() - new Date(date1).getTime())/(24 * 60 * 60 * 1000);
    	return diffTime.toFixed(1);
    };
    
  //获取当前时间，格式YYYY-MM-DD
    commonJsUtil.getNowFormatDate = function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    };
    //获取当前时间，格式YYYY-MM-01
    commonJsUtil.getNowFormatDateOne = function getNowFormatDateOne() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;       
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        
        var currentdate = year + seperator1 + month + seperator1 + "01";
        return currentdate;
    };
})(window.commonJsUtil = window.commonJsUtil || {});

