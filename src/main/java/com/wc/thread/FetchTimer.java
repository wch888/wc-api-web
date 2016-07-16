package com.wc.thread;//package com.shufa.thread;
//
//import com.shufa.fetch.*;
//import com.shufa.fetch.baidu.BaiduCategory;
//import com.shufa.fetch.youku.YoukuHttpClient;
//import com.shufa.service.NewsService;
//import com.shufa.service.PictureService;
//import com.shufa.service.TagService;
//import com.shufa.service.VideoService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import javax.annotation.PostConstruct;
//import java.io.IOException;
//import java.io.UnsupportedEncodingException;
//import java.net.URLEncoder;
//import java.util.Timer;
//import java.util.TimerTask;
//
///**
// * Created by rubi on 15-4-24.
// */
//@Component
//public class FetchTimer {
//    private static final Logger logger = LoggerFactory.getLogger(FetchTimer.class);
//    private Timer timer;
//    private int oneDay = 10*60*60*1000;
//
//    @Autowired
//    private NewsService newsService;
//    @Autowired
//    private VideoService videoService;
//    @Autowired
//    private TagService tagService;
//
//    @PostConstruct
//    public void init() {
//        System.out.println("FetchTimer init...");
//        this.timer = new Timer();
//        timer.schedule(new FetchTask(), 5*60*60*1000,oneDay);
//    }
//
//    class FetchTask extends TimerTask {
//
//        @Override
//        public void run() {
//            try {
//                System.out.println("init2...");
//                fetch();
//            } catch (Exception e) {
//                logger.error("", e);
//            }
//        }
//    }
//
//    public void fetch() {
//        try {
//            shufawuzixun();
//        } catch (IOException e) {
//            logger.error("",e);
//        }
//        try {
//            shufawusfs();
//        } catch (IOException e) {
//            logger.error("", e);
//        }
//        try {
//            ccagov();
//        } catch (IOException e) {
//            logger.error("", e);
//        }
//
//        baidu();
//        tianya();
//        youku();
//    }
//
//    private void tianya(){
//        try {
//            String url="http://search.tianya.cn/bbs?q=%E4%B9%A6%E6%B3%95";
//            TinayaCategory tinayaCategory = null;
//            tinayaCategory = new TinayaCategory();
//            tinayaCategory.setNewsService(newsService);
//            tinayaCategory.parseContent(url);
//            tinayaCategory.save(102, "中国书法网");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//    private void youku(){
//        try {
//            YoukuHttpClient client = new YoukuHttpClient();
//            client.setVideoService(videoService);
//            client.setTagService(tagService);
//            String listUrl="https://openapi.youku.com/v2/videos/by_user.json?client_id=daaa38e15427ef8c&user_id=UNTU2MzI3MzM2&orderby=published&page=1&count=20";
//            client.fetchByUser(listUrl,105,"陳忠建");
//        } catch (Exception e) {
//            logger.error("",e);
//        }
//
//        try {
//            YoukuHttpClient client = new YoukuHttpClient();
//            client.setVideoService(videoService);
//            client.setTagService(tagService);
//            String url="https://openapi.youku.com/v2/searches/video/by_keyword.json?client_id=daaa38e15427ef8c&keyword=%E4%B9%A6%E6%B3%95";
//            client.fetchByKeywords(url, 88, "书法视频");
//        } catch (Exception e) {
//            logger.error("",e);
//        }
//
//    }
//    /**
//     * 书法
//     * @throws IOException
//     */
//    private void baidu() {
//
//        try {
//            baiduKeyword();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    private void baiduKeyword() throws Exception {
//        String url="http://news.baidu.com/ns?cl=2&rn=20&tn=news&word=site%3A(news.163.com)%20%E4%B9%A6%E6%B3%95";
//        BaiduCategory baiduCategory = new BaiduCategory();
//        baiduCategory.getListUrl(url);
//        baiduCategory.setNewsService(newsService);
//        baiduCategory.save(102,"中国书法网");
//    }
//    public static void main(String[] args) {
//        try {
//            String shufa = URLEncoder.encode("书法","utf-8");
//            System.out.println(shufa);
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
//    }
//    /**
//     * 书法屋咨询
//     *
//     * @throws java.io.IOException
//     */
//    private void shufawuzixun() throws IOException {
//        //资讯
//        String url = "http://www.shufawu.com/news/zx/index.php?page=1";
//        ShufawuCategory shufawuCategory = null;
//        shufawuCategory = new ShufawuCategory();
//        shufawuCategory.setNewsService(newsService);
//        shufawuCategory.parseContent(url);
//        shufawuCategory.save(102, "中国书法网");
//    }
//
//    /**
//     * 书法屋书法史
//     *
//     * @throws java.io.IOException
//     */
//    private void shufawusfs() throws IOException {
//        //资讯
//        String url = "http://www.shufawu.com/ll/sfs/index.php?page=1";
//        ShufawuCategory shufawuCategory = null;
//        shufawuCategory = new ShufawuCategory();
//        shufawuCategory.setNewsService(newsService);
//        shufawuCategory.parseContent(url);
//        shufawuCategory.save(97, "中国书法史");
//    }
//
//    /**
//     * 中国书法家协会
//     *
//     * @throws java.io.IOException
//     */
//    private void ccagov() throws IOException {
//        String url = "http://www.ccagov.com.cn/stxw/zhanshi/index.html";
//        CcagovCategory ccagovCategory = null;
//        ccagovCategory = new CcagovCategory();
//        ccagovCategory.setNewsService(newsService);
//        ccagovCategory.parseContent(url);
//        ccagovCategory.save();
//    }
//
//    /**
//     * 中国美术馆
//     *
//     * @throws java.io.IOException
//     */
//    private void Namoc() throws IOException {
//        String url = "http://www.namoc.org/xwzx/xw/news/index.htm";
//        NamocCategory ccagovCategory = null;
//        ccagovCategory = new NamocCategory();
//        ccagovCategory.setNewsService(newsService);
//        ccagovCategory.parseContent(url);
//        ccagovCategory.save();
//    }
//}
