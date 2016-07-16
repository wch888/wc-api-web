package com.wc.api.util;

import java.util.Random;

/**
 * Created by rubi on 15-1-19.
 */
public class UserUtil {

    public static final Random random = new Random();

    public static int getSysUserId(){
        return random.nextInt(104)+1;
    }
}
