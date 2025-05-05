package com.code418.frontend.deu_info;

/**
 *
 * @author INMD1
 */

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import javafx.application.Platform;

public class httpservers {

    private final String buildpath;
    private final int port;
    private HttpServer server;
    private alret_message alret;

    public httpservers(String a, int b) {
        this.buildpath = a;
        this.port = b;
    }

    public void start() {
        if (server != null) {
            System.out.println("서버가 이미 실행 중입니다.");
            return;
        }
        try {
            server = HttpServer.create(new InetSocketAddress(port), 0);
            server.createContext("/", new StaticFileHandler(buildpath));
            server.setExecutor(null);
            server.start();
            System.out.println("내부서버가 시작되었습니다: http://localhost:" + port);
        } catch (IOException e) {
            Platform.runLater(() -> alret.error("서버 시작 중 오류 발생했습니다.", e.getMessage()));
        }
    }

    public void stop() {
        if (server != null) {
            server.stop(0);
            System.out.println("내부서버가 종료되었습니다.");
            System.exit(0);
        }
    }

    // 정적 파일 서빙 핸들러
    static class StaticFileHandler implements HttpHandler {

        private final String rootDir;

        public StaticFileHandler(String rootDir) {
            this.rootDir = rootDir;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String uriPath = exchange.getRequestURI().getPath();
            if (uriPath.equals("/")) {
                uriPath = "/index.html"; // 루트는 index.html로
            }
            // 윈도우 경로 처리: /C:/... → C:/...
            if (uriPath.length() > 2 && uriPath.charAt(0) == '/' && uriPath.charAt(2) == ':') {
                uriPath = uriPath.substring(1);
            }

            File file = new File(rootDir + uriPath);

            if (file.exists() && file.isFile()) {
                String contentType = guessContentType(file.getName());
                exchange.getResponseHeaders().add("Content-Type", contentType);
                byte[] bytes = Files.readAllBytes(file.toPath());
                exchange.sendResponseHeaders(200, bytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(bytes);
                }
            } else {
                String resp = "404 Not Found";
                exchange.sendResponseHeaders(404, resp.length());
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(resp.getBytes());
                }
            }
        }

        private String guessContentType(String filename) {
            if (filename.endsWith(".html")) {
                return "text/html";
            }
            if (filename.endsWith(".js")) {
                return "application/javascript";
            }
            if (filename.endsWith(".css")) {
                return "text/css";
            }
            if (filename.endsWith(".json")) {
                return "application/json";
            }
            if (filename.endsWith(".png")) {
                return "image/png";
            }
            if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
                return "image/jpeg";
            }
            if (filename.endsWith(".svg")) {
                return "image/svg+xml";
            }
            return "application/octet-stream";
        }
    }
}
