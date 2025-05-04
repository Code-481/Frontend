package com.code418.frontend.deu_info;

import javafx.scene.control.Alert;

/**
 *
 * @author lyw51
 */
public class alret_message {


    public alret_message() {
    }

    public void error(String headertext, String contenttext) {
        // 에려 반환
        Alert error_alert = new Alert(Alert.AlertType.WARNING);
        error_alert.setTitle("Code418");
        error_alert.setHeaderText(headertext);
        error_alert.setContentText(contenttext);
        error_alert.showAndWait();
    }

    public void info(String headertext, String contenttext) {
        Alert info_alert = new Alert(Alert.AlertType.CONFIRMATION);
        info_alert.setTitle("Code418");
        info_alert.setHeaderText(headertext);
        info_alert.setContentText(contenttext);
        info_alert.showAndWait();
    }
}
