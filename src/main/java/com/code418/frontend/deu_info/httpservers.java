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
            String effectivePath = uriPath;

            // 루트 경로("/") 요청 시 index.html로 매핑
            if (effectivePath.equals("/")) {
                effectivePath = "/index.html";
            }

            // 기존의 윈도우 경로 처리 로직 (사용자 환경에 따라 필요시 유지)
            if (effectivePath.length() > 2 && effectivePath.charAt(0) == '/' && effectivePath.charAt(2) == ':') {
                effectivePath = effectivePath.substring(1);
            }

            File requestedFile = new File(rootDir + effectivePath);

            if (requestedFile.exists() && requestedFile.isFile()) {
                // 요청된 파일이 존재하면 해당 파일 제공 (예: /static/js/main.js, /index.html 등)
                serveFile(exchange, requestedFile);
            } else {
                // 요청된 파일이 존재하지 않으면 index.html 제공 (SPA 라우팅 지원)
                File indexHtmlFile = new File(rootDir + "/index.html");
                if (indexHtmlFile.exists() && indexHtmlFile.isFile()) {
                    serveFile(exchange, indexHtmlFile); // HTTP 200 상태 코드와 함께 index.html 제공
                } else {
                    // index.html 파일조차 찾을 수 없는 경우 (설정 오류)
                    sendNotFoundResponse(exchange, "404 Not Found: Requested resource and index.html not found.");
                }
            }
        }

        private void serveFile(HttpExchange exchange, File file) throws IOException {
            String contentType = guessContentType(file.getName());
            exchange.getResponseHeaders().set("Content-Type", contentType); // set 대신 add를 사용해도 되지만, set이 일반적.
            byte[] bytes = Files.readAllBytes(file.toPath());
            exchange.sendResponseHeaders(200, bytes.length); // 파일 성공적으로 찾았으므로 200 OK
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }

        private void sendNotFoundResponse(HttpExchange exchange, String message) throws IOException {
            byte[] responseBytes = message.getBytes("UTF-8");
            exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
            exchange.sendResponseHeaders(404, responseBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        }

        // guessContentType 메서드는 기존과 동일
        private String guessContentType(String filename) {
            if (filename.endsWith(".html")) {
                return "text/html; charset=UTF-8";
            }
            if (filename.endsWith(".js")) {
                return "application/javascript; charset=UTF-8";
            }
            if (filename.endsWith(".css")) {
                return "text/css; charset=UTF-8";
            }
            if (filename.endsWith(".json")) {
                return "application/json; charset=UTF-8";
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
            if (filename.endsWith(".ico")) {
                return "image/x-icon"; // favicon.ico 등
            }
            return "application/octet-stream";
        }
    }
}
