# Testing and Definition of Done
테스트는 기능 목록보다 사용자 시나리오로 작성한다.

범주:
- 정상: 핵심 흐름 처음부터 끝까지
- 경계: 빈 선택, 1개/다수, 긴 텍스트, 대량 파일/Canvas, 이름 중복
- 실패: 파일 없음, 쓰기 실패, 잘못된 데이터, 외부 서비스 실패, 삭제/rename
- 생명주기: enable, disable, reload, restart, update
- UI: dark/light, resize, scroll, keyboard, drag/drop
- 성능: 대량 데이터, 반복 조작, 메모리, 지연
- 회귀: 수정 전 정상 기능이 유지되는지

완료조건은 관찰 가능한 문장으로 쓴다.
나쁨: '드래그가 잘 된다.'
좋음: 'Side View의 다중 선택 항목을 Canvas 빈 공간에 드롭하면 상대 배치가 유지되고 원본 Side View 항목은 삭제되지 않는다.'

Critical/High 결함이 남아 있으면 완료로 처리하지 않는다.
