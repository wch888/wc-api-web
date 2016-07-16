package com.wc.api.controller.user;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.user.bean.Member;
import com.wc.user.bean.MemberDetail;
import com.wc.user.bean.Repair;
import com.wc.user.bean.RepairComment;
import com.wc.user.service.MemberService;
import com.wc.user.service.RepairService;
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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 短信验证
 */
@Api(value = "repair", description = "报修管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/repair")
public class RepairController {
    private static final Logger logger = LoggerFactory.getLogger(RepairController.class);


    @Autowired
    private RepairService repairService;
    @Autowired
    private MemberService memberService;

    @ApiOperation(value = "报修列表", notes = "报修列表 0 未受理 1 处理中 2 处理完成", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
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
        Repair query = new Repair();
        query.setUserId(uid);
        PagerControl<Repair> pc = repairService.page(query, new PageInfo(page, size));
        return new JsonResult(true).setData(pc);
    }

    @ApiOperation(value = "报修详情", notes = "报修详情 grade 很好 2  好1 差0", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult detail(HttpServletRequest req,
                             @ApiParam(value = "id", required = true) @RequestParam(value = "id", required = true) Long id) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return new JsonResult(false, "login", "没有登陆");
        }
        Map<String, Object> map = new HashMap<String, Object>();
        Repair repair = repairService.getById(id);
        RepairComment query = new RepairComment();
        query.setRepairId(repair.getId());
        List<RepairComment> comment = repairService.list(query);
        map.put("repair", repair);
        map.put("comment", comment);
        return new JsonResult(true).setData(map);
    }

    @ApiOperation(value = "添加评价和评论", notes = "添加评价和评论 很好 2  好1 差0", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/comment")
    @ResponseBody
    public JsonResult comment(HttpServletRequest req,
                              @ApiParam(value = "id", required = true) @RequestParam(value = "id", required = true) Long id,
                              @ApiParam(value = "grade", required = true) @RequestParam(value = "grade", required = true) Short grade,
                              @ApiParam(value = "content", required = true) @RequestParam(value = "content", required = true) String content) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Repair repair = repairService.getById(id);
        if (null == repair || uid != repair.getUserId().longValue()) {
            return new JsonResult(false, "不是你的维修记录");
        }
        Repair update = new Repair();
        update.setId(id);
        update.setGrade(grade);

        repairService.update(update);

        RepairComment add = new RepairComment();
        add.setRepairId(id);
        add.setContent(content);
        add.setType((short) 0);
        add.setUserId(uid);
        repairService.addComment(add);
        return new JsonResult(true, "评论成功");
    }

    @ApiOperation(value = "添加报修", notes = "添加报修", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult add(HttpServletRequest req, @ApiParam(value = "描述", required = true) @RequestParam(value = "content", required = true) String content,
                          @ApiParam(value = "图片URL,多个以逗号分隔", required = true) @RequestParam(value = "imgs", required = true) String imgs) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return new JsonResult(false, "login", "没有登陆");
        }
        MemberDetail detail = memberService.getDetailById(uid);
        if(null==detail.getCommunityId()){
            return new JsonResult(false,  "没有加入任何小区");
        }
        Member member = memberService.getById(uid);
        if(!member.isHouseHold()){
            return new JsonResult(false,  "你还不是业主,请先提交审核");
        }
        Repair repair = new Repair();
        repair.setContent(content);
        repair.setImg(imgs);
        repair.setUserId(uid);
        repair.setStatus(Repair.WAITTING);
        repair.setCreateTime(new Date());
        repair.setCommunityId(detail.getCommunityId());
        repairService.add(repair);
        return new JsonResult(true);
    }

}
