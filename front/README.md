# 포트폴리오 공유 서비스 프론트엔드 코드

## 실행 방법

## 1. react-srcipts start 실행

> yarn은 사실 npm 패키지입니다. yarn부터 설치합니다. (이미 설치 시 생략)

> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다. 즉, 라이브러리 설치 커맨드입니다.

> yarn 입력 시 자동으로, package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.

```bash
npm install --global yarn
yarn
yarn start
```

## 파일 구조 설명

1. src폴더는 아래와 같이 구성됩니다.

-   components 폴더:

    -   award 폴더: 포트폴리오 중 수상이력 관련 컴포넌트들이 담겨져 있습니다.
    -   certificate 폴더: 포트폴리오 중 자격증 관련 컴포넌트들이 담겨져 있습니다.
    -   education 폴더: 포트폴리오 중 학력 관련 컴포넌트들이 담겨져 있습니다.
    -   header 폴더: 네비게이션 바를 구성하는 JS파일이 담겨져 있습니다.
    -   project 폴더: 포트폴리오 중 프로젝트 관련 컴포넌트들이 담겨져 있습니다.
    -   stack 폴더: 포트폴리오 중 기술스택 관련 컴포넌트들이 담겨져 있습니다.
    -   user 폴더: 포트폴리오 중 사용자 관련 컴포넌트들이 담겨져 있습니다.

-   pages 폴더:

    -   login 폴더: 로그인 관련 컴포넌트들이 담겨져 있습니다.
    -   network 폴더: 유저 목록을 보여주는 Network 관련 컴포넌트들이 담겨져 있습니다.
    -   portfolio 폴더: 유저의 정보를 보여주는 Portfolio 관련 컴포넌트들이 담겨져 있습니다.
    -   register 폴더: 회원가입 관련 컴포넌트들이 담겨져 있습니다.
    -   wanted 폴더: 팀원구하기 관련 컴포넌트들이 담겨져 있습니다.

-   static 폴더: font 관련 CSS 파일들이 담겨져 있습니다.

-   api.js:
    -   axios를 사용하는 코드가 있습니다.
    -   CRUD 기능과 추가와 동시에 파일을 전송하는 postFile, 수정과 동시에 파일을 전송하는 putFile등이 있습니다.
-   App.js:
    -   SPA 라우팅 코드가 있습니다.
-   reducer.js:
    -   로그인, 로그아웃은 useReducer 훅으로 구현되는데, 이 때 사용되는 reducer 함수입니다.
-   index.js:
    -   index.html의 root id에 렌더링 하기위한 코드가 있습니다.

2. 전체적인 로직은 아래와 같습니다. 예를 들어 Award MVP 기준입니다

-   포트폴리오 컴포넌트는 Award 컴포넌트를 사용합니다.
-   Award 컴포넌트는 Award의 목록을 출력하는 AwardDetail 컴포넌트를 사용합니다.
-   각 Award 컴포넌트는 isEditing 상태에 따라, false면 AwardP, true면 AwardForm이 됩니다.
-   **isEditable**(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.
