# 0.3.4 편집 최소 확대율 설정

- 기본100%. Minimum editing zoom 입력과 저장을 실제 별도 Obsidian 설정창에서 확인.
- 설정125%에서 현재50%→125%, 현재150%→150%. Ctrl+Space 종료 시 각각50%·150% 복원.
- 같은 줄 입력은 카메라 유지, 줄바꿈은 세로 이동, 가로·배율 유지.
- Sandbox 재시작 후0.3.4와125% 저장값·설정 입력란 확인, 같은 동작 재검사 통과.
- 타입 검사·빌드 통과. 최종 runtime.json/restart.json 오류 목록 없음.
- 초기 설정창 검사 대상 페이지 오류를 바로잡았다. 중간 실행에서 Obsidian index.html의 문자열 illegal access 로그가 있었으나 최종 실행 및 재시작에서는 재발하지 않았다. 원인 확정은 하지 않음.
- 기존 설정은 보존하고 새 설정은 검증 후 기본100%로 둠. 원래 Canvas를 다시 열고 Sandbox 유지. 중간 Release 없음.
- 증거: verification/artifacts/feedback-034/ (로컬).
