package com.wisedu.emap.util;

import com.wisedu.emap.base.util.GuidUtil;
import com.wisedu.emap.base.util.StringUtil;
import com.wisedu.emap.dao.ConditionManager;
import com.wisedu.emap.dao.DaoParam;
import com.wisedu.emap.dao.SubScript;
import com.wisedu.emap.model2.IEmapItem;
import com.wisedu.emap.model2.IEmapModel;
import com.wisedu.emap.model2.IQueryAction;
import com.wisedu.emap.model2.QueryResult;
import com.wisedu.emap.model2.action.ActionType;
import com.wisedu.emap.model2.action.IDataModelQueryAction;
import com.wisedu.emap.model2.action.IDataModelUpdateAction;
import com.wisedu.emap.model2.container.ActionContainer;
import com.wisedu.emap.model2.container.DataModelContainer;
import com.wisedu.emap.pedestal.app.IEmapApp;
import com.wisedu.emap.pedestal.app.IEmapAppContext;
import com.wisedu.emap.pedestal.core.AppManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import self.micromagic.eterna.dao.preparer.PreparerManager;
import self.micromagic.util.StringTool;

public class DsUtil
{
  private static String appName = "xyapp";

  public static List<Map<String, Object>> query(String tableName, String condition, Object[] params)
    throws Exception
  {
    return query(tableName, condition, params, null, null);
  }

  public static List<Map<String, Object>> query(String tableName, String condition, Object[] params, String[] fieldNames, String orderBy)
    throws Exception
  {
    return query(tableName, condition, params, fieldNames, orderBy, -1, -1);
  }

  public static DataModelContainer getContainer(String tableName)
  {
    DataModelContainer res = AppManager.currentApp().getAppContext().getDataModel(tableName);
    if (res == null) {
      res = AppManager.getInstance().getApp(appName).getAppContext().getDataModel(tableName);
    }
    return res;
  }

  public static ActionContainer getActionContainer(String appName, String actionName)
  {
    if (StringUtils.isEmpty(appName)) {
      return AppManager.currentApp().getAppContext().getAction(actionName);
    }
    return AppManager.getInstance().getApp(appName).getAppContext().getAction(actionName);
  }

  public static List<Map<String, Object>> query(String tableName, String condition, Object[] params, String[] fieldNames, String orderBy, int pageNum, int pageSize)
    throws Exception
  {
    IDataModelQueryAction action = getContainer(
      tableName).getQueryAction();
    DaoParam daoParam = new DaoParam();
    if (!StringUtils.isEmpty(condition)) {
      daoParam.setSubScript(1, 
        new SubScript(condition, 
        params == null ? null : Arrays.asList(params)));
    }
    if ((fieldNames != null) && (fieldNames.length > 0)) {
      daoParam.setDisplayColumns(StringUtils.join(fieldNames, ","));
    }
    if (!StringUtils.isEmpty(orderBy)) {
      daoParam.setOrderColumns(orderBy);
    }
    if ((pageNum < 0) || (pageSize < 0)) {
      daoParam.setAllRow(true);
    } else {
      daoParam.setPageNum(pageNum);
      daoParam.setPageSize(pageSize);
    }
    QueryResult result = action.executeQuery(daoParam);
    List retList = new ArrayList();
    Iterator iter = result.iterator();
    while (iter.hasNext()) {
      retList.add(new HashMap((Map)iter.next()));
    }
    return retList.size() == 0 ? null : retList;
  }

  public static QueryResult<Map<String, Object>> queryPagination(String tableName, String condition, Object[] params, String[] fieldNames, String orderBy, int pageNum, int pageSize)
    throws Exception
  {
    IDataModelQueryAction action = getContainer(
      tableName).getQueryAction();
    DaoParam daoParam = new DaoParam();
    if (!StringUtils.isEmpty(condition)) {
      daoParam.setSubScript(1, 
        new SubScript(condition, 
        params == null ? null : Arrays.asList(params)));
    }
    if ((fieldNames != null) && (fieldNames.length > 0)) {
      daoParam.setDisplayColumns(StringUtils.join(fieldNames, ","));
    }
    if (!StringUtils.isEmpty(orderBy)) {
      daoParam.setOrderColumns(orderBy);
    }
    if ((pageNum < 0) || (pageSize < 0)) {
      daoParam.setAllRow(true);
    } else {
      daoParam.setPageNum(pageNum);
      daoParam.setPageSize(pageSize);
    }
    return action.executeQuery(daoParam);
  }

  public static long queryCount(String tableName, String condition, Object[] params)
    throws Exception
  {
    IDataModelQueryAction action = getContainer(
      tableName).getQueryAction();
    return action.totalCount(condition, 
      params == null ? null : Arrays.asList(params));
  }

  public static Map<String, Object> queryRow(String tableName, String condition, Object[] params, String[] fieldNames, String orderBy)
    throws Exception
  {
    List datas = query(tableName, condition, params, 
      fieldNames, orderBy);
    if ((datas != null) && (datas.size() > 0)) {
      return (Map)datas.get(0);
    }
    return null;
  }

  public static Map<String, Object> queryRowFromAppName(String appName, String tableName, String condition, Object[] params, String[] fieldNames, String orderBy)
    throws Exception
  {
    appName = appName;
    List datas = query(tableName, condition, params, 
      fieldNames, orderBy);
    if ((datas != null) && (datas.size() > 0)) {
      return (Map)datas.get(0);
    }
    return null;
  }

  public static Object queryOne(String tableName, String condition, Object[] params, String fieldName, String orderBy)
    throws Exception
  {
    Map row = queryRow(tableName, condition, params, new String[] { fieldName }, orderBy);
    if (row != null) {
      return row.get(fieldName);
    }
    return null;
  }

  public static void deleteByWid(String tableName, String wid)
    throws Exception
  {
    IDataModelUpdateAction action = getContainer(tableName)
      .getUpdateAction(ActionType.DELETE);
    action.executeUpdate(null, "WID = ?", Arrays.asList(new String[] { wid }));
  }

  public static String saveOrUpdate(String tableName, Map<String, Object> data)
    throws Exception
  {
    String wid = (String)data.get("WID");
    if (StringUtils.isEmpty(wid)) {
      wid = getNewWid();
      data.put("WID", wid);
      IDataModelUpdateAction action = getContainer(tableName)
        .getUpdateAction(ActionType.ADD);
      action.executeUpdate(data);
    } else {
      IDataModelUpdateAction action = getContainer(tableName)
        .getUpdateAction(ActionType.MODIFY);
      action.executeUpdate(data, "WID = ?", Arrays.asList(new String[] { wid }));
    }
    return wid;
  }

  public static void saveOrUpdate(String tableName, List<Map<String, Object>> datas)
    throws Exception
  {
    if ((datas != null) && (datas.size() > 0))
      for (int i = 0; i < datas.size(); i++)
        saveOrUpdate(tableName, (Map)datas.get(i));
  }

  public static Map<String, Object> queryByWid(String tableName, String wid, String[] fieldNames)
    throws Exception
  {
    List datas = query(tableName, "WID = ?", 
      new Object[] { wid }, fieldNames, null);
    if ((datas != null) && (datas.size() > 0)) {
      return (Map)datas.get(0);
    }
    return null;
  }

  public static Date getCurrentDate()
    throws Exception
  {
    return DbUtil.getCurrentDate();
  }

  public static String getNewWid()
    throws Exception
  {
    return GuidUtil.getRandomGuid();
  }

  public static Map<String, IEmapItem> getMeta(String tableName)
    throws Exception
  {
    Map retMap = new LinkedHashMap();
    DataModelContainer container = getContainer(tableName);
    if ((container == null) || (container.getModel() == null)) {
      return null;
    }
    for (Iterator iter = container.getModel().getItemIterator(); iter.hasNext(); ) {
      IEmapItem item = (IEmapItem)iter.next();
      retMap.put(item.getName(), item);
    }
    return retMap;
  }

  public static int updateByCondition(String tableName, Map<String, Object> data, String condition, Object[] params)
    throws Exception
  {
    IDataModelUpdateAction action = getContainer(tableName)
      .getUpdateAction(ActionType.MODIFY);
    return action.executeUpdate(data, condition, params == null ? null : 
      Arrays.asList(params));
  }

  public static List<Map<String, Object>> query(String tableName, DaoParam daoParam, String[] fieldNames, String orderBy, int pageNum, int pageSize)
    throws Exception
  {
    IDataModelQueryAction queryAction = getContainer(
      tableName).getQueryAction();
    daoParam.setOnlyTotalCount(false);
    if ((fieldNames != null) && (fieldNames.length > 0)) {
      daoParam.setDisplayColumns(StringUtils.join(fieldNames, ","));
    }
    if (!StringUtils.isEmpty(orderBy)) {
      daoParam.setOrderColumns(orderBy);
    }
    if ((pageNum < 0) || (pageSize < 0)) {
      daoParam.setAllRow(true);
    } else {
      daoParam.setPageNum(pageNum);
      daoParam.setPageSize(pageSize);
    }
    QueryResult result = queryAction.executeQuery(daoParam);
    List retList = new ArrayList();
    Iterator iter = result.iterator();
    while (iter.hasNext()) {
      retList.add(new HashMap((Map)iter.next()));
    }
    return retList.size() == 0 ? null : retList;
  }

  public static long queryCount(String tableName, DaoParam daoParam)
    throws Exception
  {
    IDataModelQueryAction queryAction = getContainer(
      tableName).getQueryAction();
    return queryAction.totalCount(daoParam);
  }

  public static DaoParam mergeQueryParam(String tableName, String jsonParam, String customCond, Object[] customParams)
  {
    IDataModelQueryAction queryAction = getContainer(
      tableName).getQueryAction();
    SubScript sub1 = ConditionManager.makeSubScript(jsonParam, queryAction);
    SubScript sub2 = new SubScript(customCond, 
      customParams == null ? null : Arrays.asList(customParams));

    SubScript newSubScript = null;
    if (sub1 == null) {
      newSubScript = sub2;
    } else if (sub2 == null) {
      newSubScript = sub1;
    }
    else
    {
      String newScript;
      if (StringUtil.isEmpty(sub1.getSubScript())) {
        newScript = sub2.getSubScript();
      }
      else
      {
        if (StringTool.isEmpty(sub2.getSubScript()))
          newScript = sub1.getSubScript();
        else {
          newScript = sub1.getSubScript().concat(" and ").concat(sub2.getSubScript());
        }
      }
      PreparerManager preparerManager = 
        ConditionManager.mergePreparerManager(sub1.getPreparerManager(), sub2.getPreparerManager());
      newSubScript = new SubScript(newScript, preparerManager);
    }

    DaoParam daoParam = new DaoParam();
    daoParam.setSubScript(1, newSubScript);
    return daoParam;
  }

  public static DaoParam mergeActionDaoParam(String appName, String actionName, String jsonParam, String customCond, Object[] customParams)
  {
    IQueryAction queryAction = (IQueryAction)getActionContainer(appName, 
      actionName).createAction(Map.class);
    SubScript sub1 = ConditionManager.makeSubScript(jsonParam, queryAction);
    SubScript sub2 = new SubScript(customCond, 
      customParams == null ? null : Arrays.asList(customParams));

    SubScript newSubScript = null;
    if (sub1 == null) {
      newSubScript = sub2;
    } else if (sub2 == null) {
      newSubScript = sub1;
    }
    else
    {
      String newScript;
      if (StringUtil.isEmpty(sub1.getSubScript())) {
        newScript = sub2.getSubScript();
      }
      else
      {
        if (StringTool.isEmpty(sub2.getSubScript()))
          newScript = sub1.getSubScript();
        else {
          newScript = sub1.getSubScript().concat(" and ").concat(sub2.getSubScript());
        }
      }
      PreparerManager preparerManager = 
        ConditionManager.mergePreparerManager(sub1.getPreparerManager(), sub2.getPreparerManager());
      newSubScript = new SubScript(newScript, preparerManager);
    }

    DaoParam daoParam = new DaoParam();
    daoParam.setSubScript(1, newSubScript);
    return daoParam;
  }

  public static DaoParam mergeActionDaoParam(IQueryAction<Map<String, Object>> queryAction, String jsonParam, String customCond, Object[] customParams)
  {
    SubScript sub1 = ConditionManager.makeSubScript(jsonParam, queryAction);
    SubScript sub2 = new SubScript(customCond, 
      customParams == null ? null : Arrays.asList(customParams));

    SubScript newSubScript = null;
    if (sub1 == null) {
      newSubScript = sub2;
    } else if (sub2 == null) {
      newSubScript = sub1;
    }
    else
    {
      String newScript;
      if (StringUtil.isEmpty(sub1.getSubScript())) {
        newScript = sub2.getSubScript();
      }
      else
      {
        if (StringTool.isEmpty(sub2.getSubScript()))
          newScript = sub1.getSubScript();
        else {
          newScript = sub1.getSubScript().concat(" and ").concat(sub2.getSubScript());
        }
      }
      PreparerManager preparerManager = 
        ConditionManager.mergePreparerManager(sub1.getPreparerManager(), sub2.getPreparerManager());
      newSubScript = new SubScript(newScript, preparerManager);
    }

    DaoParam daoParam = new DaoParam();
    daoParam.setSubScript(1, newSubScript);
    return daoParam;
  }
}