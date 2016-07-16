package com.wc.api.controller;

import com.wc.api.util.JsonResult;
import com.wc.base.bean.BasisCity;
import com.wc.base.bean.Flash;
import com.wc.base.bean.Nav;
import com.wc.base.service.BasisCityService;
import com.wc.base.service.FlashService;
import com.wc.base.service.NavService;
import com.wc.common.db.PageInfo;
import com.wc.product.bean.FinancingProduct;
import com.wc.product.bean.Product;
import com.wc.product.service.FinancingProductService;
import com.wc.product.service.ProductService;
import com.wc.product.service.ProductTypeService;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiResponse;
import com.wordnik.swagger.annotations.ApiResponses;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 区域管理
 */
@Api(value = "index", description = "首页管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/index")
public class IndexController {
    private static final Logger logger = LoggerFactory.getLogger(IndexController.class);

    @Autowired
    private FlashService flashService;
    @Autowired
    private NavService navService;
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductTypeService productTypeService;
    @Autowired
    private FinancingProductService financingProductService;
    @Autowired
    private BasisCityService basisCityService;

    @ApiOperation(value = "首页", notes = "首页 flash闪图 nav导航 product商品 financing理财", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult getByParentId(Model model) {

        List<Nav> nav = navService.getAll(new Nav());
        List<Flash> flash = flashService.getAll(new Flash());
        List<Product> productList = productService.list(new Product(), new PageInfo(1, 6), "order by recommend desc ,update_time desc");
        for (Product product : productList) {

            JSONObject obj = productTypeService.groupByBuilding(product.getId());
            product.setProductType(obj);
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
        List<FinancingProduct> financing = financingProductService.list(new FinancingProduct(), new PageInfo(1, 6), "order by recommend desc ,update_time desc");
        model.addAttribute("flash", flash);
        model.addAttribute("nav", nav);
        model.addAttribute("product", productList);
        model.addAttribute("financing", financing);
        return new JsonResult(true).setData(model);
    }

}
