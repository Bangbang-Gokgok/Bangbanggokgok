# **방방곡곡(BanBangGokGok)**

<br>

### **서비스 설명**

<br>

### 1. 기획 의도, 목적

<br/>

- 사람들은 자신의 추억을 예쁘게 간직하고 싶어합니다.
  - 이 추억들을 하나의 스토리처럼 한 눈에 들어오는 결과물을 만들고 싶었습니다.
  - 기억하고 싶은 추억들을 한 데 모아 포트폴리오화하면 사용자들의 소유 욕구도 자극할 수 있습니다.

<br/>

- 요즘 SNS들의 문제점인, 악의적인 마케팅에 의한 부적절한 광고량 증가 때문에 SNS를 탈퇴하는 사용자들이 증가하고 있습니다.
  - SNS를 SNS답게, 건강하게 사용하고 싶은 사용자들을 위한 서비스를 개발하고자 마음먹었습니다.

<br/>

### 2. 웹 서비스의 최종적인 메인 기능과 서브 기능 설명

<br/>

- 주제 : 한 눈에 들어오는 자신의 추억 포트폴리오를 통해, 자신의 추억을 친구들과 공유하며 교류하는 위치 기반 맵 공유 서비스

<br/>

- 메인 기능

  1. 나의 피드 생성/수정/삭제 기능 및 댓글 생성/수정/삭제 기능
  2. 다른 사람 지도 조회 및 댓글 생성/수정/삭제 기능
  3. 친구 검색, 팔로우 기능
  4. 프로필 조회/수정 및 회원 탈퇴 기능

<br/>

- 서브 기능
  1. 관리자 기능
  2. [추후 추가 예정] 팔로우 (or 서로 이웃 추가)된 친구들에게 부여할 수 있는 Role과 권한을 다양화
  3. [추후 추가 예정] 신고기능
  4. [추후 추가 예정] 친구로 등록된 다른 사용자의 지도에 접근하여 특정 핀 포인트에 글 또는 댓글을 남기기 기능

<br/>

### 3. 프로젝트만의 차별점, 기대 효과

<br/>

- 기본적인 구조는 기존의 SNS에서 글을 업로드하고, 관리하는 것과 비슷합니다.

<br/>

- 기존의 SNS 서비스와의 차별점 ⇒ **필수적으로 장소의 위치를 설정해야 합니다.**
  - 인스타와 같은 SNS는 위치 설정이 필수가 아닙니다.
  - 추억을 남기고 싶은 장소의 위치를 기록하는데에 중점을 둡니다.
  - 이 위치들을 모두 지도 위에 **핀 포인트**로 찍어, 하나의 지도 위에 모아놓습니다.
    - 한 사람의 추억 리스트가 지도 위에 모두 랜더링되어, 한 눈에 볼 수 있습니다.

<br/>

- 다른 사용자에게 자신의 지도를 공유할 수 있습니다.
  - 자신의 추억을 채워넣은 지도를 보여줌으로서 내가 어디가서 무엇을 하고 무엇을 느꼈는지 상대방과 커뮤니케이션할 수 있습니다.
  - 지도가 일상 기록임과 동시에 훌륭한 대화 수단으로서 활용될 수 있습니다.

<br />

### 4. 시연 영상

<br />

https://www.youtube.com/watch?v=R1fJRN71cS8

<br />

### 5. 프로젝트 구성

<br />

- 사용 스택

  - 프론트엔드

    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
    <img src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=Storybook&logoColor=white"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white"/>
    Recoil
    axios

  - 백엔드

    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/express-000000?style=flat-square&logo=express&logoColor=white"/>
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
    <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat-square&logo=Amazon S3&logoColor=white"/>
    <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white"/>
    <img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socket.io&logoColor=white"/>
    <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
    <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/>

<br />

### 6. 와이어프레임, ERD, SiteMap, Flow Chart 등

(https://www.figma.com/file/ZBXSvJcaxoj9YMJ01SSOhI/7th-project?node-id=0%3A1)

<br />

(데스크탑으로 실행한 이후 좌측 상단에 Pages (PC, Sitemap, ERD, Mobile) 클릭)

<br/>

### 7. 구성원 역할

| 이름   | 역할             | 구현 기능                                                                                                                                                    |
| ------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 김지환 | 팀장, 프론트엔드 | 컴포넌트 UI 제작 (WITH 정현님, 용재님)/ 와이어프레임 제작 (WITH 정현님, 용재님) / 피드, 리뷰, 유저 CRUD API 호출 메소드 제작 / try ~ catch 예외처리 리팩토링 |
| 김정현 | 프론트엔드       | KAKAO MAP API 기반 피드 기능 구현 / WEB SOCKET 기반 좋아요 기능 구현 / 친구 찾기, 조회, 추가 기능 구현                                                       |
| 원용재 | 프론트엔드       | 로그인 인증 (AUTH), 회원(USER), 관리자 (ADMIN) UI, 기능 구현 / WEBPACK 설정 / 레이아웃 디자인                                                                |
| 윤익   | 백엔드           | GOOGLE 소셜 로그인 구현 / USER, ADMIN API 설계 및 구현 / 좋아요 기능 구현 (REDIS, SOCKET IO) / DOCKER 배포                                                   |
| 조재홍 | 백엔드           | KAKAO 소셜 로그인 구현 / FEED, REVIEW API 설계 및 구현 / S3 이미지 업로드 기능 구현 / JEST를 활용한 테스트코드 작성                                          |
