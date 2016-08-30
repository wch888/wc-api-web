package com.wc.api.controller;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.base.bean.News;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.product.bean.Goods;
import com.wc.product.bean.OrderGoods;
import com.wc.product.service.GoodsService;
import com.wc.product.service.OrderGoodsService;
import com.wc.user.bean.IntegrationLog;
import com.wc.user.bean.Wallet;
import com.wc.user.service.IntegrationLogService;
import com.wc.user.service.WalletService;
import com.wordnik.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * 积分商品管理
 */
@Api(value = "goods", description = "积分商品管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/goods")
public class GoodsController {
    private static final Logger logger = LoggerFactory.getLogger(GoodsController.class);

    @Autowired
    private GoodsService goodsService;
    @Autowired
    private OrderGoodsService orderGoodsService;
    @Autowired
    private WalletService walletService;
    @Autowired
    private IntegrationLogService integrationLogService;

    @ApiOperation(value = "购买积分商品", notes = "购买积分商品 ", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/buy", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult buy(HttpServletRequest req,
                          @ApiParam(value = "商品id", required = true) @RequestParam Long pid) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Goods goods = goodsService.getById(pid);
        if (null == goods) {
            return new JsonResult(false, "找不到商品");
        }
        if (Goods.ON != goods.getStatus().shortValue() || goods.getStock().intValue() <= 0) {
            return new JsonResult(false, "商品已售完");
        }
        Wallet wallet = walletService.getById(uid);
        if (wallet.getIntegration().longValue() <= goods.getPrice().longValue()) {
            return new JsonResult(false, "积分不足");
        }
        OrderGoods orderGoods = getOrderGoods(uid, goods);
        orderGoodsService.add(orderGoods);
        //减少积分
        walletService.addIntegration(uid, -goods.getPrice().longValue());
        IntegrationLog log = getIntegrationLog(uid, goods);
        integrationLogService.add(log);
        return new JsonResult(true);
    }

    private OrderGoods getOrderGoods(long uid, Goods goods) {
        OrderGoods orderGoods = new OrderGoods();
        orderGoods.setCreateTime(new Date());
        orderGoods.setDefaultImg(goods.getDefaultImg());
        orderGoods.setPrice(goods.getPrice());
        orderGoods.setTitle(goods.getTitle());
        orderGoods.setUserId(uid);
        return orderGoods;
    }

    private IntegrationLog getIntegrationLog(long uid, Goods goods) {
        IntegrationLog log = new IntegrationLog();
        log.setCreateTime(new Date());
        log.setIntegration(-(goods.getPrice().intValue()));
        log.setTitle(goods.getTitle());
        log.setUserId(uid);
        log.setDefaultImg(goods.getDefaultImg());
        log.setPrice(goods.getPrice());
        log.setPid(goods.getId());

        log.setType(IntegrationLog.BUY);
        return log;
    }

    @ApiOperation(value = "积分商品列表", notes = "积分商品列表", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
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
        Goods bean = new Goods();
        PagerControl<Goods> pc = goodsService.page(bean, new PageInfo(page, size), "order by id desc");
        return new JsonResult(true).setData(pc);
    }

    @ApiOperation(value = "积分商品详情", notes = "积分商品详情 status 1 上架 -1 下架 0 售完", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult detail(Model model, HttpServletRequest req,
                             @ApiParam(value = "积分商品id", required = true) @RequestParam(value = "id", required = true) long id) {


        Goods goods = goodsService.getById(id);
        if (null == goods) {
            return new JsonResult(false, "找不到商品");
        }
        return new JsonResult(true).setData(goods);
    }

    @ApiOperation(value = "积分商品详情页面", notes = "积分商品详情页面", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/detailView", method = RequestMethod.GET)
    public String detailView(Model model, HttpServletRequest req,
                         @ApiParam(value = "积分商品id", required = true) @RequestParam(value = "id", required = true) long id) {


        Goods goods = goodsService.getById(id);
        if (null == goods) {
            goods=new Goods();
        }
        model.addAttribute("bean", goods);
        return "/goods/detail";
    }

    @ApiOperation(value = "我的积分商品列表", notes = "我的积分商品列表", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/orderList", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult orderList(HttpServletRequest req,
                                @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                                @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        IntegrationLog bean = new IntegrationLog();
        bean.setUserId(uid);
        bean.setType(IntegrationLog.BUY);
        PagerControl<IntegrationLog> pc = integrationLogService.page(bean, new PageInfo(page, size), "order by id desc");
        return new JsonResult(true).setData(pc);
    }

}
