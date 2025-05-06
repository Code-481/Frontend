# Code418 Frontend Build 문서 (작성 중)

이 문서는 Code418 프로젝트의 Frontend 빌드 및 실행 방법을 안내합니다. 개발자를 위한 가이드입니다.


# 📦 바로 실행

### Windows

1. 아래 링크에서 JavaFX SDK를 다운로드하고, 압축을 해제한 후 `Frontend/Build-File/lib` 폴더에 넣어주세요.  
   👉 [openjfx-21.0.7_windows-x64_bin-sdk.zip](https://download2.gluonhq.com/openjfx/21.0.7/openjfx-21.0.7_windows-x64_bin-sdk.zip)

2. 아래 명령어로 실행하세요:

   ```cmd
    java ^
      --module-path <파일경로>\Frontend\Build-File\lib\javafx-sdk-21.0.7\lib ^
      --add-modules javafx.controls,javafx.fxml,javafx.web ^
      -cp "deu_info-0.0.1.jar;<파일경로>\Frontend\Build-File\lib\jgit\*" ^
      com.code418.frontend.deu_info.App
    ```
    
### Linux

1. 아래 링크에서 JavaFX SDK를 다운로드하고, 압축을 해제한 후 `Frontend/Build-File/lib` 폴더에 넣어주세요.
   
   👉 [openjfx-21.0.7\_linux-x64\_bin-sdk.zip](https://download2.gluonhq.com/openjfx/21.0.7/openjfx-21.0.7_linux-x64_bin-sdk.zip)

2. 아래 명령어로 실행하세요:

   ```bash
    java \
      -Dfile.encoding=UTF-8 \
      --module-path lib/javafx-sdk-21.0.7/lib \
      --add-modules javafx.controls,javafx.fxml,javafx.web \
      -cp "deu_info-0.0.1.jar:lib/jgit/*:lib/slf4j/*:lib/jsch/*" \
      com.code418.frontend.deu_info.App
   ```


## 📦 패키징

### Windows 패키징

> 아래 링크에서 JavaFX JMODs 파일을 다운로드하여 `Build-File/lib` 폴더에 넣어주세요.
> 👉 [openjfx-21.0.7\_windows-x64\_bin-jmods.zip](https://download2.gluonhq.com/openjfx/21.0.7/openjfx-21.0.7_windows-x64_bin-jmods.zip)

> ⚠️ (작성 중 – 자세한 패키징 명령은 추후 추가 예정)

---

### Linux 패키징 (DEB)

#### 1. 디렉토리 구조 생성

```bash
mkdir -p deu_info_pkg/DEBIAN
mkdir -p deu_info_pkg/usr/bin
mkdir -p deu_info_pkg/usr/lib/deu_info
```

#### 2. 파일 복사

* `deu_info-0.0.1.jar`
* `lib/javafx-sdk-21.0.7/lib/` 안의 모든 파일
* `lib/jgit/`, `lib/slf4j/`, `lib/jsch/` 폴더의 모든 파일

위 파일들을 `deu_info_pkg/usr/lib/deu_info/`로 복사하세요.

> 실행 스크립트는 `deu_info_pkg/usr/bin/deu_info`에 저장하고 실행 권한을 부여합니다.

#### 3. 실행 스크립트 작성

`deu_info_pkg/usr/bin/deu_info` 파일 내용:

```bash
#!/bin/bash
java -Dfile.encoding=UTF-8 \
  --module-path /usr/lib/deu_info/javafx-sdk-21.0.7/lib \
  --add-modules javafx.controls,javafx.fxml,javafx.web \
  -cp "/usr/lib/deu_info/deu_info-0.0.1.jar:/usr/lib/deu_info/jgit/*:/usr/lib/deu_info/slf4j/*:/usr/lib/deu_info/jsch/*" \
  com.code418.frontend.deu_info.App
```

실행 권한 부여:

```bash
chmod 755 deu_info_pkg/usr/bin/deu_info
```

#### 4. control 파일 작성

`deu_info_pkg/DEBIAN/control` 파일 내용:

```text
Package: deu-info
Version: 0.0.1
Section: utils
Priority: optional
Architecture: all
Depends: default-jre
Maintainer: Your Name <your@email.com>
Description: DEU Info JavaFX Application
 A JavaFX application packaged for Ubuntu.
```

#### 5. 패키지 빌드

```bash
dpkg-deb --build deu_info_pkg
mv deu_info_pkg.deb deu-info_0.0.1_all.deb
```

#### 6. 설치 및 실행

```bash
sudo dpkg -i deu-info_0.0.1_all.deb
deu_info
```