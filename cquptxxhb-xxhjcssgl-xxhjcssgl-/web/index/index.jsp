<%@ page language="java" contentType="text/html; charset=UTF-8"
	session="false"%>
<%@page import="com.wisedu.emap.base.core.EmapContext"%>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/tags/emap.tld" prefix="e"%>


<%
	String path = request.getContextPath();
	String ROOT_PATH = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/sys/xxhjcssgl";
	String appId = com.wisedu.emap.pedestal.core.AppManager.currentApp().getId();
	String appname = com.wisedu.emap.pedestal.core.AppManager.currentApp().getName();
	String RES_HOST = com.wisedu.emap.base.core.EmapContext.getStaticResourceRoot();
	System.out.println("ROOT_PATH:" + ROOT_PATH);
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>

<meta charset="UTF-8">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<!-- 公共样式 -->
<!-- <link type="text/css" rel="stylesheet" href="../../公共应用名称/public/css/demo.css"> -->
<link rel="stylesheet" type="text/css"
	href="<%=com.wisedu.emap.base.core.EmapContext.getStaticResourceRoot()%>/fe_components/iview2/styles/iview.css">
<!-- 项目样式 -->
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/sys/emapflow/public/css/style.css">
<!-- commomlib include jquery.js jquery.nicescroll.js jquery.fileupload.js director.min.js hogan.min.js lodash.min.js globalize.js-->
<!-- <script src="http://res.cqupt.edu.cn/fe_components/commonlib.js"></script> -->
<script src="http://res.cqupt.edu.cn/fe_components/commonlib.js"></script>
<!-- 此处可以放置第三方库begin -->
<script src="http://res.cqupt.edu.cn/bower_components/vue2/vue.min.js"></script>
<script src="http://res.cqupt.edu.cn/fe_components/iview2/iview.min.js"></script>
<script
	src="<%=request.getContextPath()%>/sys/emapflow/public/js/mixins/common.js"></script>
<script
	src="<%=request.getContextPath()%>/sys/emapflow/public/js/emap-h5tag.min.js"></script>
<script
	src="<%=request.getContextPath()%>/sys/emapflow/public/js/emapflow.js"></script>
<!-- <script src="../public/js/emapflow.js"></script> -->
<script src="../public/js/funauthUtil.js"></script>
<script src="../public/js/xxhjcssxxxx.js"></script>
<script src="../public/js/whsqtj.js"></script>
<script src="../public/js/util.js"></script>
<script src="../public/js/tabTodo.js"></script>
<!-- 此处可以放置第三方库end -->
<script src="http://res.cqupt.edu.cn/fe_components/appcore-min.js"></script>



<!-- 全局变量pageMeta等 -->
<script type="text/javascript">
var pageMeta = <e:page/>;
var contextPath = "<%=request.getContextPath()%>";
var USERID = pageMeta.params.USERID;
var roleId = pageMeta.params.roleId;
var USERNAME=pageMeta.params.USERNAME;
//var USERID = "0102540";
//var USERID = "7800005";
var isShow = true; //控制待办弹框显示
var PATH= "<%=path%>";
var contextPath = "<%=path%>";
var APPID= "<%=appId%>";
var	APPNAME="<%=appname%>";
WIS_CONFIG = {
			ROOT_PATH: "<%=ROOT_PATH%>",
			PATH: "<%=path%>",
			APPID: "<%=appId%>",
			APPNAME:"<%=appname%>",
			USERID : USERID,
			UESRNAME : USERNAME
	}

</script>

</head>

<body>
</body>

</html>
