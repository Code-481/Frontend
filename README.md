# Code418 Frontend
해당 레포는 자바프로젝트에서 쓰이는 프론트엔드 부분 레포입니다.

# 작동방식
## 개발후 깃 업로드 
![image](https://github.com/user-attachments/assets/bf43e3ea-98d6-460d-80c8-1ce919acb7c2)

1.	개발자는 React를 Vscode에서 Java는 NetBeans 통해 코드 작성
2.	그리고 해당 레포지토리에 Git Pus를 함
3.	Push하게 되면 동시에 Github 액션이 실행됨
4.	액션은 해당 레포안에 있는 React파일을 복사해와 개발자가 설정한 Yaml따라 작업을 수행함
5.	수행을 다하면 웹 빌드를 따로 저장하는 Build 브런치에 저장

## 프로그램 실행전후 과정
![image](https://github.com/user-attachments/assets/51332dd7-7c7f-4c65-90cf-850cdb9fa7be)

1.	자바 프로그램을 실행을 하면 내부에서는 깃허브에 Build Branch에게 Git Fetch를 보내서
업데이트 있는 지 확인을 한다.
2.	업데이트 사항이 경우 자바 프로그램을 Git Pull을 통해 해당 브런치를 가져지고 온다.
3.	가지고온 파일은 기존 빌드 파일을 지우고 새로운 파일은 이동시킨다.
4.	작업이 다 완료되면 프로그램이 재시작하면서 1번의 내용을 다시 커친다.
5.	이부분에서 업데이트 된 사항이 없는 경우 사용자에게 UI를 출력한다.

## 사용하는 기술
### UI

내부작업: React + Tailwind + Shadcn <br/>
외부작업: Java + JavaFX
