# 0.4.7 방향 연결 안내

Ctrl+Shift+D를 누르는 동안 선택 카드 우측 상단에 `Press an arrow key` 표시. 기존 생성 메뉴의 152px 너비·테두리·그림자·가운데 정렬 스타일 재사용. 키 해제 시 제거하고 창 포커스 이탈, Canvas 전환, 플러그인 종료에도 정리한다.

2026-10-20 Windows Obsidian 1.14.4 격리 Sandbox 검증:

- 타입 검사·빌드 성공.
- 실제 키 입력으로 영어 문구 및 가운데 정렬 확인.
- 카드 오른쪽 끝 정렬·상단 8px 간격 확인, 실제 화면 캡처 확인.
- D 해제 후 안내 제거 확인.
- 기존 방향 연결, 중복 방지, 후보 없음, 좌표·크기·선택 유지, Undo/Redo 검사 통과.
- Sandbox 재시작 후 0.4.7에서 같은 검사 통과. pageerror 없음.

실행 스크립트: scripts/feedback047-runtime.mjs (--restart).
증거와 원래 Sandbox 자료 백업: verification/artifacts/feedback-047/.
포커스 이탈·Canvas 전환 정리는 코드에 포함했으며 이번 런타임 검사는 키 해제 경로를 대상으로 했다.
새 검수 Canvas에서 확인하고 Sandbox를 열어 두었다. 중간 Release/push 없음.
