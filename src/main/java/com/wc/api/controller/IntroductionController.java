package com.wc.api.controller;

import com.wc.api.util.JsonResult;
import com.wc.base.bean.Introduction;
import com.wc.base.service.IntroductionService;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wordnik.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 短信验证
 */
@Api(value = "introduction", description = "企业简介管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/introduction")
public class IntroductionController {
    private static final Logger logger = LoggerFactory.getLogger(IntroductionController.class);

    @Autowired
    private IntroductionService introductionService;

    @ApiOperation(value = "简介列表", notes = "资讯列表", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult list(Model model,
                           @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                           @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {

        PagerControl<Introduction> pc = introductionService.page(new Introduction(), new PageInfo(page, size), null);
        model.addAttribute("pc", pc);
        return new JsonResult(true).setData(model);
    }

    @ApiOperation(value = "简介详情", notes = "资讯详情", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult get(@ApiParam(value = "id", required = true) @RequestParam Long id) {
        Introduction news = introductionService.getById(id);
        return new JsonResult(true).setData(news);
    }

    @ApiOperation(value = "简介详情", notes = "简介详情（html5）", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public String get(Model model, HttpServletRequest request, @PathVariable int id) {
        Introduction news = introductionService.getById(id);
        model.addAttribute("bean", news);
        return "/introduction/detail";
    }
}
