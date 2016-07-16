package com.wc.api.controller.user;


import com.wc.api.controller.base.SmsController;
import com.wc.api.controller.wallet.WalletManger;
import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.api.util.WebUtils;
import com.wc.user.bean.Member;
import com.wc.user.service.MemberService;
import com.wc.util.MD5Util;
import com.wordnik.swagger.annotations.*;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.UUID;


/**
 * 注册登录模块
 */
@Api(value = "login", description = "登录管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/login")
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    //    public static ConcurrentLRUHashMap<String, String> smsCache = new ConcurrentLRUHashMap<String, String>(20);
    String[] pattern = new String[]{"yyyy-MM","yyyyMM","yyyy/MM",
            "yyyyMMdd","yyyy-MM-dd","yyyy/MM/dd",
            "yyyyMMddHHmmss",
            "yyyy-MM-dd HH:mm:ss",
            "yyyy/MM/dd HH:mm:ss"};
    @Autowired
    private MemberService memberService;
    @Autowired
    private WalletManger walletManger;


    private Member getMember(HttpServletRequest request, HttpServletResponse res) {
        String userName = ServletRequestUtils.getStringParameter(request, "username", "");
        String nickName = ServletRequestUtils.getStringParameter(request, "nickName", "");
        String password = ServletRequestUtils.getStringParameter(request,"password","");
        if(StringUtils.isBlank(userName)||StringUtils.isBlank(password)){
            WebUtils.writeJson(new JsonResult(false, "用户名或者密码不能为空"), res);
            return null;
        }
        Member member = new Member();
        member.setMobile(userName);
        if(StringUtils.isBlank(nickName)){
            nickName=userName;
        }
        member.setNickname(nickName);
        String passmd5 = MD5Util.MD5(password+userName);
        member.setPassword(passmd5);
        member.setLastdate(new Date());
        return member;
    }


    @ApiOperation(value = "登录", notes = "登录,需要记录cookie，后面的所有请求记得带上cookie", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "登录成功")})
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult login(HttpServletRequest req, HttpServletResponse res,
                        @ApiParam(value = "username", required = true) @RequestParam String username,
                        @ApiParam(value = "password", required = true) @RequestParam String password) {


        if(StringUtils.isBlank(username)||StringUtils.isBlank(password)){
            return new JsonResult(false,"用户名或者密码不能为空");
        }
        Member member = new Member();
        member.setMobile(username);
        String passmd5 = MD5Util.MD5(password+username);
        member.setPassword(passmd5);
        Member loginMember =  memberService.get(member);
        if(null == loginMember){
            return new JsonResult(false,"用户名或者密码错误");
        }
        //写入cookie
        HttpSession session = req.getSession();
        session.setAttribute(RegLoginUtil.SESSION_UID, loginMember.getId());

        Member update = new Member();
        update.setLastdate(new Date());
        update.setJsessionid(session.getId());
        update.setId(loginMember.getId());
        memberService.update(update);
        loginMember.setDescription(null);
        loginMember.setPassword(null);
        session.setAttribute(RegLoginUtil.SESSION_USER, loginMember);
        logger.debug(""+session.getAttribute(RegLoginUtil.SESSION_UID));
        boolean cookie = RegLoginUtil.writeLoginCookie(res, loginMember);
        cookie |= RegLoginUtil.writeJsessionIdCookie(res, session.getId());
        if(!cookie){
            return new JsonResult(false, "写入cookie失败");
        }
        return new JsonResult(true);

    }

    @ApiOperation(value = "注册", notes = "注册", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "注册成功")})
    @RequestMapping(value = "/reg", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult reg(HttpServletRequest req, HttpServletResponse res,
                          @ApiParam(value = "用户名：现在暂时是手机号", required = true) @RequestParam String username,
                          @ApiParam(value = "密码", required = true) @RequestParam String password,
                          @ApiParam(value = "验证码", required = true) @RequestParam String code,
                          @ApiParam(value = "注册来源:pc(触屏)、android(安卓)、ios(苹果)", required = true) @RequestParam String origin) {

        Member member = getMember(req, res);
        if (member == null) return new JsonResult(false, "参数错误");
        HttpSession session = req.getSession();
        long uid=0;
        try {
            Member result = memberService.getByUserName(username);
            if(null!=result){
                return new JsonResult(false, "用户已经存在");
            }
            String sms = SmsController.smsCache.get(username);
            if(!StringUtils.equals(sms,code)){
                return new JsonResult(false, "验证码不正确");
            }

            member.setJsessionid(session.getId());
            member.setCreateTime(new Date());
            member.setPushId(UUID.randomUUID().toString());
            uid = memberService.add(member);
        } catch (Exception e) {
            logger.error("",e);
            return new JsonResult(true, "注册用户失败");
        }
        //写入cookie

        session.setAttribute(RegLoginUtil.SESSION_UID,uid);
        logger.debug("uid:" + session.getId());
        boolean cookie = RegLoginUtil.writeLoginCookie(res, member);
        cookie |= RegLoginUtil.writeJsessionIdCookie(res, session.getId());
        if(!cookie){
            return new JsonResult(true, "写入cookie失败");
        }
        walletManger.reg(uid);
        return new JsonResult(true, "注册成功");
    }

    @ApiOperation(value = "退出", notes = "退出,记住清理cookie", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "退出成功")})
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult logout(HttpServletRequest req, HttpServletResponse res) {
        //TODO 清理工作
        RegLoginUtil.deleteCookie(req,res);
        HttpSession session = req.getSession();
        session.removeAttribute(RegLoginUtil.SESSION_UID);//是清除SESSION里的某个属性.
        session.invalidate();//是让SESSION失效.
        return new JsonResult(true, "退出成功");
    }

    @ApiOperation(value = "忘记密码", notes = "忘记密码", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "成功")})
    @RequestMapping(value = "/forget", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult forget(HttpServletRequest req, HttpServletResponse res,
                             @ApiParam(value = "用户名：现在暂时是手机号", required = true) @RequestParam String mobile,
                             @ApiParam(value = "密码", required = true) @RequestParam String password,
                             @ApiParam(value = "验证码", required = true) @RequestParam String code) {
        String temp = SmsController.smsCache.get(mobile);
        if (!org.apache.commons.lang.StringUtils.equals(code, temp)) {
            return new JsonResult(false, "验证码错误");
        }
        Member member = new Member();
        member.setMobile(mobile);
        Member result = memberService.get(member);
        String pass = MD5Util.MD5(password + result.getMobile());
        result.setPassword(pass);
        if (result != null) {
            memberService.update(result);
        }
        return new JsonResult(true, "密码修改成功");
    }

}

