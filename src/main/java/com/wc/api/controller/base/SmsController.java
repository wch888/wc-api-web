package com.wc.api.controller.base;

import com.wc.api.util.ConcurrentLRUHashMap;
import com.wc.api.util.JsonResult;
import com.wc.api.util.RandomCode;
import com.wc.user.bean.Member;
import com.wc.user.service.MemberService;
import com.wc.user.service.SmsService;
import com.wordnik.swagger.annotations.*;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 短信验证
 */
@Api(value = "sms", description = "短信管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/sms")
public class SmsController {
    private static final Logger logger = LoggerFactory.getLogger(SmsController.class);

    public static ConcurrentLRUHashMap<String, String> smsCache = new ConcurrentLRUHashMap<String, String>(20);

    @Autowired
    private MemberService memberService;


    @ApiOperation(value = "获取验证码", notes = "获取验证码", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/get",method = RequestMethod.POST)
    @ResponseBody
    public JsonResult get(@ApiParam(value = "手机号", required = true) @RequestParam String mobile) {

        if (!NumberUtils.isNumber(mobile) || mobile.length() != 11) {
            return new JsonResult(false, "不是手机号");
        }
        String code = RandomCode.getSixInt() + "";
        Member member = new Member();
        member.setMobile(mobile);
//        Member result = memberService.get(member);
//        if (result == null) {
//            return new JsonResult(false, "手机号不存在");
//        }
        logger.info(mobile + ":" + code);
        smsCache.put(mobile, code);
        SmsService service = new SmsService();
        boolean sendCode = service.send(mobile, code);
        if (sendCode) {
            return new JsonResult(true, "发送成功");
        } else {
            return new JsonResult(false, "发送失败");
        }
    }


}
