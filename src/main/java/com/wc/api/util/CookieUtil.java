package com.wc.api.util;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 用户cookie工具类
 *
 * @author jiawu.wu
 */
public class CookieUtil {

    private static final Logger logger = LoggerFactory.getLogger(CookieUtil.class);

    public static String getCookieValue(HttpServletRequest request, String cookieName) {
        Assert.notNull(request);
        Assert.hasText(cookieName);
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (cookie != null && cookie.getName() != null && cookie.getName().equals(cookieName)) {
                    //特殊字符串处理
                    String rValue = decode(cookie.getValue());
                    return rValue;
                }
            }
        }
        return null;
    }

    public static void setCookieValue(HttpServletResponse response, String cookieName, String value, String cookiePath, int cookieAge) {
        logger.debug("1 setCookieValue:  " + value);
        System.out.println("1 setCookieValue:  " + value);
        Assert.notNull(response);
        Assert.hasText(cookieName);
        Assert.hasText(value);
        //特殊字符串处理
        value = encode(value);
        Cookie cookie = new Cookie(cookieName, value);
        if (StringUtils.isBlank(cookiePath)) {
            cookie.setPath("/");
        } else {
            cookie.setPath(cookiePath);
        }
        cookie.setMaxAge(cookieAge);
        logger.debug("2 setCookieValue:  " + value);
        System.out.println("2 setCookieValue:  " + value);
        response.addCookie(cookie);
    }

    public static void setCookieValue(HttpServletResponse response, String cookieName, String value, String cookiePath, String domain, int cookieAge) {
        Assert.notNull(response);
        Assert.hasText(cookieName);
        Assert.hasText(value);
        //特殊字符串处理
        value = encode(value);
        Cookie cookie = new Cookie(cookieName, value);
        if (StringUtils.isBlank(cookiePath)) {
            cookie.setPath("/");
        } else {
            cookie.setPath(cookiePath);
        }
        cookie.setDomain(domain);
        cookie.setMaxAge(cookieAge);
        response.addCookie(cookie);
    }

    /**
     * 获取某个url的domain
     *
     * @param url
     * @return
     */
    public static String getHost(String url) {
        try {
            String s = url;
            int pos = s.indexOf("//");
            if (pos > -1) s = s.substring(pos + 2);
            pos = s.indexOf("/");
            if (pos > -1) s = s.substring(0, pos);
            if (s.trim().length() == 0) s = "";
            return s;
        } catch (Exception exp) {
            return "";
        }
    }

    /**
     * 删除Cookie，使cookie马上过期(.meiliwan.com域)
     *
     * @param request
     * @param response
     * @param path        cookie存放的路径
     * @param cookieNames
     * @return
     */
    public static String deleteCookie(HttpServletRequest request, HttpServletResponse response, String path, String... cookieNames) {
        Assert.notNull(request);

        path = (path == null || path.equals("")) ? "/" : path;

        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                for (String cookieName : cookieNames) {
                    Assert.hasText(cookieName);
                    if (cookie.getName().equals(cookieName)) {
                        cookie.setPath(path);
                        cookie.setMaxAge(0);
                        response.addCookie(cookie);
                        break;
                    }
                }

            }
        }
        return null;
    }

    /**
     * 删除Cookie，使cookie马上过期
     *
     * @param request
     * @param response
     * @param path        cookie存放的路径
     * @param domain      cookie存放的域
     * @param cookieNames
     * @return
     */
    public static String deleteCookieDomain(HttpServletRequest request, HttpServletResponse response, String path, String domain, String... cookieNames) {
        Assert.notNull(request);

        path = (path == null || path.equals("")) ? "/" : path;

        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                for (String cookieName : cookieNames) {
                    Assert.hasText(cookieName);
                    if (cookie.getName().equals(cookieName)) {
                        cookie.setPath(path);
                        cookie.setMaxAge(0);
                        cookie.setDomain(domain);
                        response.addCookie(cookie);
                        break;
                    }
                }

            }
        }
        return null;
    }

    public static String deleteAllDomainCookie(HttpServletRequest request, HttpServletResponse response, String domain) {
        Assert.notNull(request);
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (cookie.getDomain() != null && cookie.getDomain().equals(domain)) {
                    cookie.setPath(cookie.getPath());
                    cookie.setMaxAge(0);
                    cookie.setDomain(cookie.getDomain());
                    response.addCookie(cookie);
                }

            }
        }
        return null;
    }

    private static String encode(String json) {
        return json.
                replaceAll("\"", "\\&").
                replaceAll(",", "\\$");
    }

    private static String decode(String json) {
        return json.
                replaceAll("\\&", "\"").
                replaceAll("\\$", ",");
    }
}
