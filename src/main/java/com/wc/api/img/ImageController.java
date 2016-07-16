package com.wc.api.img;

import com.wc.api.util.BaseConfig;
import com.wc.api.util.DateUtil;
import com.wc.api.util.ImageUtil;
import com.wc.api.util.WebUtils;
import com.wc.thread.ImageSacleParam;
import com.wc.thread.ImageSacleThread;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.LinkedBlockingQueue;

@Controller
@RequestMapping("/file")
public class ImageController {

    private final static Logger LOG = LoggerFactory.getLogger(ImageController.class);
    public static final String dir = BaseConfig.getValue("img.path");
    public static final String domain = BaseConfig.getValue("pc.domain");
    public static final String HEAD = "head";
    public static final String IMG = "img";
    public static final String APK = "apk";

    @RequestMapping(value = "/uploadApk")
    public void uploadApk(MultipartHttpServletRequest request,
                           HttpServletResponse response) throws IOException {

        String longUrl = domain + "/apk/" + "wanchanghui.apk";

        Map<String, Object> json = new HashMap<String, Object>();
        try {
            response.setContentType("text/html;charset=UTF-8");
            request.setCharacterEncoding("UTF-8");

            Map<String, MultipartFile> fileMap = request.getFileMap();
            if (fileMap != null && fileMap.size() > 0) {
                MultipartFile mf = fileMap.get("file");
                String path = dir + File.separator + APK + File.separator + "wanchanghui.apk";
                LOG.info(path);
                saveFileInputStream(mf.getInputStream(), path);

                json.put("error", 0);
                json.put("url", longUrl);
            }
        } catch (Exception e) {
            json.put("error", 1);
            json.put("message", "系统出错");
            LOG.error("", e);
        }
        WebUtils.writeJson(json, response);
    }

    @RequestMapping(value = "/uploadHead")
    public void uploadHead(MultipartHttpServletRequest request,
                           HttpServletResponse response) throws IOException {

        Map<String, Object> json = new HashMap<String, Object>();
        try {
            response.setContentType("text/html;charset=UTF-8");
            request.setCharacterEncoding("UTF-8");

            Map<String, MultipartFile> fileMap = request.getFileMap();
            if (fileMap != null && fileMap.size() > 0) {
                MultipartFile partFile = fileMap.get("file");
                String path = HEAD + File.separator + DateUtil.getYYMM() + File.separator;
                Map<String, String> imgs = saveHeadFile(request, partFile, path);
                String netFile = imgs.get("orgin");
                json.put("error", 0);
                json.put("url", netFile);
                json.put("sizes", imgs);
            }
        } catch (Exception e) {
            json.put("error", 1);
            json.put("message", "系统出错");
            LOG.error("", e);
        }
        WebUtils.writeJson(json, response);
    }

    private Map<String, String> saveHeadFile(MultipartHttpServletRequest request,
                                             MultipartFile mf, String path) throws IOException {
        String[] sizes = ServletRequestUtils.getStringParameters(request, "size");
        Map<String, String> imgs = new HashMap<String, String>();
        String netFile = null;
        String fileName = mf.getOriginalFilename();
        if (null != mf && !"".equals(mf)) {
            String suffix = FilenameUtils.getExtension(fileName);
            if (!("jpg".equalsIgnoreCase(suffix)
                    || "jpeg".equalsIgnoreCase(suffix) || "png"
                    .equalsIgnoreCase(suffix))) {
            }

            netFile = path + DateUtil.getUnique() + ".jpg";
            checkDirs(dir + path); // 检查目录是否存在,若不存在，则创建之
            saveFileFromInputStream(mf.getInputStream(), dir + netFile);


            LinkedBlockingQueue queue = ImageSacleThread.getInstance().getBlockingQueue();
            BufferedImage bufferedImage = ImageIO.read(new File(dir + netFile));
            //默认最大一张图片1000px

            if (sizes != null && sizes.length > 0) {
                for (String sizeStr : sizes) {
                    int size = Integer.parseInt(sizeStr);
                    ImageUtil.scaleImg(dir + netFile, dir + netFile, size);
                }
            }
            imgs.put("orgin", domain + "/" + netFile);
        }
        return imgs;
    }

    private static Map<String, String> map = new HashMap<String, String>();

    static {
        map.put(IMG, IMG + File.separator + DateUtil.getYear() + File.separator + DateUtil.getMMdd() + File.separator);
        map.put(HEAD, HEAD + File.separator + DateUtil.getYYMM() + File.separator);
    }

    @RequestMapping(value = "/uploadImg")
    public void uploadImg(MultipartHttpServletRequest request,
                          HttpServletResponse response) throws IOException {

        Map<String, Object> json = new HashMap<String, Object>();
        try {
            response.setContentType("text/html;charset=UTF-8");
            request.setCharacterEncoding("UTF-8");

            Map<String, MultipartFile> fileMap = request.getFileMap();
            //根据project决定图片的存放位置
            int project = ServletRequestUtils.getIntParameter(request, "project", 0);
            if (fileMap != null && fileMap.size() > 0) {
                MultipartFile partFile = fileMap.get("file");
                String path = map.get(project);
                if (StringUtils.isBlank(path)) {
                    path = IMG + "/" + DateUtil.getYear() + "/" + DateUtil.getMMdd() + "/";
                }
                Map<String, String> imgs = saveFile(request, partFile, path);
                String netFile = imgs.get("orgin");
                json.put("error", 0);
                json.put("url", netFile);
                json.put("sizes", imgs);
                json.put("width", imgs.get("width"));
                json.put("height", imgs.get("height"));
            }
        } catch (Exception e) {
            json.put("error", 1);
            json.put("message", "系统出错");
            LOG.error("", e);
        }
        WebUtils.writeJson(json, response);
    }


    private Map<String, String> saveFile(MultipartHttpServletRequest request,
                                         MultipartFile mf, String path) throws IOException {
        String[] sizes = ServletRequestUtils.getStringParameters(request, "size");
        Map<String, String> imgs = new HashMap<String, String>();
        String netFile = null;
        String fileName = mf.getOriginalFilename();
        if (null != mf && !"".equals(mf)) {
            String suffix = FilenameUtils.getExtension(fileName);
            if (!("jpg".equalsIgnoreCase(suffix)
                    || "jpeg".equalsIgnoreCase(suffix) || "png"
                    .equalsIgnoreCase(suffix))) {
            }

            netFile = path + DateUtil.getUnique() + ".jpg";
            checkDirs(dir + path); // 检查目录是否存在,若不存在，则创建之
            saveFileFromInputStream(mf.getInputStream(), dir + netFile);


            LinkedBlockingQueue queue = ImageSacleThread.getInstance().getBlockingQueue();
            BufferedImage bufferedImage = ImageIO.read(new File(dir + netFile));
            //默认最大一张图片1000px
            Map<String, Float> map = ImageUtil.scaleImg(dir + netFile, dir + netFile, 1200);
            if (sizes != null && sizes.length > 0) {
                for (String sizeStr : sizes) {
                    int size = Integer.parseInt(sizeStr);
                    ImageSacleParam param = new ImageSacleParam(dir + netFile, dir + netFile + size + ".jpg", size, size);
                    queue.add(param);
                    imgs.put("size" + size, domain + "/" + netFile + size + ".jpg");
                }
            }
            imgs.put("orgin", domain + "/" + netFile);
            imgs.put("width", map.get("width") + "");
            imgs.put("height", map.get("height") + "");
        }
        return imgs;
    }

    /**
     * <Description>checkDirs: 检查savePath指定的路径是否存在，如果不存在，则创建之</Description>
     *
     * @param savePath 文件路径
     */
    private void checkDirs(String savePath) {
        File file = new File(savePath);
        if (!file.exists()) {
            file.mkdirs();
        }
    }

    /**
     * <Description>SaveFileFromInputStream: 将http文件流写到本地指定的目录中</Description>
     *
     * @param stream   http文件流
     * @param filePath 文件保存的目录全路径
     */
    private void saveFileFromInputStream(InputStream stream, String filePath) throws IOException {
        FileOutputStream fs = null;
        try {
            byte[] fileBytes = IOUtils.toByteArray(stream);
            boolean isImage = ImageUtil.isImageType(fileBytes);
            if (isImage) {
                fs = new FileOutputStream(filePath);
                fs.write(fileBytes);
                fs.flush();
            }
        } finally {
            close(fs, stream);
        }
    }

    private void saveFileInputStream(InputStream stream, String filePath) throws IOException {
        FileOutputStream fs = null;
        try {
            byte[] fileBytes = IOUtils.toByteArray(stream);
            fs = new FileOutputStream(filePath);
            fs.write(fileBytes);
            fs.flush();
        } finally {
            close(fs, stream);
        }
    }

    private void close(FileOutputStream fos, InputStream ins) {
        if (fos != null) {
            try {
                fos.close();
            } catch (IOException e) {
                LOG.error("", e);
            }
        }
        if (ins != null) {
            try {
                ins.close();
            } catch (IOException e) {
                LOG.error("", e);
            }
        }
    }
}
