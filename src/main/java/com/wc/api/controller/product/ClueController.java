package com.wc.api.controller.product;

import com.wc.api.controller.wallet.WalletManger;
import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.base.service.SettingService;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.product.bean.Clue;
import com.wc.product.bean.ProductBroker;
import com.wc.product.service.ClueService;
import com.wc.product.service.ProductBrokerService;
import com.wc.user.bean.Wallet;
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
 * 短信验证
 */
@Api(value = "clue", description = "线索管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/clue")
public class ClueController {
    private static final Logger logger = LoggerFactory.getLogger(ClueController.class);

    @Autowired
    private ClueService clueService;
    @Autowired
    private WalletService walletService;
    @Autowired
    private ProductBrokerService productBrokerService;
    @Autowired
    private SettingService settingService;
    @Autowired
    private WalletManger walletManger;

    @ApiOperation(value = "增加线索", notes = "增加线索 ", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult add(HttpServletRequest req,
                          @ApiParam(value = "name", required = true) @RequestParam String name,
                          @ApiParam(value = "商品id", required = false) @RequestParam(required = false) Long pid,
                          @ApiParam(value = "mobile", required = true) @RequestParam String mobile,
                          @ApiParam(value = "content", required = true) @RequestParam String content) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        if (pid==null||pid<=0) {

            pid= Long.valueOf(settingService.getInt("clueDefault",0));
        }
        ProductBroker productBroker = productBrokerService.updateAndGetCircleBespeak(pid);
        if (null==productBroker) {
            return new JsonResult(false, "楼盘还没有置业顾问");
        }
        Clue clue = new Clue();
        clue.setName(name);
        clue.setMobile(mobile);
        clue.setPid(pid);
        clue.setContent(content);
        clue.setCreateTime(new Date());
        clue.setStatus(Clue.CREATE);
        clue.setUserId(uid);
        clue.setAgentId(productBroker.getUserId());
        clueService.add(clue);

        return new JsonResult(true);
    }

    @ApiOperation(value = "我的线索列表", notes = "我的线索列表 状态 1跟进中 2交易成功 -1线索无效 -2交易失败", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult list(HttpServletRequest req,
                           @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                           @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Clue bean = new Clue();
        bean.setUserId(uid);
        PagerControl<Clue> pc = clueService.page(bean, new PageInfo(page, size));
        return new JsonResult(true).setData(pc);
    }

    @ApiOperation(value = "我的线索信息详情", notes = "我的线索信息详情", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/detail", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult detail(Model model, HttpServletRequest req) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Clue bean = new Clue();
        bean.setUserId(uid);
        int allCount = clueService.count(bean);
        bean.setStatus(Clue.SUCCESS);
        int success = clueService.count(bean);
        model.addAttribute("allCount", allCount);
        model.addAttribute("successCount", success);
        Wallet wallet = walletService.getById(uid);
        if (wallet == null) {
            wallet = new Wallet();
            logger.error("用户钱包数据异常,用户id:{}", uid);
        }
        model.addAttribute("wallet", wallet);
        return new JsonResult(true).setData(model);
    }
}
