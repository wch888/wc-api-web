package com.wc.api.util;

import com.wc.constant.Constant;
import org.apache.commons.lang.StringUtils;
import org.springframework.ui.Model;
import org.springframework.web.bind.ServletRequestUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by rubi on 15-1-2.
 */
public class LoginUtil {

    public static final String USER_NAME = "userName";
    public static final String NICK_NAME = "nickName";
    public static final String LOGIN_TYPE = "loginType";
    public static final String TOKEN_STR = "tokenStr";
    public static final String LOGIN_NAME = "loginName";
    public static final String LOGIN_PASSWD = "loginPasswd";
    public static final String TARGET_URL = "targetUrl";
    /**
     * 登录后的统一动作，更新登录时间， 写cookie, 写缓存，
     *
     * @param model
     * @param request
     * @param response
     * @return
     */
    public static String loginAfter(Model model, HttpServletRequest request,
                                    HttpServletResponse response) {

        String loginName = ServletRequestUtils.getStringParameter(request,"userName","");
        String targetUrl = ServletRequestUtils.getStringParameter(request,"targetUrl","");

        // 获取不到跳转链接，则跳转到
        if (StringUtils.isBlank(targetUrl)) {
            targetUrl = Constant.PC_PATH;
        }

//        // 写Session
//        try {
//            // 注意这里用的是 newSession ,登陆成功重新刷新cookieID和sessionID
//            CookieSessionUtil.newSession(request, response).setUidAndNickname(
//                    loginpassport.getUid().toString(),
//                    loginpassport.getNickName() + "");
//            UserLoginUtil.updateUserState(loginpassport.getUid(),
//                    loginpassport.getState() + "");
//        } catch (JedisClientException e) {
//            model.addAttribute(WebConstant.SUCCESS_FLAG, false);
//            model.addAttribute("code", "-1");
//            model.addAttribute(WebConstant.COMMON_MSG, "系统异常，请联系客服！");
//            LOGGER.error(e, "用户登录后写缓存发生异常.user:" + loginpassport,
//                    WebUtils.getIpAddr(request));
//            throw new WebRuntimeException(
//                    ErrorPageCode.EXCEPTION_SYSTEM_DEFAULT);
//        }
//
//        writeLoginCookie(request, response, loginType, loginName, loginpassport);
//
//        model.addAttribute(WebConstant.SUCCESS_FLAG, true);

        return targetUrl;

    }
}
