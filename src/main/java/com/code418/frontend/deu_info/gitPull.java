/**
 *
 * @author lyw51
 */
package com.code418.frontend.deu_info;

import java.io.File;
import java.nio.file.Paths;

import java.util.Arrays;
import javafx.application.Platform;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

public class gitPull {

    private final alret_message alret = new alret_message();

    private static final String REMOTE_URL = "https://github.com/Code-481/Frontend";
    private static final String BRANCH = "build";
    private static final String BRANCH_REF = "refs/heads/build";

    public void start() {
        try {

            String path = Paths.get(System.getProperty("user.dir"), "Frontend").toString();
            File repoDir = new File(path);

            boolean needClone = true;

            // 이미 저장소가 존재하는지 확인
            File gitDir = new File(repoDir, ".git");
            if (gitDir.exists()) {
                // 로컬 최신 커밋 해시 확인
                FileRepositoryBuilder builder = new FileRepositoryBuilder();
                try (Repository repository = builder.setGitDir(gitDir)
                        .readEnvironment()
                        .findGitDir()
                        .build()) {
                    ObjectId localHead = repository.resolve("refs/heads/" + BRANCH);

                    // 원격 최신 커밋 해시 확인
                    Ref remoteHead = Git.lsRemoteRepository()
                            .setHeads(true)
                            .setRemote(REMOTE_URL)
                            .callAsMap()
                            .get("refs/heads/" + BRANCH);

                    if (localHead != null && localHead.equals(remoteHead)) {
                        // 최신이면 클론 필요 없음
                        needClone = false;
                        System.out.println("[로그] 이미 최신입니다. 클론하지 않습니다.");
                    }
                }
            }

            if (needClone) {
                // 기존 폴더 삭제
                deleteDirectory(repoDir);
                System.out.println("[로그] 기존 남아있는 파일을 삭제합니다.");

                // 알림 표기 (UI 스레드)
                Platform.runLater(() -> {
                    alret.close_info("최신 업데이트", "지정된 Repo 사이트에서 최신데이터를 확인하고 불려오고 있습니다.", 4);
                });

                // 클론
                Git git = Git.cloneRepository()
                        .setURI(REMOTE_URL)
                        .setBranchesToClone(Arrays.asList(BRANCH_REF))
                        .setDirectory(repoDir)
                        .setBranch(BRANCH_REF)
                        .call();
                git.close();

                // 알림 종료 (UI 스레드)
                Platform.runLater(() -> alret.stop());
            }

        } catch (Exception e) {
            e.printStackTrace();
            Platform.runLater(() -> alret.error("예외사항이 발생했습니다.", "파일을 업로드 하는 동안 오류가 발생 했습니다. 개발자에게 문의하십시오. Error:" + e.getMessage()));
        }
    }

    // 폴더 삭제 (재귀)
    private void deleteDirectory(File dir) {
        if (dir.isDirectory()) {
            for (File file : dir.listFiles()) {
                deleteDirectory(file);
            }
        }
        dir.delete();
    }
}
