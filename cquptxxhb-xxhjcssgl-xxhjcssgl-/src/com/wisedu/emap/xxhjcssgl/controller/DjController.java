package com.wisedu.emap.xxhjcssgl.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.wisedu.emap.base.util.JSONUtil;
import com.wisedu.emap.mvc.CurrentThread;
import com.wisedu.emap.util.CommonServiceUtil;
import com.wisedu.emap.util.DbUtil;

@Controller
public class DjController {

	@RequestMapping("/xsllxdj.do")
	public @ResponseBody
	void xsLLxDj(
			@RequestParam(value = "WID", required = false) String WID,
			@RequestParam(value = "XSBH", required = true) String XSBH,
			@RequestParam(value = "JJRXH", required = true) String JJRXH,
			@RequestParam(value = "DJLX", required = true) String DJLX,
			@RequestParam(value = "KSRQ", required = false) String KSRQ,
			@RequestParam(value = "JSRQ", required = false) String JSRQ,
			@RequestParam(value = "SY", required = false) String SY,
			@RequestParam(value = "LXQX", required = false) String LXQX,
			@RequestParam(value = "SFRDWPKS", required = false) String SFRDWPKS,
			@RequestParam(value = "LXR", required = false) String LXR,
			@RequestParam(value = "LXDH", required = false) String LXDH,
			@RequestParam(value = "FZLS", required = false) String FZLS,
			@RequestParam(value = "FZLSDH", required = false) String FZLSDH,
			@RequestParam(value = "CZR", required = false) String CZR,
			@RequestParam(value = "CZRXM", required = false) String CZRXM,
			@RequestParam(value = "BZ", required = false) String BZ)

	throws Exception {
		HttpServletResponse response = CurrentThread.getCurrentResponse();
		System.out.println("XSBH---->" + XSBH);
		System.out.println("JJRXH---->" + JJRXH);
		System.out.println(" CZR---->" + CZR);
		Map<String, Object> result = new HashMap<String, Object>();

		if (StringUtils.isNotEmpty(XSBH) && StringUtils.isNotEmpty(JJRXH)) {
			// 学生只能操作自己的账号
			if (!XSBH.endsWith(CZR)) {
				result.put("code", 100);
				result.put("msg", "操作非法！");
				Gson gson = new Gson();
				CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
				return;
			}
			// 查询节假日是否存在
			String searchSql = "select * from T_XG_LFX_JJRJBXX where  WID=?";

			Object[] jjrParam = { JJRXH };
			Map<String, Object> jjrMap = DbUtil.queryRow(searchSql, jjrParam);
			System.out.println("jjrMap---->" + jjrMap);
			if (jjrMap != null && jjrMap.size() > 0) {
				Date djjsRq = CommonServiceUtil.stringToDate(jjrMap.get(
						"LXDJJSRQ").toString());
				Date d = new Date();
				System.out.println(d);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				String dateNowStr = sdf.format(d);
				Date currentRq = CommonServiceUtil.stringToDate(dateNowStr);
				// System.out.println("now date-->"+currentRq);
				// System.out.println("djjsrq  -->"+CommonServiceUtil.stringToDate(jjrMap.get("LXDJJSRQ").toString()));

				if (currentRq.after(djjsRq)) {
					result.put("code", 100);
					result.put("msg", "登记已截止！");
					Gson gson = new Gson();
					CommonServiceUtil.outWriterJSON(response,
							gson.toJson(result));
					return;
				}

				searchSql = "select T_XG_LFX_LLXDJ.WID,T_XG_LFX_LLXDJ.JJRXH,T_XG_LFX_LLXDJ.DJLX,"
						+ "T_XG_LFX_LLXDJ.KSRQ,T_XG_LFX_LLXDJ.JSRQ,T_XG_LFX_LLXDJ.SY,T_XG_LFX_LLXDJ.LXQX,"
						+ "T_XG_LFX_LLXDJ.SFRDWPKS,T_XG_LFX_LLXDJ.LXR,T_XG_LFX_LLXDJ.LXDH,T_XG_LFX_LLXDJ.BZ,"
						+ "T_XG_LFX_LLXDJ.CZR,T_XG_LFX_LLXDJ.CZSJ,T_XG_LFX_LLXDJ.DJZT, T_XG_JBXX.XSBH "
						+ "from T_XG_LFX_LLXDJ,T_XG_JBXX where T_XG_LFX_LLXDJ.XSBH=? and T_XG_LFX_LLXDJ.JJRXH=? "
						+ "and T_XG_LFX_LLXDJ.XSBH=T_XG_JBXX.XSBH";
				Object[] params = { XSBH, JJRXH };
				Map<String, Object> dataMap = DbUtil
						.queryRow(searchSql, params);
				System.out.println("datamap---->" + dataMap);
				// 记录已存在，执行更新
				if (dataMap != null && dataMap.size() > 0) {

					String sftjlxxxxx = "";
					String xsbh = "";
					for (Map.Entry<String, Object> obj : jjrMap.entrySet()) {
						if (obj.getKey().equals("SFTJLXXXXX")) {
							sftjlxxxxx = obj.getValue().toString();
							System.out.println("sftjlxxxxx--->" + sftjlxxxxx);
							break;
						}
					}
					for (Map.Entry<String, Object> obj : dataMap.entrySet()) {
						if (obj.getKey().equals("WID")) {
							WID = obj.getValue().toString();
							System.out.println("WID--->" + WID);
						}
						if (obj.getKey().equals("XSBH")) {
							xsbh = obj.getValue().toString();
						}
					}
					System.out.println("DJLX --------------" + DJLX);

					Date jqksrqFormat = CommonServiceUtil.stringToDate(jjrMap
							.get("JQKSRQ").toString());
					Date jqjsrqFormat = CommonServiceUtil.stringToDate(jjrMap
							.get("JQJSRQ").toString());
					if (DJLX.equals("lix")) {
						Date ksrqFormat = CommonServiceUtil.stringToDate(KSRQ);
						Date jsrqFormat = CommonServiceUtil.stringToDate(JSRQ);
						// 输入数据是否合法，离校开始、预计返校日期在假期中
						if (jsrqFormat.before(ksrqFormat)) {
							result.put("code", 100);
							result.put("msg", "离校日期不能晚于返校日期，请重新输入！");
							Gson gson = new Gson();
							CommonServiceUtil.outWriterJSON(response,
									gson.toJson(result));
							return;
						}
//						if (ksrqFormat.before(jqksrqFormat)|| jsrqFormat.after(jqjsrqFormat)) {
						if (jsrqFormat.after(jqjsrqFormat)) {
							result.put("code", 100);
//							result.put("msg", "离校日期、预计返校日期应在放假时间范围内("	+ jjrMap.get("JQKSRQ").toString() + "~"+ jjrMap.get("JQJSRQ").toString()+ ")，请重新输入！");
							result.put("msg", jjrMap.get("JQJSRQ").toString()+"放假结束前应返校，请重新填写预计返校日期！");
							Gson gson = new Gson();
							CommonServiceUtil.outWriterJSON(response,
									gson.toJson(result));
							return;
						}
						Map map = new HashedMap();
						if(ksrqFormat.before(jqksrqFormat)){
							map.put("SFTQLX","1");
						}else{
							map.put("SFTQLX","0");
						}
						map.put("DJLX", "离校");
						map.put("SY", SY);
						map.put("LXR", LXR);
						map.put("LXDH", LXDH);
						map.put("FZLS", FZLS);
						map.put("FZLSDH", FZLSDH);
						map.put("LXQX", LXQX);
						map.put("CZR", CZR);
						map.put("CZRXM", CZRXM);
						map.put("CZSJ", CommonServiceUtil
								.dateToStringWithTime(new Date()));
						map.put("DJZT", 1);
						map.put("BZ", BZ);
						map.put("KSRQ", KSRQ);
						map.put("JSRQ", JSRQ);
						map.put("XSBH", xsbh);
						map.put("JJRXH", JJRXH);
						map.put("WID", WID);
						System.out.println("excute update--------------");
						DbUtil.saveOrUpdate("T_XG_LFX_LLXDJ", map);
					} else if (DJLX.equals("liux")) {
						if (sftjlxxxxx.equals("1")) {
							Date ksrqFormat = CommonServiceUtil
									.stringToDate(KSRQ);
							Date jsrqFormat = CommonServiceUtil
									.stringToDate(JSRQ);
							// 输入数据是否合法，离校开始、预计返校日期在假期中
							if (ksrqFormat.after(jsrqFormat)) {
								result.put("code", 100);
								result.put("msg", "留校开始日期不能晚于留校结束日期，请重新输入！");
								Gson gson = new Gson();
								CommonServiceUtil.outWriterJSON(response,
										gson.toJson(result));
								return;
							}
							if (ksrqFormat.before(jqksrqFormat)
									|| jsrqFormat.after(jqjsrqFormat)) {
								result.put("code", 100);
								result.put("msg", "留校开始日期、留校结束日期应在放假时间范围内("
										+ jjrMap.get("JQKSRQ").toString() + "~"
										+ jjrMap.get("JQJSRQ").toString()
										+ ")，请重新输入！");
								Gson gson = new Gson();
								CommonServiceUtil.outWriterJSON(response,
										gson.toJson(result));
								return;
							}
							Map map = new HashedMap();
							map.put("DJLX", "留校");
							map.put("KSRQ", KSRQ);
							map.put("JSRQ", JSRQ);
							map.put("SY", SY);
							map.put("SFRDWPKS", SFRDWPKS);
							map.put("LXR", LXR);
							map.put("LXDH", LXDH);
							map.put("FZLS", FZLS);
							map.put("FZLSDH", FZLSDH);
							map.put("CZR", CZR);
							map.put("CZRXM", CZRXM);
							map.put("CZSJ", CommonServiceUtil
									.dateToStringWithTime(new Date()));
							map.put("DJZT", 1);
							map.put("BZ", BZ);
							map.put("XSBH", xsbh);
							map.put("JJRXH", JJRXH);
							map.put("WID", WID);
							System.out.println("excute update--------------");
							DbUtil.saveOrUpdate("T_XG_LFX_LLXDJ", map);
						} else {
							Map map = new HashedMap();
							map.put("DJLX", "留校");
							map.put("CZR", CZR);
							map.put("CZRXM", CZRXM);
							map.put("CZSJ", CommonServiceUtil
									.dateToStringWithTime(new Date()));
							map.put("DJZT", 1);
							map.put("XSBH", xsbh);
							map.put("JJRXH", JJRXH);
							map.put("WID", WID);
							System.out.println("excute update--------------");
							DbUtil.saveOrUpdate("T_XG_LFX_LLXDJ", map);
						}
					}
				} else {
					// todo 留离校登记表中无该学号的节假日登记记录 是否需要插入？

				}

				result.put("code", 200);
				result.put("msg", "操作成功！");
				Gson gson = new Gson();
				CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
			} else {
				result.put("code", 100);
				result.put("msg", "节假日不存在！");
				Gson gson = new Gson();
				CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
			}
		} else {
			result.put("code", 100);
			result.put("msg", "请检查输入参数！");
			Gson gson = new Gson();
			CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
		}
	}

	/**
	 * 学生待登记记录查询
	 */
	@RequestMapping("/xsddjcx.do")
	public @ResponseBody
	void xsDdjCx(@RequestParam(value = "XSBH", required = true) String XSBH)
			throws Exception {
		HttpServletResponse response = CurrentThread.getCurrentResponse();
		Map<String, Object> result = new HashMap<String, Object>();
		System.out.println("XSBH---->" + XSBH);
		if (StringUtils.isNotEmpty(XSBH)) {
			// 查询待登记留离校记录
			String searchSql = "select T_XG_LFX_JJRJBXX.JJRMC,T_XG_LFX_JJRJBXX.YDXY,T_XG_LFX_JJRJBXX.SFJH,T_XG_LFX_JJRJBXX.SFTJLXXXXX,"
					+ "T_XG_LFX_JJRJBXX.XNXQ,T_XG_LFX_JJRJBXX.LXDJKSRQ,T_XG_LFX_JJRJBXX.LXDJJSRQ,T_XG_LFX_JJRJBXX.QDJSRQ,"
					+ "T_XG_LFX_JJRJBXX.QDFWXH,T_XG_LFX_JJRJBXX.LIXSY,T_XG_LFX_JJRJBXX.LIUXSY,T_XG_LFX_JJRJBXX.YQFXYY,"
					+ "T_XG_LFX_JJRJBXX.JQJSRQ,T_XG_LFX_JJRJBXX.JQKSRQ,T_XG_LFX_LLXDJ.WID,T_XG_LFX_LLXDJ.JJRXH,"
					+ "T_XG_LFX_LLXDJ.DJLX,T_XG_LFX_LLXDJ.KSRQ,T_XG_LFX_LLXDJ.JSRQ,T_XG_LFX_LLXDJ.SY,"
					+ "T_XG_LFX_LLXDJ.LXQX,T_XG_LFX_LLXDJ.BZ,T_XG_LFX_LLXDJ.XSBH, "
					+ "T_XG_LFX_LLXDJ.SFRDWPKS,T_XG_LFX_LLXDJ.LXR,T_XG_LFX_LLXDJ.LXDH,T_XG_LFX_LLXDJ.FZLS,T_XG_LFX_LLXDJ.FZLSDH,T_XG_LFX_LLXDJ.BZ,T_XG_LFX_LLXDJ.DJZT, "
					+ "'llx' as TYPE "
					+ "from T_XG_LFX_JJRJBXX,T_XG_LFX_LLXDJ "
					+ "where T_XG_LFX_JJRJBXX.WID=T_XG_LFX_LLXDJ.JJRXH "
					+ "and TO_DATE(T_XG_LFX_JJRJBXX.LXDJJSRQ,'yyyy-mm-dd')-trunc(sysdate)>=0 "
					+ "and TO_DATE(T_XG_LFX_JJRJBXX.LXDJKSRQ,'yyyy-mm-dd')-trunc(sysdate)<=0 "
					+ "and T_XG_LFX_LLXDJ.DJZT=0 "
					+ "and T_XG_LFX_JJRJBXX.SFJH=1 "
					+ "and T_XG_LFX_LLXDJ.XSBH=? " + "and rownum=1";

			Object[] llxParam = { XSBH };
			Map<String, Object> llxMap = DbUtil.queryRow(searchSql, llxParam);
			System.out.println("llxMap---->" + llxMap);
			if (llxMap != null && llxMap.size() > 0) {
				List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
				list.add(llxMap);
				result.put("code", 200);
				result.put("msg", "");
				result.put("rows", list);
				Gson gson = new Gson();
				CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
				return;
			} else {
				searchSql = "select T_XG_LFX_JJRJBXX.JJRMC,T_XG_LFX_JJRJBXX.SFJH,T_XG_LFX_JJRJBXX.SFTJLXXXXX,"
						+ "T_XG_LFX_JJRJBXX.XNXQ,T_XG_LFX_JJRJBXX.LXDJKSRQ,T_XG_LFX_JJRJBXX.LXDJJSRQ,T_XG_LFX_JJRJBXX.QDJSRQ,"
						+ "T_XG_LFX_JJRJBXX.QDFWXH,T_XG_LFX_JJRJBXX.LIXSY,T_XG_LFX_JJRJBXX.LIUXSY,T_XG_LFX_JJRJBXX.YQFXYY,"
						+ "T_XG_LFX_JJRJBXX.JQJSRQ,T_XG_LFX_JJRJBXX.JQKSRQ,T_XG_LFX_ZFXDJ.WID,T_XG_LFX_ZFXDJ.JJRXH,"
						+ "T_XG_LFX_ZFXDJ.DJZT,T_XG_LFX_ZFXDJ.DJDWJD,T_XG_LFX_ZFXDJ.DJDWWD,T_XG_LFX_ZFXDJ.SFYQFX,"
						+ "T_XG_LFX_ZFXDJ.WFXYY,T_XG_LFX_ZFXDJ.BZ,T_XG_LFX_ZFXDJ.XSBH, "
						+ "T_XG_LFX_ZFXDJ.YJFXRQ,T_XG_LFX_ZFXDJ.SFYQFX,T_XG_LFX_ZFXDJ.BZ,T_XG_LFX_ZFXDJ.FXRQ, "
						+ "'zfx' as TYPE "
						+ "from T_XG_LFX_JJRJBXX,T_XG_LFX_ZFXDJ "
						+ "where T_XG_LFX_JJRJBXX.WID=T_XG_LFX_ZFXDJ.JJRXH "
						+ "and TO_DATE(T_XG_LFX_JJRJBXX.QDJSRQ,'yyyy-mm-dd')-trunc(sysdate)>=0 "
						+ "and T_XG_LFX_ZFXDJ.DJZT=0 "
						+ "and T_XG_LFX_JJRJBXX.SFJH=1 "
						+ "and T_XG_LFX_ZFXDJ.XSBH=? " + "and rownum=1";
				Object[] zfxxParam = { XSBH };
				Map<String, Object> zfxxMap = DbUtil.queryRow(searchSql,
						zfxxParam);
				System.out.println("zfxxMap---->" + zfxxMap);
				if (zfxxMap != null && zfxxMap.size() > 0) {
					List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
					list.add(zfxxMap);
					result.put("code", 200);
					result.put("msg", "");
					result.put("rows", list);
					Gson gson = new Gson();
					CommonServiceUtil.outWriterJSON(response,
							gson.toJson(result));
					return;
				} else {
					result.put("code", 200);
					result.put("msg", "");
					result.put("rows", new ArrayList<String>());
					Gson gson = new Gson();
					CommonServiceUtil.outWriterJSON(response,
							gson.toJson(result));
					return;
				}
			}
		}
	}

	/**
	 * 学生在返校登记
	 */
	@RequestMapping("/xszfxdj.do")
	@ResponseBody
	public void xsZfxDj(
			@RequestParam(value = "WID", required = false) String WID,
			@RequestParam(value = "XSBH", required = true) String XSBH,
			@RequestParam(value = "JJRXH", required = true) String JJRXH,
			@RequestParam(value = "DJDWJD", required = false) String DJDWJD,
			@RequestParam(value = "DJDWWD", required = false) String DJDWWD,
			@RequestParam(value = "SFYQFX", required = false) String SFYQFX,
			@RequestParam(value = "WFXYY", required = false) String WFXYY,
			@RequestParam(value = "YJFXRQ", required = false) String YJFXRQ,
			@RequestParam(value = "SFYQJ", required = false) String SFYQJ,
			@RequestParam(value = "BZ", required = false) String BZ,
			@RequestParam(value = "FXRQ", required = false) String FXRQ,
			@RequestParam(value = "CZR", required = false) String CZR,
			@RequestParam(value = "CZRXM", required = false) String CZRXM,
			@RequestParam(value = "TYPE", required = false) String TYPE)

	throws Exception {
		HttpServletResponse response = CurrentThread.getCurrentResponse();
		System.out.println("XSBH---->" + XSBH);
		System.out.println("JJRXH---->" + JJRXH);
		Map<String, Object> result = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(XSBH) && StringUtils.isNotEmpty(JJRXH)) {
			// 学生只能操作自己的账号
			if (!XSBH.endsWith(CZR)) {
				result.put("code", 100);
				result.put("msg", "操作非法！");
				Gson gson = new Gson();
				CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
				return;
			}

			// 延期返校，必填未返校原因、预计返校时间、是否已请假
			if (SFYQFX.equals("1")) {
				if (StringUtils.isEmpty(WFXYY) && StringUtils.isEmpty(YJFXRQ)
						&& StringUtils.isEmpty(SFYQJ)) {
					result.put("code", 100);
					result.put("msg", "请检查输入参数！");
					Gson gson = new Gson();
					CommonServiceUtil.outWriterJSON(response,
							gson.toJson(result));
					return;
				}
			} else {
				if (StringUtils.isEmpty(TYPE)) {// 已登记在返校后，修改返校日期不需要定位
					if (StringUtils.isEmpty(DJDWJD)
							&& StringUtils.isEmpty(DJDWWD)) {
						result.put("code", 100);
						result.put("msg", "请检查输入参数！");
						Gson gson = new Gson();
						CommonServiceUtil.outWriterJSON(response,
								gson.toJson(result));
						return;
					}
				}
			}
			// 查询节假日是否存在
			String searchSql = "select * from T_XG_LFX_JJRJBXX where  WID=?";

			Object[] jjrParam = { JJRXH };
			Map<String, Object> jjrMap = DbUtil.queryRow(searchSql, jjrParam);
			System.out.println("jjrMap---->" + jjrMap);
			if (jjrMap != null && jjrMap.size() > 0) {

				Date qdjsrq = CommonServiceUtil.stringToDate(jjrMap.get(
						"QDJSRQ").toString());
				Date jqksrq = CommonServiceUtil.stringToDate(jjrMap.get(
						"JQKSRQ").toString());
				Date d = new Date();
				System.out.println(d);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				String dateNowStr = sdf.format(d);
				Date currentRq = CommonServiceUtil.stringToDate(dateNowStr);
				if (currentRq.after(qdjsrq)) {
					result.put("code", 100);
					result.put("msg", "签到已截止！");
					Gson gson = new Gson();
					CommonServiceUtil.outWriterJSON(response,
							gson.toJson(result));
					return;
				}
				//假期开始后才能进行在/返校登记
				if(currentRq.before(jqksrq)){
					result.put("code", 100);
					result.put("msg", "假期未开始，请返校后或假期结束时再来登记！");
					Gson gson = new Gson();
					CommonServiceUtil.outWriterJSON(response,
							gson.toJson(result));
					return;
				}

				searchSql = "select T_XG_LFX_ZFXDJ.WID,T_XG_LFX_ZFXDJ.JJRXH,T_XG_LFX_ZFXDJ.XSBH,T_XG_LFX_ZFXDJ.DJZT,"
						+ "T_XG_LFX_ZFXDJ.DJDWJD,T_XG_LFX_ZFXDJ.DJDWWD,T_XG_LFX_ZFXDJ.SFYQFX,T_XG_LFX_ZFXDJ.WFXYY,"
						+ "T_XG_LFX_ZFXDJ.YJFXRQ,T_XG_LFX_ZFXDJ.SFYQFX,T_XG_LFX_ZFXDJ.BZ,T_XG_LFX_ZFXDJ.CZR,"
						+ "T_XG_LFX_ZFXDJ.CZSJ, T_XG_JBXX.XSBH  from T_XG_LFX_ZFXDJ,T_XG_JBXX "
						+ "where T_XG_LFX_ZFXDJ.XSBH=? and T_XG_LFX_ZFXDJ.JJRXH=? and T_XG_LFX_ZFXDJ.XSBH=T_XG_JBXX.XSBH";
				Object[] params = { XSBH, JJRXH };
				Map<String, Object> dataMap = DbUtil
						.queryRow(searchSql, params);
				System.out.println("datamap---->" + dataMap);
				// 记录已存在，执行更新
				if (dataMap != null && dataMap.size() > 0) {
					String xsbh = "";
					for (Map.Entry<String, Object> obj : dataMap.entrySet()) {
						if (obj.getKey().equals("WID")) {
							WID = obj.getValue().toString();
							System.out.println("WID--->" + WID);
						}
						if (obj.getKey().equals("XSBH")) {
							xsbh = obj.getValue().toString();
						}
					}
					Map map = new HashedMap();
					map.put("XSBH", XSBH);
					map.put("JJRXH", JJRXH);

					if (StringUtils.isEmpty(TYPE)) {
						map.put("DJDWWD", StringUtils.isEmpty(DJDWWD) ? ""
								: Double.parseDouble(DJDWWD));
						map.put("DJDWJD", StringUtils.isEmpty(DJDWJD) ? ""
								: Double.parseDouble(DJDWJD));
					}

					map.put("SFYQFX", Integer.parseInt(SFYQFX));
					map.put("WFXYY", SFYQFX.equals("0") ? "" : WFXYY);
					map.put("YJFXRQ", SFYQFX.equals("0") ? "" : YJFXRQ);
					map.put("SFYQJ",
							StringUtils.isEmpty(SFYQJ) ? 0 : Integer
									.parseInt(SFYQJ));
					map.put("FXRQ",
							SFYQFX.equals("1") ? "" : (StringUtils
									.isEmpty(FXRQ) ? CommonServiceUtil
									.dateToString(new Date()) : FXRQ));
					map.put("CZR", CZR);
					map.put("CZRXM", CZRXM);
					map.put("BZ", BZ);
					map.put("CZSJ",
							CommonServiceUtil.dateToStringWithTime(new Date()));
					map.put("DJZT", 1);
					map.put("XSBH", xsbh);
					map.put("WID", WID);
					System.out.println("excute update--------------");
					DbUtil.saveOrUpdate("T_XG_LFX_ZFXDJ", map);
				} else {
					// todo 留离校登记表中无该学号的节假日登记记录 是否需要插入？

				}

				result.put("code", 200);
				result.put("msg", "操作成功！");
				Gson gson = new Gson();
				CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
			} else {
				result.put("code", 200);
				result.put("msg", "节假日不存在！");
				Gson gson = new Gson();
				CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
			}
		}
	}

	/**
	 * 学生登记查询
	 */
	@RequestMapping("/xsdjcx.do")
	public @ResponseBody
	void xsDjcx(@RequestParam(value = "XSBH", required = true) String XSBH,
			@RequestParam(value = "WID", required = false) String WID,
			@RequestParam(value = "TYPE", required = false) String TYPE)
			throws Exception {
		HttpServletResponse response = CurrentThread.getCurrentResponse();
		System.out.println("XSBH---->" + XSBH);
		Map<String, Object> result = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(XSBH)) {
			// 查询登记留离在返校记录
			String searchSql = "";
			List<Map<String, Object>> llxList = new ArrayList<Map<String, Object>>();
			System.out.println("xsdjcx wid---->" + WID);
			if (StringUtils.isNotEmpty(WID)) {
				if (TYPE.equals("llx")) {
					searchSql = "select T_XG_LFX_LLXDJ.XSBH,T_XG_LFX_JJRJBXX.JQKSRQ,T_XG_LFX_JJRJBXX.JQJSRQ,T_XG_LFX_JJRJBXX.LXDJJSRQ ,"
							+ "T_XG_LFX_JJRJBXX.QDJSRQ,T_XG_LFX_JJRJBXX.JJRMC,T_XG_LFX_JJRJBXX.XNXQ,T_XG_LFX_LLXDJ.WID,"
							+ "T_XG_LFX_LLXDJ.JJRXH, T_XG_LFX_LLXDJ.XSBH, T_XG_LFX_LLXDJ.SFRDWPKS, 0 SFYQFX,0 SFYQJ,"
							+ "T_XG_LFX_LLXDJ.KSRQ,T_XG_LFX_LLXDJ.JSRQ, T_XG_LFX_LLXDJ.CZSJ,  T_XG_LFX_LLXDJ.SY, "
							+ "T_XG_LFX_LLXDJ.LXR, T_XG_LFX_LLXDJ.LXDH,T_XG_LFX_LLXDJ.FZLS,T_XG_LFX_LLXDJ.FZLSDH,T_XG_LFX_LLXDJ.BZ, T_XG_LFX_LLXDJ.LXQX, "
							+ "(case when T_XG_LFX_LLXDJ.DJLX='留校' then 'liux'  when T_XG_LFX_LLXDJ.DJLX='离校' then 'lix' END)  TYPE "
							+ "from T_XG_LFX_JJRJBXX,T_XG_LFX_LLXDJ  "
							+ "where T_XG_LFX_JJRJBXX.WID=T_XG_LFX_LLXDJ.JJRXH  and T_XG_LFX_LLXDJ.DJZT=1 and T_XG_LFX_LLXDJ.XSBH=? "
							+ "and T_XG_LFX_LLXDJ.WID=? " + "ORDER BY CZSJ";
				} else if (TYPE.equals("zfx")) {
					searchSql = "select T_XG_LFX_ZFXDJ.XSBH,T_XG_LFX_JJRJBXX.JQKSRQ,T_XG_LFX_JJRJBXX.JQJSRQ,T_XG_LFX_JJRJBXX.LXDJJSRQ , "
							+ "T_XG_LFX_JJRJBXX.QDJSRQ,T_XG_LFX_JJRJBXX.JJRMC,T_XG_LFX_JJRJBXX.XNXQ,T_XG_LFX_ZFXDJ.WID, "
							+ "T_XG_LFX_ZFXDJ.JJRXH, T_XG_LFX_ZFXDJ.XSBH, 0 SFRDWPKS,T_XG_LFX_ZFXDJ.SFYQFX,T_XG_LFX_ZFXDJ.SFYQJ,"
							+ "T_XG_LFX_ZFXDJ.YJFXRQ ,T_XG_LFX_ZFXDJ.FXRQ , T_XG_LFX_ZFXDJ.CZSJ, "
							+ "T_XG_LFX_ZFXDJ.WFXYY , T_XG_LFX_ZFXDJ.BZ, T_XG_LFX_ZFXDJ.YJFXRQ, "
							+ "(CASE T_XG_LFX_ZFXDJ.SFYQFX WHEN 0 then 'fx' WHEN 1 then 'yqfx' END) TYPE "
							+ "from T_XG_LFX_JJRJBXX,T_XG_LFX_ZFXDJ  "
							+ "where T_XG_LFX_JJRJBXX.WID=T_XG_LFX_ZFXDJ.JJRXH and T_XG_LFX_ZFXDJ.DJZT=1 and T_XG_LFX_ZFXDJ.XSBH=? "
							+ "and T_XG_LFX_ZFXDJ.WID=? " + "ORDER BY CZSJ";
				}

				Object[] llxParam = { XSBH, WID };
				llxList = DbUtil.query(searchSql, llxParam);
			} else {
				searchSql = "select T_XG_LFX_LLXDJ.XSBH,T_XG_LFX_JJRJBXX.SFTJLXXXXX,T_XG_LFX_JJRJBXX.JQKSRQ,T_XG_LFX_JJRJBXX.JQJSRQ,T_XG_LFX_JJRJBXX.LXDJJSRQ ,T_XG_LFX_JJRJBXX.QDJSRQ,"
						+ "T_XG_LFX_JJRJBXX.JJRMC,T_XG_LFX_JJRJBXX.XNXQ,T_XG_LFX_LLXDJ.WID,T_XG_LFX_LLXDJ.JJRXH, "
						+ "T_XG_LFX_LLXDJ.KSRQ,T_XG_LFX_LLXDJ.JSRQ,'' FXRQ, T_XG_LFX_LLXDJ.CZSJ,  "
						+ "(case when T_XG_LFX_LLXDJ.DJLX='留校' then 'liux'  when T_XG_LFX_LLXDJ.DJLX='离校' then 'lix' END)  TYPE "
						+ "from T_XG_LFX_JJRJBXX,T_XG_LFX_LLXDJ  "
						+ "where T_XG_LFX_JJRJBXX.WID=T_XG_LFX_LLXDJ.JJRXH  and T_XG_LFX_LLXDJ.DJZT=1 and T_XG_LFX_LLXDJ.XSBH=?  "
						+ "UNION "
						+ "select T_XG_LFX_ZFXDJ.XSBH,T_XG_LFX_JJRJBXX.SFTJLXXXXX,T_XG_LFX_JJRJBXX.JQKSRQ,T_XG_LFX_JJRJBXX.JQJSRQ,T_XG_LFX_JJRJBXX.LXDJJSRQ ,T_XG_LFX_JJRJBXX.QDJSRQ,"
						+ "T_XG_LFX_JJRJBXX.JJRMC,T_XG_LFX_JJRJBXX.XNXQ,T_XG_LFX_ZFXDJ.WID,T_XG_LFX_ZFXDJ.JJRXH, "
						+ "T_XG_LFX_ZFXDJ.YJFXRQ as KSRQ,'' JSRQ,T_XG_LFX_ZFXDJ.FXRQ , T_XG_LFX_ZFXDJ.CZSJ,"
						+ "(CASE T_XG_LFX_ZFXDJ.SFYQFX WHEN 0 then 'fx' WHEN 1 then 'yqfx' END) TYPE "
						+ "from T_XG_LFX_JJRJBXX,T_XG_LFX_ZFXDJ  "
						+ "where T_XG_LFX_JJRJBXX.WID=T_XG_LFX_ZFXDJ.JJRXH and T_XG_LFX_ZFXDJ.DJZT=1 and T_XG_LFX_ZFXDJ.XSBH=? "
						+ "ORDER BY CZSJ";
				Object[] llxParam = { XSBH, XSBH };
				llxList = DbUtil.query(searchSql, llxParam);
			}

			System.out.println("xsdjcx---->" + llxList);
			if (llxList != null && llxList.size() > 0) {
				result.put("code", 200);
				result.put("msg", "");
				result.put("rows", llxList);
				Gson gson = new Gson();
				CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
				return;

			} else {
				result.put("code", 200);
				result.put("msg", "");
				result.put("rows", new ArrayList<String>());
				Gson gson = new Gson();
				CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
				return;
			}
		} else {
			result.put("code", 100);
			result.put("msg", "请检查输入参数！");
			Gson gson = new Gson();
			CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
			return;
		}
	}

	/**
	 * 是否标志查询
	 */
/*	@RequestMapping("/sfbzcx.do")
	public @ResponseBody
	void sfbzcx() throws Exception {
		HttpServletResponse response = CurrentThread.getCurrentResponse();
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> sfbzList = new ArrayList<Map<String, Object>>();
		String searchSql = "";
		searchSql = "select key as id,value as name from T_XG_LFX_SFBZ WHERE LX='0'";

		sfbzList = DbUtil.query(searchSql, null);
		if (sfbzList != null && sfbzList.size() > 0) {
			result.put("code", 200);
			Map map = new HashedMap();
			map.put("rows", sfbzList);
			result.put("datas", map);
			Gson gson = new Gson();
			CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
			return;

		} else {
			result.put("code", 200);
			result.put("datas", null);
			Gson gson = new Gson();
			CommonServiceUtil.outWriterJSON(response, gson.toJson(result));
			return;
		}
	}
*/
}