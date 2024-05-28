var _sjtj = { // 统计数据
	//维护申请统计
	whsjtj : function() {
		 var whjl;
			$.ajax({
				type : "post",
				async : false,
				url :  WIS_EMAP_SERV.getContextPath()
				+ '/sys/xxhjcssgl/modules/whsq/T_XXB_XXHJCSS_WH_QUERY.do',
				data : {
					SQR : USERID,
					pageNumber : 1
				}, // 发送到服务器的参数
				datatype : "json",
				success : function(result) {
					whjl = result.datas.T_XXB_XXHJCSS_WH_QUERY.totalSize
				}
			})
		 
		document.getElementById("dome1").innerHTML = whjl + '条';
		var shz;
			$.ajax({
				type : "post",
				async : false,
				url : WIS_EMAP_SERV.getContextPath()
						+ '/sys/emapflow/*default/index/queryUserTasks.do',
				data : {
					nodeId : '',
					appName : 'xxhjcssgl',
					module : 'modules',
					page : 'whsq',
					taskType : 'ALL',
					action : 'T_XXB_XXHJCSS_WH_QUERY',
					flowStatus : 1,
				}, // 发送到服务器的参数
				datatype : "json",
				success : function(result) {
					shz = result.datas.queryUserTasks.totalSize
				}
			})
			document.getElementById("dome2").innerHTML = shz + '条';
		var ybh;
			$.ajax({
				type : "post",
				async : false,
				url : WIS_EMAP_SERV.getContextPath()
						+ '/sys/emapflow/*default/index/queryUserTasks.do',
				data : {
					nodeId : '',
					appName : 'xxhjcssgl',
					module : 'modules',
					page : 'whsq',
					taskType : 'ALL',
					action : 'T_XXB_XXHJCSS_WH_QUERY',
					flowStatus : 2,
				}, // 发送到服务器的参数
				datatype : "json",
				success : function(result) {
					ybh = result.datas.queryUserTasks.totalSize
				}
			})
			document.getElementById("dome3").innerHTML = ybh + '条';
		var sqcg;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'whsq',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_WH_QUERY',
				flowStatus : 3,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqcg = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("dome4").innerHTML = sqcg + '条';

		var sqsb;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'whsq',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_WH_QUERY',
				flowStatus : 5,
				pageSize : 10,
				pageNumber : 1,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqsb = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("dome5").innerHTML = sqsb + '条';

		var zzsq;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'whsq',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_WH_QUERY',
				flowStatus : '4,6',
				pageSize : 10,
				pageNumber : 1,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				zzsq = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("dome6").innerHTML = zzsq + '条';
	},
//维护审核统计
whshtj : function() {
	
	
	 var whsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'whsh',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'whsh',
			//	taskType : 'ALL_TASK',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_WH_QUERY',
				pageSize : 10,
				pageNumber : 1,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				whsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("whsh1").innerHTML = whsh + '条';
	 
	var whshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'whsh',
			taskType: 'NOTEND',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'whsh',
			action : 'T_XXB_XXHJCSS_WH_QUERY',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			whshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("whsh2").innerHTML = whshdb + '条';
	 var whcg = [{"name":"ZT","value":"10","linkOpt":"AND","builder":"equal"}]		        
	 whcg =  JSON.stringify(whcg)
	var whshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : '',
			taskType: 'ALL',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'whsh',
			querySetting :whcg,
			action : 'T_XXB_XXHJCSS_WH_QUERY',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			whshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("whsh3").innerHTML = whshyb + '条';
},
//维护处理统计
whcltj : function() {		
	 var whsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'whcl',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'whcl',
			//	taskType : 'ALL_TASK',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_WH_QUERY',
				pageSize : 10,
				pageNumber : 1,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				whsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("whsh1").innerHTML = whsh + '条';
	 
	var whshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'whcl',
			taskType: 'NOTEND',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'whcl',
			action : 'T_XXB_XXHJCSS_WH_QUERY',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			whshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("whsh2").innerHTML = whshdb + '条';
	 var whcg = [{"name":"ZT","value":"10","linkOpt":"AND","builder":"equal"}]		        
	 whcg =  JSON.stringify(whcg)
	var whshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : '',
			taskType: 'ALL',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'whcl',
			querySetting :whcg,
			action : 'T_XXB_XXHJCSS_WH_QUERY',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			whshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("whsh3").innerHTML = whshyb + '条';
},
//关闭申请统计
gbsqtj : function() {
	 var whjl;
		$.ajax({
			type : "post",
			async : false,
			url :  WIS_EMAP_SERV.getContextPath()
			+ '/sys/xxhjcssgl/modules/xxhjcssgbsq/T_XXB_XXHJCSS_GB_QUERY.do',
			data : {
				SQR : USERID,
				pageNumber : 1
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				whjl = result.datas.T_XXB_XXHJCSS_GB_QUERY.totalSize
			}
		})
	 
	document.getElementById("gbsq1").innerHTML = whjl + '条';
		
		var shz;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcssgbsq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_GB_QUERY',
				flowStatus : 1,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				shz = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("gbsq2").innerHTML = shz + '条';
		
		var ybh;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcssgbsq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_GB_QUERY',
				flowStatus : 2,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				ybh = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("gbsq3").innerHTML = ybh + '条';
		
		var sqcg;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcssgbsq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_GB_QUERY',
				flowStatus : 3,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqcg = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("gbsq4").innerHTML = sqcg + '条';

		var sqsb;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcssgbsq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_GB_QUERY',
				flowStatus : 5,
			
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqsb = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("gbsq5").innerHTML = sqsb + '条';

		var zzsq;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcssgbsq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_GB_QUERY',
				flowStatus : '4,6',
				
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				zzsq = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("gbsq6").innerHTML = zzsq + '条';
},
//关闭信息化联络员审核统计
llygbshtj : function() {
	 var gbsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhllyshgb',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhllygbsh',
				taskType : 'ALL',
				//taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_GB_QUERY',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 gbsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("gbsh1").innerHTML = gbsh + '条';
	var gbshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhllyshgb',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhllygbsh',			
			action : 'T_XXB_XXHJCSS_GB_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("gbsh2").innerHTML = gbshdb + '条';

	var gbshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhllyshgb',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhllygbsh',			
			action : 'T_XXB_XXHJCSS_GB_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("gbsh3").innerHTML = gbshyb + '条';
},
//关闭单位负责人审核统计
fzrgbshtj : function() {
	 var gbsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'bmldshgb',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bmldgbsh',
				//taskType : 'ALL_TASK',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_GB_QUERY',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 gbsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("gbsh1").innerHTML = gbsh + '条';
	var gbshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'bmldshgb',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bmldgbsh',		
			action : 'T_XXB_XXHJCSS_GB_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("gbsh2").innerHTML = gbshdb + '条';

	var gbshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'bmldshgb',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bmldgbsh',			
			action : 'T_XXB_XXHJCSS_GB_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("gbsh3").innerHTML = gbshyb + '条';
},
//关闭信息化办审核统计
xxhbgbshtj : function() {
	 var gbsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhbshgb',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhbgbsh',
				//taskType : 'ALL_TASK',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_GB_QUERY',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 gbsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("gbsh1").innerHTML = gbsh + '条';
	var gbshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshgb',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhbgbsh',		
			action : 'T_XXB_XXHJCSS_GB_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("gbsh2").innerHTML = gbshdb + '条';

	var gbshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshgb',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhbgbsh',		
			action : 'T_XXB_XXHJCSS_GB_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("gbsh3").innerHTML = gbshyb + '条';
},
//变更申请统计
bgsqtj : function() {
	 var whjl;
		$.ajax({
			type : "post",
			async : false,
			url :  WIS_EMAP_SERV.getContextPath()
			+ '/sys/xxhjcssgl/modules/bgxtglysq/bgsqxxlb.do',
			data : {
				BGQGLY : USERID,
				pageNumber : 1
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				whjl = result.datas.bgsqxxlb.totalSize
			}
		})
	 
	document.getElementById("bgsq1").innerHTML = whjl + '条';
	
		var shz;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bgxtglysq',
				taskType : 'ALL_TASK',
				action : 'bgsqxxlb',
				flowStatus : 1,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				shz = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("bgsq2").innerHTML = shz + '条';
		
		var ybh;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bgxtglysq',
				taskType : 'ALL_TASK',
				action : 'bgsqxxlb',
				flowStatus : 2,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 ybh = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("bgsq3").innerHTML =  ybh + '条';
		
		var sqcg;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bgxtglysq',
				taskType : 'ALL_TASK',
				action : 'bgsqxxlb',
				flowStatus : 3,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqcg = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("bgsq4").innerHTML = sqcg + '条';

		var sqsb;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bgxtglysq',
				taskType : 'ALL_TASK',
				action : 'bgsqxxlb',
				flowStatus : 5,
			
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqsb = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("bgsq5").innerHTML = sqsb + '条';

		var zzsq;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bgxtglysq',
				taskType : 'ALL_TASK',
				action : 'bgsqxxlb',
				flowStatus : '4,6',
				
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				zzsq = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("bgsq6").innerHTML = zzsq + '条';
},
//变更确认统计
bgqrtj : function() {
	 var bgqr;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xglyqr',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bgxxtglyqr',
				taskType : 'ALL_TASK',
				action : 'bgqrxxlb',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				bgqr = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("bgqr1").innerHTML = bgqr + '条';
	var bgqrdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xglyqr',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bgxxtglyqr',
			action : 'bgqrxxlb',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			bgqrdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("bgqr2").innerHTML = bgqrdb + '条';

	var bgqryb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xglyqr',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bgxxtglyqr',
			action : 'bgqrxxlb',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			bgqryb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("bgqr3").innerHTML = bgqryb + '条';
},
//变更信息化联络员审核统计
llybgshtj : function() {
	 var bgsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhllyshbg',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bgxxhllysh',				
				action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
				//taskType : 'ALL_TASK',
				taskType : 'ALL',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 bgsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("bgsh1").innerHTML =  bgsh + '条';
	var bgshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhllyshbg',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bgxxhllysh',				
			action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			bgshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("bgsh2").innerHTML = bgshdb + '条';

	var bgshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhllyshbg',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bgxxhllysh',				
			action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			bgshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("bgsh3").innerHTML = bgshyb + '条';
},
//变更单位负责人审核统计
fzrbgshtj : function() {
	 var bgsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'bmldshbg',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bgbmldsh',				
				action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
				//taskType : 'ALL_TASK',
				taskType : 'ALL',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 bgsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("bgsh1").innerHTML =  bgsh + '条';
	var bgshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'bmldshbg',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bgbmldsh',					
			action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			bgshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("bgsh2").innerHTML = bgshdb + '条';

	var bgshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'bmldshbg',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bgbmldsh',					
			action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			bgshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("bgsh3").innerHTML = bgshyb + '条';
},
//变更信息化办审核统计
xxhbbgshtj : function() {
	 var bgsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhbshbg',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bgxxhbsh',				
				action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
				//taskType : 'ALL_TASK',
				taskType : 'ALL',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 bgsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("bgsh1").innerHTML =  bgsh + '条';
	var bgshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshbg',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bgxxhbsh',						
			action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			bgshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("bgsh2").innerHTML = bgshdb + '条';

	var bgshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshbg',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bgxxhbsh',					
			action : 'T_XXB_XXHJCSS_ZRRBGJL_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			bgshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("bgsh3").innerHTML = bgshyb + '条';
},
//基础设施申请统计
jcsssqtj : function() {
	 var whjl;
	  var cgsj = [{"name":"ZT","value":"6","linkOpt":"AND","builder":"moreEqual"}]		        
      cgsj =  JSON.stringify(cgsj)	
		$.ajax({
			type : "post",
			async : false,
			url :  WIS_EMAP_SERV.getContextPath()
			+ '/sys/xxhjcssgl/modules/xxhjcsssq/T_XXB_XXHJCSS_JBXX_QUERY.do',
			data : {
				SFRZH : USERID,
				pageNumber : 1
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				whjl = result.datas.T_XXB_XXHJCSS_JBXX_QUERY.totalSize
			}
		})
	 
	document.getElementById("sq1").innerHTML = whjl + '条';
	  var shz;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcsssq',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				flowStatus : 1,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				shz = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("sq2").innerHTML = shz + '条';
		
		var ybh;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcsssq',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				flowStatus : 2,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				ybh = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("sq3").innerHTML = ybh + '条';
		
		var sqcg;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcsssq',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				//querySetting :cgsj,
				flowStatus : 3,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqcg = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("sq4").innerHTML = sqcg + '条';

		var sqsb;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcsssq',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				flowStatus : 5,
			
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqsb = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("sq5").innerHTML = sqsb + '条';
		var zzsq;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhjcsssq',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				flowStatus : '4,6',
				
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				zzsq = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("sq6").innerHTML = zzsq + '条';
},
//信息化联络员申请审核统计
llysqshtj : function() {
	 var sqsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhllyshsq',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhllyshsq',				
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("sqsh1").innerHTML =  sqsh + '条';
	 var sqshjl;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhllyshsq',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhllyshsq',				
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL_TASK',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqshtj = result.datas.queryUserTasks.totalSize
			}
		})
	 
	/*document.getElementById("sqsh2").innerHTML =  sqshtj + '条';*/
	var sqshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhllyshsq',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhllyshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh3").innerHTML = sqshdb + '条';

	var sqshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhllyshsq',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhllyshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshyb = result.datas.queryUserTasks.totalSize
		}
	})
	/*document.getElementById("sqsh4").innerHTML = sqshyb + '条';*/
},
//部门领导申请审核统计
fzrsqshtj : function() {
	 var sqsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'bmldshsq',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bmldshsq',				
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("sqsh1").innerHTML =  sqsh + '条';
	 var sqshjl;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'bmldshsq',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bmldshsq',				
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL_TASK',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqshtj = result.datas.queryUserTasks.totalSize
			}
		})
	 
/*	document.getElementById("sqsh2").innerHTML =  sqshtj + '条';*/
	var sqshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'bmldshsq',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bmldshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh3").innerHTML = sqshdb + '条';

	var sqshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'bmldshsq',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bmldshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshyb = result.datas.queryUserTasks.totalSize
		}
	})
	/*document.getElementById("sqsh4").innerHTML = sqshyb + '条';*/
},
//教务处申请审核统计
jwcsqshtj : function() {
	 var sqsh;
	 var cgsj = [
               /*  {"name":"ZT","value":"7","linkOpt":"AND","builder":"moreEqual"},*/
                 {"name":"SBFL","value":"JX","linkOpt":"AND","builder":"equal"}
                 ]		        
     cgsj =  JSON.stringify(cgsj)	
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'jwcsh',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'jwcshsq',				
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL',
				querySetting:cgsj,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("sqsh1").innerHTML =  sqsh + '条';
	 var sqshjl;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'jwcsh',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'jwcshsq',			
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL_TASK',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqshtj = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("sqsh2").innerHTML =  sqshtj + '条';
	var sqshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'jwcsh',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'jwcshsq',			
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh3").innerHTML = sqshdb + '条';

	var sqshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'jwcsh',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'jwcshsq',			
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh4").innerHTML = sqshyb + '条';
},
//科技处申请审核统计
kjcsqshtj : function() {
	 var sqsh;
	 var cgsj = [
                 {"name":"ZT","value":"7","linkOpt":"AND","builder":"moreEqual"},
                 {"name":"SBFL","value":"KY","linkOpt":"AND","builder":"equal"}
                 ]		        
     cgsj =  JSON.stringify(cgsj)	
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'kjcsh',	
				appName : 'xxhjcssgl',
				module : 'modules', 
				page: 'kjcshsq',			
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL',
				querySetting:cgsj,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("sqsh1").innerHTML =  sqsh + '条';
	 var sqshjl;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'kjcsh',	
				appName : 'xxhjcssgl',
				module : 'modules', 
				page: 'kjcshsq',			
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL_TASK',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqshtj = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("sqsh2").innerHTML =  sqshtj + '条';
	var sqshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'kjcsh',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'kjcshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh3").innerHTML = sqshdb + '条';

	var sqshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'kjcsh',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'kjcshsq',			
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh4").innerHTML = sqshyb + '条';
},
//信息化办申请统计
xxhbshtj : function() {
	 var cgsj = [{"name":"ZT","value":"6","linkOpt":"AND","builder":"moreEqual"}]		        
     cgsj =  JSON.stringify(cgsj)
      var sqz = [{"name":"ZT","value":"","linkOpt":"AND","builder":"equal"}]		        
	sqz =  JSON.stringify(sqz)
	 var cksqz = [{"name":"ZT","value":"3","linkOpt":"AND","builder":"equal"}]		        
	 cksqz =  JSON.stringify(cksqz)
	 var ckgbz = [{"name":"ZT","value":"4","linkOpt":"AND","builder":"equal"}]		        
	 ckgbz =  JSON.stringify(ckgbz)
	 
	 var sqsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhbsh',	
				appName : 'xxhjcssgl',
				module : 'modules', 
				page: 'xxhbsqsh',			
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("sqsh1").innerHTML =  sqsh + '条';
	 var sqshjl;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhbsh',	
				appName : 'xxhjcssgl',
				module : 'modules', 
				page: 'xxhbsqsh',			
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL_TASK',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqshtj = result.datas.queryUserTasks.totalSize
			}
		})
	 
	/*document.getElementById("sqsh2").innerHTML =  sqshtj + '条';*/
	var sqshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbsh',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbsqsh',					
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh2").innerHTML = sqshdb + '条';

	var sqshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbsh',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbsqsh',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshyb = result.datas.queryUserTasks.totalSize
		}
	})
	/*document.getElementById("sqsh4").innerHTML = sqshyb + '条';*/
	var sqcg;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbsh',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbsqsh',			
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			 querySetting :cgsj,
			taskType: 'ALL',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqcg = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh3").innerHTML = sqcg + '条';
	var sqzss;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbsh',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbsqsh',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			 querySetting :sqz,
			taskType: 'ALL',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqzss = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh4").innerHTML = sqzss + '条';
	var cksqzss;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbsh',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbsqsh',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			 querySetting :cksqz,
			taskType: 'ALL',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			cksqzss = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh5").innerHTML = cksqzss + '条';
	var ckgbzss;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbsh',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbsqsh',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			querySetting :ckgbz,
			taskType: 'ALL',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			ckgbzss = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh6").innerHTML = ckgbzss + '条';
},

//信息化办申请处理统计
xxhbsqshtj : function() {
	 var cgsj = [{"name":"ZT","value":"6","linkOpt":"AND","builder":"moreEqual"}]		        
     cgsj =  JSON.stringify(cgsj)
      var sqz = [{"name":"ZT","value":"","linkOpt":"AND","builder":"equal"}]		        
	sqz =  JSON.stringify(sqz)
	 var cksqz = [{"name":"ZT","value":"3","linkOpt":"AND","builder":"equal"}]		        
	 cksqz =  JSON.stringify(cksqz)
	 var ckgbz = [{"name":"ZT","value":"4","linkOpt":"AND","builder":"equal"}]		        
	 ckgbz =  JSON.stringify(ckgbz)
	 var sqsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhbshsq',	
				appName : 'xxhjcssgl',
				module : 'modules', 
				page: 'xxhbshsq',			
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("sqsh1").innerHTML =  sqsh + '条';
	 var sqshjl;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhbshsq',	
				appName : 'xxhjcssgl',
				module : 'modules', 
				page: 'xxhbshsq',			
				action : 'T_XXB_XXHJCSS_JBXX_QUERY',
				taskType : 'ALL_TASK',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 sqshtj = result.datas.queryUserTasks.totalSize
			}
		})
	 
	/*document.getElementById("sqsh2").innerHTML =  sqshtj + '条';*/
	var sqshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshsq',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbshsq',					
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh2").innerHTML = sqshdb + '条';

	var sqshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshsq',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqshyb = result.datas.queryUserTasks.totalSize
		}
	})
	//document.getElementById("sqsh4").innerHTML = sqshyb + '条';
	var sqcg;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshsq',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			 querySetting :cgsj,
			taskType: 'ALL',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqcg = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh3").innerHTML = sqcg + '条';
	var sqzss;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshsq',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			 querySetting :sqz,
			taskType: 'ALL',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			sqzss = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh4").innerHTML = sqzss + '条';
	
	var cksqzss;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshsq',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			 querySetting :cksqz,
			taskType: 'ALL',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			cksqzss = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh5").innerHTML = cksqzss + '条';
	var ckgbzss;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbshsq',	
			appName : 'xxhjcssgl',
			module : 'modules', 
			page: 'xxhbshsq',				
			action : 'T_XXB_XXHJCSS_JBXX_QUERY',
			querySetting :ckgbz,
			taskType: 'ALL',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			ckgbzss = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("sqsh6").innerHTML = ckgbzss + '条';
},
//年审申请统计
nssqtj : function() {
	 var whjl;
		$.ajax({
			type : "post",
			async : false,
			url :  WIS_EMAP_SERV.getContextPath()
			+ '/sys/xxhjcssgl/modules/nssq/T_XXB_XXHJCSS_NS_QUERY.do',
			data : {
				SQR : USERID,
				pageNumber : 1,
				pageSize:1000
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				whjl = result.datas.T_XXB_XXHJCSS_NS_QUERY.totalSize
			}
		})
	 
	document.getElementById("nssq1").innerHTML = whjl + '条';
		
		var shz;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'nssq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_NS_QUERY',
				flowStatus : 1,
				pageNumber : 1,
				pageSize:1000
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				shz = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("nssq2").innerHTML = shz + '条';
		
		var ybh;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'nssq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_NS_QUERY',
				flowStatus : 2,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				ybh = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("nssq3").innerHTML = ybh + '条';
		
		var sqcg;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'nssq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_NS_QUERY',
				flowStatus : 3,
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqcg = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("nssq4").innerHTML = sqcg + '条';

		var sqsb;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'nssq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_NS_QUERY',
				flowStatus : 5,
			
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				sqsb = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("nssq5").innerHTML = sqsb + '条';

		var zzsq;
		$.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : '',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'nssq',
				taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_NS_QUERY',
				flowStatus : '4,6',
				
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				zzsq = result.datas.queryUserTasks.totalSize
			}
		})
		document.getElementById("nssq6").innerHTML = zzsq + '条';
},
//年审信息化联络员审核统计
llynsshtj : function() {
	 var gbsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhllyns',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhllyns',
				taskType : 'ALL',
				//taskType : 'ALL_TASK',
				action : 'T_XXB_XXHJCSS_NS_QUERY',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 gbsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("nssh1").innerHTML = gbsh + '条';
	var gbshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhllyns',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhllyns',			
			action : 'T_XXB_XXHJCSS_NS_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("nssh2").innerHTML = gbshdb + '条';

	var gbshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhllyns',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhllyns',			
			action : 'T_XXB_XXHJCSS_NS_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("nssh3").innerHTML = gbshyb + '条';
},
//年审单位负责人审核统计
fzrnsshtj : function() {
	 var gbsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'bmldns',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'bmldns',
				//taskType : 'ALL_TASK',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_NS_QUERY',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 gbsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("nssh1").innerHTML = gbsh + '条';
	var gbshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'bmldns',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bmldns',		
			action : 'T_XXB_XXHJCSS_NS_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("nssh2").innerHTML = gbshdb + '条';

	var gbshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'bmldns',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'bmldns',				
			action : 'T_XXB_XXHJCSS_NS_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("nssh3").innerHTML = gbshyb + '条';
},
//年审信息化办审核统计
xxhbnsshtj : function() {
	 var gbsh;
	 $.ajax({
			type : "post",
			async : false,
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/emapflow/*default/index/queryUserTasks.do',
			data : {
				nodeId : 'xxhbns',
				appName : 'xxhjcssgl',
				module : 'modules',
				page : 'xxhbns',
				//taskType : 'ALL_TASK',
				taskType : 'ALL',
				action : 'T_XXB_XXHJCSS_NS_QUERY',
			}, // 发送到服务器的参数
			datatype : "json",
			success : function(result) {
				 gbsh = result.datas.queryUserTasks.totalSize
			}
		})
	 
	document.getElementById("nssh1").innerHTML = gbsh + '条';
	var gbshdb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbns',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhbns',	
			action : 'T_XXB_XXHJCSS_NS_QUERY',
			taskType: 'NOTEND',
		
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshdb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("nssh2").innerHTML = gbshdb + '条';

	var gbshyb;
	$.ajax({
		type : "post",
		async : false,
		url : WIS_EMAP_SERV.getContextPath()
				+ '/sys/emapflow/*default/index/queryUserTasks.do',
		data : {
			nodeId : 'xxhbns',
			appName : 'xxhjcssgl',
			module : 'modules',
			page : 'xxhbns',		
			action : 'T_XXB_XXHJCSS_NS_QUERY',
			taskType: 'ENDED',
		}, // 发送到服务器的参数
		datatype : "json",
		success : function(result) {
			gbshyb = result.datas.queryUserTasks.totalSize
		}
	})
	document.getElementById("nssh3").innerHTML = gbshyb + '条';
},
}
