package com.wc.constant;


import com.wc.api.util.BaseConfig;

/**
 * Created by rubi on 14-2-9.
 */
public class Constant {
    public static final String PC_PATH= BaseConfig.getValue("pc.domain");

    /**
     * 放在session里的验证码的key
     */
    public static final String SESSION_VALID_CODE="code";


    public static final String REDIRECT_LOGIN = "redirect:/login/loginView";
    public static final String REDIRECT_REG = "redirect:/login/regView";
    public static final String REDIRECT_INDEX = "redirect:/";
}
