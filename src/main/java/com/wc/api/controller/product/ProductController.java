package com.wc.api.controller.product;

import com.jpush.JPushService;
import com.wc.api.controller.wallet.WalletManger;
import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.base.bean.BasisCity;
import com.wc.base.bean.News;
import com.wc.base.bean.NewsSubscribe;
import com.wc.base.service.BasisCityService;
import com.wc.base.service.NewsService;
import com.wc.base.service.NewsSubscribeService;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.product.bean.*;
import com.wc.product.dto.ProductQuery;
import com.wc.product.service.*;
import com.wc.user.bean.LuckyMoney;
import com.wc.user.bean.Member;
import com.wc.user.bean.Message;
import com.wc.user.service.LuckyMoneyService;
import com.wc.user.service.MemberService;
import com.wc.user.service.MessageService;
import com.wordnik.swagger.annotations.*;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 短信验证
 */
@Api(value = "product", description = "商品管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/product")
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductBrokerService productBrokerService;
    @Autowired
    private ProductImageService productImageService;
    @Autowired
    private ProductTypeService productTypeService;
    @Autowired
    private BespeakService bespeakService;
    @Autowired
    private MemberService memberService;
    @Autowired
    private NewsService newsService;
    @Autowired
    private WalletManger walletManger;
    @Autowired
    private NewsSubscribeService newsSubscribeService;
    @Autowired
    private LuckyMoneyService luckyMoneyService;
    @Autowired
    private MessageService messageService;
    @Autowired
    private BasisCityService basisCityService;
    @ApiOperation(value = "商品列表", notes = "商品列表.买新房的接口和这个一样 状态 1热卖中 ", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult list(Model model,
                           @ApiParam(value = "关键字", required = false) @RequestParam(required = false) String keyword,
                           @ApiParam(value = "城市id", required = false) @RequestParam(required = false) Long cityId,
                           @ApiParam(value = "区域id", required = false) @RequestParam(required = false) Long areaId,
                           @ApiParam(value = "最小价格 为0也传过来", required = false) @RequestParam(required = false) Float priceMin,
                           @ApiParam(value = "最大价格 为0也传过来", required = false) @RequestParam(required = false) Float priceMax,
                           @ApiParam(value = "居室类型code", required = false) @RequestParam(required = false) Integer houseTypeCode,
                           @ApiParam(value = "排序字段 price 目前暂时不处理 ", required = false) @RequestParam(required = false) String order,
                           @ApiParam(value = "排序方向只能为 desc asc 目前暂时不处理", required = false) @RequestParam(required = false) String direction,
                           @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                           @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {

        ProductQuery query = new ProductQuery();
        query.setName(keyword);
        query.setArea(areaId);
        query.setCity(cityId);
        if (null != priceMin && 0 != priceMin.floatValue()) {
            query.setPriceMin(new BigDecimal(priceMin));
        }
        if (null != priceMax && 0 != priceMax.floatValue()) {
            query.setPriceMax(new BigDecimal(priceMax));
        }
        if (null != houseTypeCode && 0 != houseTypeCode) {
            query.setHouseType(houseTypeCode);
        }

        PagerControl<Product> pc = productService.pageDto(query, new PageInfo(page, size), "order by id desc");
        for (Product product : pc.getEntityList()) {
            BasisCity area = basisCityService.getById(product.getArea());
            if (null != area) {
                product.setAreaName(area.getCityName());
            }
            BasisCity city = basisCityService.getById(product.getCity());
            if (null != city) {
                product.setCityName(city.getCityName());
            }
            product.buildStatusToChina();
        }
        return new JsonResult(true).setData(pc);
    }

    @ApiOperation(value = "商品详情", notes = "商品详情", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult get(Model model,
                          @ApiParam(value = "id", required = true) @RequestParam Long id) {
        Product product = productService.getById(id);
        ProductDetail detail = productService.getDetailById(id);
        List<ProductType> typeList = productTypeService.list(id);
        List<ProductImage> imageList = productImageService.list(id);
        LuckyMoney luckyMoney = luckyMoneyService.getByProductId(id);
        News news = new News();
        news.setPid(id);
        List<News> newsList = newsService.list(news, new PageInfo(1, 1), "order by id desc");
        model.addAttribute("product", product);
        model.addAttribute("detail", detail);
        model.addAttribute("imageList", imageList);
        model.addAttribute("typeList", typeList);
        model.addAttribute("newsList", newsList);
        model.addAttribute("luckyMoney", luckyMoney);
        return new JsonResult(true).setData(model);
    }

    @ApiOperation(value = "商品视频", notes = "商品视频", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/video/{id}", method = RequestMethod.GET)
    public String video(Model model,
                          @ApiParam(value = "id", required = true)  @PathVariable long id) {
        ProductDetail detail = productService.getDetailById(id);
        model.addAttribute("bean", detail);
        return "/product/video";
    }

    @ApiOperation(value = "商品视频360看房", notes = "商品视频360看房", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/video360/{id}", method = RequestMethod.GET)
    public String video360(Model model,
                        @ApiParam(value = "id", required = true)  @PathVariable long id) {
        ProductDetail detail = productService.getDetailById(id);
        model.addAttribute("bean", detail);
        return "/product/video";
    }

    @ApiOperation(value = "楼盘预约", notes = "楼盘预约,自己的手机号进入想买的列表，别人的手机号就是线索", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "成功")})
    @RequestMapping(value = "/bespeak", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult bespeak(HttpServletRequest req,
                              @ApiParam(value = "name", required = true) @RequestParam String name,
                              @ApiParam(value = "商品id", required = true) @RequestParam Long pid,
                              @ApiParam(value = "mobile", required = true) @RequestParam String mobile) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Bespeak query = new Bespeak();
        query.setUserId(uid);
        query.setPid(pid);
        int count = bespeakService.count(query);
        if (count > 0) {
            return new JsonResult(false, "你已经预约了该楼盘");
        }
        ProductBroker productBroker = productBrokerService.updateAndGetCircleBespeak(pid);
        if (null==productBroker) {
            return new JsonResult(false, "楼盘还没有置业顾问");
        }
        Bespeak bean = new Bespeak();
        bean.setName(name);
        bean.setMobile(mobile);
        bean.setPid(pid);
        bean.setCreateTime(new Date());
        bean.setUserId(uid);
        bean.setAgentId(productBroker.getUserId());
        bespeakService.add(bean);
        return new JsonResult(true);
    }

    @ApiOperation(value = "我想买的楼房列表", notes = "我想买的楼房列表", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/mylist", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult mylist(HttpServletRequest req,
                             @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                             @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Product bean = new Product();
        bean.setUserId(uid);
        PagerControl<Product> pc = productService.bespeakPage(bean, new PageInfo(page, size), "order by id desc");
        return new JsonResult(true).setData(pc);
    }

    @ApiOperation(value = "楼盘分享回调", notes = "楼盘分享,增加积分,失败直接忽略", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "/share", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult share(HttpServletRequest req,
                            @ApiParam(value = "id", required = true) @RequestParam Long id) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        walletManger.shareProduct(uid);
        return new JsonResult(true);
    }

    @ApiOperation(value = "楼盘资讯订阅", notes = "楼盘资讯订阅", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "/subscribe")
    @ResponseBody
    public JsonResult subscribe(HttpServletRequest req,
                                @ApiParam(value = "商品id", required = true) @RequestParam Long id,
                                @ApiParam(value = "姓名", required = true) @RequestParam String name,
                                @ApiParam(value = "mobile", required = true) @RequestParam String mobile) {
        if (StringUtils.isBlank(name) || StringUtils.isBlank(mobile)) {
            return new JsonResult(false, "参数错误");
        }
        NewsSubscribe subscribe = new NewsSubscribe();
        subscribe.setPid(id);
        subscribe.setCreateTime(new Date());
        subscribe.setName(name);
        subscribe.setMobile(mobile);
        newsSubscribeService.add(subscribe);
        return new JsonResult(true);
    }

    @ApiOperation(value = "楼盘咨询", notes = "楼盘咨询", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "/send")
    @ResponseBody
    public JsonResult send(HttpServletRequest req,
                           @ApiParam(value = "商品id", required = true) @RequestParam Long id,
                           @ApiParam(value = "content", required = true) @RequestParam String content) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }

        long receiveId = messageService.getProductBespeak(id, uid);
        if (receiveId <= 0) {
            ProductBroker productBroker = productBrokerService.updateAndGetCircleMessage(id);
            if (null == productBroker) {
                return new JsonResult(false, "该楼盘正在安排置业顾问");
            }
            receiveId = productBroker.getUserId();
        }

        Message message = new Message();
        message.setSenderId(uid);
        message.setContent(content);
        message.setCreateTime(new Date());
        message.setReceiveId(receiveId);
        message.setStatus(Message.UNREAD);
        message.setPid(id);
        messageService.add(message);

        Member member = memberService.getById(receiveId);
        Map<String, String> map = new HashMap<String, String>();
        map.put("type", "mess");
        try {
            JPushService.getInstance().sendNotificationAudience(member.getPushId(), content, map);
        } catch (Exception e) {
            logger.error("", e);
        }

        return new JsonResult(true);
    }

    @ApiOperation(value = "楼盘咨询列表", notes = "楼盘咨询列表", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping(value = "/messageList")
    @ResponseBody
    public JsonResult messageList(HttpServletRequest req,
                                  @ApiParam(value = "商品id", required = true) @RequestParam Long id,
                                  @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                                  @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }

//        long receiveId = messageService.getProductBespeak(id,uid);

        Message message = new Message();
        message.setAll(uid);
        List<Message> list = messageService.list(message, new PageInfo(page, size));

        return new JsonResult(true).setData(list);
    }

}
