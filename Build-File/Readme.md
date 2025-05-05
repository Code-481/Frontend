# Code418 Frontend Build (작성중)

이 폴더는 개발자를 위한 공간 입니다.

# 바로 실행

## Windwos

```
java ^
  --module-path E:\Code-481\Frontend\Build-File\lib\javafx-sdk-21.0.7\lib ^
  --add-modules javafx.controls,javafx.fxml,javafx.web ^
  -cp "deu_info-0.0.1.jar;E:\Code-481\Frontend\Build-File\lib\jgit\*" ^
  com.code418.frontend.deu_info.App
```

# Install 패키지를 만드는 방법

> ## 안내사항
>
> Jar파일 같은경우 빌드를 하는 순간 자동으로 이쪽 파일로 필드가 됨니다. <br/>
> 버전을 바꾼경우 혼선을 방지하기 위해 이전 버전을 제거해주세요.

## Windwos

```
jpackage ^
  --type exe ^
  --input E:\Code-481\Frontend\Build-File ^
  --dest E:\Code-481\Frontend\Build-File\installer ^
  --main-jar deu_info-0.0.1.jar ^
  --main-class com.code418.frontend.deu_info.App ^
  --name "DeuInfoApp" ^
  --module-path "E:\Code-481\Frontend\Build-File\lib\javafx-jmods-21.0.7_win" ^
  --add-modules javafx.controls,javafx.fxml,javafx.web ^
  --win-shortcut ^
  --win-menu
```

## Linux(Ubuntu/Debian)

```bash
#!/bin/bash
PACKAGE_NAME="deu-info"
VERSION="1.0.0"
ARCH="amd64"
WORKDIR="${PACKAGE_NAME}_${VERSION}"

mkdir -p "${WORKDIR}/DEBIAN"
mkdir -p "${WORKDIR}/usr/local/bin"

cat <<EOF > "${WORKDIR}/DEBIAN/control"
Package: ${PACKAGE_NAME}
Version: ${VERSION}
Section: utils
Priority: optional
Architecture: ${ARCH}
Maintainer: Your Name <your@email.com>
Description: DEU Info App
 Java/JavaFX 기반의 DEU 정보 앱입니다.
Depends: openjdk-17-jre
EOF

cp deu_info-0.0.1.jar "${WORKDIR}/usr/local/bin/"
echo -e '#!/bin/bash\njava -jar /usr/local/bin/deu_info-0.0.1.jar "$@"' > "${WORKDIR}/usr/local/bin/deu-info"
chmod +x "${WORKDIR}/usr/local/bin/deu-info"

dpkg-deb --build "${WORKDIR}"
```
