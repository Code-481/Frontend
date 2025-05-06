# Code418 Frontend Build (작성중)

이 폴더는 개발자를 위한 공간 입니다.

# 바로 실행

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

# Install 패키지를 만드는 방법

> ## 안내사항
> 
> jpackage을 이용하는경우 Wix3라는 프로그램도 같이 설치해야 합니다. <br/>
> Jar파일 같은경우 빌드를 하는 순간 자동으로 이쪽 파일로 필드가 됨니다. <br/>
> 버전을 바꾼경우 혼선을 방지하기 위해 이전 버전을 제거해주세요.

## Windwos
> 아래 링크을 통해 다운 받은후 Build-File\lib에 넣어주세요. <br/>
> https://download2.gluonhq.com/openjfx/21.0.7/openjfx-21.0.7_windows-x64_bin-jmods.zip<br/>
```
jpackage.exe ^
  --type exe ^
  --input <파일주소>\Frontend\Build-File\ ^
  --dest E:\Code-481\Frontend\Build-File\installer ^
  --main-jar deu_info-0.0.1.jar ^
  --main-class com.code418.frontend.deu_info.App ^
  --name "DeuInfoApp" ^
  --module-path "<파일주소>\Frontend\Build-File\lib\javafx-jmods-21.0.7" ^
  --add-modules javafx.controls,javafx.fxml,javafx.web,jdk.crypto.cryptoki,jdk.crypto.ec,java.security.jgss,java.naming ^
  --win-shortcut ^
  --win-menu
```

## Linux(Ubuntu/Debian) (작성중)
> 아래 링크을 통해 다운 받은후 Build-File\lib에 넣어주세요. <br/>
> https://download2.gluonhq.com/openjfx/21.0.7/openjfx-21.0.7_linux-x64_bin-jmods.zip<br/>
```bash

```
