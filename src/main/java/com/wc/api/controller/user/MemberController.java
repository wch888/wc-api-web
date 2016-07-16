package com.wc.api.controller.user;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.user.bean.Community;
import com.wc.user.bean.Member;
import com.wc.user.bean.MemberDetail;
import com.wc.user.bean.Wallet;
import com.wc.user.service.CommunityService;
import com.wc.user.service.MemberService;
import com.wc.user.service.WalletService;
import com.wordnik.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * 用户管理
 */
@Api(value = "member", description = "用户管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/member")
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    private MemberService memberService;
    @Autowired
    private WalletService walletService;
    @Autowired
    private CommunityService communityService;

    @ApiOperation(value = "用户详情", notes = "用户详情 用户类型type 0注册会员 1待审核业主 2业主" +
            "brokerType 0普通经纪人(全民) 1官方经济人", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult get(HttpServletRequest req, Model model) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Member member = memberService.getById(uid);
        MemberDetail detail = memberService.getDetailById(uid);
        Wallet wallet = walletService.getById(uid);
        model.addAttribute("member", member);
        model.addAttribute("detail", detail);
        model.addAttribute("wallet", wallet);
        return new JsonResult(true).setData(model);
    }

    @ApiOperation(value = "业主注册1", notes = "业主注册1", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "成功")})
    @RequestMapping(value = "/updateAddress", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult updateAddress(HttpServletRequest req,
                                    @ApiParam(value = "城市", required = true) @RequestParam(value = "cityId", required = true) Long cityId,
                                    @ApiParam(value = "小区", required = true) @RequestParam(value = "communityId", required = true) Long communityId,
                                    @ApiParam(value = "业主地址", required = true) @RequestParam(value = "address", required = true) String address) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Member member = memberService.getById(uid);
        if (null != member && member.isHouseHold()) {
            return new JsonResult(false, "你已经注册成为业主");
        }
        MemberDetail detail = new MemberDetail();
        detail.setId(uid);
        detail.setAddress(address);
        detail.setCityId(cityId);
        detail.setCommunityId(communityId);
        memberService.updateDetail(detail);
        return new JsonResult(true);
    }

    @ApiOperation(value = "业主注册2", notes = "业主注册2", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "成功")})
    @RequestMapping(value = "/updateInfo", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult updateInfo(HttpServletRequest req,
                                 @ApiParam(value = "业主姓名", required = true) @RequestParam(value = "name", required = true) String name,
                                 @ApiParam(value = "业主电话", required = true) @RequestParam(value = "hostPhone", required = true) String hostPhone,
                                 @ApiParam(value = "生日,时间戳 long型", required = true) @RequestParam(value = "birthDate", required = true) Long birthDate,
                                 @ApiParam(value = "身份证", required = true) @RequestParam(value = "idCard", required = true) String idCard,
                                 @ApiParam(value = "身份证图片,多个以逗号分隔", required = false) @RequestParam(value = "imgs", required = false) String imgs) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Member member = new Member();
        member.setId(uid);
        member.setNickname(name);
        member.setType(Member.VERIFY);
        memberService.update(member);
        MemberDetail detail = new MemberDetail();
        detail.setId(uid);
        detail.setHostPhone(hostPhone);
        detail.setBirthDate(new Date(birthDate));
        detail.setIdCard(idCard);
        detail.setImg(imgs);
        memberService.updateDetail(detail);
        return new JsonResult(true);
    }

    @ApiOperation(value = "物业服务", notes = "物业服务,获取小区信息", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "成功")})
    @RequestMapping(value = "/service", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult service(HttpServletRequest req) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Member member = memberService.getById(uid);
        MemberDetail detail = memberService.getDetailById(uid);
        if (null == member || Member.HOUSEHOLD != member.getType().shortValue()) {
            return new JsonResult(false, "notHouseHold", "你还不是业主");
        }
        if (null == detail || null == detail.getCommunityId()) {
            logger.error("小区id为空");
            return new JsonResult(false, "notHouseHold", "小区id为空");
        }
        Community community = communityService.getById(detail.getCommunityId());
        return new JsonResult(true).setData(community);
    }

    @ApiOperation(value = "用户修改头像", notes = "用户修改头像", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "成功")})
    @RequestMapping(value = "/updateHead", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult updateHead(HttpServletRequest req,
                                 @ApiParam(value = "用户头像地址", required = false) @RequestParam(value = "headUrl", required = false) String headUrl,
                                 @ApiParam(value = "用户性别", required = false) @RequestParam(value = "gender", required = false) Short gender,
                                 @ApiParam(value = "用户姓名", required = true) @RequestParam(value = "name", required = true) String name,
                                 @ApiParam(value = "生日,时间戳 long型", required = false) @RequestParam(value = "birthDate", required = false) Long birthDate) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Member member = new Member();
        member.setId(uid);
        member.setHead(headUrl);
        member.setNickname(name);

        MemberDetail detail = new MemberDetail();
        if (null != birthDate) {
            detail.setBirthDate(new Date(birthDate));
        }
        detail.setId(uid);
        detail.setGender(gender);
        memberService.update(member);
        memberService.updateDetail(detail);
        return new JsonResult(true);
    }

}
