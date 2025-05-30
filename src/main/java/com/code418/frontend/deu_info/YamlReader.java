package com.code418.frontend.deu_info;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import org.yaml.snakeyaml.Yaml;

/**
 *
 * @author leehojun
 */
class YamlReader {

    public String fullscreen;
    String getFullscreen;

    public YamlReader() throws Exception {
        Yaml yaml = new Yaml();
        try (InputStream in = new FileInputStream("config.yaml")) {
            if (in == null) throw new IllegalArgumentException("config.yaml not found");
            Map<String, Object> obj = yaml.load(in);
            Map<String, Object> display = (Map<String, Object>) obj.get("display");
            this.fullscreen = (String) display.get("fullscreen");
        }
    }

    public String getFullscreen() {
        return fullscreen;
    }

    
}
