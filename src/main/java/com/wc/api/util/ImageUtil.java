package com.wc.api.util;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.MemoryCacheImageInputStream;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class ImageUtil {


    private static final Logger logger = LoggerFactory.getLogger(ImageUtil.class);
    public static final String dir = BaseConfig.getValue("img.path");

    public static boolean isImageType(byte[] mapObj) {
        boolean ret = false;
        ByteArrayInputStream bais = null;
        MemoryCacheImageInputStream mcis = null;

        try {
            bais = new ByteArrayInputStream(mapObj);
            mcis = new MemoryCacheImageInputStream(bais);
            Iterator e = ImageIO.getImageReaders(mcis);

            while(e.hasNext()) {
                ImageReader reader = (ImageReader)e.next();
                String imageName = reader.getClass().getSimpleName();
                if(imageName != null && ("GIFImageReader".equals(imageName) || "JPEGImageReader".equals(imageName) || "PNGImageReader".equals(imageName) || "BMPImageReader".equals(imageName))) {
                    ret = true;
                }
            }
        } finally {
            if(mcis != null) {
                try {
                    mcis.close();
                } catch (IOException e) {
                    logger.error("", e);
                }
            }

            if(bais != null) {
                try {
                    bais.close();
                } catch (IOException e) {
                    logger.error("", e);
                }
            }

        }

        return ret;
    }


    /**
     * 图片尺寸大于压缩尺寸，进行压缩
     * 否则复制一张图片
     * @param filePath
     * @param destPath
     * @param size
     */
    public static Map<String,Float> scaleImg(String filePath, String destPath, int size){
        Map<String,Float> map = new HashMap<String,Float>();
        try {
            File file = new File(filePath);
            BufferedImage bufferedImage = ImageIO.read(file);
            int width = bufferedImage.getWidth();
            int height = bufferedImage.getHeight();
            if(width>=height){
                map.put("width", (float) size);
                map.put("height", (float) (height*size/width));

            }else if(width<height){
                map.put("height", (float) size);
                map.put("width", (float) (width*size/height));
            }

            if(width>size||height>size){

                Thumbnails.of(filePath)
                        .size(size, size)
                        .toFile(destPath);
            }else {//复制一张
                Thumbnails.of(filePath)
                        .scale(1)
                        .toFile(destPath);
            }
        } catch (IOException e) {
            logger.error("", e);
        }
        return map;
    }

    /**
     * 图片尺寸大于压缩尺寸，进行压缩
     * 否则复制一张图片
     * @param filePath
     * @param destPath
     * @param size
     */
    public static void cutImg(String filePath, String destPath, int cutSize, int size){
        try {
            File file = new File(filePath);
            BufferedImage bufferedImage = ImageIO.read(file);
            int width = bufferedImage.getWidth();
            int height = bufferedImage.getHeight();
            if(width>size&&height>size){
                Thumbnails.of(filePath)
                        //从原图哪里开始裁剪   裁减多少
                        .sourceRegion(Positions.CENTER, cutSize, cutSize)
                                //新图的大小
                        .size(size, size).toFile(destPath);
            }else if (width>size&&height<=size){
                Thumbnails.of(filePath)
                        //从原图哪里开始裁剪   裁减多少
                        .sourceRegion(Positions.CENTER, height, height)
                                //新图的大小
                        .size(size, height).toFile(destPath);
            }else if (width<=size&&height>size){
                Thumbnails.of(filePath)
                        //从原图哪里开始裁剪   裁减多少
                        .sourceRegion(Positions.CENTER, width, width)
                                //新图的大小
                        .size(size, size).toFile(destPath);
            }else{//复制一张
                Thumbnails.of(filePath)
                        .scale(1)
                        .toFile(destPath);
            }

        } catch (IOException e) {
            logger.error("", e);
        }
    }
    public static boolean isImageType(String fileName) {
        return isImageType((File)(new File(fileName)));
    }

    public static boolean isImageType(File file) {
        try {
            return isImageType((InputStream)(new FileInputStream(file)));
        } catch (FileNotFoundException e) {
            logger.error("", e);
            return false;
        }
    }

    public static boolean isImageType(InputStream input) {
        try {
            return isImageType((byte[]) IOUtils.toByteArray(input));
        } catch (IOException e) {
            logger.error("", e);
            return false;
        }
    }

    public static void main(String[] args) {
        ImageUtil.scaleImg("C:\\Users\\admin\\Pictures\\1.jpg", "C:\\Users\\admin\\Pictures\\111.jpg", 100);
    }
}
