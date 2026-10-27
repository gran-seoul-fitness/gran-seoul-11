# 그랑서울 피트니스 열차 (Gran Seoul Express)

그랑서울 피트니스 11월 운동 챌린지 + 이달의 퀴즈 웹페이지입니다.

- 사이트: https://gran-seoul-fitness.github.io/gran-seoul-11/
- `index.html`: 페이지 전체
- `apps_script/챌린지_백엔드_8월9월10월11월.gs`: 챌린지 스프레드시트용 Apps Script (11월 stamps / 11월 요약 탭)
- `apps_script/웰니스레터_퀴즈_질문_백엔드.gs`: 웰니스레터(퀴즈) 스프레드시트용 Apps Script (11월 퀴즈 탭)

## 구성
1. 매표소: 이름·입주사 입력 후 승차권 발권, 웰니스레터·GX 시간표, 벽의 이달의 퀴즈 포스터
2. 승강장: 열차 출발 연출
3. 객차 6량: 1~5호차는 미션 2개씩, 6호차는 GX·파트너 중 1개 → 모두 11칸, 하루 한 칸
4. 정차역: 4·8·11칸에서 어메니티 수령 (마이 티켓의 어메니티 칸을 눌러 다시 열 수 있음)
5. 출발 안내판: 출발 정보 → 모두의 기록 → 나의 순위·다음 순위까지 남은 칸 (다른 사람 이름과 전체 인원은 표시하지 않음)

## 다음 달로 바꿀 때
- 퀴즈: `index.html`의 `const QUIZ={...}` (문제·보기·정답·기간·해설)
- 챌린지: `MONTH`, 미션(`CARS`), 시트 코드의 11월 분기

## GA4 (구글 애널리틱스)
- 측정 ID `G-EFGZQXF27S` (10월 챌린지와 같은 속성). 이름은 보내지 않아요. 보고서용으로 입주사는 사용자 속성 `company`와 `ticket_issue`·`mission_complete`의 `company`로 보내요(회원 화면에는 표시 안 함).
- 이벤트: `ticket_issue`(입주사) · `continue_boarding` · `car_view` · `mission_open` · `guide_open` · `mission_complete` · `station_arrive` · `amenity_receive` · `quiz_open` · `quiz_answer` · `letter_open` · `gx_open` · `myticket_open` · `board_tap`
- 홍보 링크(유입 경로 구분용)
  - 공지 메일: `https://gran-seoul-fitness.github.io/gran-seoul-11/?utm_source=mail&utm_medium=email&utm_campaign=nov_challenge`
  - 7층 배너 QR: `https://gran-seoul-fitness.github.io/gran-seoul-11/?utm_source=banner&utm_medium=qr&utm_campaign=nov_challenge`
  - 웰니스 레터 QR: `https://gran-seoul-fitness.github.io/gran-seoul-11/?utm_source=letter&utm_medium=qr&utm_campaign=nov_challenge`
- GA 보고서에서 입주사·운동 이름으로 나눠 보려면 GA 관리 → 맞춤 정의에서 등록: 사용자 범위 `company`, 이벤트 범위 `company`, `mission_name`, `car_no`, `station`
