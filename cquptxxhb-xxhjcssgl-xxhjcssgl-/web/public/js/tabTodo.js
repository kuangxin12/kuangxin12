/**
 * 
 */
;(function fn(window){
	function showTodo(page,title='您有如下待办，如有其他页面待办，请点击右上角菜单切换！'){
		 BH_UTILS.bhWindow(page,title,
					[{
						text : '关闭',
						className : 'bh-btn-default',
						callback : function() {}
					} ], {
					height : 400,
					width : 500
		});
		 isShow = false; //显示之后，将全局的isShow改为false，避免再次弹框
    }
    function handleData(DataList,imgurl){ //请求待办数据，并处理为dom
        var postList =[]
        DataList.forEach(item=>{
            let post =  new Promise((resolve,reject)=>{
                    $.ajax({
                        type : "post",
                        //async : false,
                        url : WIS_EMAP_SERV.getContextPath()
                                + '/sys/emapflow/*default/index/queryUserTasks.do',
                        data : {
                            taskType:'NOTEND',
                            nodeId : item.nodeId,
                            appName : 'xxhjcssgl',
                            module: 'modules',
                            page : item.page,
                            action : item.action,
                        }, // 发送到服务器的参数
                        datatype : "json",
                        success : function(result) {
                            var count = result.datas.queryUserTasks.totalSize;		
                            let data = {text:item.text,count:count} 
                            resolve(data)	
                        }
                    })
                })
            
                postList.push(post);
            })	
            Promise.all(postList).then((list)=>{
                let todoDom = document.createElement('div');//创建DOM
                todoDom.style.fontSize='20px' //设置属性
                todoDom.style.color = '#666666';
               // todoDom.style.padding='20px'
                let count =0;
                let Img = document.createElement('img');
                Img.src = imgurl;
                Img.style.marginBottom='20px'
                todoDom.appendChild(Img);
                list.forEach(item=>{ //获取到的内容待办插入到DOM中
                    if(item.count>0){
                        count+=item.count;
                        let dom = document.createElement('div');
                        dom.style.marginBottom='10px'
                        dom.innerHTML=`${item.text}：<span>待办 ${item.count} 条</span>`;
                        todoDom.appendChild(dom)
                    }
                })
                if(count>0){
                    showTodo(todoDom)
                }
                
            })	
    }
	function tabTodoUpdate(){
		if(!isShow)return;
		console.log('开始渲染')
		//各个角色的ID
		const xxhllyRoidId = '08d2a083-74ad-486b-ab3b-acbb08b9abe1', 
		  	dwldRoidId = 'a522c7f0-416c-4b3e-b81b-13a88443ef50',
		  xxhbxtglyRoidId = "f92a043d-b5d5-4dd7-83fc-b4d950b548a5",
		  xxhbclrRoidId = 'a3d5a680-27b2-4489-802d-73f2c14e78bf';
		
		
		
		//各个角色需要post的参数
		const xxhllyData = [{nodeId:'xxhllyshsq',page:'xxhllyshsq',action:'T_XXB_XXHJCSS_JBXX_QUERY',text:'申请审核'},
		                    {nodeId:'xxhllyns',page:'xxhllyns',action:'T_XXB_XXHJCSS_NS_QUERY',text:'年审审核'},
		                    {nodeId:'xxhllyshgb',page:'xxhllygbsh',action:'T_XXB_XXHJCSS_GB_QUERY',text:'关闭审核'},
		                    {nodeId:'xxhllyshbg',page:'bgxxhllysh',action:'T_XXB_XXHJCSS_ZRRBGJL_QUERY',text:'变更审核'}];
		
		const dwldData = [{nodeId:'bmldshsq',page:'bmldshsq',action:'T_XXB_XXHJCSS_JBXX_QUERY',text:'申请审核'},
		                    {nodeId:'bmldns',page:'bmldns',action:'T_XXB_XXHJCSS_NS_QUERY',text:'年审审核'},
		                    {nodeId:'bmldshgb',page:'bmldgbsh',action:'T_XXB_XXHJCSS_GB_QUERY',text:'关闭审核'},
		                    {nodeId:'bmldshbg',page:'bgbmldsh',action:'T_XXB_XXHJCSS_ZRRBGJL_QUERY',text:'变更审核'}];
		
		const xxhbData = [
		                    {nodeId:'xxhbns',page:'xxhbns',action:'T_XXB_XXHJCSS_NS_QUERY',text:'年审审核'},
		                    {nodeId:'xxhbshgb',page:'xxhbgbsh',action:'T_XXB_XXHJCSS_GB_QUERY',text:'关闭审核'},
		                    {nodeId:'xxhbshbg',page:'bgxxhbsh',action:'T_XXB_XXHJCSS_ZRRBGJL_QUERY',text:'变更审核'},
		                    {nodeId:'whsh',page:'whsh',action:'T_XXB_XXHJCSS_WH_QUERY',text:'维护审核'}];
		
		const xxhbclrData = [{nodeId:'xxhbshsq',page:'xxhbshsq',action:'T_XXB_XXHJCSS_JBXX_QUERY',text:'申请处理'},
		                    {nodeId:'whcl',page:'whcl',action:'T_XXB_XXHJCSS_WH_QUERY',text:'维护处理'}];
		
		const xxhbldData = [{nodeId:'xxhbsh',page:'xxhbsqsh',action:'T_XXB_XXHJCSS_JBXX_QUERY',text:'申请审核'}];
		//要展示tab的截图
		const xxhllyImg = './public/images/xxhllyTODO.png';
		const bmldImg = './public/images/dwldTODO.png';
		const xtglyImg = './public/images/xtglyTODO.png';
		const clrImg = './public/images/clrTODO.png';
		
		
		if(roleId === xxhllyRoidId){ //当前登录的角色为信息化联络员
            handleData(xxhllyData,xxhllyImg)	
		}
        if(roleId === dwldRoidId){ //当前登录的角色为单位领导
            handleData(dwldData,bmldImg)	
		}
        if(roleId === xxhbxtglyRoidId){ //当前登录的角色为管理员
            handleData(xxhbData,xtglyImg)
		}
        if(roleId === xxhbclrRoidId){ //当前登录的角色为处理人
            handleData(xxhbclrData,clrImg)
		}
		
	}		
	window.tabTodoUpdate = tabTodoUpdate;
	
})(window);
