package com.wc.api.controller.base;

import com.wc.api.util.JsonResult;
import com.wc.base.bean.Price;
import com.wc.base.service.PriceService;
import com.wc.base.service.SettingService;
import com.wordnik.swagger.annotations.*;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 配置管理
 */
@Api(value = "setting", description = "配置管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/setting")
public class SettingController {
    private static final Logger logger = LoggerFactory.getLogger(SettingController.class);

    @Autowired
    private SettingService settingService;
    @Autowired
    private PriceService priceService;

    @ApiOperation(value = "更新所有配置", notes = "更新所有配置", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/update", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult update() {
        settingService.init();
        return new JsonResult(true);
    }

    @ApiOperation(value = "获取所有配置", notes = "获取所有配置,回传数据的时候回传key", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult getAll() {

        Map<String, Map<String, String>> map = settingService.getAllCondition();
        return new JsonResult(true).setData(map);
    }

    @ApiOperation(value = "获取价格配置", notes = "获取价格配置", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/getPrice", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult getPrice(@ApiParam(value = "城市Id", required = true) @RequestParam String cityId) {
        Price price = new Price();
        price.setCity(cityId);
        List<Price> list = priceService.list(price);
        return new JsonResult(true).setData(list);
    }


    @ApiOperation(value = "版本更新", notes = "版本更新,versionId 将会递增 force 是否强制更新", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/version", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult version() {
        String version = settingService.getString("version","{}");
        JSONObject obj = JSONObject.fromObject(version);
        return new JsonResult(true).setData(obj);
    }

}
