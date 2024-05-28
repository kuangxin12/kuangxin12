var _emapShowItem = {
	addRequired : function(dataName) {
		var self = $("#emapForm");
		$formGroup = $("#emapForm  [data-name=" + dataName + "]").parent()
				.parent();
		if (!$formGroup.hasClass('bh-required')) {
			$formGroup.addClass('bh-required');
			// 针对1.1， 1.2不同校验组件做兼容
			if (self.data('bhvalidate')) {
				// 1.2
				self.bhValidate('requireItem', dataName);
			} else {
				// 1.1
				self.emapForm('reloadValidate');
			}
		}
	},
	removeRequired : function(dataName) {
		var self = $("#emapForm");
		$formGroup = $("#emapForm  [data-name=" + dataName + "]").parent()
				.parent();
		if ($formGroup.hasClass('bh-required')) {
			$formGroup.removeClass('bh-required');
			// 针对1.1， 1.2不同校验组件做兼容
			if (self.data('bhvalidate')) {
				// 1.2
				self.bhValidate('unRequireItem', dataName);
			} else {
				// 1.1
				self.emapForm('reloadValidate');
			}
		}
	},
	showItemByLx : function(lx, node,ifEdit) {

		if (lx == "虚拟机") {
			$("#emapForm [data-name=TGFWQ_PPXH]").parent().parent().parent()
					.parent().parent().css("display", "none");
			
			$("#emapForm [data-name=TGFWQ_SFYZ]").parent().parent().parent()
			.parent().parent().css("display", "none");
			 $("#emapForm [data-name=CK_DKH]").parent().parent().parent()
			 .parent().parent().css("display", "none");
			$("#emapForm [data-name=TGFWQ_CPUHX]").parent().parent().css("display", "none");
			$("#emapForm [data-name=TGFWQ_CPUZP]").parent().parent().css("display", "none");
			$("#emapForm [data-name=TGFWQ_CPUSL]").parent().parent().css("display", "none");
			
	   if (node == "xxhbshsq") {	
		$("#emapForm [data-name=TGFWQ_SFYZ]").parent().parent().parent()
		.parent().parent().css("display", "block");
				$("#emapForm [data-name=XNJ_IP]").parent().parent().parent().css("display", "block");
				$("#emapForm [data-name=TGFWQ_SFYZ]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=TGFWQ_SFYCC]").parent().parent()
						.parent().css("display", "none");
				$("#emapForm [data-name=TGFWQ_YM]").parent().parent().parent()
						.css("display", "none");
				$("#emapForm [data-name=TGFWQ_IP]").parent().parent().parent()
						.css("display", "none");
				$("#emapForm [data-name=TGFWQ_JJH]").parent().parent().parent()
						.css("display", "none");
				$("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent()
						.css("display", "none");
				this.addRequired("XNJ_IP");
			} else {
			this.addRequired("XNJ_CZXT");
			this.addRequired("XNJ_NC");
			this.removeRequired("XNJ_IP");
			this.removeRequired("TGFWQ_PPXH");
			this.removeRequired("TGFWQ_CZXT");
			this.removeRequired("TGFWQ_XH");
			this.removeRequired("TGFWQ_MAC");
			this.removeRequired("TGFWQ_CPU");
			this.removeRequired("TGFWQ_NC");
			this.removeRequired("TGFWQ_SFYZ");
			this.removeRequired("TGFWQ_SFYCC");
			this.removeRequired("TGFWQ_YM");
			this.removeRequired("TGFWQ_IP");
			this.removeRequired("TGFWQ_JJH");
			this.removeRequired("TGFWQ_WZ");
			this.removeRequired("TGFWQ_FWQLX");
			this.removeRequired("TGFWQ_WIDTH");
			this.removeRequired("TGFWQ_HEIGHT");
			this.removeRequired("TGFWQ_DEPTH");
			this.removeRequired("TGFWQ_PHOTO");
			// this.removeRequired("CK_IP");
			// this.removeRequired("CK_DKH");
			}
	   if(!ifEdit){	
	   $("#emapForm [data-name=XNJ_CN]").parent().parent().css("display", "block").parent().parent().parent().show();
	   this.addRequired("XNJ_CN");
	   }
		} else if (lx == "托管服务器") {
			$("#emapForm [data-name=XNJ_NC]").parent().parent().parent().parent().parent().hide();
			$("#emapForm [data-name=CK_DKH]").parent().parent().parent()
			.parent().parent().css("display", "none");
			// 信息化办审核申请时记录：服务器配置是否与申请表一致、服务器已除尘、主机IP、域名、 机架号、位置，在此之前这些字段不显示
			if (node == "xxhbshsq") {
				
				/*$("#emapForm [data-name=XNJ_NC]").parent().parent()
				.parent().css("display", "none");*/	
				$("#emapForm [data-name=XNJ_IP]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=XNJ_SFPT]").parent().parent()
				.parent().css("display", "none");
				$("#emapForm [data-name=TGFWQ_SFYZ]").parent().parent().parent()
				.parent().parent().css("display", "block");
				/*$("#emapForm [data-name=TGFWQ_YM]").parent().parent().parent()
				.css("display", "none");*/
			/*	$("#emapForm [data-name=TGFWQ_SFYZ]").parent().parent().parent()
				.parent().parent().parent().parent().parent().css("display", "block");*/
				/*$("#emapForm [data-name=TGFWQ_SFYZ]").parent().parent()
						.parent().css("display", "block");
				$("#emapForm [data-name=TGFWQ_SFYCC]").parent().parent()
						.parent().css("display", "block");
				$("#emapForm [data-name=TGFWQ_YM]").parent().parent().parent()
						.css("display", "block");
				$("#emapForm [data-name=TGFWQ_IP]").parent().parent().parent()
						.css("display", "block");
				$("#emapForm [data-name=TGFWQ_JJH]").parent().parent().parent()
						.css("display", "block");
				$("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent()
						.css("display", "block");*/
				/*this.addRequired("TGFWQ_SFYZ");
				this.addRequired("TGFWQ_SFYCC");
				this.addRequired("TGFWQ_IP");
				this.addRequired("TGFWQ_JJH");
				this.addRequired("TGFWQ_WZ");*/
//				$("#emapForm [data-name=MC]").attr("disabled", true);
//				$("#emapForm [data-name=QTSM]").attr("readonly", true);
//				$("#emapForm [data-name=SQDW]").attr("readonly", true);
//				$("#emapForm [data-name=YT]").attr("readonly", true);
//				$("#emapForm [data-name=CK_SFYSQCK]").jqxSwitchButton({ disabled:true });
//				$("#emapForm [data-name=SFRZH]").attr("readonly", true);
//				$("#emapForm [data-name=GLYXM]").attr("readonly", true);
//				$("#emapForm [data-name=EMAIL]").attr("readonly", true);
//				$("#emapForm [data-name=BGDH]").attr("readonly", true);
//				$("#emapForm [data-name=SJ]").attr("readonly", true);
//				$("#emapForm [data-name=TGFWQ_PPXH]").attr("readonly", true);
//				$("#emapForm [data-name=TGFWQ_PPXH]").attr("readonly", true);
//				$("#emapForm [data-name=TGFWQ_SDRJ]").attr("readonly", true);
//				$("#emapForm [data-name=TGFWQ_FHQ]").attr("readonly", true);
//				$("#emapForm [data-name=TGFWQ_CPUHX]").attr("readonly", true);
//				$("#emapForm [data-name=TGFWQ_CPUZP]").attr("readonly", true);
//				$("#emapForm [data-name=TGFWQ_CPUSL]").attr("readonly", true);
//				$("#emapForm [data-name=TGFWQ_NC]").attr("readonly", true);
//				$("#emapForm [data-name=CK_DKH]").attr("readonly", true);
			} else {
				/*$("#emapForm [data-name=TGFWQ_SFYZ]").parent().parent()
						.parent().css("display", "none");
				$("#emapForm [data-name=TGFWQ_SFYCC]").parent().parent()
						.parent().css("display", "none");
				$("#emapForm [data-name=TGFWQ_YM]").parent().parent().parent()
						.css("display", "none");
				$("#emapForm [data-name=TGFWQ_IP]").parent().parent().parent()
						.css("display", "none");
				$("#emapForm [data-name=TGFWQ_JJH]").parent().parent().parent()
						.css("display", "none");
				$("#emapForm [data-name=TGFWQ_WZ]").parent().parent().parent()
						.css("display", "none");*/
				$("#emapForm [data-name=TGFWQ_SFYZ]").parent().parent().parent()
				.parent().parent().css("display", "none");
				this.removeRequired("TGFWQ_SFYZ");
				this.removeRequired("TGFWQ_SFYCC");
				this.removeRequired("TGFWQ_YM");
				this.removeRequired("TGFWQ_IP");
				this.removeRequired("TGFWQ_JJH");
				this.removeRequired("TGFWQ_WZ");
			}

			$("#emapForm [data-name=TGFWQ_PPXH]").parent().parent().parent()
					.parent().parent().css("display", "block");
			$("#emapForm [data-name=XNJ_CZXT]").parent().parent().parent().css(
					"display", "none");
		/*	$("#emapForm [data-name=XNJ_IP]").parent().parent().parent()
					.parent().parent().css("display", "none");*/
			// $("#emapForm [data-name=CK_DKH]").parent().parent().parent()
			// .parent().parent().css("display", "none");

			this.removeRequired("XNJ_CPU");
			this.removeRequired("XNJ_NC");
			this.removeRequired("XNJ_CZXT");
			this.removeRequired("XNJ_SJYP");
			this.addRequired("TGFWQ_PPXH");
			this.addRequired("TGFWQ_CZXT");
			this.addRequired("TGFWQ_XH");
			this.addRequired("TGFWQ_MAC");
			this.addRequired("TGFWQ_CPU");
			this.addRequired("TGFWQ_NC");
			// this.removeRequired("CK_IP");
			// this.removeRequired("CK_DKH");

			$("#sm")
					.html(
							"说明：1. 托管服务器经信息中心审批通过后方可安排迁入托管机房。" +
							"2. 托管服务器内重要资料数据请自行及时备份。" +
							"3. “型号”栏请写清电脑的详细型号，如“DELL PowerEdge 1900 PC服务器”。" +
							"4. 所有托管的Windows操作系统服务器都必须安装杀毒软件，启用防火墙；Linux操作系统服务器须开启Linux自带的防火墙。");
			if(!ifEdit){
				$("#emapForm [data-name=TGFWQ_CN]").parent().parent().css("display", "block").parent().parent().parent().show();
				   this.addRequired("TGFWQ_CN");
			}
			
		}
		// 是否申请出口，申请出口为true时，显示主机申请开放端口号
		/*if ($("#emapForm [data-name=CK_SFYSQCK]").val() == '1') {
			$("#emapForm [data-name=CK_DKH]").parent().parent().parent()
					.parent().parent().css("display", "block");
			this.addRequired("CK_DKH");
		} else {
			$("#emapForm [data-name=CK_DKH]").parent().parent().parent()
					.parent().parent().css("display", "none");
			this.removeRequired("CK_DKH");
		}*/
		
	}
}
