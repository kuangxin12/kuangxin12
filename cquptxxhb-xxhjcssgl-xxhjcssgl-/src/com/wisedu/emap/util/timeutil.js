/**
 * 日期工具库 日期标准格式与Java中相同为 yyyy-MM-dd HH:mm:ss
 */

if (typeof TimeUtil == 'undefined')
	TimeUtil = {};

/**
 * 获取当前日期字符串
 * @return {String} 
 */
TimeUtil.getCurrDate = TimeUtil.getSysDate = function() {
	return TimeUtil.getSysTime('yyyy-MM-dd');
};
/**
 * 获取当前时间字符串
 * @param {Object} format 字符串格式
 * @return {String} 
 */
TimeUtil.getCurrTime = TimeUtil.getSysTime = function(format) {
	var date = new Date();
	format = format || 'yyyy-MM-dd HH:mm:ss';
	
	return TimeUtil.format(date,format);
};

/**
 * 解析日期字符串为日期对象
 * @param {Object} srcDateStr
 * @param {Object} format
 * @return {TypeName} 
 */
TimeUtil.parse = function(srcDateStr, format) {
	format = format || TimeUtil.getDateFormat(srcDateStr);
		
	var year = parseInt(format.indexOf('yyyy') >= 0 ? srcDateStr.substr(format.indexOf('yyyy'), 4) : '0000', 10);
	var month = parseInt(format.indexOf('MM') >= 0 ? srcDateStr.substr(format.indexOf('MM'), 2) : '01', 10);
	var day = parseInt(format.indexOf('dd') >= 0 ? srcDateStr.substr(format.indexOf('dd'), 2) : '01', 10);
	var hour = parseInt(format.indexOf('HH') >= 0 ? srcDateStr.substr(format.indexOf('HH'), 2) : '00', 10);
	var minute = parseInt(format.indexOf('mm') >= 0 ? srcDateStr.substr(format.indexOf('mm'), 2) : '00', 10);
	var second = parseInt(format.indexOf('ss') >= 0 ? srcDateStr.substr(format.indexOf('ss'), 2) : '00', 10);
	
	var srcDate = new Date(year, month - 1, day, hour, minute, second);
	return srcDate;
};

/**
 * 格式化日期输出
 * @param {Object} srcDate 日期
 * @param {Object} format 日期格式，默认为yyyy-MM-dd
 * @return {TypeName} 
 */
TimeUtil.format = function(srcDate, format) {
	
	var retDateStr = format || 'yyyy-MM-dd';
	retDateStr = retDateStr.replace(/yyyy/gi, srcDate.getFullYear());
	retDateStr = retDateStr.replace(/MM/g, ((srcDate.getMonth() + 1) > 9 ? '' : '0') + (srcDate.getMonth() + 1));
	retDateStr = retDateStr.replace(/dd/gi, (srcDate.getDate() > 9 ? '' : '0') + srcDate.getDate());
	retDateStr = retDateStr.replace(/HH/gi, (srcDate.getHours() > 9 ? '' : '0') + srcDate.getHours());
	retDateStr = retDateStr.replace(/mm/gi, (srcDate.getMinutes() > 9 ? '' : '0') + srcDate.getMinutes());
	retDateStr = retDateStr.replace(/ss/gi, (srcDate.getSeconds() > 9 ? '' : '0') + srcDate.getSeconds());
	
	return retDateStr;
};

/**
 * 获取日期字符串的日期格式
 * @param {Object} srcDateStr 日期字符串
 * @return {String} 日期格式字符串
 * @exception {TypeName} 
 */
TimeUtil.getDateFormat = function(srcDateStr) {
	switch (srcDateStr.length) {
		case 4:
			return 'yyyy';
		case 6:
			return 'yyyyMM';
		case 7:
			return 'yyyy-MM';
		case 8:
			return 'yyyyMMdd';
		case 10:
			return 'yyyy-MM-dd';
		case 13:
			return "yyyy-MM-dd HH";
		case 16:
			return "yyyy-MM-dd HH:mm";
		case 19:
			return "yyyy-MM-dd HH:mm:ss";
		default:
			throw new Error('无法识别的日期格式');
	}
};

/**
 * 两个日期间相隔的天数
 * @param {Object} dateStr1	日期1
 * @param {Object} dateStr2 日期2
 * @param {Object} dateFormat1 日期1格式
 * @param {Object} dateFormat2 日期2格式
 * @return {Int} 天数
 */
TimeUtil.daysBetween = function(dateStr1, dateStr2, dateFormat1, dateFormat2) {
	dateFormat1 = dateFormat1 ? dateFormat1 : TimeUtil.getDateFormat(dateStr1);
	dateFormat2 = dateFormat2 ? dateFormat2 : TimeUtil.getDateFormat(dateStr2);
	var date1 = TimeUtil.parse(dateStr1, dateFormat1);
	var date2 = TimeUtil.parse(dateStr2, dateFormat1);
	date1.setHours(0,0,0,0);
	date2.setHours(0,0,0,0);
	return (date1 - date2) / 86400000;
};

/**
 * 对日期进行相关域的加减
 * @param {Object} srcDateStr	原日期
 * @param {Object} field	需要操作的日期域 year，month，date，hour，minute，second
 * @param {Object} offset	加减的偏移量
 * @param {Object} format	日期格式
 * @return {TypeName} 
 */
TimeUtil.addDate = function(srcDateStr, field, offset ,format) {
	offset = parseInt(offset, 10);
	field = field.toUpperCase();
	
	var srcDate = TimeUtil.parse(srcDateStr);
	
	switch (field) {
		case 'YEAR':
			var month = srcDate.getMonth();
			srcDate.setYear(srcDate.getFullYear() + offset);
			if (srcDate.getMonth() > month)
				srcDate.setDate(0);
			break;
		case 'MONTH':
			var day = srcDate.getDate();
			srcDate.setMonth(srcDate.getMonth() + offset);
			if (srcDate.getDate() < day)
				srcDate.setDate(0);
			break;
		case 'DATE':
			srcDate.setDate(srcDate.getDate() + offset);
			break;
		case 'HOUR':
			srcDate.setHours(srcDate.getHours() + offset);
			break;
		case 'MINUTE':
			srcDate.setMinutes(srcDate.getMinutes() + offset);
			break;
		case 'SECOND':
			srcDate.setSeconds(srcDate.getSeconds() + offset);
			break;
	}
	
	return TimeUtil.format(srcDate, format);
};

/**
 * 获取当月最大的一天
 * @param {Object} yyyyMM
 * @return {TypeName} 
 */
TimeUtil.getLastDay = function(yyyyMM) {
	var yyyy = Math.floor(yyyyMM / 100);
	var mm = yyyyMM % 100;
	var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (mm != 2)
		return days[mm - 1];
	if (yyyy % 400 == 0 || (yyyy % 100 != 0 && yyyy % 4 == 0))
		return 29;
	return 28;
};

/**
 * 获取源日期的当月最后一天的日期
 * @param {Object} dateStr
 * @return {TypeName} 
 */
TimeUtil.getLastDateOfMonth = function(dateStr) {
	var yyyy = parseInt(dateStr.substr(0, 4), 10);
	
	var hasSep = dateStr.indexOf('-') > 0;
	var mmIndex = hasSep ? 5 : 4;
	var mm = parseInt(dateStr.substr(mmIndex, 2), 10);
	
	var day = TimeUtil.getLastDay(yyyy * 100 + mm);
	return yyyy + (hasSep ? "-" : "") + (mm > 9 ? mm : "0" + mm) + (hasSep ? '-' : "") +
			(day > 9 ? day : "0" + day);
};

/**
 * 将日期分割成6位的数组
 * @param {Object} srcDateStr
 * @return {TypeName} 
 */
TimeUtil.toArray = function(srcDateStr) {
	var date = TimeUtil.parse(srcDateStr);
	var myArray = Array();
	myArray[0] = date.getFullYear();
	myArray[1] = date.getMonth() + 1;
	myArray[2] = date.getDate();
	myArray[3] = date.getHours();
	myArray[4] = date.getMinutes();
	myArray[5] = date.getSeconds();
	return myArray;
};

