package com.wc.api.util;

import com.wc.constant.Constant;
import com.wc.user.bean.Member;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

/**
 */
public class RegLoginUtil {
    private static final Logger logger = LoggerFactory.getLogger(RegLoginUtil.class);

    //cookie
    // 7天*30， cookie _mu  的过期时间
    public static final int MU_TIIME = 604800 * 30;
    private static final String MU = "_mu";
    public static final String CHARSET_ENCODE = "UTF-8";
    //前台登录
    public final static String LOGIN_WWW = "w";
    //后台登录
    public final static String LOGIN_ADMIN = "a";
    //session
    public final static String SESSION_UID = "uid";
    public final static String SESSION_USER = "user";
    public final static String JSESSIONID = "jid";


    private RegLoginUtil() {

    }

    public static long getSessionUid(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session!=null){
            Object obj = session.getAttribute(SESSION_UID);
            if(obj!=null){
                return Long.parseLong(obj + "");
            }
        }
        return -1L;
    }

    public static Member getSessionUser(HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session!=null){
            Object obj = session.getAttribute(SESSION_USER);
            if(obj!=null){
                return (Member) obj;
            }
        }
        return null;
    }

    public static Member delSessionUser(HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session!=null){
            session.removeAttribute(SESSION_USER);
        }
        return null;
    }

    public static void setSessionUid(HttpServletRequest request,long uid){
        HttpSession session = request.getSession();
        if(session!=null){
            session.setAttribute(SESSION_UID,uid);
        }
    }

    public static String getSessionValidCode(HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session!=null){
            Object obj = session.getAttribute(Constant.SESSION_VALID_CODE);
            if(obj!=null){
                return (String) obj;
            }
        }
        return null;
    }

    /**
     * 登陆后写cookie
     *
     * @param response
     * @param member
     * @return
     */
    public static boolean writeLoginCookie(HttpServletResponse response,
                                           Member member) {
        if(member==null){
            logger.error("用户不能为空");
            return false;
        }

        String[] cs = new String[]{member.getNickname(),member.getMobile(),
                LOGIN_WWW};

        String mu= StringUtils.join(cs,"|");


        try {
            mu = URLEncoder.encode(mu, CHARSET_ENCODE);
        } catch (UnsupportedEncodingException e) {
            logger.error( e.getMessage() + " mu:" + mu, e);
            return false;
        }

        mu = mu.replaceAll("\\+","%20");

        try {
            CookieUtil.setCookieValue(response,MU, mu,"/",MU_TIIME);
        }catch (Exception e){
            logger.error( e.getMessage() + " mu:" + mu, e);
            return false;
        }

        return true;
    }

    public static boolean writeJsessionIdCookie(HttpServletResponse response,String jsessionId) {
        try {
            CookieUtil.setCookieValue(response,JSESSIONID, jsessionId,"/",MU_TIIME);
        }catch (Exception e){
            logger.error( e.getMessage() + " JSESSIONID:" + jsessionId, e);
            return false;
        }

        return true;
    }

    public static void deleteCookie(HttpServletRequest request,HttpServletResponse response){
        CookieUtil.deleteCookie(request,response,"/",MU,JSESSIONID);

    }
    /**
     * 更新用户信息时，同时更新cookie中的昵称
     *
     * @param request
     * @param response
     * @param nickName
     */
    public static void updateNickName(HttpServletRequest request, HttpServletResponse response, String nickName) {
        nickName = nickName == null ? "" : nickName;
        String mu = CookieUtil.getCookieValue(request, MU);
        if (StringUtils.isBlank(mu)) {
            return ;
        }
        String newVal = "";
        try {
            mu = URLDecoder.decode(mu, CHARSET_ENCODE);
        } catch (UnsupportedEncodingException e) {
            logger.error( e.getMessage() + " mu:" + mu, e);
        }
        String[] muArr = mu.split("\\|", -1);
        muArr[0] = nickName;
        newVal = StringUtils.join(muArr, "|");
        try {
            newVal = URLEncoder.encode(newVal, CHARSET_ENCODE);
        } catch (UnsupportedEncodingException e) {
            logger.error( e.getMessage() + " newVal:" + newVal, e);
        }
        try {
            if (StringUtils.isNotBlank(newVal)) {
                newVal = newVal.replaceAll("\\+", "%20");
                CookieUtil.setCookieValue(response, MU, newVal, "/", MU_TIIME);
            }
        } catch (Exception e) {
            logger.error(" newVal:" + newVal,e);
        }
    }

    /**
     * 从cookie获取用户昵称
     *
     * @param request
     * @return
     */
    public static String getNickName(HttpServletRequest request) {
        String mu = CookieUtil.getCookieValue(request, MU);
        String nickName = "";
        if (StringUtils.isNotBlank(mu)) {
            try {
                mu = URLDecoder.decode(mu, CHARSET_ENCODE);
            } catch (UnsupportedEncodingException e) {
                logger.error( e.getMessage() + " mu:" + mu, e);
            }
            String[] arr = mu.split("\\|", -1);
            nickName = arr[0];

        }

        return nickName;
    }

    /**
     * 从cookie中获取登录名称
     *
     * @param request
     * @return
     */
    public static String getLoginName(HttpServletRequest request) {
        String mu = CookieUtil.getCookieValue(request, MU);
        String loginName = "";
        if (StringUtils.isNotBlank(mu)) {
            try {
                mu = URLDecoder.decode(mu, CHARSET_ENCODE);
            } catch (UnsupportedEncodingException e) {
                logger.error( e.getMessage() + " mu:" + mu, e);
            }
            String[] arr = mu.split("\\|", -1);
            if (arr.length > 1) {
                loginName = arr[1];
            }
        }
        return loginName;
    }


}
