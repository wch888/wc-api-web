package com.wc.api.controller;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.product.bean.FinancingProduct;
import com.wc.product.bean.FinancingUser;
import com.wc.product.bean.MyFinancingProduct;
import com.wc.product.service.FinancingProductService;
import com.wc.product.service.FinancingUserService;
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
 * 理财商品管理
 */
@Api(value = "financingProduct", description = "理财商品管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/financingProduct")
public class FinancingProductController {
    private static final Logger logger = LoggerFactory.getLogger(FinancingProductController.class);

    @Autowired
    private FinancingProductService financingProductService;
    @Autowired
    private FinancingUserService financingUserService;

    @ApiOperation(value = "理财商品列表", notes = "理财商品列表", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult list(Model model,
                           @ApiParam(value = "短期、中期、长期代表 1 2 3", required = true) @RequestParam(required = true) short type) {
        FinancingProduct financing = new FinancingProduct();
        financing.setType(type);
        PagerControl<FinancingProduct> pc = financingProductService.page(financing, new PageInfo(), "order by id desc");
        model.addAttribute("pc", pc);
        return new JsonResult(true).setData(model);
    }

    @ApiOperation(value = "理财商品详情", notes = "商品详情", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult get(Model model,
                          @ApiParam(value = "id", required = true) @RequestParam Long id) {
        FinancingProduct product = financingProductService.getById(id);
        return new JsonResult(true).setData(product);
    }

    @ApiOperation(value = "填写理财申请单", notes = "填写理财申请单", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "/apply", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult get(HttpServletRequest req,
                          @ApiParam(value = "id", required = true) @RequestParam Long id,
                          @ApiParam(value = "name", required = true) @RequestParam String name,
                          @ApiParam(value = "mobile", required = true) @RequestParam String mobile,
                          @ApiParam(value = "数量", required = true) @RequestParam Integer amount) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        if (id <= 0) {
            return new JsonResult(false, "参数错误");
        }
        if (mobile.length() != 11) {
            return new JsonResult(false, "手机格式错误");
        }
        FinancingUser user = new FinancingUser();
        user.setFpid(id);
        user.setName(name);
        user.setMobile(mobile);
        user.setAmount(amount);
        user.setUserId(uid);
        user.setCreateTime(new Date());
        financingUserService.add(user);
        return new JsonResult(true);
    }

    @ApiOperation(value = "我的理财商品列表", notes = "我的理财商品列表", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/myList", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult myList(Model model, HttpServletRequest req) {
        FinancingProduct financing = new FinancingProduct();
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        financing.setUserId(uid);
        PagerControl<MyFinancingProduct> pc = financingProductService.myPage(financing, new PageInfo(), "order by id desc");
        model.addAttribute("pc", pc);
        return new JsonResult(true).setData(model);
    }
}
