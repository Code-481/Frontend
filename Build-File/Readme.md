# Code418 Frontend Build (작성중)

이 폴더는 개발자를 위한 공간 입니다.

# 바로 실행 또는 페키지 설치 과정 없이 실행

## Windwos
> 아래 링크을 통해 다운 받은후 Build-File\lib에 넣어주세요. <br/>
>https://download2.gluonhq.com/openjfx/21.0.7/openjfx-21.0.7_windows-x64_bin-sdk.zip <br/>
```
java ^
  --module-path <파일주소>\Frontend\Build-File\lib\javafx-sdk-21.0.7\lib ^
  --add-modules javafx.controls,javafx.fxml,javafx.web ^
  -cp "deu_info-0.0.1.jar;<파일주소>\Frontend\Build-File\lib\jgit\*" ^
  com.code418.frontend.deu_info.App
```

## Linux
> 아래 링크을 통해 다운 받은후 Build-File\lib에 넣어주세요. <br/>
> https://download2.gluonhq.com/openjfx/21.0.7/openjfx-21.0.7_linux-x64_bin-sdk.zip<br/>

```
java ^
  --module-path = <파일주소>/Frontend/Build-File/lib/javafx-sdk-21.0.7/lib ^
  --add-modules javafx.controls,javafx.fxml,javafx.web ^
  -cp "deu_info-0.0.1.jar; <파일주소>/Code-481/Frontend/Build-File/lib/jgit/*" ^
  com.code418.frontend.deu_info.App
```

# Install 패키지를 만드는 방법 (작성중)

> ## 안내사항
> 
> jpackage을 이용하는경우 Wix3라는 프로그램도 같이 설치해야 합니다. <br/>
> Jar파일 같은경우 빌드를 하는 순간 자동으로 이쪽 파일로 필드가 됨니다. <br/>
> 버전을 바꾼경우 혼선을 방지하기 위해 이전 버전을 제거해주세요.

## Windwos
<details><summary>접기/펼치기</summary>

> 아래 링크을 통해 다운 받은후 Build-File\lib에 넣어주세요. <br/>
> https://download2.gluonhq.com/openjfx/21.0.7/openjfx-21.0.7_windows-x64_bin-jmods.zip<br/>

### 자바 커스텀 이미지 삽입
```
jlink ^
  --module-path "C:\Program Files\Java\jdk-17\jmods; <파일주소>\Frontend\Build-File\lib\javafx-jmods-21.0.7" ^
  --add-modules java.base,javafx.controls,javafx.fxml,javafx.web ^
  --output <jlink 파일주소> ^
  --strip-debug --compress=2 --no-header-files --no-man-pages
```

### 깃허브 인증서 삽입
```
keytool -import -trustcacerts ^
  -file sectigo.crt ^
  -alias github-sectigo ^
  -keystore  <파일주소>\Frontend\Build-File\runtime\lib\security\cacerts ^
  -storepass changeit
```

### 패키지 생성
```
jpackage.exe ^
  --type exe ^
  --input <파일주소>\Code-481\Frontend\Build-File\ ^
  --dest <파일주소>\Code-481\Frontend\Build-File\installer ^
  --main-jar deu_info-0.0.1.jar ^
  --main-class com.code418.frontend.deu_info.App ^
  --name "DeuInfoApp" ^
  --runtime-image <jlink 파일주소> ^
  --win-shortcut ^
  --win-menu
```
</details>


## Linux(Ubuntu/Debian) (작성중)
> 아래 링크을 통해 다운 받은후 Build-File\lib에 넣어주세요. <br/>
> https://download2.gluonhq.com/openjfx/21.0.7/openjfx-21.0.7_linux-x64_bin-jmods.zip<br/>
```bash

```
