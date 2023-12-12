# SwingFit : 골프 자세 측정 어플리케이션

📢 **Abstract** : 본 프로젝트는 골프 스윙 자세를 정확하게 측정하고 분석하는 데 도움을 주기 위해 개발되었다.
어플리케이션은 사용자에게 스윙 동작의 문제점을 시각적으로 보여주고,텍스트 메시지를 통해 조언을 제공합니다. 이로써 사용자는 자세를 개선하고 스윙의 품질을 향상시킬 수 있다.


💡 **Motivation** : 코로나 시기에도 스크린 골프장이나 골프의 넓은 스포츠 환경으로 인해 상대적으로 코로나의 영향을 덜 받았으며 꾸준히 골프의 인기가 높아지고 골프산업의 규모도 점점 커지고 있다. 
이에 따라 골프에 대한 접근성이 낮아졌지만 전체적으로 비싼 가격과 레슨비가 연습 및 실력 증진에 부담을 줄 수 있다.
그리하여 손쉽게 접근할 수 있는 어플리케이션을 통해 자세를 측정하고 분석하여 피드백을 제공함으로써 연습 및 실력증진에 부담 없이 도움을 주고자 하였다.

## 시현 영상 


## 주요 화면 및 기능

❗  **화 면**
- **로딩** : 어플리케이션을 실행하면 제일 먼저 나타나는 첫 화면
- **지도** : 현재 위치와 주변 골프장 있는 곳을 마커로 표시하여 나타냄
- **로그인 및 회원가입** : 로그인과 회원가입을 할 수 있음
- **메인** : 마이페이지 요약 화면과 골프 자세를 측정할 수 있는 페이지로 바로가는 기능이 있음
- **마이페이지** : 로그아웃 기능과 간단한 한 줄 인삿말, 프로필 사진 변경 그리고 스윙 평균,최고 점수, 최근 문제점을 볼 수 있음
- **게시판 목록** : 카테고리와 제목,내용 그리고 이미지와 함께 작성한 날짜를 나타냄
- **글** : 사용자 프로필 이미지와 닉네임을 나타내고 댓글 기능이 있음
- **자세 사진 업로드** : 이미지를 가져오는 기능이 있고 스윙 자세와 사용 클럽을 선택할 수 있음
- **자세 측정 결과** : 자세 점수와 스켈레톤이 적용된 이미지가 나타나고, 피드백 내용과 팁을 볼 수 있음

❗ **기 능**
- **게시글 및 댓글** : 게시글, 댓글 등록
- **페이징 기능** : 게시글 목록을 백에서 프론트로 보내줌
- **로그인,로그아웃 및 회원가입** : FireBase의 Authentication 사용
- **지도** : ReactNative의 MapView를 이용하여 지도를 불러오고, Marker로 마커를 표시함
- **소개말** : 처음에는 소개말을 등록하고, 이미 등록되어있으면 수정 기능을 수행함
- **자세 측정** : 서버에 저장된 이미지를 불러와 리사이즈 후, tensorflow와 mediapipe를 사용하여
  자세를 측정 알고리즘을 수행하고 파이프라인이 그려진 이미지를 생성하고 서버에 다시 저장함
- **프로필 사진 등록 및 변경** : 회원가입할 때, 사용자가 프로필 이미지를 등록할 수 있고, 마이페이지에서
프로필 사진을 변경할 수 있음

## 어플리케이션의 동작 과정
1. 사용자가 자신의 자세를 촬영한 사진을 업로드하면 이미지의 리사이즈가 이루어짐

- WHY❓❓ : 이미지마다 사람의 위치나 크기가 다를 수 있기 때문에 리사이즈 과정을 거쳐야 함

2. 리사이즈된 사진에서 좌표를 추출하고 좌표들을 이용해 알고리즘을 수행함

3. 알고리즘을 수행하여 나온 피드백과 점수를 JSON파일로 만들어 해당 데이터를 서버에 저장함

4. 가져온 이미지를 미디어파이프를 이용하여 파이프라인을 그리고 해당 이미지를 서버에 저장함

5. 서버에 저장된 데이터와 이미지를 가져와서 사용자에게 보여줌
   

## 메인 로직1 : 미디어파이프를 이용하여 좌표를 추출하고 기준에 맞게 필요한 좌표를 골라내고 점수 결정하기
![image](https://github.com/choisejin12/Hongik_SwingFit/assets/76937151/df221e4c-f3d7-440d-920e-37b01458bcea)

1. 머리와 허리가 기울어진 정도와, 팔이나 다리가 굽어진 정도를 계산함

2. 앞서 추출한 데이터셋에서 4가지 평가 중 차이가 크지 않은 'Good' 평가 이미지들을 이용했으며 good 이미지에서
각각의 기준의 값들이 제 1사분위와 제 3사분위에 사이에 속한다면 점수를 주도록 알고리즘을 작성함

3. 범위를 벗어난 값들의 경우 그에 따른 피드백을 제공하게 하였고, 피드백의 개수에 따라 점수가 결정됨

## 메인 로직2 : 사용자가 사진(프로필,자세 측정)을 업로드하면 서버에 저장하기


✔ 회원가입할 때 이미지를 등록하고, 프로필을 변경할 때에 같은 코드를 이용하게 되어
uploadImage함수를 만들어서 공통적으로 사용하게 함

1. 사용자가 사진을 업로드 함

2. 해당 함수에 맞는 함수가 실행 됨 ( EX : 자세이미지 업로드 => uploadPostureImage() 함수 실행 )

( 해당 함수 내용 요약 : 현재 접속한 사용자의 uid를 불러와서 FirebaseStorage의 ref함수를 이용하여 파일을 저장해줌 )

3. 해당 함수에서 서버에 저장된 이미지의 주소를 return 함

4. 프론트에서는 백엔드에서 return한 주소를 받아와서 useState을 이용하여 이미지 주소를 변경 함

## 서비스 구조

![image](https://github.com/choisejin12/Hongik_SwingFit/assets/76937151/2539d977-b73e-4d8d-90f8-c9b2ed44b2c8)

## 기술 스택

- **FrontEnd** : React Native
- **BackEnd** : Firebase
- **Algorithm** : OpenCV , MediaPipe


## 개발 기간

- 2023.09.03 ~ 11.13 ( 2개월 )


## 기획 & 설계

🌻[디자인](https://www.figma.com/file/WzQzsCube1dBDlEMVt79JY/%EC%A2%85%EC%84%A4?type=design&node-id=0%3A1&mode=design&t=CbWtIvOrq5WgZDwP-1)
