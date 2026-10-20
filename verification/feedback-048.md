# 0.4.8 누적 사용자 수정

2026-10-20, Windows Obsidian 1.14.4, 기존 격리 Sandbox.

## 확정 동작

- 카드 선택 + Ctrl+Shift 500ms 유지: 기존 컨텍스트 메뉴 스타일의 A / D / S 안내. 다른 조합 사용 시 대기 취소.
- Ctrl+Shift+A 유지 + 방향키: 기존 Alt 탐색 기준 대상 하나 연결. Press an arrow key 표시.
- Ctrl+Shift+D: 선택 카드의 연결 전체 해제. 기존 Ctrl+Alt+D 기본키 제거.
- Ctrl+Shift+S: 연결 하나면 즉시 방향 반전. 여러 개면 연결 대상 목록에서 ↑/↓ 선택, Enter 확정, Esc 닫기.
- 반전은 연결 ID·색상·라벨을 유지하고 출발/도착 카드와 부착면을 교환한다. 다른 연결과 카드 위치는 유지한다.
- 연결 메뉴 및 A/D/S는 편집 중 비활성.
- Ctrl+Shift+방향키는 편집 중에도 크기 조절. 편집 상태·텍스트·입력 커서 유지.
- Ctrl+Alt+↑/↓ 위치 교환 키 유지.
- Auto Resize ON에서 빈/공백 텍스트 카드 편집 종료 시 설정의 기본 너비·높이 사용. 내용이 있는 카드의 기존 측정 규칙 유지.

## 실제 검사

- 타입 검사·빌드 통과, 배치 단위 검사 7개·탐색 단위 검사 12개 통과.
- 실제 키보드 입력으로 Ctrl+Shift 0.5초 메뉴 표시, 해제 후 닫힘 확인.
- A 방향 연결, 중복 방지, 대상 없음, 원래 선택·좌표·크기 유지, Undo/Redo 확인.
- 복수 연결 S 메뉴에서 아래 항목 선택·Enter 반전: 선택한 연결만 반전, 카드와 다른 선 동일. Undo 복원.
- 단일 연결 S 즉시 반전 및 Undo 확인.
- D 전체 해제 및 Undo 확인.
- 편집 중 가로 크기 +20px, 입력 텍스트·커서 위치·편집 상태 동일 확인.
- 편집 중 메뉴 대기·A/D/S 비활성 확인.
- 빈 카드 Auto Resize 종료 후 설정 기본 크기와 일치.
- 재시작 후 0.4.8에서 주요 메뉴·연결·Undo·편집 크기·빈 카드 검사 재실행 통과.
- 실제 메뉴 화면 캡처 확인. 신규 검수 Canvas만 사용. 원래 열려 있던 Canvas/설정/작업공간 백업 보존.

실행 스크립트: feedback048-runtime.mjs, feedback048-extra.mjs, feedback048-guards.mjs.
증거: verification/artifacts/feedback-048/.

Sandbox를 사용자 검수용 방향 연결 Canvas에 열어 두었다. 전체 제품·다른 Vault 단축키 호환성 검증은 아니며 중간 Release/push는 하지 않았다.
