# 0.4.2 색상 선택 중 카드 이동 수정

수정 전 실제 Sandbox: 선택 카드(0,0), 팔레트에서 ArrowRight → 카드(20,0). 원인은 native Canvas scope nudge가 플러그인 window 처리보다 먼저 실행됨.
수정: 모든 native 방향키 binding에서 팔레트/색상 선택기가 열려 있는 동안 해당 입력만 팔레트로 전달. 닫힌 상태의 기존 동작 보존.

타입 검사·빌드 통과. 실제 Sandbox 및 재시작0.4.2에서 다음 검사 통과:
- 단일/다중 선택, 상하좌우·반복·Shift 방향키·CtrlShift 방향키: 카드 위치/크기 불변.
- 오른쪽1회: 두 번째 색 강조(중복 실행 없음).
- 색상 선택기 방향키와 Tab: 카드 위치 불변.
- 편집 중 색 적용: 편집/텍스트 유지, 카드 위치 불변.
- 닫힌 상태 방향키: native20px 이동 정상, Undo 복원.
- 최종 오류 목록 없음. 증거 verification/artifacts/feedback-042/runtime.json 및 restart.json.

Sandbox 사용자 확인용 Canvas 열어둠. 중간 Release 없음.
