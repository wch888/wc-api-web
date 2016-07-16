package com.wc.thread;

import com.wc.api.util.ImageUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * Created by rubi on 14-4-28.
 */
public class ImageSacleThread {

    private final static Logger logger = LoggerFactory.getLogger(ImageSacleThread.class);
    private static ExecutorService service = Executors.newSingleThreadExecutor();
    private static LinkedBlockingQueue<ImageSacleParam> queue = new LinkedBlockingQueue<ImageSacleParam>();

    public static LinkedBlockingQueue<ImageSacleParam> getBlockingQueue() {
        return queue;
    }

    private static ImageSacleThread imageSacle = new ImageSacleThread();

    public static ImageSacleThread getInstance() {
        if (imageSacle != null)
            return imageSacle;
        return null;
    }

    static {
        LinkedBlockingQueue<ImageSacleParam> queue = ImageSacleThread.getInstance().getBlockingQueue();
        service.execute(new ImgTask(queue));
    }

    static class ImgTask implements Runnable {
        private LinkedBlockingQueue<ImageSacleParam> queue;

        public ImgTask(LinkedBlockingQueue<ImageSacleParam> queue) {
            this.queue = queue;
        }

        @Override
        public void run() {

            synchronized (this) {
                while (true) {
                    try {

                        logger.info("prepare:" + Thread.currentThread().getId());
                        ImageSacleParam param = queue.take();
                        logger.info("get the image :" + param);
                        ImageUtil.scaleImg(param.getSrcPath(), param.getDestPath(), param.getScaleSize());
                        logger.info("scale Img :" + param);
                    } catch (InterruptedException e) {
                        logger.error("", e);
                    }
                }
            }
        }
    }
}
