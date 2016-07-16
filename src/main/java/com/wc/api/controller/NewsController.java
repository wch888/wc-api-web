package com.wc.api.controller;

import com.wc.api.controller.wallet.WalletManger;
import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.base.bean.News;
import com.wc.base.service.NewsService;
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
@Api(value = "news", description = "资讯管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/news")
public class NewsController {
    private static final Logger logger = LoggerFactory.getLogger(NewsController.class);

    @Autowired
    private NewsService newsService;
    @Autowired
    private WalletManger walletManger;

    @ApiOperation(value = "资讯列表", notes = "资讯列表", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult list(Model model,
                           @ApiParam(value = "商品id", required = false) @RequestParam(required = false) Long pid,
                           @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                           @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {
        News query = new News();
        query.setPid(pid);
        PagerControl<News> pc = newsService.page(query, new PageInfo(page, size));
        model.addAttribute("pc", pc);
        return new JsonResult(true).setData(model);
    }

    @ApiOperation(value = "资讯详情", notes = "连接为/news/{id} 资讯详情", httpMethod = "GET")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public String get(Model model, HttpServletRequest request, @PathVariable int id) {
        News news = newsService.getById(id);
        model.addAttribute("bean", news);
        return "/news/detail";
    }

    @ApiOperation(value = "资讯分享回调", notes = "资讯分享,增加积分,失败直接忽略", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "/share", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult share(HttpServletRequest req,
                            @ApiParam(value = "id", required = true) @RequestParam Long id) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        walletManger.shareNews(uid);
        return new JsonResult(true);
    }


}
