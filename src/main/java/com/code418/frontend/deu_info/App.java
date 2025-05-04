package com.code418.frontend.deu_info;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.scene.web.WebView;
import javafx.scene.web.WebEngine;
import java.net.URL;

public class App extends Application {

    private alret_message alret = new alret_message();

    @Override
    public void start(Stage stage) {
        WebView webView = new WebView();
        WebEngine engine = webView.getEngine();

        // 자바스크립트 콘솔 메시지 Java 콘솔로 출력
        try {
            engine.setOnAlert(event -> System.out.println("[ALERT] " + event.getData()));
            engine.setOnError(event -> System.out.println("[ERROR] " + event.getMessage()));
            engine.setOnStatusChanged(event -> System.out.println("[STATUS] " + event.getData()));
        } catch (NoSuchMethodError | Exception e) {
            alret.error("예외사항이 발생했습니다.", "현재 자바가 17미만 입니다! 자바 17로 설치 해주시기바람니다.");
        }
        
        // 리소스 경로 가져오기 (플랫폼 무관)
        URL url = getClass().getResource("/static/Frontend/");
        if (url != null) {
            String path = url.getPath();
            int port = 8964;
            if (path.startsWith("/") && path.length() > 2 && path.charAt(2) == ':') {
                path = path.substring(1);
            }
            System.out.println(path);
            httpservers server = new httpservers(path, port);
            server.start();

            webView.getEngine().load("http://localhost:" + port);

            Scene scene = new Scene(webView, 1920, 1080);
            stage.setScene(scene);
            stage.setTitle("JavaFX WebView 크로스 플랫폼 예제");
            stage.show();

            stage.setOnCloseRequest(event -> {
                server.stop();
            });
        } else {
            alret.error("예외사항이 발생했습니다.", "index 파일이 없습니다.");
        }
    }

    public static void main(String[] args) {
        //OS따라 폴더 구조가 다를수 있기 때문에 OS정보를 가지고옴
        if (System.getProperty("os.name").toLowerCase().contains("linux")) {
            System.setProperty("javafx.platform", "gtk");
        }
        launch(args);
    }
}
