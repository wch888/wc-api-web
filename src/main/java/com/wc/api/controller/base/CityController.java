package com.wc.api.controller.base;

import com.wc.api.util.JsonResult;
import com.wc.base.bean.BasisCity;
import com.wc.base.bean.Price;
import com.wc.base.service.BasisCityService;
import com.wc.base.service.PriceService;
import com.wc.user.bean.Community;
import com.wc.user.service.CommunityService;
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

import java.util.List;

/**
 * 区域管理
 */
@Api(value = "city", description = "区域管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/city")
public class CityController {
    private static final Logger logger = LoggerFactory.getLogger(CityController.class);

    @Autowired
    private BasisCityService basisCityService;
    @Autowired
    private CommunityService communityService;
    @Autowired
    private PriceService priceService;


    @ApiOperation(value = "根据父级获取区域", notes = "0为最顶级", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/getByParentId", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult getByParentId(@ApiParam(value = "id", required = true) @RequestParam int parentId) {

        List<BasisCity> list = basisCityService.getAreasByParentId(parentId);
        return new JsonResult(true).setData(list);
    }


    @ApiOperation(value = "根据城市id获取小区", notes = "根据城市id获取小区", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/getCommunityByCityId", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult getCommunityByCityId(@ApiParam(value = "cityId", required = true) @RequestParam long cityId) {

        Community community = new Community();
        community.setCityId(cityId);
        List<Community> list = communityService.list(community, "order by id desc");
        return new JsonResult(true).setData(list);
    }

    @ApiOperation(value = "根据城市id获取价格区间", notes = "根据城市id获取价格区间", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/getPriceByCityId", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult getPriceByCityId(@ApiParam(value = "cityId", required = true) @RequestParam long cityId) {

        Price price = new Price();
        price.setCityId(cityId);
        List<Price> list = priceService.list(price);
        return new JsonResult(true).setData(list);
    }

}
