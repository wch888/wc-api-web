package com.wc.api.controller.wallet;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.product.bean.Product;
import com.wc.product.service.ProductService;
import com.wc.user.bean.LuckyMoney;
import com.wc.user.bean.LuckyMoneyLog;
import com.wc.user.service.IntegrationLogService;
import com.wc.user.service.LuckyMoneyLogService;
import com.wc.user.service.LuckyMoneyService;
import com.wc.user.service.WalletService;
import com.wordnik.swagger.annotations.*;
import org.apache.commons.lang.StringUtils;
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
import java.util.UUID;

/**
 * 红包管理
 */
@Api(value = "luckyMoney", description = "红包管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/luckyMoney")
public class LuckyMoneyController {
    private static final Logger logger = LoggerFactory.getLogger(LuckyMoneyController.class);


    @Autowired
    private WalletService walletService;
    @Autowired
    private IntegrationLogService integrationLogService;
    @Autowired
    private LuckyMoneyService luckyMoneyService;
    @Autowired
    private LuckyMoneyLogService luckyMoneyLogService;
    @Autowired
    private ProductService productService;


    @ApiOperation(value = "我的红包列表", notes = "我的红包列表", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/luckyMoney", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult luckyMoney(HttpServletRequest req,
                                 @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                                 @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {


        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        LuckyMoneyLog bean = new LuckyMoneyLog();
        bean.setUserId(uid);
        PagerControl<LuckyMoneyLog> pc = luckyMoneyLogService.page(bean, new PageInfo(page, size), "order by id desc");
        for (LuckyMoneyLog luckyMoneyLog : pc.getEntityList()) {
            LuckyMoney money = luckyMoneyService.getById(luckyMoneyLog.getLuckyId());
            if(null==money){
                continue;
            }
            luckyMoneyLog.setStatTime(money.getStartTime());
            luckyMoneyLog.setEndTime(money.getEndTime());

        }

        return new JsonResult(true).setData(pc);
    }

    @ApiOperation(value = "红包领取", notes = "红包领取", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/getLuckyMoney", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult getLuckyMoney(HttpServletRequest req,
                                    @ApiParam(value = "红包id", required = true) @RequestParam(value = "id", required = true) Long id,
                                    @ApiParam(value = "商品id", required = true) @RequestParam(value = "pid", required = true) Long pid) {

        String uuid = UUID.randomUUID().toString().replace("-", "");
        String code = StringUtils.substring(uuid, 0, 12);

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        LuckyMoneyLog query = new LuckyMoneyLog();
        query.setUserId(uid);
        query.setPid(pid);
        int result = luckyMoneyLogService.count(query);
        if (result > 0) {
            return new JsonResult(false, "已领取过该红包");
        }
        LuckyMoney luckyMoney = luckyMoneyService.getById(id);
        Product product = productService.getById(luckyMoney.getPid());
        LuckyMoneyLog bean = new LuckyMoneyLog();
        bean.setUserId(uid);
        bean.setAmount(luckyMoney.getMoney());
        bean.setStatus((short) 1);
        bean.setPid(luckyMoney.getPid());
        bean.setTitle(product.getName());
        bean.setCreateTime(new Date());
        bean.setCode(code);
        bean.setLuckyId(luckyMoney.getId());
        luckyMoneyLogService.add(bean);
        return new JsonResult(true);
    }

    @ApiOperation(value = "使用红包", notes = "使用红包，消除红包", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "成功")})
    @RequestMapping(value = "/useLuckyMoney", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult useLuckyMoney(HttpServletRequest req,
                                    @ApiParam(value = "红包code", required = true) @RequestParam(value = "code", required = true) String code) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }

        LuckyMoneyLog bean = new LuckyMoneyLog();
        bean.setCode(code);
        LuckyMoneyLog log = luckyMoneyLogService.get(bean);

        if (null == log) {
            return new JsonResult(false, "销核码错误");
        }
        if (log.getStatus().shortValue() != LuckyMoneyLog.VALID) {
            return new JsonResult(false, "红包已经过期或者已经使用");
        }
        log.setStatus(LuckyMoneyLog.USED);
        luckyMoneyLogService.update(log);
        return new JsonResult(true);
    }


}
