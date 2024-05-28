package com.wisedu.emap.util;

import com.wisedu.emap.dao.DaoService;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class DbUtil
{
  private static transient Log log = LogFactory.getLog(DbUtil.class);
  public static final String[] TYPES = { "LONG", "DATE", "TIMESTAMP", "BLOB", 
    "CLOB" };

  public static void closeJdbc(ResultSet[] rss, Statement[] stmts, Connection[] conns)
  {
    int j;
    int i;
    if ((rss != null) && (rss.length > 0)) {
        j = rss.length; for (i = 0; i < j; i++) { ResultSet rs = rss[i];
        if (rs == null) continue;
        try {
          rs.close();
        } catch (Exception e) {
          log.error(DbUtil.class, e);
        }
      }
    }

    if ((stmts != null) && (stmts.length > 0)) {
      for (Statement stmt : stmts) {
        if (stmt == null) continue;
        try {
          stmt.close();
        } catch (Exception e) {
          log.error(DbUtil.class, e);
        }
      }
    }

    if ((conns != null) && (conns.length > 0))
      for (Connection conn : conns) {
        if (conn == null) continue;
        try {
          conn.close();
        } catch (Exception e) {
          log.error(DbUtil.class, e);
        }
      }
  }

  public static Connection getConnection(boolean needTrans)
    throws Exception
  {
    return new DaoService().getConnection(needTrans);
  }

  public static Map<String, Object> queryRow(String sql, Object[] params)
    throws Exception
  {
    List datas = query(sql, params);
    if ((datas != null) && (datas.size() > 0)) {
      return (Map)datas.get(0);
    }
    return null;
  }

  public static Map<String, Object> queryTableRow(String tableName, String condition, Object[] params, String[] fields)
    throws Exception
  {
    List datas = queryTable(tableName, condition, 
      params, fields);
    if ((datas != null) && (datas.size() > 0)) {
      return (Map)datas.get(0);
    }
    return null;
  }

  public static List<Map<String, Object>> query(String sql, Object[] params)
    throws Exception
  {
    log.debug("Execute Sql:" + sql);
    log.debug("Sql Params:" + StringUtils.join(params));
    Connection conn = getConnection(false);
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    List retList = null;
    try {
      pstmt = conn.prepareStatement(sql);
      if ((params != null) && (params.length > 0)) {
        for (int i = 0; i < params.length; i++) {
          pstmt.setObject(i + 1, params[i]);
        }
      }
      rs = pstmt.executeQuery();
      retList = extractResults(rs);
    } finally {
      closeJdbc(new ResultSet[] { rs }, new Statement[] { pstmt }, null);
    }
    return retList;
  }

  public static long queryTableCount(String tableName, String condition, Object[] params)
    throws Exception
  {
    StringBuilder sb = new StringBuilder();
    sb.append("SELECT COUNT(*) FROM ").append(tableName)
      .append(" WHERE 1=1 ");
    if (!StringUtils.isEmpty(condition)) {
      sb.append(" AND ").append(condition);
    }
    return queryInt(sb.toString(), params);
  }

  public static List<Map<String, Object>> queryTable(String tableName, String condition, Object[] params, String[] fields)
    throws Exception
  {
    return queryTable(tableName, condition, params, fields, null, -1, -1);
  }

  public static List<Map<String, Object>> queryTable(String tableName, String condition, Object[] params, String[] fields, String orderBy, int startIndex, int endIndex)
    throws Exception
  {
    StringBuilder sb = new StringBuilder();
    String fieldStr = (fields == null) || (fields.length < 1) ? "*" : 
      StringUtil.join(fields);
    if ((startIndex < 0) || (endIndex < 0)) {
      sb.append("SELECT ").append(fieldStr).append(" FROM ")
        .append(tableName);
      if (!StringUtils.isEmpty(condition)) {
        sb.append(" WHERE ").append(condition);
      }
      if (!StringUtils.isEmpty(orderBy)) {
        sb.append(" ORDER BY ").append(orderBy);
      }
      return query(sb.toString(), params);
    }

    sb.append("SELECT ").append(fieldStr).append(" FROM (")
      .append("SELECT ").append(fieldStr).append(",ROWNUM RN FROM (")
      .append("SELECT ").append(fieldStr).append(" FROM ")
      .append(tableName);
    if (!StringUtils.isEmpty(condition)) {
      sb.append(" WHERE ").append(condition);
    }
    if (!StringUtils.isEmpty(orderBy)) {
      sb.append(" ORDER BY ").append(orderBy);
    }
    sb.append(")) TMP_A WHERE TMP_A.RN > ").append(startIndex)
      .append(" AND TMP_A.RN <= ").append(endIndex);
    return query(sb.toString(), params);
  }

  public static Object queryOne(String sql, Object[] params)
    throws Exception
  {
    log.debug("Execute Sql:" + sql);
    log.debug("Sql Params:" + StringUtil.join(params));
    Connection conn = getConnection(false);
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    try {
      pstmt = conn.prepareStatement(sql);
      if ((params != null) && (params.length > 0)) {
        for (int i = 0; i < params.length; i++) {
          pstmt.setObject(i + 1, params[i]);
        }
      }
      rs = pstmt.executeQuery();
      if (rs.next()) {
        Object value = rs.getObject(1);
        if ((value != null) && ((value instanceof Clob))) {
          value = getClobString((Clob)value);
        }
        return value;
      }
    } finally {
      closeJdbc(new ResultSet[] { rs }, new Statement[] { pstmt }, null);
    }
    return null;
  }

  public static List<String> queryOnes(String sql, Object[] params)
    throws Exception
  {
    log.debug("Execute Sql:" + sql);
    log.debug("Sql Params:" + StringUtil.join(params));
    Connection conn = getConnection(false);
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    List result = new ArrayList();
    try {
      pstmt = conn.prepareStatement(sql);
      if ((params != null) && (params.length > 0)) {
        for (int i = 0; i < params.length; i++) {
          pstmt.setObject(i + 1, params[i]);
        }
      }
      rs = pstmt.executeQuery();
      while (rs.next())
        result.add(rs.getString(1));
    }
    finally {
      closeJdbc(new ResultSet[] { rs }, new Statement[] { pstmt }, null);
    }
    return result.size() < 1 ? null : result;
  }

  public static boolean exsitTableOrView(String name)
    throws Exception
  {
    Connection conn = getConnection(false);
    DatabaseMetaData meta = conn.getMetaData();
    ResultSet rsTables = meta.getTables(null, null, name.toUpperCase(), 
      null);

    return rsTables.next();
  }

  public static List<String> getFieldNameByTableName(String tableName)
    throws Exception
  {
    if (!exsitTableOrView(tableName)) {
      return null;
    }
    String sql = "SELECT * FROM " + tableName + " WHERE 1=2";
    Connection conn = getConnection(false);
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    List retList = null;
    try {
      pstmt = conn.prepareStatement(sql);
      rs = pstmt.executeQuery();
      if (rs != null)
        retList = getColumnNames(rs);
    }
    finally {
      closeJdbc(new ResultSet[] { rs }, new Statement[] { pstmt }, null);
    }
    return retList;
  }

  public static Map<String, Object> getStructByTableName(String tableName)
    throws Exception
  {
    if (!exsitTableOrView(tableName)) {
      return null;
    }
    String sql = "SELECT * FROM " + tableName + " WHERE 1=2";
    Connection conn = getConnection(false);
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    Map fieldsMap = new LinkedHashMap();
    try {
      pstmt = conn.prepareStatement(sql);
      rs = pstmt.executeQuery();
      if (rs != null) {
        ResultSetMetaData rsmd = rs.getMetaData();
        int count = rsmd.getColumnCount();
        for (int i = 1; i <= count; i++) {
          String colName = rsmd.getColumnLabel(i);
          String colType = rsmd.getColumnTypeName(i);
          int colSize = rsmd.getColumnDisplaySize(i);
          fieldsMap.put(colName, getFieldTypeStr(colType, colSize));
        }
        return fieldsMap;
      }
    } finally {
      closeJdbc(new ResultSet[] { rs }, new Statement[] { pstmt }, null);
    }
    return null;
  }

  public static Map<String, Object> queryMap(String sql, Object[] params)
    throws Exception
  {
    log.debug("Execute Sql:" + sql);
    log.debug("Sql Params:" + StringUtil.join(params));
    Connection conn = getConnection(false);
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    Map result = new LinkedHashMap();
    try {
      pstmt = conn.prepareStatement(sql);
      if ((params != null) && (params.length > 0)) {
        for (int i = 0; i < params.length; i++) {
          pstmt.setObject(i + 1, params[i]);
        }
      }
      rs = pstmt.executeQuery();
      while (rs.next()) {
        Object value = rs.getObject(2);
        if ((value != null) && ((value instanceof Clob))) {
          value = getClobString((Clob)value);
        }
        result.put(rs.getString(1), value);
      }
    } finally {
      closeJdbc(new ResultSet[] { rs }, new Statement[] { pstmt }, null);
    }
    return result.size() < 1 ? null : result;
  }

  /** @deprecated */
  public static int queryCount(String sql, Object[] params)
    throws Exception
  {
    Object obj = queryOne(sql, params);
    return obj == null ? 0 : Integer.parseInt(obj.toString());
  }

  public static int queryInt(String sql, Object[] params)
    throws Exception
  {
    Object obj = queryOne(sql, params);
    return obj == null ? 0 : Integer.parseInt(obj.toString());
  }

  public static void execute(String sql, Object[] params)
    throws Exception
  {
    log.debug("Execute Sql:" + sql);
    log.debug("Sql Params:" + StringUtil.join(params));
    Connection conn = getConnection(true);
    PreparedStatement pstmt = null;
    try {
      pstmt = conn.prepareStatement(sql);
      if ((params != null) && (params.length > 0)) {
        for (int i = 0; i < params.length; i++) {
          pstmt.setObject(i + 1, params[i]);
        }
      }
      pstmt.execute();
    } finally {
      closeJdbc(null, new Statement[] { pstmt }, null);
    }
  }

  public static void executeBatch(String sql, List<Object[]> datas)
    throws Exception
  {
    log.debug("Execute Sql:" + sql);
    Connection conn = getConnection(true);
    PreparedStatement pstmt = null;
    try {
      pstmt = conn.prepareStatement(sql);
      if ((datas != null) && (datas.size() > 0)) {
        for (int i = 0; i < datas.size(); i++) {
          Object[] params = (Object[])datas.get(i);
          if ((params != null) && (params.length > 0)) {
            for (int j = 0; j < params.length; j++) {
              pstmt.setObject(j + 1, params[j]);
            }
            pstmt.addBatch();
          }
        }
      }
      pstmt.executeBatch();
    } finally {
      closeJdbc(null, new Statement[] { pstmt }, null);
    }
  }

  public static void saveOrUpdate(String tableName, List<Map<String, Object>> datas)
    throws Exception
  {
    List<Map> saveList = new ArrayList();
    List updateList = new ArrayList();
    for (Map data : datas) {
      String wid = (String)data.get("WID");
      if (StringUtils.isEmpty(wid)) {
        data.put("WID", DsUtil.getNewWid());
        System.out.println("save============");
        saveList.add(data);
      } else {
    	  System.out.println("update============");
        updateList.add(data);
      }
    }
    if (saveList.size() > 0) {
      Map data0 = (Map)saveList.get(0);
      StringBuffer buf = new StringBuffer("INSERT INTO ").append(
        tableName).append("(");
      StringBuffer buf1 = new StringBuffer();
      Iterator iter = data0.keySet().iterator();
      while (iter.hasNext()) {
        String zdid = (String)iter.next();
        buf.append(zdid).append(",");
        buf1.append("?,");
      }
      buf.replace(buf.length() - 1, buf.length(), ") VALUES (");
      buf1.replace(buf1.length() - 1, buf1.length(), ")");
      buf.append(buf1.toString());
      Connection conn = getConnection(true);
      log.debug("Execute Sql:" + buf.toString());
      PreparedStatement pstmt = conn.prepareStatement(buf.toString());
      for (Map data : saveList) {
        int pos = 0;
        Iterator iter1 = data.keySet().iterator();
        while (iter1.hasNext()) {
          String zdid = (String)iter1.next();
          pos++; pstmt.setObject(pos, data.get(zdid));
        }
        pstmt.addBatch();
      }
      pstmt.executeBatch();

      pstmt.close();
    }

    if (updateList.size() > 0) {
      Map data0 = (Map)updateList.get(0);
      StringBuffer buf = new StringBuffer("UPDATE ").append(tableName)
        .append(" SET ");
      Iterator iter = data0.keySet().iterator();
      while (iter
        .hasNext()) {
        String zdid = (String)iter.next();
        buf.append(zdid).append(" = ?,");
      }
      buf.replace(buf.length() - 1, buf.length(), " WHERE WID = ? ");
      Connection conn = getConnection(true);
      log.debug("Execute Sql:" + buf.toString());
      System.out.println("Execute Sql:" + buf.toString());
      PreparedStatement pstmt = conn.prepareStatement(buf.toString());
      for (int i = 0; i < updateList.size(); i++) {
        Map data = (Map)updateList.get(i);
        int pos = 0;
        Iterator iter1 = data.keySet().iterator();
        while (iter1.hasNext()) {
        	
          String zdid = (String)iter1.next();
          Object value = data.get(zdid);
          System.out.println("key:" + zdid+"   value:"+value);
          pos++; pstmt.setObject(pos, value);
        }
        pos++; pstmt.setObject(pos, data.get("WID"));
        pstmt.addBatch();
      }
     pstmt.executeBatch();

      pstmt.close();
    }
  }

  public static String saveOrUpdate(String tableName, Map<String, Object> data)
    throws Exception
  {
    List datas = new ArrayList(1);
    datas.add(data);
    saveOrUpdate(tableName, datas);
    return (String)data.get("WID");
  }

  private static List<String> getColumnNames(ResultSet rs)
    throws Exception
  {
    ResultSetMetaData rsmd = rs.getMetaData();
    int count = rsmd.getColumnCount();
    List colNames = new ArrayList(count);
    for (int i = 1; i <= count; i++) {
      String colName = rsmd.getColumnLabel(i);
      colNames.add(colName.toUpperCase());
    }
    return colNames;
  }

  private static List<Map<String, Object>> extractResults(ResultSet rs)
    throws Exception
  {
    if (rs == null) {
      return null;
    }
    List<String> colNames = getColumnNames(rs);
    List retList = new ArrayList();
    while (rs.next()) {
      Map data = new HashMap();
      for (String colName : colNames) {
        Object value = rs.getObject(colName);
        if ((value != null) && ((value instanceof Clob))) {
          Clob clob = (Clob)value;
          value = getClobString(clob);
        }
        data.put(colName, value);
      }
      retList.add(data);
    }
    return retList.size() < 1 ? null : retList;
  }

  public static Date getCurrentDate()
    throws Exception
  {
    return (Date)queryOne("SELECT SYSDATE FROM DUAL", new Object[0]);
  }

  public static String getCurrentDate(String format)
    throws Exception
  {
    return (String)queryOne("SELECT TO_CHAR(SYSDATE,?) FROM DUAL", new Object[] { format });
  }

  public static String getClobString(Clob clob)
    throws Exception
  {
    return clob.getSubString(1L, (int)clob.length());
  }

  private static String getFieldTypeStr(String fieldType, int fieldSize)
    throws Exception
  {
    for (String string : TYPES) {
      if (fieldType.equalsIgnoreCase(string)) {
        return fieldType;
      }
    }
    if ("NUMBER".equalsIgnoreCase(fieldType)) {
      return fieldType + "(9)";
    }
    return fieldType + "(" + String.valueOf(fieldSize) + ")";
  }

  public static List<Map<String, Object>> query(String sql, Object[] params, int startIndex, int endIndex)
    throws Exception
  {
    log.debug("Execute Sql:" + sql);
    log.debug("Sql Params:" + StringUtil.join(params));
    StringBuilder sb = new StringBuilder();

    if ((startIndex != -1) && (endIndex != -1)) {
      sb.append("SELECT * FROM (");
      sb.append(" SELECT TEMP.*,ROWNUM RN FROM(");
      sb.append(sql);
      sb.append(" ) TEMP");
      sb.append(" ) TMP_A WHERE TMP_A.RN >");
      sb.append(startIndex);
      sb.append(" AND TMP_A.RN <= ");
      sb.append(endIndex);
    } else {
      sb.append(sql);
    }
    
    Connection conn = getConnection(false);
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    List retList = null;
    try {
      pstmt = conn.prepareStatement(sb.toString());
      if ((params != null) && (params.length > 0)) {
        for (int i = 0; i < params.length; i++) {
          pstmt.setObject(i + 1, params[i]);
        }
      }
      rs = pstmt.executeQuery();
      retList = extractResults(rs);
    } finally {
      closeJdbc(new ResultSet[] { rs }, new Statement[] { pstmt }, null);
    }
    return retList;
  }
}
