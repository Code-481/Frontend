package com.code418.frontend.deu_info;

/**
 *
 * @author INMD1
 */

import java.util.Optional;

import javafx.animation.PauseTransition;
import javafx.application.Platform;
import javafx.scene.control.Alert;
import javafx.scene.control.ButtonType;
import javafx.util.Duration;

public class alret_message {

    public void error(String headertext, String contenttext) {
        Platform.runLater(() -> {
            Alert error_alert = new Alert(Alert.AlertType.WARNING);
            error_alert.setTitle("Code418");
            error_alert.setHeaderText(headertext);
            error_alert.setContentText(contenttext);

            Optional<ButtonType> result = error_alert.showAndWait();
            if (result.isPresent() && result.get() == ButtonType.OK) {
                System.out.println("[로그] 모든 시스템 종료");
                System.exit(0);
            }
        });
    }

    public void info(String headertext, String contenttext) {
        Platform.runLater(() -> {
            Alert info_alert = new Alert(Alert.AlertType.CONFIRMATION);
            info_alert.setTitle("Code418");
            info_alert.setHeaderText(headertext);
            info_alert.setContentText(contenttext);
            info_alert.showAndWait();
        });
    }


    public  void close_info(String headertext, String contenttext, int time){
        Platform.runLater(() -> {
            Alert info_alert = new Alert(Alert.AlertType.CONFIRMATION);
            info_alert.setTitle("Code418");
            info_alert.setHeaderText(headertext);
            info_alert.setContentText(contenttext);
  
            PauseTransition delay = new PauseTransition(Duration.seconds(time));
            delay.setOnFinished(event -> info_alert.close());
            delay.play();
        });
    }

    public void stop() {
        Platform.runLater(() -> {

        });
    }
}
