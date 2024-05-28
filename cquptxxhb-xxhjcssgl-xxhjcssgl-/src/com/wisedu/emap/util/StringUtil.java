package com.wisedu.emap.util;

import com.wisedu.emap.base.util.JSONUtil;
import com.wisedu.emap.dao.ConditionManager;
import com.wisedu.emap.dao.SubScript;
import com.wisedu.emap.model2.IDaoAction;
import com.wisedu.emap.model2.container.DataModelContainer;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import self.micromagic.cg.ClassGenerator;
import self.micromagic.eterna.search.ConditionInfo;

public class StringUtil
{
  private static Pattern p_script = Pattern.compile("<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>", 2);
  private static Pattern p_style = Pattern.compile("<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>", 2);
  private static Pattern p_html = Pattern.compile("<[^>]+>", 2);

  public static final Pattern MAIL_PATTERN = Pattern.compile("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");

  public static final Pattern PHONE_PATTERN = Pattern.compile("^1\\d{10}$");
  public static final String regEx = "^(http|https|ftp)\\://([a-zA-Z0-9\\.\\-]+(\\:[a-zA-Z0-9\\.&%\\$\\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\\-]+\\.)*[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,4})(\\:[0-9]+)?(/[^/][a-zA-Z0-9\\.\\,\\?\\'\\\\/\\+&%\\$\\=~_\\-@]*)*$";
  public static final Pattern URL_PATTERN = Pattern.compile("^(http|https|ftp)\\://([a-zA-Z0-9\\.\\-]+(\\:[a-zA-Z0-9\\.&%\\$\\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\\-]+\\.)*[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,4})(\\:[0-9]+)?(/[^/][a-zA-Z0-9\\.\\,\\?\\'\\\\/\\+&%\\$\\=~_\\-@]*)*$");

  public static String joinSql(String[] arr)
  {
    if ((arr == null) || (arr.length < 1)) {
      return null;
    }
    StringBuilder buf = new StringBuilder();
    for (int i = 0; i < arr.length; i++) {
      buf.append("'").append(arr[i]).append("'");
      if (i < arr.length - 1) {
        buf.append(",");
      }
    }
    return buf.toString();
  }

  public static String joinSql(List<String> list)
  {
    if ((list == null) || (list.size() < 1)) {
      return null;
    }
    return joinSql((String[])list.toArray(new String[0]));
  }

  public static String join(String[] arr)
  {
    if ((arr == null) || (arr.length < 1)) {
      return null;
    }
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < arr.length; i++) {
      sb.append(arr[i]);
      if (i < arr.length - 1) {
        sb.append(",");
      }
    }
    return sb.toString();
  }

  public static String reverseJoin(String[] arr)
  {
    if ((arr == null) || (arr.length < 1)) {
      return null;
    }
    StringBuilder sb = new StringBuilder();
    for (int i = arr.length - 1; i >= 0; i--) {
      sb.append(arr[i]);
      if (i > 0) {
        sb.append(",");
      }
    }
    return sb.toString();
  }

  public static String join(Object[] arr)
  {
    if ((arr == null) || (arr.length < 1)) {
      return null;
    }
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < arr.length; i++) {
      sb.append(arr[i]);
      if (i < arr.length - 1) {
        sb.append(",");
      }
    }
    return sb.toString();
  }

  public static String join(List<String> list)
  {
    if ((list == null) || (list.size() < 1)) {
      return null;
    }
    return join((String[])list.toArray(new String[0]));
  }

  public static String reverseJoin(List<String> list)
  {
    if ((list == null) || (list.size() < 1)) {
      return null;
    }
    return reverseJoin((String[])list.toArray(new String[0]));
  }

  public static String joinWithoutStrArray(List<String> list, String split)
  {
    if ((list == null) || (list.size() < 1)) {
      return null;
    }
    return joinWithoutStrArray((String[])list.toArray(new String[0]), split);
  }

  public static String joinWithoutStrArray(String[] arr, String split)
  {
    if ((arr == null) || (arr.length < 1)) {
      return null;
    }
    split = addStr(split, ",", ",", true);
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < arr.length; i++) {
      if (split.indexOf("," + arr[i] + ",") >= 0) {
        continue;
      }
      sb.append(arr[i]);
      if (i < arr.length - 1) {
        sb.append(",");
      }
    }
    return removeStr(sb.toString(), ",", ",");
  }

  public static String joinWithoutWid(String[] arr)
  {
    if ((arr == null) || (arr.length < 1)) {
      return null;
    }
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < arr.length; i++) {
      if ("WID".equalsIgnoreCase(arr[i])) {
        continue;
      }
      sb.append(arr[i]);
      if (i < arr.length - 1) {
        sb.append(",");
      }
    }
    return removeStr(sb.toString(), ",", ",");
  }

  public static String joinWithoutWid(Object[] arr)
  {
    if ((arr == null) || (arr.length < 1)) {
      return null;
    }
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < arr.length; i++) {
      if ("WID".equalsIgnoreCase(toStr(arr[i]))) {
        continue;
      }
      sb.append(arr[i]);
      if (i < arr.length - 1) {
        sb.append(",");
      }
    }
    return removeStr(sb.toString(), ",", ",");
  }

  public static String joinWithoutWid(List<String> list)
  {
    if ((list == null) || (list.size() < 1)) {
      return null;
    }
    return joinWithoutWid((String[])list.toArray(new String[0]));
  }

  public static boolean isMail(String str)
  {
    return MAIL_PATTERN.matcher(str).matches();
  }

  public static boolean isPhone(String str)
  {
    return PHONE_PATTERN.matcher(str).matches();
  }

  public static boolean isUrl(String str)
  {
    return URL_PATTERN.matcher(str).matches();
  }

  public static String getErrorMsg(Exception e)
  {
    StringWriter sw = new StringWriter();
    PrintWriter pw = new PrintWriter(sw);
    try {
      e.printStackTrace(pw);
      String str = sw.toString();
      return str;
    } finally {
      pw.close();
    }
  }

  public static String subStrOracleLen(String str, int len)
  {
    int pos = 0;
    StringBuilder buf = new StringBuilder();
    for (int i = 0; i < str.length(); i++) {
      String s = str.substring(i, i + 1);
      if (s.matches("[\\u4e00-\\u9fa5]"))
        pos += 3;
      else {
        pos++;
      }
      if (pos > len) {
        break;
      }
      buf.append(s);
    }
    return buf.toString();
  }

  public static String cleanHtml(String str)
  {
    if (StringUtils.isEmpty(str)) {
      return str;
    }
    str = p_script.matcher(str).replaceAll("");
    str = p_style.matcher(str).replaceAll("");
    str = p_html.matcher(str).replaceAll("");
    return str.replaceAll("\"", "").replaceAll("'", "");
  }

  public static String safeHtml(String value)
  {
    if (value == null) {
      return null;
    }
    StringBuffer result = new StringBuffer(value.length());
    for (int i = 0; i < value.length(); i++) {
      switch (value.charAt(i)) {
      case '<':
        result.append("&lt;");
        break;
      case '>':
        result.append("&gt;");
        break;
      case '"':
        result.append("&quot;");
        break;
      case '\'':
        result.append("&#39;");
        break;
      case '%':
        result.append("&#37;");
        break;
      case ';':
        result.append("&#59;");
        break;
      case '(':
        result.append("&#40;");
        break;
      case ')':
        result.append("&#41;");
        break;
      case '&':
        result.append("&amp;");
        break;
      case '+':
        result.append("&#43;");
        break;
      default:
        result.append(value.charAt(i));
      }
    }

    return result.toString();
  }

  public static String addStr(String str, String left, String right, boolean status)
  {
    if (StringUtils.isNotEmpty(str)) {
      if (status) {
        if ((StringUtils.isNotEmpty(left)) && (!str.startsWith(left))) {
          str = left + str;
        }
        if ((StringUtils.isNotEmpty(right)) && (!str.endsWith(right)))
          str = str + right;
      }
      else {
        if (StringUtils.isNotEmpty(left)) {
          str = left + str;
        }
        if (StringUtils.isNotEmpty(right)) {
          str = str + right;
        }
      }
      return str;
    }
    return null;
  }

  public static String removeStr(String str, String left, String right)
  {
    if (StringUtils.isNotEmpty(str)) {
      if ((StringUtils.isNotEmpty(left)) && (str.startsWith(left))) {
        str = str.substring(left.length());
      }
      if ((StringUtils.isNotEmpty(right)) && (str.endsWith(right))) {
        str = str.substring(0, str.length() - right.length());
      }
      return str;
    }
    return null;
  }

  public static int toInt(Object o)
  {
    return toInt(o, 0);
  }

  public static int toInt(Object o, int defaultValue)
  {
    try
    {
      return Integer.parseInt(o.toString()); } catch (Exception e) {
    }
    return defaultValue;
  }

  public static String toStr(Object o)
  {
    return o == null ? "" : o.toString();
  }

  public static String toStr(Object o, String defaultValue)
  {
    if (o == null) {
      return defaultValue;
    }
    return o.toString();
  }

  public static String json2Sql(String json, String tableName)
    throws Exception
  {
    String sql = "";
    if (StringUtils.isBlank(json)) {
      return sql;
    }
    Object obj = JSONUtil.parse2Obj(json);
    List<String> subSqlList = new ArrayList();
    if ((obj instanceof List))
    {
      Object[] o = parseStruct((List)obj);
      for (Object object : o) {
        String subSql = "";
        if ((object instanceof Object[])) {
          subSql = "(" + getSubSql(subSql, object, tableName) + ")";
          subSqlList.add(" AND" + subSql);
        } else {
          ConditionInfo c = (ConditionInfo)object;
          sql = sql + " " + c.linkOpt + " " + tableName + "." + c.name + " " + getSql(c.builderName, toStr(c.value));
        }
      }
      for (String subSql : subSqlList) {
        sql = sql + subSql;
      }
    }
    else if ((obj instanceof Map))
    {
      Map map = (Map)obj;
      sql = " " + map.get("linkOpt") + " " + tableName + "." + map.get("name") + " " + getSql(toStr(map.get("builder")), toStr(map.get("value")));
    }
    return sql;
  }

  public static List<String> getJsonValue(String json)
  {
    List values = new ArrayList();
    if (StringUtils.isEmpty(json)) {
      return values;
    }
    String regEx = "\"value\":\"([^\"]*)\"";
    Pattern pat = Pattern.compile(regEx);
    Matcher mat = pat.matcher(json);
    while (mat.find()) {
      String value = mat.group(1);
      values.addAll(Arrays.asList(value.split(",")));
    }
    return values;
  }

  public static String getJson2Sql(String json, IDaoAction action)
    throws Exception
  {
    String sql = " 1=1 ";
    try {
      SubScript sub = getJson2Script(json, action);
      sql = sub.getSubScript();
    }
    catch (Exception localException) {
    }
    return sql;
  }

  public static String getJson2Sql(String json, String tableName)
    throws Exception
  {
    String sql = " 1=1 ";
    try {
      SubScript sub = getJson2Script(json, tableName);
      sql = sub.getSubScript();
    }
    catch (Exception localException) {
    }
    return sql;
  }

  public static SubScript getJson2Script(String json, IDaoAction action)
    throws Exception
  {
    SubScript sub = ConditionManager.makeSubScript(json, action);
    return sub;
  }

  public static SubScript getJson2Script(String json, String tableName)
    throws Exception
  {
    return getJson2Script(json, DsUtil.getContainer(tableName).getQueryAction());
  }

  private static String getSubSql(String subSql, Object obj, String tableName) throws Exception
  {
    if ((obj instanceof Object[])) {
      Object[] o = (Object[])obj;
      for (int i = 0; i < o.length; i++) {
        subSql = getSubSql(subSql, o[i], tableName);
        if (i == 0) {
          ConditionInfo c = (ConditionInfo)o[i];
          subSql = subSql.replace(" " + c.linkOpt + " ", "");
        }
      }
    } else {
      ConditionInfo c = (ConditionInfo)obj;
      subSql = subSql + " " + c.linkOpt + " " + tableName + "." + c.name + " " + getSql(c.builderName, toStr(c.value));
    }
    return subSql;
  }

  private static String getSql(String builder, String value) throws Exception {
    Map map = new HashMap();
    map.put("isNull", "IS NULL");
    map.put("notNull", "IS NOT NULL");
    map.put("equal", "='" + value + "'");
    map.put("notEqual", "!='" + value + "'");

    map.put("beginWith", "LIKE '" + value + "%'");
    map.put("endWith", "LIKE '%" + value + "'");
    map.put("include", "LIKE '%" + value + "%'");

    map.put("m_value_include", "LIKE '" + value + "' ESCAPE ''");
    map.put("m_value_not_include", "NOT (LIKE '" + value + "' ESCAPE '')");

    map.put("more", ">'" + value + "'");
    map.put("less", "<'" + value + "'");
    map.put("moreEqual", ">='" + value + "'");
    map.put("lessEqual", "<='" + value + "'");

    if ((StringUtils.isNotEmpty(value)) && (
      ("m_value_equal".equals(builder)) || ("m_value_not_equal".equals(builder)))) {
      map.put("m_value_equal", "in('" + value.replaceAll(",", "','") + "')");
      map.put("m_value_not_equal", "not in('" + value.replaceAll(",", "','") + "')");
    }
    String temp = (String)map.get(builder);
    if (StringUtils.isEmpty(temp)) {
      throw new Exception("没有找到关键字" + builder + "，请检查！");
    }
    return temp;
  }

  private static Object[] parseStruct(List items)
  {
    List result = new ArrayList();
    for (Iterator localIterator = items.iterator(); localIterator.hasNext(); ) { Object cItem = localIterator.next();

      if ((cItem instanceof Map))
      {
        Map item = (Map)cItem;

        String name = (String)item.get("name");
        Object value = item.get("value");
        String linkOpt = (String)item.get("linkOpt");
        String builder = (String)item.get("builder");
        result.add(new ConditionInfo(name, linkOpt, value, builder));
      }
      else if ((cItem instanceof ConditionInfo))
      {
        result.add(cItem);
      } else {
        if (cItem == null)
          continue;
        if (ClassGenerator.isArray(cItem.getClass()))
        {
          result.add(parseStruct(Arrays.asList((Object[])cItem)));
        }
        else
        {
          result.add(parseStruct((List)cItem));
        }
      }
    }
    return result.toArray();
  }

  public static boolean isNumber(String number)
  {
    return NumberUtils.isNumber(number);
  }

  public static boolean isNumber(String number, int pos)
  {
    if (!isNumber(number)) {
      return false;
    }
    number = number.trim();
    String[] tmps = number.split("\\.");
    if ((tmps.length == 1) && (pos == 0)) {
      return true;
    }

    return (tmps.length == 2) && (tmps[1].length() == pos);
  }
}