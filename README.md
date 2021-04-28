# ICPC Sinchon 단체 문자 발송 서비스

## 이용방법
### 폼 제출방법
/main에서 보내는 사람 / 받는 사람 / 문자 제목 / 문자 내용을 입력한 후 제출 해 주시면 됩니다.

>Note1: SENS API를 개인계정으로 발급한 API KEY로 사용하고 있기 때문에 보내는 사람은 해당계정의 NCP SENS Console에서 인증된 번호로 제한됩니다.

>Note2: 보내는 사람을 더 추가하려면 개인 계정으로 로그인 후 본인인증을 통해 전화번호를 등록해주시면 됩니다.  
등록을 원하시는 분은 Contributer에게 개인적으로 연락주시면 naver cloud platform 계정을 알려드리겠습니다.

## Router
- /user/login 로그인 페이지로 이동

- /user/logout 로그아웃 후 로그인 페이지로 이동

- /main 폼 제출 페이지로 이동

- /api/send 문자 발송 api 호출

## ToDo
- [x] Login 기능 구현 필요(등록된 유저만 서비스를 이용할 수 있도록 제한)
- [x] 로그아웃 버튼 수요가 생기면 구현
- [ ] 받는 사람 연락처를 파일로 입력받는 단체 문자 발송 기능 구현
- [ ] Naver Cloud Platform 계정을 개인계정이 아닌 ICPC Sinchon 계정으로 변경하여 적용
