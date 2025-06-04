package com.code418.frontend.deu_info;

/**
 *
 * @author INMD1
 */
import java.awt.Dimension;
import java.awt.Toolkit;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.scene.web.WebView;
import javafx.scene.web.WebEngine;
import java.io.File;
import java.io.IOException;
import javafx.application.Platform;
import javafx.scene.text.Font;

public class App extends Application {

    private final alret_message alret = new alret_message();

    @Override
    public void start(Stage stage) throws IOException, Exception {
        // 다른 곳에서 깨질까봐 폰트를 집어 넣음
        Font.loadFont(getClass().getResourceAsStream("/fonts/NanumGothic.ttf"), 14);

        // 설정 파일로
        YamlReader config = new YamlReader();

        try {
            // WebView
            WebView webView = new WebView();
            WebEngine engine = webView.getEngine();

            // 파일 확인
            String resourcePath = "Frontend";
            File resourceDir = new File(resourcePath);

            // 파일 확인
            // 비동기 작업(쓰레드)
            new Thread(() -> {
                // 파일 확인
                System.out.println("[로그] 데이터 최신화");
                // Git
                gitPull git = new gitPull();
                git.start();

                System.out.println("[로그] 데이터 최신화 작업종료");
                // 위 작업이 되면 실행
                Platform.runLater(() -> {
                    System.out.println("[로그] 웹서버 실행");
                    // 포트 지정
                    int port = 8964;
                    httpservers server = new httpservers(resourceDir.getAbsolutePath(), port);

                    // 자바스크립트 콘솔 메시지 Java 콘솔로 출력
                    // 개발 목적으로 만들어진 코드입니다.
                    try {
                        engine.setOnAlert(event -> System.out.println("[ALERT] " + event.getData()));
                        engine.setOnError(event -> System.out.println("[ERROR] " + event.getMessage()));
                        engine.setOnStatusChanged(event -> System.out.println("[STATUS] " + event.getData()));
                    } catch (NoSuchMethodError | Exception e) {
                        Platform.runLater(() -> alret.error("예외사항이 발생했습니다.", "현재 자바가 17미만 입니다! 자바 17로 설치 해주시기바람니다."));
                    }
                    if (resourceDir.exists() && resourceDir.isDirectory()) {
                        server.start();
                        webView.getEngine().load("http://localhost:" + port);
                        Scene scene;

                        // 설정 부분
                        if (Boolean.TRUE.equals(config.getFullscreen())) {
                            Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
                            double width = screenSize.getWidth() * 0.95; // 가로 95%
                            double height = screenSize.getHeight() * 0.80; // 세로 95%

                            scene = new Scene(webView, width, height);
                            stage.setScene(scene);

                            // 화면 중앙 정렬
                            stage.setX((screenSize.getWidth() - width) / 2);
                            stage.setY((screenSize.getHeight() - height) / 1.5);
                            stage.setFullScreen(false); // 전체 화면 false
                            stage.show();
                        } else {
                            Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
                            double width = screenSize.getWidth() * 0.9;
                            double height = screenSize.getHeight() * 0.9;
                            scene = new Scene(webView, width, height);
                            stage.setX((screenSize.getWidth() - width) / 2);
                            stage.setY((screenSize.getHeight() - height) / 2);
                        }

                        stage.setScene(scene);
                        stage.setTitle("Code418 크로스 플랫폼");
                        stage.show();

                        // X자 아이콘을 클릭시 내부 서버 종료
                        stage.setOnCloseRequest(event -> server.stop());
                    } else {
                        Platform.runLater(() -> {
                            server.stop();
                            alret.error("예외사항이 발생했습니다.", "React 빌드 폴더가 없습니다.");
                        });
                    }

                });
            }).start();
        } catch (Exception e) {
            Platform.runLater(() -> alret.error("예외사항이 발생했습니다.", e.getMessage()));
        }
    }

    public static void main(String[] args) {
        if (System.getProperty("os.name").toLowerCase().contains("linux")) {
            System.setProperty("javafx.platform", "gtk");
        }
        launch(args);
    }

}
