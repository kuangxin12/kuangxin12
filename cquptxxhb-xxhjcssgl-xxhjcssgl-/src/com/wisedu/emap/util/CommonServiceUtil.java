package com.wisedu.emap.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;

import sun.misc.BASE64Decoder;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

public class CommonServiceUtil {
	
	private static SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	private static SimpleDateFormat dfWithTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	/**
	 * date转String，格式为"yyyy-MM-dd"
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static String dateToString(Date date) throws ParseException{
		return df.format(date);
	}
	
	/**
	 * date转String，格式为"yyyy-MM-dd HH:mm:ss"
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static String dateToStringWithTime(Date date) throws ParseException{
		return dfWithTime.format(date);
	}
	
	/**
	 * String转date，格式为"yyyy-MM-dd"
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static Date stringToDate(String date) throws ParseException{
		return df.parse(date);
	}
	
	/**
	 * String转date，格式为"yyyy-MM-dd HH:mm:ss"
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static Date stringToDateWithTime(String date) throws ParseException{
		return dfWithTime.parse(date);
	}
	
	/**
	 * String转date，
	 * @param date
	 * @param type 可自定义，格式可为"yyyy-MM-dd HH:mm:ss" 或者 "yyyy年MM月dd日 HH时mm分ss秒"
	 * @return
	 * @throws ParseException
	 */
	public static Date stringToDateWithType(String date,String type) throws ParseException{
		SimpleDateFormat dateFormat = new SimpleDateFormat(type);
		return dateFormat.parse(date);
	}
	
	/**
	 * date转String，
	 * @param date
	 * @param type 可自定义，格式可为"yyyy-MM-dd HH:mm:ss" 或者 "yyyy年MM月dd日 HH时mm分ss秒"
	 * @return
	 * @throws ParseException
	 */
	public static String stringToDateWithType(Date date,String type) throws ParseException{
		SimpleDateFormat dateFormat = new SimpleDateFormat(type);
		return dateFormat.format(date);
	}
	
	/**
	 * BLOB转String
	 * @param blob
	 * @return
	 */
	/*public static String ConvertBLOBtoString(BLOB blob) {
		  String newStr = ""; // 返回字符串
		  long BlobLength; // BLOB字段长度
		  byte[] bytes; // BLOB临时存储字节数组
		  int i = 1; // 循环变量
		  try {		     
			    byte[] msgContent = blob.getBytes(); // BLOB转换为字节数组
			    BlobLength=blob.length();  //获取BLOB长度  
			    if (msgContent == null || BlobLength==0){   //如果为空，返回空值  
			          return "";  
			        }else{  
				     while(i<BlobLength){              //循环处理字符串转换，每次1024；Oracle字符串限制最大4k 
				             bytes= blob.getBytes(i,1024) ; 
				             i=i+1024; 
				             newStr = newStr+new String(bytes,"gb2312") ;          
				   } 
			 }
		  }catch(UnsupportedEncodingException e){
			  e.printStackTrace();
		  }catch (SQLException e) {
		   e.printStackTrace();
		  } 
		  	return newStr;
		 }*/
	
	
	/**
	 * @author:http://www.hipony.com/post-731.html
	 * html转化String
	 * @param Strng
	 * @return
	 */
	public static String ConvertHtmltoString(String inputString){
		  String htmlStr = inputString; // 含html标签的字符串
		  String textStr = "";
		  java.util.regex.Pattern p_script;
		  java.util.regex.Matcher m_script;
		  java.util.regex.Pattern p_style;
		  java.util.regex.Matcher m_style;
		  java.util.regex.Pattern p_html;
		  java.util.regex.Matcher m_html;

		  java.util.regex.Pattern p_html1;
		  java.util.regex.Matcher m_html1;

		  try {
		    // 定义script的正则表达式{或<script[^>]*?>[//s//S]*?<///script>
		   String regEx_script = "<[//s]*?script[^>]*?>[//s//S]*?<[//s]*?///[//s]*?script[//s]*?>";

		   // 定义style的正则表达式{或<style[^>]*?>[//s//S]*?<///style>
		   String regEx_style = "<[//s]*?style[^>]*?>[//s//S]*?<[//s]*?///[//s]*?style[//s]*?>";

		   // 定义HTML标签的正则表达式
		   String regEx_html = "<[^>]+>";
		   String regEx_html1 = "<[^>]+";
		   p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
		   m_script = p_script.matcher(htmlStr);
		   htmlStr = m_script.replaceAll(""); // 过滤script标签

		   p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		   m_style = p_style.matcher(htmlStr);
		   htmlStr = m_style.replaceAll(""); // 过滤style标签

		   p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
		   m_html = p_html.matcher(htmlStr);
		   htmlStr = m_html.replaceAll(""); // 过滤html标签

		   p_html1 = Pattern.compile(regEx_html1, Pattern.CASE_INSENSITIVE);
		   m_html1 = p_html1.matcher(htmlStr);
		   htmlStr = m_html1.replaceAll(""); // 过滤html标签

		   textStr = htmlStr;

		  } catch (Exception e) {
		       System.err.println("Html2Text: " + e.getMessage());
		  }

		  return textStr;// 返回文本字符串
	}
	
	
	/**
	 * 向前台传输数据
	 * @param response
	 * @param outHtml
	 */
	public static void outWriter(HttpServletResponse response,String outText){
		PrintWriter out = null;
		response.setHeader("Content-type", "text/html;charset=UTF-8");  
		response.setContentType("text/html;charset-utf-8");
		try {
				out = response.getWriter();
				out.write(outText);
				out.flush();
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
				out.close();
			}	
	}	
	
	/**
	 * 向前台传输数据(JSONObject or JSONArray)
	 * @param response
	 * @param outHtml
	 */
	public static void outWriterJSON(HttpServletResponse response,Object outText){
		PrintWriter out = null;
		response.setContentType("application/json; charset=utf-8");
		try {
				out = response.getWriter();
				out.print(outText);
				out.flush();
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
				out.close();
			}	
	}	
	
	/**
	 * 输出图片信息(获取小图的时候)
	 * @param response
	 * @param photoByte
	 */
	public static void outScmarketPhoto(HttpServletResponse response,byte[] photoByte){
		response.setContentType("image/jpeg;charset=utf-8");
		OutputStream out;
		try{
		    out = response.getOutputStream();
			byte[] bs = photoByte;
			out.write(bs);
			out.flush();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 输出64位图片加密流(获取大图的时候)
	 * @param response
	 * @param photoByte
	 * @throws UnsupportedEncodingException 
	 */
	public static void outScmPhotoByBase64(HttpServletResponse response,byte[] photoByte) throws UnsupportedEncodingException{
		String test = new String(Base64.encodeBase64(photoByte), "UTF-8");
		CommonServiceUtil.outWriter(response,test);
	}
	
	/**
	 * base64转byte[]
	 * @param imageData
	 * @return
	 * @throws IOException
	 */
	public static byte[] decodeBase64Tobyte(String imageData) throws IOException{  
        BASE64Decoder decoder = new BASE64Decoder();  
        byte[] data = decoder.decodeBuffer(imageData);  
        for(int i=0;i<data.length;++i)  
        {  
            if(data[i]<0)  
            {  
                //调整异常数据  
                data[i]+=256;  
            }  
        }  
        //  
        return data;  
    }	
	

    /**
     * Base64 btye[] to Image
     * @param data
     * @param width
     * @param height
     * @param proportion 是否等比压缩
     * @return
     * @throws IOException
     */
	public static byte [] Base64ToImage(byte [] data,int width,int height,boolean proportion) throws IOException
	{
		ByteArrayInputStream is = new ByteArrayInputStream(data);  
		BufferedImage img = ImageIO.read(is); 
		 try {   
             // 判断图片格式是否正确   
             if (img.getWidth(null) == -1) {  
                 System.out.println(" can't read,retry!" + "<BR>");   
                 return null;   
             } else {   
                 int newWidth; int newHeight;   
                 // 判断是否是等比缩放   
                 if (proportion == true) {   
                     // 为等比缩放计算输出的图片宽度及高度   
                     double rate1 = ((double) img.getWidth(null)) / (double) width + 0.1;   
                     double rate2 = ((double) img.getHeight(null)) / (double) height + 0.1;   
                     // 根据缩放比率大的进行缩放控制   
                     double rate = rate1 > rate2 ? rate1 : rate2;   
                     newWidth = (int) (((double) img.getWidth(null)) / rate);   
                     newHeight = (int) (((double) img.getHeight(null)) / rate);   
                 } else {   
                     newWidth = width; // 输出的图片宽度   
                     newHeight = height; // 输出的图片高度   
                 }   
                BufferedImage tag = new BufferedImage((int) newWidth, (int) newHeight, BufferedImage.TYPE_INT_RGB);   
                  
                /* 
                 * Image.SCALE_SMOOTH 的缩略算法 生成缩略图片的平滑度的 
                 * 优先级比速度高 生成的图片质量比较好 但速度慢 
                 */   
                tag.getGraphics().drawImage(img.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH), 0, 0, null);  
                
                ByteArrayOutputStream out = new ByteArrayOutputStream(data.length);
                // JPEGImageEncoder可适用于其他图片类型的转换   
                JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);   
                encoder.encode(tag);   
                
                out.flush();  
    		    out.close();  
    		    is.close();  
    		    data = out.toByteArray();
             }   
         } catch (IOException ex) {   
             ex.printStackTrace();   
         }   
         return data;   
	}
	
	/**
	 * 输入流转字节 
	 * @param inStream
	 * @return
	 */
	public static ByteArrayOutputStream inPutStreamToByte(InputStream inStream){
		ByteArrayOutputStream swapStream = new ByteArrayOutputStream(); 
		byte[] buff = new byte[100]; //buff用于存放循环读取的临时数据 
		int rc = 0; 
		try{
			while ((rc = inStream.read(buff, 0, 100)) > 0){
				swapStream.write(buff, 0, rc); 
			}
		}catch(IOException e1){
			e1.printStackTrace();
		}
		return swapStream;
	}		 
	
	
}
