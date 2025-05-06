# Code418 Frontend Build 문서 (작성 중)

이 문서는 Code418 프로젝트의 Frontend 빌드 및 실행 방법을 안내합니다. 개발자를 위한 가이드입니다.

## 📦 패키징

### Windows 패키징

 1. launch4j을 설치를 한다.
 2. launch4j을 실행후 example_win_packaging.xml 파일을 열어서 참고해서 exe 패키징한다.
 3. 패키징후 정상적으로 작동하는지 테스트한다.
  
> 설치 프로그램을 만들고 싶으면 innosetup 프로그램을 이용해서 설치 패키지를 만드세요.

### Linux 패키징 (DEB) -> 작성중

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