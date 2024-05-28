package com.wisedu.emap.xxhjcssgl.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created by HR on 2017/3/1.
 * 下载文件
 */

@Controller
public class FileDownLoadController implements ServletContextAware {
    //Spring这里是通过实现ServletContextAware接口来注入ServletContext对象
    private ServletContext servletContext;

    /**
     * 下载文件
     *
     * @param response
     * @param name     　页面显示的文件名
     * @param oName    数据库里的文件名
     */

    @RequestMapping("/fileDownLoad")
    @ResponseBody
    public void fileDownLoad(HttpServletResponse response,
                             @RequestParam(value = "name", required = true) String name,
                             @RequestParam(value = "oName", required = true) String oName
                            ) {
    	System.out.println("文件路径----》》》sssss");
     
            //获取文件扩展名
            String fileExpName = "";
           int pos = oName.lastIndexOf(".");
            if (-1 != pos) {
                fileExpName = oName.substring(pos);
            }

            //1.设置文件ContentType类型，这样设置，会自动判断下载文件类型
            response.setContentType("multipart/form-data");
            //2.设置文件头：最后一个参数是设置下载文件名(假如我们叫a.pdf)
            // response.setHeader("Content-Disposition", "attachment;fileName=" + name + fileExpName);
            try {
                response.addHeader("Content-Disposition", "attachment;filename=" + new String(name.getBytes("gb2312"), "ISO8859-1"));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            ServletOutputStream out;
            //通过文件路径获得File对象(假如此路径中有一个download.pdf文件)
//        File file = new File(Constants.FILE_PATH + oName);

           // File file = new File(ScEwm.filePath(type) + oName);
            File file = new File( "/opt/wiseduAppGroups/publicapp/xxhjcssgl/web/public/word/" + oName);
            
            try {
                InputStream inputStream = new FileInputStream(file);

                OutputStream os = response.getOutputStream();
                byte[] b = new byte[2048];
                int length;
                while ((length = inputStream.read(b)) > 0) {
                    os.write(b, 0, length);
                }
                // 这里主要关闭。
                os.close();

                inputStream.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    

    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }
}
