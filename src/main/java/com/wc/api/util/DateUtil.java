package com.wc.api.util;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class DateUtil {
    private static final Logger LOG = LoggerFactory.getLogger(DateUtil.class);
    public static final String FORMAT_DATETIME = "yyyy-MM-dd HH:mm:ss";
    public static final String FORMAT_YM = "yyMM";
    public static final String FORMAT_MD = "MMdd";
    public static final String FORMAT_YEAR = "yyyy";
    public static Random random = new Random();

    public static String formatDate(Date date, String pattern) {
        if(date != null && !StringUtils.isEmpty(pattern)) {
            SimpleDateFormat datePattern = new SimpleDateFormat(pattern);
            return datePattern.format(date);
        } else {
            return null;
        }
    }

    public static String getMMdd() {
        return new SimpleDateFormat(FORMAT_MD).format(new Date());
    }

    public static String getYear() {
        return new SimpleDateFormat(FORMAT_YEAR).format(new Date());
    }
    public static String getYYMM() {
        return new SimpleDateFormat(FORMAT_YM).format(new Date());
    }

    public static String getDateTime() {
        return new SimpleDateFormat(FORMAT_DATETIME).format(new Date());
    }

    public static String getUnique(){
        int ran = random.nextInt(1000);
        return System.currentTimeMillis()+ran+"";
    }

    public static String getRandom(){
        int ran = random.nextInt(1000);
        return ran+"";
    }

    public static String getShortUnique(){
        int ran = random.nextInt(600000000);
        return (System.currentTimeMillis()-1430000000000l)+ran+"";
    }

    public static long getCurrentTIme(){
        return System.currentTimeMillis();
    }

    public static void main(String[] args) {
        for (int i = 0; i < 20; i++) {
            System.out.println(getShortUnique());
        }
    }

}
