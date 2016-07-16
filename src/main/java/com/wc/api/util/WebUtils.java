package com.wc.api.util;

import com.wc.common.db.PageInfo;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.ServletRequestUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class WebUtils {
    private static final Logger logger = LoggerFactory.getLogger(WebUtils.class);

    public static PageInfo getPageInfo(HttpServletRequest request) {
        int page = ServletRequestUtils.getIntParameter(request, "page", 0);
        int pagesize = ServletRequestUtils.getIntParameter(request, "pageSize", 0);

        request.setAttribute("url",request.getRequestURI());

        PageInfo pageInfo = new PageInfo();
        if(pagesize > 0) {
            pageInfo.setPagesize(pagesize);
        }

        pageInfo.setPage(page);
        return pageInfo;
    }

    public static String getHost(String url) {
        try {
            String exp = url;
            int pos = url.indexOf("//");
            if(pos > -1) {
                exp = url.substring(pos + 2);
            }

            pos = exp.indexOf("/");
            if(pos > -1) {
                exp = exp.substring(0, pos);
            }

            if(exp.trim().length() == 0) {
                exp = "";
            }

            return exp;
        } catch (Exception var3) {
            return "";
        }
    }


    public static void writeJson(Object obj, HttpServletResponse response) {
        try {
            response.setHeader("Content-Language", "zh-cn");
            response.setContentType("text/xml");
            response.setHeader("Cache-Control", "no-cache");
            response.setContentType("application/json; charset=UTF-8");
            response.setCharacterEncoding("UTF-8");
            String e = JSONObject.fromObject(obj).toString();
            logger.debug("JSON:  " + e);
            response.getWriter().write(e);
        } catch (IOException var3) {
            var3.printStackTrace();
        }
    }

    public static void writeObj(Object obj, HttpServletResponse response) {
        try {
            response.setHeader("Content-Language", "zh-cn");
            response.setContentType("text/xml");
            response.setHeader("Cache-Control", "no-cache");
            response.setContentType("application/json; charset=UTF-8");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(obj.toString());
        } catch (IOException var3) {
            var3.printStackTrace();
        }
    }

    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }

        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }

        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Cdn-Src-Ip");
        }

        if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        return ip;
    }

}
