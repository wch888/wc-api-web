package com.wc.thread;

/**
 * Created by rubi on 14-4-28.
 */
public class ImageSacleParam {

    private String srcPath;
    private String destPath;
    private int scaleSize;
    private int cutSize;

    public ImageSacleParam(String srcPath, String destPath, int scaleSize, int cutSize) {
        this.srcPath = srcPath;
        this.destPath = destPath;
        this.scaleSize = scaleSize;
        this.cutSize = cutSize;
    }

    public int getCutSize() {
        return cutSize;
    }

    public void setCutSize(int cutSize) {
        this.cutSize = cutSize;
    }

    public String getSrcPath() {
        return srcPath;
    }

    public void setSrcPath(String srcPath) {
        this.srcPath = srcPath;
    }

    public String getDestPath() {
        return destPath;
    }

    public void setDestPath(String destPath) {
        this.destPath = destPath;
    }

    public int getScaleSize() {
        return scaleSize;
    }

    public void setScaleSize(int scaleSize) {
        this.scaleSize = scaleSize;
    }

    @Override
    public String toString() {
        return "ImageSacleParam{" +
                "srcPath='" + srcPath + '\'' +
                ", destPath='" + destPath + '\'' +
                ", scaleSize=" + scaleSize +
                '}';
    }
}
