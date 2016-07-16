package com.wc.api.controller.user;

import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.common.db.PageInfo;
import com.wc.common.db.PagerControl;
import com.wc.user.bean.Customer;
import com.wc.user.service.CustomerService;
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
import java.util.Date;

/**
 * 经济人的客户管理
 */
@Api(value = "customer", description = "经济人的客户管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/customer")
public class CustomerController {
    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private CustomerService customerService;


    @ApiOperation(value = "添加客户", notes = "添加客户", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult add(HttpServletRequest req,
                          @ApiParam(value = "name", required = true) @RequestParam String name,
                          @ApiParam(value = "mobile", required = true) @RequestParam String mobile) {

        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return JsonResult.notLogin();
        }
        Customer resut = customerService.getByMobile(mobile);
        if (null != resut) {
            return new JsonResult(false, "客户已经存在");
        }
        Customer customer = new Customer();
        customer.setCreateTime(new Date());
        customer.setName(name);
        customer.setMobile(mobile);
        customer.setUserId(uid);
        customerService.add(customer);
        return new JsonResult(true);
    }


    @ApiOperation(value = "客户列表", notes = "客户列表", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
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
        Customer query = new Customer();
        query.setUserId(uid);
        PagerControl<Customer> pc = customerService.page(query, new PageInfo(page, size), "order by id desc");
        return new JsonResult(true).setData(pc);
    }


}
