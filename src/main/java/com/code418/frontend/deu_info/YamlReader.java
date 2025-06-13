package com.code418.frontend.deu_info;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import org.yaml.snakeyaml.Yaml;

public class YamlReader {

    private Boolean fullscreen; // 필드 이름 수정 또는 접근 제어자 변경

    public YamlReader() throws Exception {
        Yaml yaml = new Yaml();
        try (InputStream in = new FileInputStream("config.yaml")) {
            if (in == null) throw new IllegalArgumentException("config.yaml not found");
            Map<String, Object> obj = yaml.load(in);
            Map<String, Object> display = (Map<String, Object>) obj.get("display");
            this.fullscreen = (Boolean) display.getOrDefault("fullscreen", Boolean.FALSE); // null 방지
        }
    }

    public Boolean getFullscreen() {
        return fullscreen != null ? fullscreen : Boolean.FALSE;
    }
}
