package com.wc.api.controller.user;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.user.bean.Member;
import com.wc.user.bean.Suggest;
import com.wc.user.bean.SuggestComment;
import com.wc.user.service.MemberService;
import com.wc.user.service.SuggestService;
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
 * 投诉建议管理
 */
@Api(value = "suggest", description = "投诉建议管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/suggest")
public class SuggestController {
    private static final Logger logger = LoggerFactory.getLogger(SuggestController.class);

    @Autowired
    private SuggestService suggestService;

    @Autowired
    private MemberService memberService;

    @ApiOperation(value = "投诉建议列表", notes = "投诉建议列表", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult list(HttpServletRequest req,
                           @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                           @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Suggest query = new Suggest();
        query.setUserId(uid);
        PagerControl<Suggest> pc = suggestService.page(query, new PageInfo(page, size), "order by id desc");
        return new JsonResult(true).setData(pc);
    }

    @ApiOperation(value = "投诉建议详情", notes = "投诉建议详情 grade 很好 2  好1 差0", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
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
        Member member = memberService.getById(uid);
        if(!member.isHouseHold()){
            return new JsonResult(false,  "你还不是业主,请先提交审核");
        }
        Map<String, Object> map = new HashMap<String, Object>();
        Suggest suggest = suggestService.getById(id);
        SuggestComment query = new SuggestComment();
        query.setSuggestId(suggest.getId());
        List<SuggestComment> comment = suggestService.list(query);
        map.put("suggest", suggest);
        map.put("comment", comment);
        return new JsonResult(true).setData(map);
    }

    @ApiOperation(value = "添加评价", notes = "添加评价和评论 很好 2  好1 差0", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
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
        Suggest suggest = suggestService.getById(id);
        if (null == suggest || uid != suggest.getUserId().longValue()) {
            return new JsonResult(false, "不是你的投诉建议");
        }
        Suggest update = new Suggest();
        update.setId(id);
        update.setGrade(grade);

        suggestService.update(update);

        SuggestComment add = new SuggestComment();
        add.setSuggestId(id);
        add.setContent(content);
        add.setType((short) 0);
        add.setUserId(uid);
        suggestService.addComment(add);
        return new JsonResult(true, "评论成功");
    }

    @ApiOperation(value = "添加投诉建议", notes = "添加投诉建议", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult add(HttpServletRequest req,
                          @ApiParam(value = "描述", required = true) @RequestParam(value = "cotent", required = true) String cotent,
                          @ApiParam(value = "图片URL,多个以逗号分隔", required = true) @RequestParam(value = "size", required = true) String imgs) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Suggest bean = new Suggest();
        bean.setContent(cotent);
        bean.setImg(imgs);
        bean.setUserId(uid);
        bean.setCreateTime(new Date());
        suggestService.add(bean);
        return new JsonResult(true);
    }

}
