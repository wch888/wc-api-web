//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.wc.api.util;

import java.io.Serializable;

public class JsonResult implements Serializable {
    public static final String LOGIN = "login";
    public static final String PARAM = "param";
    public static final String ERROR = "error";
    private String code;
    private String msg;
    private boolean result;
    private Object data;

    public JsonResult(boolean result) {
        this.result = result;
    }

    public JsonResult(boolean result, String code, String msg) {
        this.code = code;
        this.msg = msg;
        this.result = result;
    }

    public JsonResult(boolean result,String msg) {
        this.msg = msg;
        this.result = result;
    }

    public Object getData() {
        return data;
    }

    public JsonResult setData(Object data) {
        this.data = data;
        return this;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public boolean isResult() {
        return this.result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public static JsonResult notLogin() {
        return new JsonResult(false, LOGIN, "没有登陆");
    }
    @Override
    public String toString() {
        return "JsonResult{" +
                "code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                ", result=" + result +
                '}';
    }
}
