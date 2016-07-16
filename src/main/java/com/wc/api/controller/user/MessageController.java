package com.wc.api.controller.user;

import com.jpush.JPushService;
import com.wc.api.util.JsonResult;
import com.wc.api.util.RegLoginUtil;
import com.wc.common.db.PageInfo;
import com.wc.user.bean.Member;
import com.wc.user.bean.Message;
import com.wc.user.service.CustomerService;
import com.wc.user.service.MemberService;
import com.wc.user.service.MessageService;
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
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 短信验证
 */
@Api(value = "message", description = "消息管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
@RequestMapping(value = "/message")
public class MessageController {
    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    @Autowired
    private MessageService messageService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private MemberService memberService;
    @ApiOperation(value = "获取消息列表", notes = "获取消息列表 状态  0 未读 1 已读", httpMethod = "GET", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "获取成功")})
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult list(HttpServletRequest req, HttpServletResponse res,
                           @ApiParam(value = "页码", required = true) @RequestParam(value = "page", required = true) Integer page,
                           @ApiParam(value = "页容量", required = true) @RequestParam(value = "size", required = true) Integer size) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return new JsonResult(false, "login", "没有登陆");
        }
        Message message = new Message();
        message.setAll(uid);

        List<Message> list = messageService.list(message, new PageInfo(page,size));
        return new JsonResult(true).setData(list);
    }

    @ApiOperation(value = "发送消息", notes = "发送消息", httpMethod = "POST", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "发送成功")})
    @RequestMapping(value = "/send", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult send(HttpServletRequest req, HttpServletResponse res,
                           @ApiParam(value = "消息正文", required = true) @RequestParam(value = "content", required = true) String content,
                           @ApiParam(value = "接受人id", required = true) @RequestParam(value = "receiverId", required = true) long receiverId) {
        long uid = RegLoginUtil.getSessionUid(req);
        if (uid <= 0) {
            return new JsonResult(false, "login", "没有登陆");
        }
        if (receiverId <= 0) {
            return new JsonResult(false, "param", "参数错误");
        }


        Message message = new Message();
        message.setSenderId(uid);
        message.setContent(content);
        message.setCreateTime(new Date());
        message.setReceiveId(receiverId);
        message.setStatus(Message.UNREAD);
        messageService.add(message);
        //推送
        Member member = memberService.getById(receiverId);
        Map<String, String> map = new HashMap<String, String>();
        map.put("type", "mess");
        try {
            JPushService.getInstance().sendNotificationAudience(member.getPushId(), content, map);
        } catch (Exception e) {
            logger.error("", e);
        }

        return new JsonResult(true);
    }


}
