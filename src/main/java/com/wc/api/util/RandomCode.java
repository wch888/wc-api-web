package com.wc.api.util;

import org.apache.commons.lang.math.RandomUtils;

import java.util.Random;

/**
 */
public class RandomCode {

    public static final Random rand = new Random();//创建Random类的对象rand
    public static String getCode(){

        String str = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
        String str2[] = str.split(",");
        int index = 0;
        StringBuilder randStr = new StringBuilder();//创建内容为空字符串对象randStr
        for (int i=0; i<6; ++i) {
            index = rand.nextInt(str2.length - 1);//在0到str2.length-1生成一个伪随机数赋值给index
            randStr.append(str2[index]);//将对应索引的数组与randStr的变量值相连接
        }
        return randStr.toString();
    }

    public static int getSixInt() {
        int tmp = RandomUtils.nextInt(999999);
        return tmp % (999999 - 100000 + 1) + 100000;
    }


    public static void main(String[] args) {
        for (int i = 0; i < 60; i++) {
            System.out.println(getCode());
        }
    }

}
