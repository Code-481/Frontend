# Code418 Frontend
해당 레포는 자바프로젝트에서 쓰이는 프론트엔드 부분 레포입니다.
> ## 안내사항
> 개인적으로 빌드를 원하시는 경우 파일에서 `Build-File`에 있는 <br/>
> Readme를 참고해주세요.

## 사용하는 기술
[내부작업]<br/>
React + Tailwind + Shadcn <br/>
[외부작업]<br/>
Java + JavaFX

# 실행하기
### Windows

1. 릴리즈에서 설치 파일을 다운로드 받고 설치를 해주세요.
2. 프로그램을 관리자 권한으로 실행해주세요.

### Linux (debian/Ubuntu)
릴리즈에서 설치 파일 만들어서 다운 받아주세요.

# 개발후 로직
## 개발후 깃 업로드 

<details><summary>접기/펼치기</summary>

![image](https://github.com/user-attachments/assets/bf43e3ea-98d6-460d-80c8-1ce919acb7c2)  
## 1. 개발자 영역
###  NetBeans
- → Java(Javalin) 기반 서버 코드를 작성하고
- → GitHub를 통해 소스 코드를 업로드(Push)합니다
###  GitHub
- → 소스 코드를 저장하고
- → Push Webhook을 통해 Coolify에 자동 배포 신호를 전달합니다

## 2. 배포 자동화: Coolify + Docker
###  Coolify
- → GitHub의 Webhook을 수신하여 자동으로 Docker 빌드를 수행하고
- → Javalin 기반 Java 서버를 Docker 컨테이너로 실행합니다
###  Docker
- → Dockerfile을 기반으로 서버 환경을 컨테이너화하며
- → 필요한 데이터와 환경변수를 설정합니다

## 3. 서버 환경 구성
###  Javalin (Java 경량 웹 프레임워크)
- → REST API 및 동적 서버 로직을 처리하고
- → 외부 공공데이터 API와 통신합니다
###  MySQL (Docker로 구동)
- → 수집된 데이터(예: 날씨 정보, 통계 등)를 저장합니다
###  외부 데이터 연동
- → 기상청, 공공데이터 포털, 빅데이터 허브 등에서 주기적으로 데이터를 수집하고
- → API를 통해 데이터를 가져와 Javalin에서 가공 후 데이터베이스에 저장합니다

## 4. 프록시 및 외부 접속
### Nginx
- → 리버스 프록시 기능을 수행하고
- → 외부 클라이언트의 요청을 Javalin 컨테이너로 연결하며
- → HTTPS 및 포트 관리도 지원합니다
</details>
  
## 프로그램 실행전후 과정

<details><summary>접기/펼치기</summary>

![image](https://github.com/user-attachments/assets/274a5029-76d2-4575-91a0-b5802e897eba)
## Repo 동기화 및 상태 확인
- GitHub 리포지토리의 빌드 브랜치를 주기적으로 모니터링하여 Java 프로그램의 빌드 상태를 체크
- 새로운 변경 사항이 감지되면 최신 빌드 결과물을 로컬 리소스 폴더에 저장

## Java 1차 단계 (JavaFX WebView 표시 이전)
### 리소스 파일 활용
- → 앞서 다운로드한 React 빌드 결과물을 Java 프로그램의 WebView 리소스로 사용
- → 내부 프라이빗 웹 서버나 JavaFX의 WebEngine을 통해 React UI 로드
### Config.yaml을 통한 사용자 설정 로딩
- → UI 구성, 테마, 로직 등 사용자 정의 설정을 Config.yaml에서 불러옴
- → 해당 설정에 따라 JavaFX WebView 또는 JavaFX 화면의 동작 결정

## Java 2차 단계 (JavaFX WebView)
### JavaFX WebView
- → 리소스에 포함된 React 결과물을 WebView로 렌더링하여 사용자 인터랙션 구현
### JavaFX
- → Java 고유 UI 컴포넌트로 구성된 화면 표시
- → 필요에 따라 WebView와 상호 전환 또는 연동하여 사용
</details>

