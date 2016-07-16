package com.wc.api.controller.base;

import com.wc.base.service.SettingService;
import com.wordnik.swagger.annotations.*;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 下载管理
 */
@Api(value = "download", description = "下载管理", produces = MediaType.APPLICATION_JSON_VALUE)
@Controller
public class DownloadController {
    private static final Logger logger = LoggerFactory.getLogger(DownloadController.class);

    @Autowired
    private SettingService settingService;

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public String download(Model model) {

        JSONObject obj = settingService.getJSONObject("version");
        model.addAttribute("bean",obj);
        return "/other/download";
    }


}
