package com.wc.api.controller.wallet;

import com.wc.base.service.SettingService;
import com.wc.user.bean.IntegrationLog;
import com.wc.user.service.IntegrationLogService;
import com.wc.user.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class WalletManger {

    public static final String REG_STR = "注册送积分";
    public static final String SHARE_NEWS_STR = "分享资讯";
    public static final String SHARE_PRODUCT_STR = "分享房源";
    public static final String CLUE_STR = "提供有效线索";

    @Autowired
    private IntegrationLogService integrationLogService;
    @Autowired
    private WalletService walletService;
    @Autowired
    private SettingService settingService;

    /**
     * 注册
     *
     * @param userId
     */
    public void reg(long userId) {
        int integration = settingService.getInt("reg", 0);
        IntegrationLog log = new IntegrationLog();
        log.setTitle(REG_STR);
        log.setCreateTime(new Date());
        log.setIntegration(integration);
        log.setType(IntegrationLog.REG);
        log.setUserId(userId);
        integrationLogService.add(log);
        walletService.addIntegration(userId, integration);
    }

    public void login(long userId) {
        int integration = settingService.getInt("login", 0);
        IntegrationLog log = new IntegrationLog();
        log.setTitle(REG_STR);
        log.setCreateTime(new Date());
        log.setIntegration(integration);
        log.setType(IntegrationLog.REG);
        log.setUserId(userId);
        integrationLogService.add(log);
        walletService.addIntegration(userId, integration);
    }

    /**
     * 分享新闻
     *
     * @param userId
     */
    public void shareNews(long userId) {
        int integration = settingService.getInt("share_news", 0);
        IntegrationLog log = new IntegrationLog();
        log.setTitle(SHARE_NEWS_STR);
        log.setCreateTime(new Date());
        log.setIntegration(integration);
        log.setType(IntegrationLog.SHARE);
        log.setUserId(userId);
        integrationLogService.add(log);
        walletService.addIntegration(userId, integration);
    }

    /**
     * 分享房源
     *
     * @param userId
     */
    public void shareProduct(long userId) {
        int integration = settingService.getInt("share_product", 0);
        IntegrationLog log = new IntegrationLog();
        log.setTitle(SHARE_PRODUCT_STR);
        log.setCreateTime(new Date());
        log.setIntegration(integration);
        log.setType(IntegrationLog.SHARE);
        log.setUserId(userId);
        integrationLogService.add(log);
        walletService.addIntegration(userId, integration);
    }

    /**
     * 分享房源
     *
     * @param userId
     */
    public void clueAdd(long userId) {
        int integration = settingService.getInt("clue_add", 0);
        IntegrationLog log = new IntegrationLog();
        log.setTitle(CLUE_STR);
        log.setCreateTime(new Date());
        log.setIntegration(integration);
        log.setType(IntegrationLog.CLUE);
        log.setUserId(userId);
        integrationLogService.add(log);
        walletService.addIntegration(userId, integration);
    }
}
