package com.wc.api.util;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.net.URL;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public final class BaseConfig {
    private static final Logger LOG = LoggerFactory.getLogger(BaseConfig.class);
    private static String CONFIGS_WHERE = "conf";
    private static final Map<FileName, Configuration> CONF_MAP = new ConcurrentHashMap(4);

    public BaseConfig() {
    }

    public static synchronized void setConfigFrom(String dir) {
        CONFIGS_WHERE = dir;
        init();
    }

    private static void init() {
        BaseConfig.FileName[] values = BaseConfig.FileName.values();
        CONF_MAP.clear();
        BaseConfig.FileName[] arr$ = values;
        int len$ = values.length;

        for(int i$ = 0; i$ < len$; ++i$) {
            BaseConfig.FileName fileName = arr$[i$];

            try {
                LOG.debug("parse config file \'" + fileName + ".properties\' in classpath.");
                String e = getPath(fileName + ".properties");
                if(StringUtils.isBlank(e)) {
                    LOG.debug("file \'" + fileName + ".properties\' not exists in classpath, then try to parse \'" + fileName + ".xml\'");
                } else {
                    CONF_MAP.put(fileName, new PropertiesConfiguration(e));
                }
            } catch (ConfigurationException var6) {
                LOG.error(var6.toString());
            }
        }

    }

    public static String getPath(String fileName) {
        fileName = CONFIGS_WHERE + File.separator + fileName;
        String configDir = System.getProperty("project.config.dir");
        String filePath = configDir + File.separator + fileName;
        if((new File(filePath)).exists()) {
            LOG.debug("find property file for \'" + fileName + "\' with path \'" + filePath + "\'");
            return filePath;
        } else {
            String userDir = System.getProperty("user.dir");
            filePath = userDir + File.separator + fileName;
            if((new File(filePath)).exists()) {
                LOG.debug("find property file for \'" + fileName + "\' with path \'" + filePath + "\'");
                return filePath;
            } else {
                URL url = BaseConfig.class.getResource(File.separator + fileName);
                if(url == null) {
                    url = BaseConfig.class.getClassLoader().getResource(fileName);
                    LOG.debug("find property file for \'" + fileName + "\' with path \'" + url + "\'");
                    return url == null?null:url.toString();
                } else {
                    LOG.debug("find property file for \'" + fileName + "\' with path \'" + url + "\'");
                    return url.toString();
                }
            }
        }
    }

    public static String getValue(String key) {
        return getValue(key, (String)null);
    }

    public static String getValue(String key, String defaultVal) {
        BaseConfig.FileName[] fileNames = BaseConfig.FileName.values();
        BaseConfig.FileName[] arr$ = fileNames;
        int len$ = fileNames.length;

        for(int i$ = 0; i$ < len$; ++i$) {
            BaseConfig.FileName fileName = arr$[i$];
            Configuration config = (Configuration)CONF_MAP.get(fileName);
            String value = null;
            String[] values = config.getStringArray(key);
            if(values != null && values.length > 1) {
                value = StringUtils.join(values, ",");
            } else {
                value = config.getString(key);
            }

            if(!StringUtils.isBlank(value)) {
                LOG.debug("find value for key(" + key + ") in config file \'" + fileName + ".properties\'");
                return value;
            }
        }

        return defaultVal;
    }

    static {
        init();
    }

    public static enum FileName {
        commons,qclound;

        private FileName() {
        }
    }
}
