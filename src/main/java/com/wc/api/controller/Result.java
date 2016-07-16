//package com.wc.api.controller;
//
//
//import java.util.HashMap;
//import java.util.Map;
//
//public class Result<T> {
//
//    public static final Integer SUCCESS = 0;//成功
//    public static final Integer ERROR = 1; //错误
//    public static final Integer FORBIDDEN_ERROR = 403;//登陆错误
//
//    private Integer code;
//
//    private Map<String, String> msg = new HashMap<String, String>();
//
//    private T data;
//
//
//    public static Result<Object> errorResult(String error0) {
//        Result<Object> result = new Result<Object>();
//        result.setCode(ERROR);
//        result.setData("");
//        result.msg.put("error0", error0);
//        return result;
//    }
//
//    /**
//     * 成功
//     *
//     */
//    public static Result<Object> successResult(String msg, Object data) {
//        Result<Object> result = new Result<Object>();
//        result.setCode(SUCCESS);
//        result.msg.put("success", msg);
//        result.setData(data);
//        return result;
//    }
//
//    /**
//     * 成功返回
//     *
//     */
//    public static Result<Object> successResult(Object data) {
//        return successResult("", data);
//    }
//
//    public Result data(T data) {
//        this.data = data;
//        return this;
//    }
//
//    public Result addMsg(String key, String value) {
//        this.msg.put(key, value);
//        return this;
//    }
//
//    public Integer getCode() {
//        return code;
//    }
//
//    public void setCode(Integer code) {
//        this.code = code;
//    }
//
//    public Map<String, String> getMsg() {
//        return msg;
//    }
//
//    public void setMsg(Map<String, String> msg) {
//        this.msg = msg;
//    }
//
//    public T getData() {
//        return data;
//    }
//
//    public void setData(T data) {
//        this.data = data;
//    }
//}
