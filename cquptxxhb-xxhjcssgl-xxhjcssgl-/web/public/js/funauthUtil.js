/**
 * 
 */
var _funauth = {
	xxhbdh : '未找到审核人，请联系信息化办确认本部门审核人员数据是否已导入，联系电话:62461341。',
	noxxhlly : '未找到本单位信息化联络员，请联系信息化办确认本部门审核人员数据是否已导入，联系电话:62461341。',
	nodwfzr : '未找到本单位负责人，请联系信息化办确认本部门审核人员数据是否已导入，联系电话:62461341。',
	noxxhb : '未找到信息化办管理员，请联系信息化办确认信息化办审核人员数据是否已导入，联系电话:62461341。',
	/**
	 * 查询应用用户组列表
	 */
	queryGroupIdByName : function(ROLENAME) {
		if(!ROLENAME){
			return false;
		}
		if(typeof ROLENAME =='string' && !ROLENAME.trim()){
			return false;
		}
		var result;
		$.ajax({
					url : WIS_EMAP_SERV.getContextPath()
							+ '/sys/xxhjcssgl/*default/index/EMAP_SAPP_ROLE_RELATION_QUERY.do',
					type : 'post',
					data : {
						pageSize : 1,
						pageNumber : 1,
						ROLENAME : ROLENAME
					},
					async : false,
					success : function(data) {
						//console.log(data);
						result= data;
					}
				});
		return result;
	},
	/**
	 * 查询用户组内用户列表
	 * 
	 * @param groupId
	 */
	queryGroupUserList : function(groupId) {
		var result;
		$.ajax({
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/funauthapp/queryGroupUserList.do',
			type : 'post',
			dataType : "json",
			data : {
				groupId : groupId,
				pageNumber : 1,
				pageSize:1000
			},
			async : false,
			success : function(data) {
				result = data;
			}
		});
		return result;
	},
	/**
	 * 查询部门分管领导和信息化联络员
	 * 
	 * @param groupId
	 */
	queryBmldAndXxhlly : function(JsName) {
		var result;
		$.ajax({
			url : WIS_EMAP_SERV.getContextPath()
					+ '/sys/xxhjcssgl/*default/index/T_YXFZR_QUERY.do',
			type : 'post',
			dataType : "json",
			data : {
				JS : JsName,
				pageNumber : 1,
				pageSize:1000
			},
			async : false,
			success : function(data) {
				result = data;
			}
		});
		return result;
	},
	
	/**
	 * 新查询部门信息化联络员-2019/11/20 出问题后添加
	 */
	newqueryXxhllyCandidate : function() {
		var result;
		var groups = _funauth.queryBmldAndXxhlly('信息化联络员');
		if (groups.datas.T_YXFZR_QUERY.rows != undefined
				&& groups.datas.T_YXFZR_QUERY.rows != null
				&& groups.datas.T_YXFZR_QUERY.totalSize > 0) {
		
					var candidatesArray = groups.datas.T_YXFZR_QUERY.rows;					
					var newcandidatesArray = new Array();
					 //因为用splice方法在for循环的过程中会减短length,然后导致for漏掉，所以新建一个数组用push方法push进在同一个部门的处理人
					for(var i in candidatesArray){
						if(_funauth.isSameDept(candidatesArray[i].ZGH)){
							newcandidatesArray.push(candidatesArray[i])
						}else{
							
						}
					}
					if (newcandidatesArray != undefined && newcandidatesArray != null
							&& newcandidatesArray.length > 0) {
						result = newcandidatesArray;
						
						
					} else {
						result = 'NoCandidate';
					}
			
		} else {
			result = 'NoCandidate';
		}
		return result;
//		return [{id:'7800005',name:'罗欣悦'}];
	},
	/**
	 * 新查询部门信息化分管领导-2019/11/20 出问题后添加
	 */
	newqueryXxhfgldCandidate : function(sqrzh) {
		var result;
		var groups = _funauth.queryBmldAndXxhlly('部门信息化分管领导');
		if (groups.datas.T_YXFZR_QUERY.rows != undefined
				&& groups.datas.T_YXFZR_QUERY.rows != null
				&& groups.datas.T_YXFZR_QUERY.totalSize > 0) {
		
					var candidatesArray = groups.datas.T_YXFZR_QUERY.rows;					
					var newcandidatesArray = new Array();
					 //因为用splice方法在for循环的过程中会减短length,然后导致for漏掉，所以新建一个数组用push方法push进在同一个部门的处理人
					for(var i in candidatesArray){
						if(_funauth.isDwfzrSameDept(candidatesArray[i].ZGH,sqrzh)){
							newcandidatesArray.push(candidatesArray[i])
						}else{
							
						}
					}
					if (newcandidatesArray != undefined && newcandidatesArray != null
							&& newcandidatesArray.length > 0) {
						result = newcandidatesArray;
						
						
					} else {
						result = 'NoCandidate';
					}
			
		} else {
			result = 'NoCandidate';
		}
		return result;
//		return [{id:'7800005',name:'罗欣悦'}];
	},
	/**
	 * 查询部门信息化联络员
	 */
	queryXxhllyCandidate : function() {
		var result;
		var groups = _funauth.queryGroupIdByName('申请单位-信息化联络员');
		if (groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != undefined
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != null
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.totalSize > 0) {
			var id = groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows[0].ROLEID;
			if (id != undefined && id != '' && id != null) {
				var candidates = _funauth.queryGroupUserList(id);
				if (candidates != undefined && candidates != null
						&& candidates.recordsTotal > 0) {
					var candidatesArray=candidates.data;					
					var newcandidatesArray = new Array();
					 //因为用splice方法在for循环的过程中会减短length,然后导致for漏掉，所以新建一个数组用push方法push进在同一个部门的处理人
					for(var i in candidatesArray){
						if(_funauth.isSameDept(candidatesArray[i].id)){
							newcandidatesArray.push(candidatesArray[i])
						}else{
							//candidatesArray.splice(i,1);
						}
					}
					/*if (candidatesArray != undefined && candidatesArray != null
							&& candidatesArray.length > 0) {*/
					if (newcandidatesArray != undefined && newcandidatesArray != null
							&& newcandidatesArray.length > 0) {
						result = newcandidatesArray;
						//result = candidatesArray;
						
					} else {
						result = 'NoCandidate';
					}
				}else{
					result = 'NoCandidate';
				}
			}else {
				result = 'NoCandidate';
			}
		} else {
			result = 'NoCandidate';
		}
		return result;
//		return [{id:'7800005',name:'罗欣悦'}];
	},
	/**
	 * 查询部门信息化分管领导
	 */
	queryXxhfgldCandidate : function() {
		var result;
		var groups = _funauth.queryGroupIdByName('申请单位-负责人');
		if (groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != undefined 
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != null
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.totalSize > 0) {
			var id = groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows[0].ROLEID;
			if (id != undefined && id != '' && id != null) {
				var candidates = _funauth.queryGroupUserList(id);
				if (candidates != undefined && candidates != null
						&& candidates.recordsTotal > 0) {
					var candidatesArray=candidates.data;
					var newcandidatesArray = new Array();
					 //因为用splice方法在for循环的过程中会减短length,然后导致for漏掉，所以新建一个数组用push方法push进在同一个部门的处理人
					for(var i in candidatesArray){
						if(_funauth.isSameDept(candidatesArray[i].id)){
							newcandidatesArray.push(candidatesArray[i])
						}else{
							//candidatesArray.splice(i,1);
						}
					}
					/*if (candidatesArray != undefined && candidatesArray != null
							&& candidatesArray.length > 0) {*/
					if (newcandidatesArray != undefined && newcandidatesArray != null
							&& newcandidatesArray.length > 0) {
						result = newcandidatesArray;
						//result = candidatesArray;
					} else {
						result = 'NoCandidate';
					}
				}else{
					result = 'NoCandidate';
				}
			}else {
				result = 'NoCandidate';
			}
		} else {
			result = 'NoCandidate';
		}
		return result;
//		return [{id:'0102387',name:'蔡婷'}];
	},
	/**
	 * 查询部门信息化办
	 */
	queryXxhbCandidate : function() {
		var result;
		var groups = _funauth.queryGroupIdByName('信息化办-系统管理员');
		if(!groups){
			return 'NoCandidate';
		}
		if (groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != undefined 
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != null
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.totalSize > 0) {
			var id = groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows[0].ROLEID;
			if (id != undefined && id != '' && id != null) {
				var candidates = _funauth.queryGroupUserList(id);
				if (candidates != undefined && candidates != null
						&& candidates.recordsTotal > 0) {
					var candidatesArray=candidates.data;
					/*for(var i in candidatesArray){
						if(_funauth.isSameDept(candidatesArray[i].id)){

						}else{
							candidatesArray.splice(i,1);
						}
					}*/
					if (candidatesArray != undefined && candidatesArray != null
							&& candidatesArray.length > 0) {
						result = candidatesArray;
					} else {
						result = 'NoCandidate';
					}
				}else{
					result = 'NoCandidate';
				}
			}else {
				result = 'NoCandidate';
			}
		} else {
			result = 'NoCandidate';
		}
		return result;
//		return [{id:'0102215',name:'储雯'}];
	},
	/**
	 * 查询部门信息化办主任
	 */
	queryXxhbldCandidate : function() {
		var result;
		var groups = _funauth.queryGroupIdByName('信息化办-领导');
		if(!groups){
			return 'NoCandidate';
		}
		if (groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != undefined 
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != null
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.totalSize > 0) {
			var id = groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows[0].ROLEID;
			if (id != undefined && id != '' && id != null) {
				var candidates = _funauth.queryGroupUserList(id);
				if (candidates != undefined && candidates != null
						&& candidates.recordsTotal > 0) {
					var candidatesArray=candidates.data;
					/*for(var i in candidatesArray){
						if(_funauth.isSameDept(candidatesArray[i].id)){

						}else{
							candidatesArray.splice(i,1);
						}
					}*/
					if (candidatesArray != undefined && candidatesArray != null
							&& candidatesArray.length > 0) {
						result = candidatesArray;
					} else {
						result = 'NoCandidate';
					}
				}else{
					result = 'NoCandidate';
				}
			}else {
				result = 'NoCandidate';
			}
		} else {
			result = 'NoCandidate';
		}
		return result;
//		return [{id:'0102215',name:'储雯'}];
	},
	/**
	 * 查询信息化办处理人
	 */
	queryXxhbClrCandidate : function() {
		var result;
		var groups = _funauth.queryGroupIdByName('信息化办-处理人');
		if(!groups){
			return 'NoCandidate';
		}
		if (groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != undefined 
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != null
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.totalSize > 0) {
			var id = groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows[0].ROLEID;
			if (id != undefined && id != '' && id != null) {
				var candidates = _funauth.queryGroupUserList(id);
				if (candidates != undefined && candidates != null
						&& candidates.recordsTotal > 0) {
					var candidatesArray=candidates.data;
					/*for(var i in candidatesArray){
						if(_funauth.isSameDept(candidatesArray[i].id)){

						}else{
							candidatesArray.splice(i,1);
						}
					}*/
					if (candidatesArray != undefined && candidatesArray != null
							&& candidatesArray.length > 0) {
						result = candidatesArray;
					} else {
						result = 'NoCandidate';
					}
				}else{
					result = 'NoCandidate';
				}
			}else {
				result = 'NoCandidate';
			}
		} else {
			result = 'NoCandidate';
		}
		return result;
//		return [{id:'0102215',name:'储雯'}];
	},
	/**
	 * 查询教务处
	 */
	queryJwcCandidate : function() {
		var result;
		
		var groups = _funauth.queryGroupIdByName('教务处-管理员');
		if(!groups){
			return 'NoCandidate';
		}
		if (groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != undefined 
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != null
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.totalSize > 0) {
			var id = groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows[0].ROLEID;
			if (id != undefined && id != '' && id != null) {
				var candidates = _funauth.queryGroupUserList(id);
				if (candidates != undefined && candidates != null
						&& candidates.recordsTotal > 0) {
					var candidatesArray=candidates.data;
					/*for(var i in candidatesArray){
						if(_funauth.isSameDept(candidatesArray[i].id)){

						}else{
							candidatesArray.splice(i,1);
						}
					}*/
					if (candidatesArray != undefined && candidatesArray != null
							&& candidatesArray.length > 0) {
						result = candidatesArray;
					} else {
						result = 'NoCandidate';
					}
				}else{
					result = 'NoCandidate';
				}
			}else {
				result = 'NoCandidate';
			}
		} else {
			result = 'NoCandidate';
		}
		return result;
	},
	/**
	 * 查询科技处
	 */
	queryKjcCandidate : function() {
		var result;
		var groups = _funauth.queryGroupIdByName('科技处-管理员');
		if(!groups){
			return 'NoCandidate';
		}
		if (groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != undefined 
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows != null
				&& groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.totalSize > 0) {
			var id = groups.datas.EMAP_SAPP_ROLE_RELATION_QUERY.rows[0].ROLEID;
			if (id != undefined && id != '' && id != null) {
				var candidates = _funauth.queryGroupUserList(id);
				if (candidates != undefined && candidates != null
						&& candidates.recordsTotal > 0) {
					var candidatesArray=candidates.data;
//					for(var i in candidatesArray){
//						if(_funauth.isSameDept(candidatesArray[i].id)){
//
//						}else{
//							candidatesArray.splice(i,1);
//						}
//					}
					if (candidatesArray != undefined && candidatesArray != null
							&& candidatesArray.length > 0) {
						result = candidatesArray;
					} else {
						result = 'NoCandidate';
					}
				}else{
					result = 'NoCandidate';
				}
			}else {
				result = 'NoCandidate';
			}
		} else {
			result = 'NoCandidate';
		}
		return result;
	},
	
	parseCandidatesName : function(candidates) {
		var nameStr = "";
		for (var i = 0; i < candidates.length - 1; i++) {
			nameStr += candidates[i]['name'] + "、";
		}
		nameStr += candidates[candidates.length - 1]['name'];
		return nameStr;
	},
	
	//筛选审核人员姓名
	newparseCandidatesName : function(candidates) {
		var shrnameArr = candidates.split(",");
		var nameStr = "";
		var ryname
		for (var i = 0; i < shrnameArr.length; i++) {
			$.ajax({
				url : WIS_EMAP_SERV.getContextPath()
						+ '/sys/xxhjcssgl/*default/index/T_JZG_QUERY.do',
				type: "get",
				 async:false,
				data : {
					pageSize : 1,
					pageNumber : 1,
					ZGH : shrnameArr[i]
				},
				
				success : function(result) {
					 ryname = result.datas.T_JZG_QUERY.rows[0].XM;
					//result= data;
				}
			});
			nameStr += ryname+"、";
			
		}
		//nameStr += candidates[candidates.length - 1]['name'];
		nameStr = nameStr.substring(0, nameStr.lastIndexOf('、'));
		return nameStr;
	},
	
	
	parseCandidatesId : function(candidates) {
		var nameStr = "";
		for (var i = 0; i < candidates.length - 1; i++) {
			nameStr += candidates[i]['id'] + ",";
		}
		nameStr += candidates[candidates.length - 1]['id'];
		return nameStr;
	},
	//筛选审核人员ID
	newparseCandidatesId : function(candidates) {
		var nameStr = "";
		for (var i = 0; i < candidates.length; i++) {
			nameStr += candidates[i]['ZGH'] + ",";
		}
		nameStr = nameStr.substring(0, nameStr.lastIndexOf(','));
		var nameStrArr = nameStr.split(",");
		var nameStrArr = _funauth.unique(nameStrArr);
		var newnameStr ="";
		for (var i = 0; i < nameStrArr.length; i++) {
			newnameStr += nameStrArr[i] + ",";
		}
		newnameStr = newnameStr.substring(0, newnameStr.lastIndexOf(','));
		return newnameStr;
	},
	
	isSameDept:function(zgh){
		var result=false;
		$.ajax({
			url : WIS_EMAP_SERV.getContextPath()
			+ '/sys/xxhjcssgl/*default/index/cxsfwtybm.do',
			type : 'post',
			data : {
				pageSize : 1,
				pageNumber : 1,
				sqr : USERID,
				//sqr : '0100030',
				shr:zgh
			},
			async : false,
			success : function(data) {
				if(data.datas.cxsfwtybm.totalSize>0)
					result=true;
			}
		});
		return result;
	},
	//单位负责人选择代码，根据申请人
	isDwfzrSameDept:function(zgh,sqrzh){
		var result=false;
		$.ajax({
			url : WIS_EMAP_SERV.getContextPath()
			+ '/sys/xxhjcssgl/*default/index/cxsfwtybm.do',
			type : 'post',
			data : {
				pageSize : 1,
				pageNumber : 1,
				//sqr : USERID,
				sqr : sqrzh,  //根据申请人的职工号而不是信息化联络员的职工号
				shr:zgh
			},
			async : false,
			success : function(data) {
				if(data.datas.cxsfwtybm.totalSize>0)
					result=true;
			}
		});
		return result;
	},    
	unique:function(arr) {   //数组去重
	    if (!Array.isArray(arr)) {
	        console.log('type error!')
	        return
	    }
	    var array = [];
	    for (var i = 0; i < arr.length; i++) {
	        if (array .indexOf(arr[i]) === -1) {
	            array .push(arr[i])
	        }
	    }
	    return array;
	},
/*根据李义的方法 提高提交性能  简化寻找同一部门的审核人    2020.4.1 徐康*/	
	parseCandidatesIdliyi : function(candidates) {
		//去重
		var nameStrArr = _funauth.unique(candidates);
		
		var nameStr = "";
		for (var i = 0; i < candidates.length; i++) {
			console.log(candidates[i]);
			nameStr += candidates[i].ZGH + ",";
		}
		nameStr = nameStr.substring(0, nameStr.lastIndexOf(','));
		
		return nameStr;
	},
	
	/**
	 * 查询申请单位负责人-简单方法
	 * 
	 * js:要查询的角色（单位信息化分管领导）
	 * dwdm：单位代码
	 * 
	 * 
返回结果： ​
0: Object { ZGH: "0100207", DWMC: "信息与网络管理中心\\教育信息化办公室", DWDM: "21900", … }
​
1: Object { ZGH: "0101353", DWMC: "信息与网络管理中心\\教育信息化办公室", DWDM: "21900", … }
​
2: Object { ZGH: "7800007", DWMC: "信息与网络管理中心\\教育信息化办公室", DWDM: "21900", … }
	 */
	
	queryXxhfgldSimple : function(JS,DWDM,pageName) {
		
		if(!JS||!DWDM||!pageName){
			this.noxxhlly = '未正确传值，请联系信息化办工作人员！';
			this.nodwfzr='未正确传值，请联系信息化办工作人员！';
			return 'NoCandidate';
		}
		if((typeof JS =='string' && !JS.trim())||(typeof DWDM =='string' && !DWDM.trim())||(typeof DWDM =='string' && !DWDM.trim())){
			this.noxxhlly = '未正确传值，请联系信息化办工作人员！';
			this.nodwfzr='未正确传值，请联系信息化办工作人员！';
			return 'NoCandidate';
		}
		var result=[];
		$.ajax({
			url : WIS_EMAP_SERV.getContextPath()
					+'/sys/xxhjcssgl/modules/'+pageName+'/T_YXFZR_QUERY.do',
			type : 'post',
			data : {
				pageSize : 100,
				pageNumber : 1,
				JS : JS,
				DWDM:DWDM
			},
			async : false,
			success : function(data) {
				result= data.datas.T_YXFZR_QUERY.rows;
			},
			error : function(data){
				this.noxxhlly = '未找到本单位信息化联络员，请联系信息化办确认本部门审核人员数据是否已导入，联系电话:62461341。';
				this.nodwfzr = '未找到本单位负责人，请联系信息化办确认本部门审核人员数据是否已导入，联系电话:62461341。';
				return 'NoCandidate';
			}
			
		});
		if(result.length<1||(typeof result == "undefined")){
			this.noxxhlly = '未找到本单位信息化联络员，请联系信息化办确认本部门审核人员数据是否已导入，联系电话:62461341。';
			this.nodwfzr = '未找到本单位负责人，请联系信息化办确认本部门审核人员数据是否已导入，联系电话:62461341。';
			return 'NoCandidate';
		}
		if(result.length>10){
			this.noxxhlly = '未正确传值，请联系信息化办工作人员！';
			this.nodwfzr='未正确传值，请联系信息化办工作人员！';
			return 'NoCandidate';
		}
		
		return result;
	},
	publicTerFlow:function(proid){ //共用终止方法
		var params = {
  				isDelete: false,
  				processInstanceId:proid,
  			    appName: 'xxhjcssgl',
  				sendMessage : false 
  				}; 
  		
	      $.ajax({
	          url:WIS_EMAP_SERV.getContextPath()+ '/sys/emapflow/tasks/deleteInstance.do',
	          type:'post',
	          data:params,
	          async:false,
	          cache : true,
	           success:function(response) {	
		       }
		    });
	    
	},

}