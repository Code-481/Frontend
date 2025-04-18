module com.code418.frontend.deu_info {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.web;  
    
    opens com.code418.frontend.deu_info to javafx.fxml;
    exports com.code418.frontend.deu_info;
    requires javafx.webEmpty;
}
