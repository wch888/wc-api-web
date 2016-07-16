package com.wc.api.controller.user;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.user.bean.Member;
import com.wc.user.bean.PowerRate;
import com.wc.user.service.MemberService;
import com.wc.user.service.PowerRateService;
import com.wordnik.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 短信验证
 */
@Api(value = "powerRate", description = "电费管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/powerRate")
public class PowerRateController {
    private static final Logger logger = LoggerFactory.getLogger(PowerRateController.class);


    @Autowired
    private PowerRateService powerRateService;
    @Autowired
    private MemberService memberService;

    @ApiOperation(value = "电费列表", notes = "电费列表 1 表示 缴费 0表示欠费", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult list(HttpServletRequest req,
                           @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                           @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return new JsonResult(false, "login", "没有登陆");
        }
        Member member = memberService.getById(uid);
        if(!member.isHouseHold()){
            return new JsonResult(false,  "你还不是业主,请先提交审核");
        }
        PowerRate query = new PowerRate();
        query.setUserId(uid);
        PagerControl<PowerRate> pc = powerRateService.page(query, new PageInfo(page, size), "order by id desc");
        return new JsonResult(true).setData(pc);
    }


}
