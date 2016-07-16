package com.wc.api.interceptor;

import com.wc.api.controller.wallet.WalletManger;
import com.wc.api.util.CookieUtil;
import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.api.util.WebUtils;
import com.wc.user.bean.Member;
import com.wc.user.service.MemberService;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Calendar;
import java.util.Date;

public class SessionInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private MemberService memberService;
    @Autowired
    private WalletManger walletManger;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 如果session中没有user对象，则创建一个。
        long uid = RegLoginUtil.getSessionUid(request);
        if (uid>0) {
            return true;//已经登录
        }
        String userName = RegLoginUtil.getLoginName(request);
        String jid = CookieUtil.getCookieValue(request, RegLoginUtil.JSESSIONID);

        //有cookie，执行自动登录
        if (StringUtils.isNotBlank(userName)&&StringUtils.isNotBlank(jid)) {
            Member member = new Member();
            member.setMobile(userName);
            member.setJsessionid(jid);
            Member login = memberService.get(member);
            if(login==null){
                WebUtils.writeJson(new JsonResult(false, "cookie没有登陆"), response);
                return false;
            }
            if(DateUtils.truncatedCompareTo(new Date(),login.getLastdate(), Calendar.DATE)>0){
                walletManger.login(login.getId());
            }
            Member update = new Member();
            update.setId(login.getId());
            update.setLastdate(new Date());
            memberService.update(update);
            RegLoginUtil.setSessionUid(request,login.getId());//设置sessin
            return true;
        }
        WebUtils.writeJson(new JsonResult(false, "没有登陆"), response);
        return false;
    }

}
