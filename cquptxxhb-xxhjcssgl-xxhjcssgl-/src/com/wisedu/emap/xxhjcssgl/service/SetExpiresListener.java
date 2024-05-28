package com.wisedu.emap.xxhjcssgl.service;

import com.wisedu.emap.util.Constants;
import com.wisedu.emap.util.DbUtil;
import com.wisedu.emapflow.listener.CommandEvent;
import com.wisedu.emapflow.listener.CommandEventListener;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service("SetExpiresListener")
public class SetExpiresListener implements CommandEventListener {

	public SetExpiresListener() {
		// TODO 自动生成的构造函数存根
	}

	public void afterCommandEvent(CommandEvent arg0) {
		System.out.println(arg0);

		Map<String, Object> formData = new HashMap();
		formData = arg0.getFormData();
		if (formData != null) {
			if (StringUtils.isNotEmpty(formData.get("WID").toString())) {
				try {
					Map<String, Object> map = new HashedMap();
					map.put("WID", formData.get("WID"));
					map.put("CZR", formData.get("submitUser"));
					String ns="";
					String xxhbsh="";
					if(formData.containsKey("ns")){
						 ns=formData.get("ns").toString();
					}
					if(formData.containsKey("xxhbsh")){
						 xxhbsh=formData.get("xxhbsh").toString();
					}
					
					if(StringUtils.isNotEmpty(ns)&& ns.equals("ns")){
						map.put("WID", formData.get("WID"));
					}
					
					String commandId=arg0.getCommandId();
					// 年审申请提交后基本信息表状态更新未年审审核中NSSHZ
					if (commandId.equals("start")&&StringUtils.isNotEmpty(ns)&& ns.equals("ns")) {
						map.put("ZT", Constants.JBXX_ZT.NSSHZ.getValue());
					} else if (commandId.equals("termination")&&StringUtils.isNotEmpty(ns) && ns.equals("ns")) {
						map.put("ZT", Constants.JBXX_ZT.NSWTG.getValue());
					} else if (commandId.equals("termination")&&StringUtils.isNotEmpty(xxhbsh) && xxhbsh.equals("sqtg")) {
						map.put("ZT", Constants.JBXX_ZT.SQWTG.getValue());
					}else if (commandId.equals("submit")&&(StringUtils.isNotEmpty(ns) && ns.equals("ns")||StringUtils.isNotEmpty(xxhbsh) && xxhbsh.equals("sqtg"))) {
						map.put("ZT", Constants.JBXX_ZT.SQTG.getValue());
						Date date = new Date();
						Calendar cal = Calendar.getInstance();

						cal.set(Calendar.MONTH, 11);
						cal.set(Calendar.DAY_OF_MONTH, 31);
						cal.set(Calendar.HOUR_OF_DAY, 23);
						cal.set(Calendar.MINUTE, 59);
						cal.set(Calendar.SECOND, 59);

						// 12月前申请通过的，有效期为当年12月31日，12月申请通过的有效期为次年12月31日
						
						if (date.getMonth() < 11) {
							Date date2 = cal.getTime();
							map.put("YXQ", new java.sql.Timestamp(date2.getTime()));
						} else{
							cal.add(Calendar.YEAR,1);// 增加一年
							Date date2 = cal.getTime();
							map.put("YXQ", new java.sql.Timestamp(date2.getTime()));
						}
					}

					DbUtil.saveOrUpdate("T_XXB_XXHJCSS_JBXX", map);
				} catch (ParseException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		}

	}

	public Boolean beforeCommandEvent(CommandEvent arg0) {
		// TODO 自动生成的方法存根
		return null;
	}

}
