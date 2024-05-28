package com.wisedu.emap.xxhjcssgl.service;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Controller
@Component
public class MessagesService {
	/**
	 * 调用总线restful接口消息接口发送
	 * @param subject
	 * @param content
	 * @param tagId
	 * @return
	 * @throws IOException
	 */
	@RequestMapping({"/audit3.do"})
	public @ResponseBody String sendMessages (String subject ,String content,String tagId,
								String userId,String fslx,String mobile,String email) throws IOException{

		HttpClient httpClient = new DefaultHttpClient();
		//获取消息访问域名端口
		String apipath = "http://apis.cqupt.edu.cn";
		//获取消息的accessToken
		String accessToken = "68604f5a3ee8ab2252745e74495cc3b1";
		//获取消息的appId
		String appId = "5331995912375122";
		//获取学校代码
		String schoolCode = "10617";
		//计算sign accesstoken+schoolCode+第一个收件人userId  MD5加密32位小写
		StringBuffer sb = new StringBuffer();
		sb.append(accessToken);
		sb.append(schoolCode);
		sb.append(userId);
		String sign = encryption(sb.toString());
		//此接口实现 是邮件消息发送
		// api请求地址url
		String url = apipath+"/mp_message_pocket_web-mp-restful-message-send/ProxyService/message_pocket_web-mp-restful-message-sendProxyService";
		//http://apis.cqu.edu.cn/mp_message_pocket_web-mp-restful-message-send/ProxyService/message_pocket_web-mp-restful-message-sendProxyService
		// 业务参数
		String jsonObject = "{"
				+ "\"appId\": \""+appId+"\","
				+ "\"subject\": \""+subject+"\","//消息标题
				+ "\"content\": \""+content+"\","//消息内容
				+ "\"sendType\": \""+fslx+"\","    //消息发送类型，发送方式: 0.PC门户通知和移动校园同时发送（通常为此种方式） 1.只发送PC门户 2.只发送移动校园 3邮件 4短信 5微信
				+ "\"sendNow\": true,"  //发送方式，是否立即发送，0:定时发送 1:立即发送 默认1
				+ "\"tagId\": "+tagId+"," //默认1012  消息标签，通用标签对应关系详见下面的tagId对应关系表，如果要获取所有请调用接口10
				+ "\"receivers\": ["//收件人信息
				+ "   {"
				+ "\"userId\": \""+userId+"\","
				+ "\"mobile\": \""+mobile+"\","//发短消息必填
				+ "\"email\": \""+email+"\","//发邮件时必填
				+ "\"flag\": 0"//邮件收件人标识（ 0正常发送 1密送 2抄送）
				+  "   }"
				+"  ],"
				+ "\"schoolCode\": \""+schoolCode+"\","
				+ "\"sign\": \""+sign+"\""
				+"}";

		StringEntity entity = new StringEntity(jsonObject, "utf-8");// 解决中文乱码问题
		entity.setContentEncoding("UTF-8");
		entity.setContentType("application/json");

		// 获取调用方法
		HttpPost method = new HttpPost(url);
		method.setEntity(entity);
		// appId accessToken Header头文件信息传入
		method.setHeader("appId", appId);
		method.setHeader("accessToken", accessToken);

		// 方法调用
		HttpResponse result = httpClient.execute(method);

		// 解析结果
		HttpEntity ret = result.getEntity();
		String retStr = EntityUtils.toString(ret);
		//JSONObject jsonobject = JSONObject.parseObject(retStr);
		//return (String) jsonobject.get("msg");
		return retStr;
	}


	/**
	 * 获取32位小写的MD5加密文
	 * @param plain
	 * @return 加密密文
	 */
	public static String encryption(String plain) {
		String re_md5 = new String();
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(plain.getBytes());
			byte b[] = md.digest();
			int i;
			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0) i += 256;
				if (i < 16) buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			re_md5 = buf.toString();

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return re_md5;
	}
}
