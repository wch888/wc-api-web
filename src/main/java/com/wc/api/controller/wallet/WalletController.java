package com.wc.api.controller.wallet;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.product.service.ProductService;
import com.wc.user.bean.IntegrationLog;
import com.wc.user.service.IntegrationLogService;
import com.wc.user.service.LuckyMoneyService;
import com.wc.user.service.WalletService;
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
@Api(value = "wallet", description = "积分红包管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/wallet")
public class WalletController {
    private static final Logger logger = LoggerFactory.getLogger(WalletController.class);


    @Autowired
    private WalletService walletService;
    @Autowired
    private IntegrationLogService integrationLogService;
    @Autowired
    private LuckyMoneyService luckyMoneyService;
    @Autowired
    private ProductService productService;

    @ApiOperation(value = "积分日志列表", notes = "积分日志列表", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/integration", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult integration(HttpServletRequest req,
                                  @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                                  @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        IntegrationLog bean = new IntegrationLog();
        bean.setUserId(uid);
        PagerControl<IntegrationLog> pc = integrationLogService.page(bean, new PageInfo(page, size), "order by id desc");
        for (IntegrationLog integrationLog : pc.getEntityList()) {
            integrationLog.buildTypeToChina();
        }
        return new JsonResult(true).setData(pc);
    }


}
