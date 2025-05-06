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

