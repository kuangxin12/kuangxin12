define(function(require, exports, module) {
    var utils = require('utils');
    var bs = require('./bgxxtglyqrBS');

    var viewConfig = {
        initialize: function(id,data,taskid) {
        	var mode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'T_XXB_XXHJCSS_ZRRBGJL_QUERY', 'form');
            $("#emapForm").emapForm({
                root:WIS_EMAP_SERV.getContextPath(),
                data: mode,
                model: 'h',
                cols:2,
                autoColumn : true,
                readonly:true
            });
          /*  var diz =  WIS_EMAP_SERV.getContextPath()+'/sys/emapflow/tasks/queryFlowState.do?taskId='+taskid+'&defKey=xxhjcssgl.xtglybg'
            document.getElementById('flow').src = diz;
            $("#flow").css("display", "none");*/
            
            var jcssarr = data.rows[0].JCSSID.split(',');
            for(i=0;i<jcssarr.length;i++){
          	  $("#collapse").append("<div id='collapse"+i+"' style='margin-bottom:10px;'></div>"  )
           var jcssxx = WIS_EMAP_SERV.getData(bs.api.pageModel, 'bgjcssxx', {PWID:jcssarr[i],pageNumber:1});
          	 if(jcssxx.totalSize<=0){
	          		  //如果没找到数据则进行下一次
	          		continue;
	          	  }
              var defaultDta = {
              	 data: [{             		 
              	      title: jcssxx.rows[0].MC+"<span style='font-size:8px;'>(点击展开/收起)</span>",
              	     content: [            	               
              	          {
              	        // title: '基础设施信息',
              	         content: "<div id='jbxxForm"+i+"'></div>"
              	        }
              	        
              	        ],
              	       // extend: zk,
              	        attrs:{
              	           id: 'aaa'
              	        }
              	    }],
              	    // 展开节点的回调
              	    // data.node 被展开的节点
              	    nodeExtend: function(data) {
              	        var $node = data.node;
              	        var attributes = data.attrs;
              	    },
              	    // 收缩节点的回调
              	    // data.node 被收缩的节点
              	    nodeCollapse: function(data) {
              	        var $node = data.node;
              	    },
              	    // 创建完成的回调
              	    ready: function() {
              	    }
              	};         
              	$("#collapse"+i).bhCollapse(defaultDta); 
              	 var jbxxmode = WIS_EMAP_SERV.getModel(bs.api.pageModel, 'bgjcssxx', 'form');
                   $("#jbxxForm"+i).emapForm({
                   	root:WIS_EMAP_SERV.getContextPath(),//附件上传时必备属性
                       data: jbxxmode,
                       model: 'h',
                       cols:2,
                       autoColumn : true,
                       readonly:true
                   });
              	 $("#jbxxForm"+i).emapForm("setValue", jcssxx.rows[0]);
              	 	if(jcssxx.rows[0].LX=="虚拟机"){
                    		 $("#jbxxForm"+i+" [data-name=TGFWQ_PPXH]").parent().parent()
         	    			.css("display", "none");
                    		 $("#jbxxForm"+i+" [data-name=TGFWQ_NC]").parent().parent()
          	    			.css("display", "none");
                    		 $("#jbxxForm"+i+" [data-name=TGFWQ_XH]").parent().parent()
          	    			.css("display", "none");
                    		 $("#jbxxForm"+i+" [data-name=TGFWQ_CZXT]").parent().parent()
          	    			.css("display", "none");
                    		 $("#jbxxForm"+i+" [data-name=TGFWQ_CPU]").parent().parent()
           	    			.css("display", "none");
                    		 $("#jbxxForm"+i+" [data-name=TGFWQ_IP]").parent().parent()
          	    			.css("display", "none");
                       	 }
                       	 if(jcssxx.rows[0].LX=="托管服务器"){
                       		 $("#jbxxForm"+i+" [data-name=XNJ_CZXT]").parent().parent()
            	    			.css("display", "none");  
                       		 $("#jbxxForm"+i+" [data-name=XNJ_CPU]").parent().parent()
             	    			.css("display", "none");  
                       		 $("#jbxxForm"+i+" [data-name=XNJ_NC]").parent().parent()
          	    			.css("display", "none"); 
                       		$("#jbxxForm"+i+" [data-name=XNJ_SJYP]").parent().parent()
          	    			.css("display", "none"); 
                       		$("#jbxxForm"+i+" [data-name=XNJ_IP]").parent().parent()
          	    			.css("display", "none");
                       	 }
              	 
            }
            
            $("[data-action=save]").hide();
            this.eventMap = {
            };
        }
    };
    return viewConfig;
});