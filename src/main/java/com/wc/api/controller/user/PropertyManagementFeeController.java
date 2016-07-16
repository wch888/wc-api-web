package com.wc.api.controller.user;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.user.bean.Member;
import com.wc.user.bean.PropertyManagementFee;
import com.wc.user.service.MemberService;
import com.wc.user.service.PropertyManagementFeeService;
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
@Api(value = "propertyManagementFee", description = "物业管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/propertyManagementFee")
public class PropertyManagementFeeController {
    private static final Logger logger = LoggerFactory.getLogger(PropertyManagementFeeController.class);


    @Autowired
    private PropertyManagementFeeService propertyManagementFeeService;
    @Autowired
    private MemberService memberService;

    @ApiOperation(value = "物业列表", notes = "物业列表 1 已经缴费 0 未缴费", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
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
        PropertyManagementFee query = new PropertyManagementFee();
        query.setUserId(uid);
        PagerControl<PropertyManagementFee> pc = propertyManagementFeeService.page(query, new PageInfo(page, size), "order by id desc");
        return new JsonResult(true).setData(pc);
    }


}
