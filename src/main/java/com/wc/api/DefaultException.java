package com.wc.api;

import com.wc.api.util.JsonResult;
import com.wc.api.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class DefaultException implements HandlerExceptionResolver {

    private Logger logger = LoggerFactory.getLogger(DefaultException.class);

    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse res, Object obj, Exception e) {
        logger.error("ERROR", e);
        WebUtils.writeJson(new JsonResult(false,"你访问的页面到火星去了"),res);
        ModelAndView modelAndView = new ModelAndView();
        return modelAndView;

    }

}