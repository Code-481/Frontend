package com.code418.frontend.deu_info;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.scene.web.WebView;

import java.io.IOException;
import java.net.URL;

/**
 * JavaFX App
 */
public class App extends Application {

    private static Scene scene;

    @Override
    public void start(Stage stage) {
        WebView webView = new WebView();

        // resources/static/index.html 경로를 URL로 불러오기
        URL url = getClass().getResource("/static/index.html");

        if (url != null) {
            // 외부 리소스를 제대로 불러오게 하려면 loadContent 대신 load 사용
            webView.getEngine().load(url.toExternalForm());
        } else {
            System.out.println("index.html 파일을 찾을 수 없습니다.");
        }

        Scene scene = new Scene(webView, 800, 600);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }

    static void setRoot(String fxml) throws IOException {
        scene.setRoot(loadFXML(fxml));
    }

    private static Parent loadFXML(String fxml) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource(fxml + ".fxml"));
        return fxmlLoader.load();
    }
}
